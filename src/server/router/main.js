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
const express = require('express')

// Require our JS(ON)
const httpErr   = require('../httperr')

var router = module.exports = express.Router({
    caseSensitive: true,
    strict:        true
})

router.all(/^\/.*$/, (req, res) => {
    httpErr(res, 404)
})
