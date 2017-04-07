#!/usr/bin/env node
/*****************************************************************************\
 *                                                                           *
 *                      TRINITY SOFTWARE - COMPANY SITE                      *
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
    let count = 0
    let style = ''
    const finish = (err, data) => {
        if(err) {
            console.error(err.message)
            return
        }
        style += data
        count++
        if(count >= stylePaths.length) {
            callback(null, style.replace(/\s*\n\s*/g, ''))
        }
    };
    for(let i = 0; i < stylePaths.length; i++) {
        const cssPath = stylePaths[i].replace(/\.scss$/, '.css')
        const cachePath = path.join(config.dir.styleCache, cssPath)
        const finishCache = (err, data) => {
            if(err) {
                finish(err)
            }
            fs.writeFile(cachePath, data, {
                encoding: 'utf8',
                mode: 0o644
            }, (err2) => {
                if(err2) {
                    finish(err2)
                    return
                }
                console.log('Cached style file ‘' + stylePaths[i] + '’')
                finish(err, data)
            })
        };
        const continueCache = (err, isCached) => {
            if(err) {
                finish(err)
                return
            }
            if(isCached) {
                fs.readFile(cachePath, 'utf8', (err2, data) => {
                    finish(err2, data)
                })
            } else {
                mkdirp(cachePath.replace(/\/[^\/]*$/, ''), 0o755, (err2) => {
                    if(err2) {
                        finish(err2)
                    }
                })
                clientc.compileStyle(stylePaths[i], finishCache)
            }
        };
        chkcache('style', stylePaths[i], cssPath, continueCache)
    }
};
