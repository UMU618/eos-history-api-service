/**
 * @author UMU618 <umu618@hotmail.com>
 * @copyright MEET.ONE 2019
 * @description Use block-always-using-brace npm-coding-style.
 */

'use strict'

const eosFormat = require('eosjs').modules.format

module.exports = {
  isValidName: (name) => {
    try {
      let v = eosFormat.encodeName(name)
      if (v === '0') {
        return false
      }
      return true
    } catch(err) {
      return false
    }
  }
}
