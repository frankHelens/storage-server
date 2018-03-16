import express from 'express'
//引入数据库模块

import { Dictionaries } from '../Model'
import { fetchRelation } from '../utils/api'

const router = express.Router();

router.route('/')
  .get((req, res) => {
    fetchRelation({
      model: Dictionaries,
      data: req.query.relationList
    })
    .then((data) => {
      res.send(data)
    })
  })

module.exports = router;