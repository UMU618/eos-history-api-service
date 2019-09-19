// `cleos get transaction` POST data without content-type
// while this script POST data with content-type: application/json

const request = require('request-json')
const client = request.createClient('http://127.0.0.1:8888/')

const json = {"id": "d5245026c757532ea3dd5b3a02a07620eb7238113d0a49cae5ebb93921a34135"};
client.post('/v1/history/get_transaction', json, function(err, res, body) {
  console.log(res.statusCode, body)
})
