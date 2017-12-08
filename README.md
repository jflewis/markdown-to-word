# Markdown to Word
Simple project to convert all markdown files in the src directory.

## About
I needed a simple way to convert my markdown to microsoft word in order to hand off to less savy individuals ;)

Files are written in markdown and convert to Microsoft docx using pandoc. Pandoc must be install on your system. For Mac users it's as easy as `brew install pandoc`.

## Running
To generate the docx's run...

```bash
npm run build
```

This will scan the src dir for all markdown files, convert them to docx, and spit them out in the `dist` directory.


This is a personal project and whatever happens....happens.
