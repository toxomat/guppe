'use strict'
const express = require('express')
const router = express.Router()
const store = require('../store')
const pub = require('../pub')

router.get('/:name', function (req, res) {
  const name = req.params.name
  if (!name) {
    return res.status(400).send('Bad request.')
  } else {
    store.object.get(pub.utils.objectIdToIRI(name))
      .then(obj => {
        if (obj) {
          return res.json(pub.utils.toJSONLD(obj))
        }
        return res.status(404).send('Object not found')
      })
      .catch(err => {
        console.log(err)
        res.status(500).send()
      })
  }
})

module.exports = router