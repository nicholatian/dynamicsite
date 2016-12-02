#!/usr/bin/env node
/*****************************************************************************\
 *                                                                           *
 *                    Copyright © 2016 Alexander Nicholi.                    *
 *         Released under the MIT License;  see LICENSE for details.         *
 *                                                                           *
\*****************************************************************************/

'use strict'

module.exports = {
    getCode:   require('./clientsrv/getcode'),
    getStyles: require('./clientsrv/getstyles'),
    getPage:   require('./clientsrv/getpage')
}
