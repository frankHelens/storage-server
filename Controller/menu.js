import { Menu, Dictionaries } from '../Model'
import { fetchRelation } from '../utils/api'

export const menuRelation = (data) => {
  const { menuId } = data.relationList
  return fetchRelation({
    model: Dictionaries,
    data: data.relationList
  })
  .then((relation) => {
    return Menu.findAll({
      attributes: ['id', 'label', 'parentId']
    })
    .then(res => {
      const menuId = res.map(item => {
        return {
          value: item.id,
          label: item.label,
          parentId: item.parentId || ''
        }
      })
      relation.data['menuId'] = menuId
      return relation
    })
  })
}
