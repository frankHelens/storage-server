import express from 'express'
import { DeliveryStock } from '../../Model'
import detail from './detail'
import { fetchList } from '../../utils/api'

const router = express.Router();

router.route('/')
  .get((req, res) => {
    fetchList({
      model: DeliveryStock,
      data: req.query
    })
    .then((data) => {
      res.send(data)
    })
  })
// router.route('/:id')
router.use('/detail', detail)

module.exports = router;
