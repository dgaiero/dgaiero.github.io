/* eslint-disable */
require('dotenv').config()
const withCss = require('@zeit/next-css')

module.exports = withCss({
   webpack: (config, { isServer }) => {
      env: {
         sendgrid_api_key: process.env.sendgrid_api_key;
         contact_email_from_address: process.env.contact_email_from_address
      if (isServer) {
         const antStyles = /antd\/.*?\/style\/css.*?/
         const origExternals = [...config.externals]
         config.externals = [
            (context, request, callback) => {
               if (request.match(antStyles)) return callback()
               if (typeof origExternals[0] === 'function') {
                  origExternals[0](context, request, callback)
               } else {
                  callback()
               }
            },
            ...(typeof origExternals[0] === 'function' ? [] : origExternals),
         ]

         config.module.rules.unshift({
            test: antStyles,
            use: 'null-loader',
         })
      }
      return config
   },
})