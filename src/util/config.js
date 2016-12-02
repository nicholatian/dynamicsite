#!/usr/bin/env node
/*****************************************************************************\
 *                                                                           *
 *                    Copyright © 2016 Alexander Nicholi.                    *
 *         Released under the MIT License;  see LICENSE for details.         *
 *                                                                           *
\*****************************************************************************/

'use strict'

// Require our Node modules
const path = require('path')

var exports = module.exports = {}

const userConfig = require('../../config')

exports.dir  = {}
exports.db   = {}
exports.mail = {}

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

exports.db.host   = 'localhost'
exports.db.uname  = userConfig.database.username
exports.db.passwd = userConfig.database.password
exports.db.name   = 'master'

exports.mail.pool              = true
exports.mail.direct            = true
exports.mail.port              = userConfig.mail.port
exports.mail.host              = userConfig.mail.host
exports.mail.secure            = true
exports.mail.uname             = userConfig.mail.username
exports.mail.passwd            = userConfig.mail.pass
exports.mail.authMethod        = 'PLAIN'
exports.mail.name              = userConfig.mail.host
exports.mail.maxConnections    = 5
exports.mail.maxMessages       = 100
exports.mail.rateLimit         = true
exports.mail.disableFileAccess = false
exports.mail.disableUrlAccess  = false
