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

module.exports = (codePaths, callback) => {
    for(let i = 0; i < codePaths.length; i++) {
        const cachePath = path.join(config.dir.codeCache, codePaths[i])
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
                console.log('Cached code file ‘' + codePaths[i] + '’')
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
                finishCache(null, clientc.compileCode(codePaths[i]))
            }
        };
        chkcache('code', codePaths[i], codePaths[i], continueCache)
    }
};
