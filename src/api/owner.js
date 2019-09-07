import fetch from '@/utils/fetch'
// {post} /session/:type Login
export function login(username, password) {
  return fetch({
    url: '/session/owner',
    method: 'post',
    data: {
      username,
      password,
    },
  })
}
// {post} /owners Add an utils/
export function signUp(ownerInfo) {
  return new Promise((resolve, reject) => {
    fetch({
      url: '/owners',
      method: 'post',
      data: ownerInfo,
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
