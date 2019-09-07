import fetch from '@/utils/fetch'
// {post} /shops/ Add a Shop
export function addShop(shopInfo) {
  return new Promise((resolve, reject) => {
    fetch({
      url: '/shops',
      method: 'post',
      data: shopInfo,
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
// {get} /shops Get list of Shops
export function getShops(owner, type) {
  return new Promise((resolve, reject) => {
    fetch({
      url: '/shops',
      method: 'get',
      params: {
        owner,
        type,
      },
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
// {put} /shops/:sid Update data of a Shop
export function updateShop(shopInfo) {
  return new Promise((resolve, reject) => {
    fetch({
      url: '/shops/' + shopInfo.shopId,
      method: 'put',
      data: shopInfo,
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
// {get} /shops/:sid/classes Get classes of a Shop
export function getClasses(shopId) {
  return new Promise((resolve, reject) => {
    fetch({
      url: '/shops/' + shopId + '/classes',
      method: 'get',
      params: {
        type: 'owner',
      },
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
