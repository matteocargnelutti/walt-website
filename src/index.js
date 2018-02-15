/** 
 * WALT's Website Generator
 * Website generator for @ballercat's WALT (https://github.com/ballercat/walt)
 *
 * Matteo Cargnelutti - https://github.com/matteocargnelutti
 * index.js - Entry point
 * /!\ This is PURPOSELY a very simple single filer, in order to allow anyone to quickly modify it
*/

//-----------------------------------------------------------------------------
// Imports 
//-----------------------------------------------------------------------------
const fs = require('fs');

const mustache = require('mustache');
const marked = require('marked');
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
});

const sass = require('node-sass');

const config = require('./config');

console.log("-- Building WALT's website --");

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

// For each template of assets/templates
for( let template of fs.readdirSync(config.paths.sources.templates) ) {

    console.log(`[1] Entering template "${template}"`);

    //
    // Paths
    //
    let input_scss_filepath = `${config.paths.sources.templates}${template}/scss/`; 
    // scss input : /src/assets/templates/{template}/scss/main.scss
    let ouput_css_filepath = `${config.paths.build.css}${template}/`; 
    // css output : /css/{template}/main.css
    
    let input_libs_filepath = `${config.paths.sources.templates}${template}/libs/`; 
    // libs input : /src/assets/templates/{template}/libs
    let ouput_libs_filepath = `${config.paths.build.libs}${template}/`; 
    // libs output : /libs/{template}/

    // Create paths if needed
    try {
        fs.mkdirSync(`${ouput_css_filepath}`);
        fs.mkdirSync(`${ouput_libs_filepath}`);
    }
    catch(err) {
        // Let's assume the directory was already present
    }

    //
    // Read / compile / write SCSS to CSS
    //
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
        scss_output.css,
        'utf8'
    );

    console.log(`[1] - SCSS converted and written for template "${template}"`);

    //
    // Copy template's associated libs
    //
    for( let file of fs.readdirSync(input_libs_filepath) ) {
        console.log(`[1] - Copying lib file ${file} for template "${template}"`);
        fs.copyFileSync(
            input_libs_filepath + file,
            ouput_libs_filepath + file
        );        
    }

}

console.log('-- Step 1: Ok --');

//-----------------------------------------------------------------------------
// Step 2 : Copying images
//-----------------------------------------------------------------------------
console.log('[2] Copying image files.');

// For each file of assets/img
for( let file of fs.readdirSync(config.paths.sources.img) ) {
    console.log(`[2] - Copying : ${file}`);
    fs.copyFileSync(
        config.paths.sources.img + file,
        config.paths.build.img + file
    );
}

console.log('-- Step 2: Ok --');

//-----------------------------------------------------------------------------
// Step 3 : Building the LANDING page
//-----------------------------------------------------------------------------
(() => {

    console.log('[3] Building the landing page (/index.html)');

    // Paths
    let template_source = `${config.paths.sources.templates}landing/index.html`;
    let template_dest = `${config.paths.build.root}index.html`;

    // Fetches template content
    let raw = fs.readFileSync(
        template_source, 
        'utf8'
    );

    // Data to merge-in
    let data = {
        css_dir: `${config.paths.build.css}landing/`.replace('../', ''), // Target : /css/landing
        img_dir: config.paths.build.img.replace('../', ''), // Target : /img
        libs_dir: `${config.paths.build.libs}landing/`.replace('../', ''), // Target : /libs/landing
        walt_demo_url: config.globals.walt_demo_url,
        walt_github_url: config.globals.walt_github_url,
    }

    // Render and write file
    fs.writeFileSync(
        template_dest, 
        mustache.render(raw, data),
        'utf8'
    );

})(); //  Self-executing function used for block-scope purposes

console.log('-- Step 3: Ok --');

//-----------------------------------------------------------------------------
// Step 4 : Loading, indexing and parsing DOCS markdown contents
//-----------------------------------------------------------------------------
let docs = [];

(() => {

    console.log(`[4] Loading, indexing and parsing DOC contents.`);

    let docs_path = `${config.paths.sources.contents}docs/`;

    // For each found doc : load it, parse it and put it in memory
    for( let doc of fs.readdirSync(docs_path) ) {

        // Load content
        let content = fs.readFileSync(docs_path+doc, 'utf8');
        
        // Try to use first title of the doc as a title
        let title = doc;

        try {
            title = /^\#\#{1}([\w\d\s.]+)/gm.exec(content)[1].trim();
        }
        catch(err) {
            title = doc.replace('.md', '');
        }

        // Index
        docs.push({
            title: title,
            filename: doc.replace('.md', ''),
            content: marked(content)
        });

        console.log(`[4] - DOC ${doc} loaded, parsed and indexed.`)
    }

})();

console.log('-- Step 4: Ok --');

//-----------------------------------------------------------------------------
// Step 5 : Preparing DOC INDEX page content
//-----------------------------------------------------------------------------
(() => {

    console.log(`[5] Preparing DOCS index page content.`);

    // Building the docs index
    let content = `<h2>Index</h2>`
    content += `<ul>`;
    for( doc of docs ) {
        content += `<li>`
        content += `<a href="/docs/${doc.filename}.html" title="${doc.title}">${doc.title}</a>`
        content += `</li>`
    }
    content += `</ul>`

    docs.unshift({
        title: 'Documentation',
        filename: 'index',
        content: content
    });

    console.log('-- Step 5: Ok --');

})();

//-----------------------------------------------------------------------------
// Step 6 : Building DOC pages
//-----------------------------------------------------------------------------
(() => {

    console.log(`[6] Building DOCS pages.`);

    let template = fs.readFileSync(`${config.paths.sources.templates}docs/index.html`, 'utf8');

    for( doc of docs ) {

        console.log(`[6] Building ${doc.filename}.html`);

        // Paths
        let template_dest = `${config.paths.build.root}docs/${doc.filename}.html`;

        // Data to merge-in
        let data = {
            css_dir: `${config.paths.build.css}docs/`, // Target : /css/docs
            img_dir: config.paths.build.img, // Target : /img
            libs_dir: `${config.paths.build.libs}docs/`, // Target : /libs/docs 
            walt_demo_url: config.globals.walt_demo_url,
            walt_github_url: config.globals.walt_github_url,
            title: doc.title,
            content: doc.content
        }

        // Render and write file
        fs.writeFileSync(
            template_dest, 
            mustache.render(template, data),
            'utf8'
        );
    }

})();

console.log('-- Step 6: Ok --');

console.log('-- Done. --');