import fetch from '@/utils/fetch'
// {post} /commodities/ Add a Commodity
export function addCommodity(commodityInfo) {
  return new Promise((resolve, reject) => {
    fetch({
      url: '/commodities',
      method: 'post',
      data: commodityInfo,
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
// {get} /commodities/ Get list of Commodities
export function getCommodities(owner) {
  return new Promise((resolve, reject) => {
    fetch({
      url: '/commodities',
      method: 'get',
      params: {
        type: 'owner',
        owner,
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
// {put} /commodities/:cid Update data of a Commodity
export function updateCommodity(commodityInfo) {
  return new Promise((resolve, reject) => {
    fetch({
      url: '/commodities/' + commodityInfo.id,
      method: 'put',
      data: commodityInfo,
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
