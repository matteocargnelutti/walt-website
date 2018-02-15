/** 
 * WALT's Website Generator
 * Website generator for @ballercat's WALT (https://github.com/ballercat/walt)
 *
 * Matteo Cargnelutti - https://github.com/matteocargnelutti
 * index.js - Entry point
 * /!\ This is purposedly a very simple single filer
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
        // Let's assume the directory was already present
    }
}

//-----------------------------------------------------------------------------
// Step 1 : Writing CSS and Libs
//-----------------------------------------------------------------------------
console.log('[1] Writing CSS and libs.');

// List templates dirs
let templates = fs.readdirSync(config.paths.sources.templates);

// For each template
for( let template of templates ) {

    console.log(`[1] Entering template "${template}"`);

    // Paths
    let input_scss_filepath = `${config.paths.sources.templates}${template}/scss/`; // scss input : /assets/templates/{template}/scss/main.scss
    let ouput_css_filepath = `${config.paths.build.css}${template}/`; // css output : /css/{template}/main.css
    
    let input_libs_filepath = `${config.paths.sources.templates}${template}/libs/`; // libs input : /assets/templates/{template}/libs
    let ouput_libs_filepath = `${config.paths.build.libs}${template}/`; // libs output : /libs/{template}/

    // Create paths if needed
    try {
        fs.mkdirSync(`${ouput_css_filepath}`);
        fs.mkdirSync(`${ouput_libs_filepath}`);
    }
    catch(err) {
        // Let's assume the directory was already present
    }

    // Read / compile / write SCSS to CSS
    let scss_input = fs.readFileSync(
        `${input_scss_filepath}main.scss`, 
        'utf8'
    );

    let scss_output = sass.renderSync({
        data: scss_input,
        outputStyle: 'compressed'
    });

    fs.writeFileSync(
        `${ouput_css_filepath}main.css`, 
        scss_output,
        'utf8'
    );

    console.log(`[1] SCSS converted and written for template "${template}"`);

    // Copy template libs
    for( let file of fs.readdirSync(input_libs_filepath) ) {
        console.log(`[1] Copying lib ${file} for template "${template}"`);
        fs.copyFileSync(
            input_libs_filepath + file,
            ouput_libs_filepath + file
        );        
    }

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