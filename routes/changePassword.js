import express from 'express'
import { User } from '../Model'
import { fetchUpdate } from '../utils/api'

const router = express.Router();

router.route('/')
  .put((req, res) => {
    const { loginPassword, userId } = req.decode
    const { oldPassword, newPassword } = req.body
    if (loginPassword === oldPassword) {
      fetchUpdate({
        model: User,
        id: userId,
        data: {
          loginPassword: newPassword
        }
      })
      .then(data => {
        res.send(data)
      })  
    } else {
      res.send({
        code: -1,
        data: {},
        message: '旧密码错误'
      })
    }
  })

module.exports = router;
