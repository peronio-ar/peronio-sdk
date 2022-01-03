
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./peronio-sdk.cjs.production.min.js')
} else {
  module.exports = require('./peronio-sdk.cjs.development.js')
}
