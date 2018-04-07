import { Menu, Dictionaries, Role } from '../Model'
import { fetchRelation } from '../utils/api'

export const systemRelation = (data) => {
  const { menuId } = data.relationList
  // 字典表
  return fetchRelation({
    model: Dictionaries,
    data: data.relationList
  })
  .then((relation) => {
    // 菜单
    return Menu.findAll({
      attributes: ['id', 'label', 'parentId']
    })
    .then(res => {
      const menuId = res.map(item => {
        return {
          value: item.id,
          label: item.label,
          parentId: item.parentId !== null ? item.parentId : ''
        }
      })
      relation.data['menuId'] = menuId
      // 角色
      return Role.findAll({
        attributes: ['id', 'roleName']
      })
      .then(roleRes => {
        const roleId = roleRes.map(item => {
          return {
            value: item.id,
            label: item.roleName
          }
        })
        relation.data['roleId'] = roleId
        return relation
      })
    })
  })
}
