/**
 * @author UMU618 <umu618@hotmail.com>
 * @copyright MEET.ONE 2019
 * @description Use block-always-using-brace npm-coding-style.
 */

'use strict'

const test = require('./test.json')
const express = require('express')
const eosUtils = require('../utils/eos_utils.js')

const router = express.Router()

router.route(["/get_actions"])
  .post((req, res, next) => {
    let { account_name, pos = 0, offset = 0 } = req.body
    req._account_name = account_name
    req._pos = pos
    req._offset = offset

    next()
  })
  .all((req, res, next) => {
    if (!req._account_name || !eosUtils.isValidName(req._account_name)) {
      res.json({"actions":[],"last_irreversible_block":0})
    } else {
      console.log('Query:', req._account_name, req._pos, req._offset)

      // TO DO

      // default
      res.json(test.get_actions)
    }
  })

router.route(["/get_transaction"])
  .post((req, res, next) => {
    let { id } = req.body
    req._id = id
    next()
  })
  .all((req, res, next) => {
    if (!req._id || req._id.length < 8 || !/^[0-9a-f]{8,64}$/.test(req._id)) {
      res.status(500).send('{"code":500,"message":"Internal Service Error","error":{"code":3010009,"name":"transaction_id_type_exception","what":"Invalid transaction ID","details":[{"message":"Invalid transaction ID: ","file":"history_plugin.cpp","line_number":455,"method":"get_transaction"},{"message":"input_id_length >= 8: hex string representing transaction id should be at least 8 characters long to avoid excessive collisions","file":"history_plugin.cpp","line_number":453,"method":"get_transaction"}]}}')
    } else {
      res.json(test.get_transaction)
    }
  })

router.route(["/get_key_accounts"])
  .post((req, res, next) => {
    let { public_key } = req.body
    req._public_key = public_key
    next()
  })
  .all((req, res, next) => {
    let public_key = req._public_key
      || 'EOS1111111111111111111111111111111114T1Anm'
    //console.log('Query:', public_key)

    // TO DO

    // default
    res.json(test.get_key_accounts)
  })

router.route(["/get_controlled_accounts"])
  .post((req, res, next) => {
    let {controlling_account} = req.body
    req._controlling_account = controlling_account
    next()
  })
  .all((req, res, next) => {
    if (!req._controlling_account
      || !eosUtils.isValidName(req._controlling_account)) {
      res.json({ controlled_accounts: [] })
    } else {
      //console.log('Query:', req._controlling_account)

      // TO DO

      // default
      res.json(test.get_controlled_accounts)
    }
  })

module.exports = router
