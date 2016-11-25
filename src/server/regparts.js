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
const fs    = require('fs')
const path  = require('path')
const hbars = require('handlebars')

// Require our JS
const config = require('../util/config')

var exports = module.exports = () => {
    let partials = fs.readdirSync(config.dir.markupSource, 'utf8')
    for(let i = partials.length - 1; i >= 0; i--) {
        if(!partials[i].startsWith('_')) {
            continue
        }
        fs.readFile(path.join(config.dir.markupSource, partials[i]), 'utf8',
            (err, data) => {
                if(err) {
                    console.error(err.message)
                    return
                }
                hbars.registerPartial(path.basename(partials[i].substr(1),
                    '.hbs'), data)
            }
        )
    }
};
