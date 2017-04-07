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

// Require our JS
const config = require('../../util/config')

module.exports = name => {
    return config.cdn.protocol + '://' + config.cdn.domain +
        config.cdn.path.perm + '/' + name
};
