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

console.log('Loading modules...')

// Require our node modules
const path    = require('path')
const express = require('express')
const colour  = require('colour')

const server = express()
const port = process.env.PORT || 3000

server.use(require('./router/jsonapi'))

require('./regparts')()

server.listen(port, () => {
    console.log('Server listening on port ' + port + '.')
})
