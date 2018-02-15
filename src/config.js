/** 
 * WALT's Website Generator
 * Website generator for @ballercat's WALT (https://github.com/ballercat/walt)
 *
 * Matteo Cargnelutti - https://github.com/matteocargnelutti
 * config.js - Website config info
*/

//-----------------------------------------------------------------------------
// Paths
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
        'libs': '../libs/'
    }
}

//-----------------------------------------------------------------------------
// Site infos
//-----------------------------------------------------------------------------
exports.site = {
    'title': 'Walt',
    'description': 'JavaScript-like syntax for WebAssembly'
}
