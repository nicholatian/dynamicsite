#!/usr/bin/env node
/*****************************************************************************\
 *                                                                           *
 *                         FANTASTIC  OCTO SUCCOTASH                         *
 *                                                                           *
 *                    Copyright © 2016 Alexander Nicholi.                    *
 *         Released under the MIT License;  see LICENSE for details.         *
 *                                                                           *
\*****************************************************************************/

'use strict'

// Require our Node modules
const fs      = require('fs')
const hbars   = require('handlebars')
const htmlmin = require('html-minifier').minify
const sass    = require('node-sass')
const path    = require('path')
const uglify  = require('uglify-js').minify

// Require our JS
const config = require('./config')

var exports = module.exports = {}

exports.compileMarkup = (relPath, locals) => {
    let fullPath = path.join(config.dir.markupSource, relPath)
    let template = hbars.compile(fs.readFileSync(fullPath, 'utf8'), {
        noEscape: true,
        strict: true
    })
    return htmlmin(template(locals), {
        caseSensitive: true,
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        ignoreCustomComments: [],
        minifyURLs: true,
        preventAttributesEscaping: false,
        quoteCharacter: '"',
        removeAttributeQuotes: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        sortAttributes: true,
        sortClassName: true,
        useShortDoctype: true
    })
};

exports.compileStyle = (relPath) => {
    return sass.renderSync({
        file: path.join(config.dir.styleSource, relPath),
        outputStyle: 'compressed',
        precision: 14
    }).css
};

exports.compileCode = (relPath) => {
    let fullPath = path.join(config.dir.codeSource, relPath)
    return uglify(fullPath, {
        warnings: true,
        mangle: {
            toplevel: false
        },
        output: {
            indent_start  : 0,     // Beautify only
            indent_level  : 4,     // Beautify only
            quote_keys    : false,
            space_colon   : false,
            ascii_only    : false, 
            inline_script : false, // escape "</script"?
            width         : 80,    // Beautify only
            max_line_len  : 32768, // Non-beautified
            beautify      : false,
            source_map    : null,
            bracketize    : true,
            comments      : false,
            semicolons    : true
        },
        parse: { strict: true }
    }).code
};

exports.compilePage = (markupPath, style, code, markupLocals) => {
    let newMarkupLocals   = markupLocals
    newMarkupLocals.style = style
    newMarkupLocals.code  = code
    return exports.compileMarkup(markupPath, newMarkupLocals)
};
