import express from 'express'
import path from 'path'
import logger from 'morgan'
import { ParseServer } from 'parse-server'

const resolve = require('path').resolve

var app = express()
var databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI

// Import parse
var api = new ParseServer({
  databaseURI: databaseUri || 'mongodb://localhost:27017/dev',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || '7BAc82n24Kw4G4Nk8n89',
  masterKey: process.env.MASTER_KEY || 's88BV8prL89y27Qr4C32'
})

//don't show the log when it is test
app.use(logger('dev'))
app.use(express.static(path.join(__dirname, 'public')))

// Serve the Parse API on the /parse URL prefix
var mountPath = process.env.PARSE_MOUNT || '/parse'
app.use(mountPath, api)

var port = process.env.PORT || 1337
var httpServer = require('http').createServer(app)

httpServer.listen(port, function() {
  console.log('parse-server-example running on port ' + port + '.')
})

module.exports = app
