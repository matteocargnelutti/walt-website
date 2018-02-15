/** 
 * WALT's Website Generator
 * Website generator for @ballercat's WALT (https://github.com/ballercat/walt)
 *
 * Matteo Cargnelutti - https://github.com/matteocargnelutti
 * config.js - Website config info
*/

//-----------------------------------------------------------------------------
// Paths (assuming root = /src/index.js)
//-----------------------------------------------------------------------------
exports.paths = {
    sources: {
        'root': './assets/',
        'contents': './assets/contents/', // Markdown contents
        'img': './assets/img/',
        'templates': './assets/templates/'
    },
    build: {
        'root': '../',
        'css': '../css/',
        'img': '../img/',
        'libs': '../libs/',
        'docs': '../docs/'
    }
}

//-----------------------------------------------------------------------------
// Globals
//-----------------------------------------------------------------------------
exports.globals = {
    'site_url': '',
    'walt_github_url': 'https://ballercat.github.io/walt/',
    'walt_demo_url': 'https://github.com/ballercat/walt'
}