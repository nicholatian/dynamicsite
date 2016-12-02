#!/usr/bin/env node
/*****************************************************************************\
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
const config   = require('../../util/config')
const clientc  = require('../../util/clientc')
const chkcache = require('../chkcache')

module.exports = (stylePaths, callback) => {
    for(let i = 0; i < stylePaths.length; i++) {
        const cssPath = stylePaths[i].replace(/\.scss$/, '.css')
        const cachePath = path.join(config.dir.styleCache, cssPath)
        const finishCache = (err, data) => {
            if(err) {
                callback(err)
            }
            fs.writeFile(cachePath, data, {
                encoding: 'utf8',
                mode: 0o644
            }, (err2) => {
                if(err2) {
                    callback(err2)
                    return
                }
                console.log('Cached style file ‘' + stylePaths[i] + '’')
            })
            callback(err, data)
        };
        const continueCache = (err, isCached) => {
            if(err) {
                callback(err)
                return
            }
            if(isCached) {
                fs.readFile(cachePath, 'utf8', (err2, data) => {
                    callback(err2, data)
                })
            } else {
                mkdirp(cachePath.replace(/\/[^\/]*$/, ''), 0o755, (err2) => {
                    if(err2) {
                        callback(err2)
                    }
                })
                clientc.compileStyle(stylePaths[i], finishCache)
            }
        };
        chkcache('style', stylePaths[i], cssPath, continueCache)
    }
};
