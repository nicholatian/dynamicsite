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
const fs    = require('fs')
const hbars = require('handlebars')
const path  = require('path')

// Require our JS
const config = require('../util/config')

var exports = module.exports = {}

exports.register = (filePath, callback) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        const name = path.basename(filePath, '.hbs').substr(1)
        hbars.registerPartial(name, data)
        callback()
    })
};

exports.registerAll = (callback) => {
    fs.readdir(config.dir.markupSource, 'utf8', (err, files) => {
        if(err) {
            if(typeof callback !== 'undefined') {
                callback(err)
            }
            return
        }
        let   numDone  = 0;
        const incrNum  = () => {
            numDone++
            if(numDone >= files.length) {
                if(typeof callback !== 'undefined') {
                    callback()
                }
            }
        };
        for(let i = files.length - 1; i >= 0; --i) {
            const filePath = path.join(config.dir.markupSource, files[i])
            if(!files[i].startsWith('_')) {
                files.splice(i, 1)
                continue
            }
            exports.register(filePath, incrNum)
        }
    })
};

exports.unregister = (name, callback) => {
    hbars.unregisterPartial(name)
    if(typeof callback !== 'undefined') {
        callback()
    }
};

exports.unregisterAll = (callback) => {
    fs.readdir(config.dir.markupSource, 'utf8', (err, files) => {
        if(err) {
            if(typeof callback !== 'undefined') {
                callback(err)
            }
            return
        }
        for(let i = files.length - 1; i >= 0; --i) {
            if(!files[i].startsWith('_')) {
                files.splice(i, 1)
                continue
            }
            exports.unregister(files[i].substr(1))
        }
        if(typeof callback !== 'undefined') {
            callback()
        }
    })
};
