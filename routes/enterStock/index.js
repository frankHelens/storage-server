import express from 'express'

import EnterStock from '../../Model/enterStock'

import detail from './detail'

import { fetchList } from '../../utils/api'

const router = express.Router();

router.route('/')
  .get((req, res) => {
    fetchList({
      model: EnterStock,
      data: req.query
    })
    .then((data) => {
      res.send(data)
    })
  })

// router.route('/:id')
router.use('/detail', detail)

module.exports = router;
