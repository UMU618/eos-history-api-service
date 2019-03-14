/**
 * @author UMU618 <umu618@hotmail.com>
 * @copyright MEET.ONE 2019
 * @description Use block-always-using-brace npm-coding-style.
 */

'use strict'

const express = require('express')
const router = express.Router()
const history = require('./history.js')

router.use('/history', history)

module.exports = router
