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

const path = require('path')

if(process.argv.length < 3) {
    var doMake = true
    var doRun  = true
} else if(process.argv.length > 3) {
    console.error('Too many arguments provided!')
    var doMake = false
    var doRun  = false
} else if(process.argv[2] === '-m') {
    var doMake = true
    var doRun  = false
} else if(process.argv[2] === '-q') {
    var doMake = false
    var doRun  = true
} else {
    console.error('Invalid argument ‘' + process.argv[2] + '’!')
    var doMake = false
    var doRun  = false
}

if(doMake) {
    // TODO: Run compilation tasks here by forking a node from util/build.js
}

if(doRun) {
    const fork = require('child_process').fork
    console.log('Forking node for Express server...')
    fork(path.join('src', 'server', 'server.js'), [], {
        cwd: __dirname,
        silent: false
    })
}
