#!/usr/bin/env node
/*****************************************************************************\
 *                                                                           *
 *                    Copyright © 2016 Alexander Nicholi.                    *
 *         Released under the MIT License;  see LICENSE for details.         *
 *                                                                           *
\*****************************************************************************/

'use strict'

// Require our node modules
const express = require('express')

// Require our JS
const httpErr = require('../httperr')

var router = module.exports = express.Router({
    caseSensitive: true,
    strict:        true
})

router.all(/^\/.*$/, (req, res) => {
    httpErr(res, 501)
})
