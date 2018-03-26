import express from 'express'
import { loginCheck } from '../Controller/login'

const router = express.Router();

router.route('/')
  .put((req, res) => {
    loginCheck(req)
    .then((data) => {
      res.send(data)
    })
  })

module.exports = router;
