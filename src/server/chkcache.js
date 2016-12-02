#!/usr/bin/env node
/*****************************************************************************\
 *                                                                           *
 *                    Copyright © 2016 Alexander Nicholi.                    *
 *         Released under the MIT License;  see LICENSE for details.         *
 *                                                                           *
\*****************************************************************************/

'use strict'

// Require our Node modules
const fs   = require('fs')
const path = require('path')

// Require our JS(ON)
const config = require('../util/config')

module.exports = (type, sourceName, cacheName, callback) => {
    const statCache = (err, stats) => {
        if(err) {
            console.error(err.message)
            callback(null, false)
            return
        }
        const compareTimes = (err2, stats2) => {
            if(err2) {
                console.error(err2.message)
                callback(null, false)
                return
            }
            if(stats.mtime.getTime() > stats2.mtime.getTime()) {
                callback(null, true)
            } else {
                callback(null, false)
            }
        };
        fs.stat(sourcePath, compareTimes)
    };

    if(typeof cacheName === 'undefined') {
        var cacheName = sourceName
    }
    if(type === 'markup') {
        var cachePath  = path.join(config.dir.markupCache, cacheName)
        var sourcePath = path.join(config.dir.markupSource, sourceName)
    } else if(type === 'style') {
        var cachePath  = path.join(config.dir.styleCache, cacheName)
        var sourcePath = path.join(config.dir.styleSource, sourceName)
    } else if(type === 'code') {
        var cachePath  = path.join(config.dir.codeCache, cacheName)
        var sourcePath = path.join(config.dir.codeSource, sourceName)
    } else {
        callback(new Error('Invalid client-side file type! Cannot check' +
            ' cache.', false))
        return
    }
    fs.access(cachePath, fs.constants.R_OK, (err) => {
        if(err) {
            callback(null, false)
            return
        }
        fs.stat(cachePath, statCache)
    })
};
