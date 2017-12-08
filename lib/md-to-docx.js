#!/usr/bin/env node

const fs = require('fs')
const nodePandoc = require('node-pandoc')
const path = require('path')

async function main() {
  console.log('Clearing dist...')
  clearDir(path.resolve(__dirname, 'dist'))

  const markdownFiles = markdownFilePaths(path.resolve(__dirname, 'src'))
  console.log('Writings docx\'s')
  
  // Using try/catch with promises is SO strange. 
  try {
    const results = await Promise.all(transformFiles(markdownFiles))
    console.log('Finished writing the following docs')
    results.forEach((file) => {
      console.log(file)
    })
  } catch (rejection) {
    console.log(rejection)
  }
}

function clearDir(dir) {
  const files = fs.readdirSync(dir)

  files.forEach((file) => {
    fs.unlinkSync(path.resolve(dir, file))
  })
}

function transformFiles(files) {
  return files.map((file) => {
    const fileName = path.basename(file)
    const fileNameOutput = path.resolve(__dirname, 'dist', `${path.basename(file).slice(0, -3)}.docx`)
    let args = `-o ${fileNameOutput} -f markdown -t docx`
    return new Promise((resolve, reject) => {
      nodePandoc(file, args, (err, results) => {
        if (err) {
          reject(`couldn't convert ${file}`)
        }

        resolve(fileNameOutput)
      })
    })
  })
}

function markdownFilePaths(currentPath) {
  // all files in src dir
  let results = []
  const files = fs.readdirSync(currentPath)

  files.forEach((file) => {
    const stat = fs.statSync(path.resolve(currentPath, file))
    if (stat.isDirectory()) {
      results = results.concat(markdownFilePaths(path.resolve(currentPath, file)))
    }

    if (/\.md$/.test(file)){
      results.push(path.resolve(currentPath, file))
    } 
  })

  return results
}

// entry
main()