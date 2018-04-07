import express from 'express'
import { systemRelation } from '../Controller/system'

const router = express.Router();

router.route('/relation')
  .get((req, res) => {
    systemRelation(req.query)
    .then(data => {
      res.send(data)
    })
  })

module.exports = router;
