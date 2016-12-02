#!/usr/bin/env node
/*****************************************************************************\
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
const config   = require('./config')
const regparts = require('../server/regparts')

var exports = module.exports = {}

exports.compileMarkup = (relPath, locals, callback) => {
    const processHbars = (err, data) => {
        if(err) {
            callback(err, data)
            return
        }
        regparts.registerAll((err) => {
            if(err) {
                callback(err)
                return
            }
            let template = hbars.compile(data, {
                noEscape: true,
                strict: true
            })
            callback(null, htmlmin(template(locals), {
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
            }))
            regparts.unregisterAll()
        })
    };
    let fullPath = path.join(config.dir.markupSource, relPath)
    fs.readFile(fullPath, 'utf8', processHbars)
};

exports.compileStyle = (relPath, callback) => {
    sass.render({
        file: path.join(config.dir.styleSource, relPath),
        outputStyle: 'compressed',
        precision: 14
    }, (err, obj) => {
        callback(err, obj.css)
    })
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
        parse: {
            strict: true
        }
    }).code
};

exports.compilePage = (markupPath, style, code, markupLocals, callback) => {
    let newMarkupLocals   = markupLocals
    newMarkupLocals.style = style
    newMarkupLocals.code  = code
    exports.compileMarkup(markupPath, newMarkupLocals, (err, data) => {
        if(data.match(/^ *$/)) {
            callback(new Error('Generated markup is empty'), data)
            return
        }
        callback(null, data)
    })
};
