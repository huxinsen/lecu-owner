import fetch from '@/utils/fetch'
// {get} /lbs/location Get Location Info
export function getLocation(address) {
  return new Promise((resolve, reject) => {
    fetch({
      url: '/lbs/location',
      method: 'get',
      params: {
        address,
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
