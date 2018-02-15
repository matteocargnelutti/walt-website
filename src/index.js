/** 
 * WALT's Website Generator
 * Website generator for @ballercat's WALT (https://github.com/ballercat/walt)
 *
 * Matteo Cargnelutti - http://github.com/matteocargnelutti
 * index.js - Entry point
*/

//-----------------------------------------------------------------------------
// Imports 
//-----------------------------------------------------------------------------
const fs = require('fs');

const mustache = require('mustache');
const markdown = require('markdown');
const sass = require('node-sass');

const config = require('./config');

console.log("Building WALT's website");

//-----------------------------------------------------------------------------
// Step 0 : Create base desination paths if they don't exist
//-----------------------------------------------------------------------------
for( let path of Object.values(config.paths.build) ) {
    try {
        fs.mkdirSync(path);
    }
    catch(err) {
        // It's ok :) !
    }
}

//-----------------------------------------------------------------------------
// Step 1 : Compiling SCSS to CSS
//-----------------------------------------------------------------------------
console.log('[1] Compiling SCSS.');

// List templates dirs
let templates = fs.readdirSync(config.paths.sources.templates);

for( let template of templates ) {

    let input_filepath = `${config.paths.sources.templates}${template}/scss/`;
    let ouput_filepath = `${config.paths.build.css}${template}/`;
    
    // Create path if needed
    try {
        fs.mkdirSync(`${ouput_filepath}`);
    }
    catch(err) {
        // It's ok :) !
    }

    // Read template's main scss
    let scss_input = fs.readFileSync(
        `${input_filepath}main.scss`, 
        'utf8'
    );

    let scss_output = sass.renderSync({
        data: scss_input,
        outputStyle: 'compressed'
    });

    fs.writeFileSync(
        `${ouput_filepath}main.css`, 
        scss_output,
        'utf8'
    );

}

console.log('[1] Ok !');

//-----------------------------------------------------------------------------
// Step 2 : Copying images
//-----------------------------------------------------------------------------
console.log('[2] Copying image files.');

let img_files = fs.readdirSync(config.paths.sources.img);

for( let file of img_files ) {
    console.log(`[2] Copying : ${file}`);
    fs.copyFileSync(
        config.paths.sources.img + file,
        config.paths.build.img + file
    );
}

console.log('[2] Ok !');

//-----------------------------------------------------------------------------
// Step 3 : Building LANDING page
//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------
// Step 4 : Loading and indexing DOC contents
//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------
// Step 5 : Building DOC INDEX page
//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------
// Step 6 : Building DOC INDIVIDUAL pages
//-----------------------------------------------------------------------------