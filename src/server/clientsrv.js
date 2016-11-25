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
const fs     = require('fs')
const mkdirp = require('mkdirp')
const path   = require('path')

// Require our JS
const config  = require('../util/config')
const clientc = require('../util/clientc')

var exports = module.exports = {}

const isCached = (type, relPath, modPath) => {
    if(typeof modPath === 'undefined') {
        var _modPath = relPath
    } else {
        var _modPath = modPath
    }
    if(type === 'markup') {
        var cachePath  = path.join(config.dir.markupCache, _modPath)
        var sourcePath = path.join(config.dir.markupSource, relPath)
    } else if(type === 'style') {
        var cachePath  = path.join(config.dir.styleCache, _modPath)
        var sourcePath = path.join(config.dir.styleSource, relPath)
    } else if(type === 'code') {
        var cachePath  = path.join(config.dir.codeCache, _modPath)
        var sourcePath = path.join(config.dir.codeSource, relPath)
    } else {
        console.error('Invalid client-side file type! Cannot check cache.')
        return undefined
    }
    try {
        fs.accessSync(cachePath, 'r')
        if(fs.statSync(cachePath).mtime.getTime() >
        fs.statSync(sourcePath).mtime.getTime()) {
            return true
        }
    } catch(err) { }
    return false
};

const getStyles = (stylePaths) => {
    let style = ''
    for(let i = 0; i < stylePaths.length; i++) {
        let cssPath   = stylePaths[i].replace(/\.scss$/, '.css')
        let cachePath = path.join(config.dir.styleCache, cssPath)
        if(!isCached('style', stylePaths[i], cssPath)) {
            mkdirp.sync(cachePath.replace(/\/[^\/]*$/, ''), 0o755)
            let curStyle = clientc.compileStyle(stylePaths[i])
            fs.writeFile(cachePath, curStyle, {
                encoding: 'utf8', mode: 0o644 }, (err) => {
                    if(err) {
                        console.error(err)
                        return
                    }
                    console.log('Cached style file ‘' + stylePaths[i] + '’')
                })
            style += curStyle
            continue
        }
        style += fs.readFileSync(cachePath, {encoding: 'utf8'})
    }
    return style
};

const getCode = (codePaths) => {
    let code = ''
    for(let i = 0; i < codePaths.length; i++) {
        let cachePath = path.join(config.dir.codeCache, codePaths[i])
        if(!isCached('code', codePaths[i])) {
            mkdirp.sync(cachePath.replace(/\/[^\/]*$/, ''), 0o755)
            let curCode = clientc.compileCode(codePaths[i])
            fs.writeFile(path.join(config.dir.codeCache, codePaths[i]),
                curCode, { encoding: 'utf8', mode: 0o644 }, (err) => {
                    if(err) {
                        console.error(err)
                        return
                    }
                    console.log('Cached code file ‘' + codePaths[i] + '’')
                })
            code += curCode
            continue
        }
        code += fs.readFileSync(cachePath, {encoding: 'utf8'})
    }
    return code
};

exports.getPage = (markupPath, stylePaths, codePaths, markupLocals) => {
    if(typeof markupPath !== 'string') {
        console.error('variable ‘markupPath’ must be a string')
    } else if(typeof stylePaths !== 'object') {
        console.error('variable ‘stylePaths’ must be an object')
    } else if(typeof codePaths !== 'object') {
        console.error('variable ‘codePaths’ must be an object')
    } else if(typeof markupLocals !== 'object') {
        console.error('variable ‘markupLocals’ must be an object')
    } else {
        let style     = getStyles(stylePaths)
        let code      = getCode(codePaths)
        return clientc.compilePage(markupPath, style, code, markupLocals)
    }
};
