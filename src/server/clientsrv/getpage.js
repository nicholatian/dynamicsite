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

const clientc   = require('../../util/clientc')
const getCode   = require('./getcode')
const getStyles = require('./getstyles')

module.exports = (markupPath, stylePaths, codePaths, markupLocals, callback) =>
{
    const codePromise = new Promise((resolve, reject) => {
        getCode(codePaths, (err, data) => {
            if(err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
    const stylePromise = new Promise((resolve, reject) => {
        getStyles(stylePaths, (err, data) => {
            if(err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
    Promise.all([codePromise, stylePromise]).then((values) => {
        clientc.compilePage(markupPath, values[1], values[0], markupLocals,
        (err, markup) => {
            callback(err, markup)
        })
    }, (err) => {
        callback(err)
    }).catch(err => {
        callback(err)
    })
};
