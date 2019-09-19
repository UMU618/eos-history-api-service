#!/usr/bin/env node

/**
 * @author UMU618 <umu618@hotmail.com>
 * @copyright MEET.ONE 2019
 * @description Use block-always-using-brace npm-coding-style.
 */

'use strict'

const PORT = 8888

const express = require('express')
const app = express()

// only if you're behind a reverse proxy
app.enable('trust proxy')

const compression = require('compression')
app.use(compression())

// Force body-parser to parse data as JSON
const bodyParser = require('body-parser')
const typeis = require('type-is')
app.use(bodyParser.json({ type: function(req) {
  if (undefined === req.headers['content-type']) {
    // cleos POST data without content-type
    return true
  } else {
    return Boolean(typeis(req, 'application/json'))
  }
}}))

app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*')
  req.setEncoding('utf8')
  res.setHeader('X-Powered-By', 'MeetOne')

  next()

  // Force body-parser to parse data as JSON, old method
  // req.rawBody = ''
  // req.on('data', (chunk) => {
  //   req.rawBody += chunk
  // })
  // req.on('end', () => {
  //   try {
  //     req.body = JSON.parse(req.rawBody)
  //   } catch (err) {
  //     req.body = null
  //   }
  //   next()
  // })
})

/**
 * History APIs:
 *  1. /v1/history/get_actions: cleos get actions #account_name #pos #offset
 *  2. /v1/history/get_transaction: cleos get transaction #id
 *  3. /v1/history/get_key_accounts: cleos get accounts #public_key
 *  4. /v1/history/get_controlled_accounts: cleos get servants #account
*/
const router_v1 = require('./routes/v1/index.js')
app.use('/v1', router_v1);

app.use('/*', function (req, res, next) {
  console.log('Unhandled:', req.originalUrl)
  next()
})

app.use(function(err, req, res, next) {
  res.status(500)
  res.end(JSON.stringify(err))
})

app.listen(PORT)
