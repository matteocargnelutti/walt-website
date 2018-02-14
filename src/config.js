/** 
 * WALT's Website Generator
 * Website generator for @ballercat's WALT (https://github.com/ballercat/walt)
 *
 * Matteo Cargnelutti - http://github.com/matteocargnelutti
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
        'templates': './assets/templates/',
        'scss': './assets/scss/'
    },
    build: {
        'root': '../',
        'css': '../css/',
        'img': '../img/'
    }
}

//-----------------------------------------------------------------------------
// Site infos
//-----------------------------------------------------------------------------
exports.site = {
    'title': 'Walt',
    'description': 'JavaScript-like syntax for WebAssembly'
}
