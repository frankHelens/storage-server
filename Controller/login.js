import { User } from '../Model'
import { Message, signToken } from '../utils/common'

export const loginCheck = ({body}) => {
  const { loginName, loginPassword } = body
  return User.findAll({
    where: {
      loginName
    }
  })
  .then((nameRes) => {
    if (nameRes.length) {
      return User.findAll({
        where: {
          loginName,
          loginPassword
        }
      })
      .then(res => {
        if (res.length) {
          const { id, loginName, name, loginPassword } = res[0]
          const userMessage = {
            userId: id,
            loginName,
            realName: name,
            loginPassword
          }
          return Message(0, {
            token: signToken(userMessage)
          }, '登陆成功')
        } else{
          return Message(-1, {}, '密码错误！')
        }
      })
    } else {
      return Message(-1, {}, '用户不存在!')
    }
  })
}
