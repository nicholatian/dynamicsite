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
const path = require('path')

var exports = module.exports = {}

exports.dir      = {}
exports.cdn      = {}
exports.cdn.path = {}

exports.dir.root         = process.cwd()
exports.dir.source       = path.join(exports.dir.root, 'src')
exports.dir.client       = path.join(exports.dir.source, 'client')
exports.dir.markupSource = path.join(exports.dir.client, 'markup')
exports.dir.styleSource  = path.join(exports.dir.client, 'style')
exports.dir.codeSource   = path.join(exports.dir.client, 'code')
exports.dir.server       = path.join(exports.dir.source, 'server')
exports.dir.routers      = path.join(exports.dir.server, 'router')
exports.dir.utils        = path.join(exports.dir.source, 'util')
exports.dir.cache        = path.join(exports.dir.root, 'cache')
exports.dir.styleCache   = path.join(exports.dir.cache, 'style')
exports.dir.codeCache    = path.join(exports.dir.cache, 'code')

exports.cdn.protocol = 'http'
exports.cdn.domain   = 'cdn.example.net'

exports.cdn.path.root = '/'
exports.cdn.path.temp = '/temp'
exports.cdn.path.perm = '/perm'
