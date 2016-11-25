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
const path = require('path')

// Require our JS(ON)
const clientsrv   = require('./clientsrv')
const longDescs   = require('./httperr/longdesc')
const shortDescs  = require('./httperr/shortdesc')
const backgrounds = require('./httperr/background')

const getShortDesc = (code) => {
    return shortDescs[code.toString()]
};

const getLongDesc = (code) => {
    return longDescs[code.toString()]
};

const getBackground = (code) => {
    return backgrounds[code.toString()]
};

var exports = module.exports = (res, code) => {
    let shortDesc = getShortDesc(code)
    res.status(code).send(clientsrv.getPage('httperr.hbs', ['common.scss',
        path.join('err', code + '.scss')], ['common.js'], {
            sitename:  'Untitled Website',
            pagetitle: code + ': ' + shortDesc,
            num:       code,
            shortdesc: shortDesc,
            longdesc:  getLongDesc(code),
            pagedesc:  'A brief description'
        }))
};
