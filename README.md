# @ballercat WALT's Website
This temporary repository contains the sources, the builder and the build for the upcoming official website for @ballercat 's **Walt project** : https://github.com/ballercat/walt 

This website is meant to be hosted on GitHub pages.

This is an early version of the website.

## Repository map
### /
File/dir | Use
-------- | ---
`/` | This is where the actual website, once generated, lays
`/index.html` | Landing page
`/build.sh` | Build script for Linux & Mac OS
`/css/` | Generated CSS files for each template
`/docs/` | Generated pages for the website's "Docs" part
`/img/` | Generated common images directory
`/libs/` | Generated libs files for each template
`/src/` | Contains the sources of the website and its generator

### /src
File/dir | Use
-------- | ---
`/src/config.js` | Holds configuration info for the generator
`/src/index.js` | The generator.
`/src/package.json`| NPM dependencies file
`/src/assets/` | Contains all the ressources used to generate the website
`/src/assets/contents/docs/` | Contains Markdown files used to build the docs
`/src/assets/img/` | Common directory for all the website's images
`/src/assets/templates/` | Website templates. One template per dir. Each template has its own libs and scss directory.

## How to build the website
- **Setup:** With **NodeJS** installed, go to `/src` and run `npm install` to install all the required dependencies.
- **Build:** From `/` run `./build.sh` or from `/src/` run `node index.js`

## About the generator
**This website uses a very simple one-file generator:** the idea was to avoid having to rely on too many dependencies for such a simple task, and to allow anyone that knows JavaScript to contribute to the website without having to learn any new framework or library.

The script is purposely simple, synchronous and in a single file.

## How to edit the docs
Simply add or edit a `.md` file in `/src/assets/contents/docs` and build the site.
- Each file should be in this format : 0X_name.md 
- The files shouldn't contain first-level headings
- The first heading found in the fild is used as the page's title
- See **01_about.md**

## How to edit the landing page
Directly edit `/src/assets/landing/index.html`.

## How to edit the styles
Simply edit the .scss files for each template and run `./build.sh`.
The SASS files are interpreted by the build script through **node-sass**.
