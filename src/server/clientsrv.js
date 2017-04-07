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

module.exports = {
    getAsset:  require('./clientsrv/getasset'),
    getCode:   require('./clientsrv/getcode'),
    getStyles: require('./clientsrv/getstyles'),
    getPage:   require('./clientsrv/getpage')
}
