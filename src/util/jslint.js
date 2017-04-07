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

const chproc = require('child_process')
const path   = require('path')

const jsonToArgs = (json) => {
    let ret = []
    for(let prop in json) {
        if(!json.hasOwnProperty(prop)) {
            continue
        }
        if(typeof json[prop] === 'boolean') {
            ret += ['--' + prop]
        } else {
            ret += ['--' + prop + '=' + json[prop]]
        }
    }
    return ret
};

module.exports = (args) => {
    if(!args.length) {
        console.error('Too few arguments given to JSLinter')
        return 1
    }
    let doNode    = 0
    let doBrowser = 0
    let failed    = false
    for(let i = 0; i < args.length; i++) {
        if(args[i] === 'node') {
            doNode++
        } else if(args[i] === 'browser') {
            doBrowser++
        } else {
            console.error('Unknown argument given to JSLinter: ' + args[i])
            failed = true
        }
    }
    if(failed) {
        console.error('Unknown arguments were found. Aborting...')
        return 2
    }
    if(doNode) {
        var nodeOpts = jsonToArgs(require('./node.jslintrc'))
        var doneNode = (err, stdout, stderr) => {
            if(err) {
                console.error(err)
                return
            }
            if(stderr) {
                console.error(stderr)
            }
            console.log('Finished linting Node JavaScript files.')
        };
    }
    if(doBrowser) {
        var browserOpts = jsonToArgs(require('./browser.jslintrc'))
        var doneBrowser = (err, stdout, stderr) => {
            if(err) {
                console.error(err)
                return
            }
            if(stderr) {
                console.error(stderr)
            }
            console.log('Finished linting Node JavaScript files.')
        };
    }
    if(doNode || doBrowser) {
        var cwd = process.cwd()
    }
    for(let i = 0; i < doNode; i++) {
        chproc.execFile(path.join(cwd, 'node_modules', '.bin',
        'jslint'), nodeOpts + ['src/server/*.js', 'src/server/**/*.js' +
        'src/util/*.js', 'src/util/**/*.js'], { cwd: cwd }, doneNode)
        
    }
    for(let i = 0; i < doBrowser; i++) {
        chproc.execFile(path.join(cwd, 'node_modules', '.bin',
        'jslint'), browserOpts + ['src/client/*.js', 'src/client/**/*.js'],
        { cwd: cwd }, doneBrowser)
    }
};

if(require.main === module) {
    process.exit(module.exports(process.argv.splice(0, 2)))
}
