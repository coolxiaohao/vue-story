import request from '@/plugins/request'

export function login(data) {
    return request({
        url: '/base/login',
        method: 'post',
        params: {
            username: data.username,
            password: data.password, model: data.model, form: data.form
        }
    })
}

export const getAdminInfo = (token) => {
    return request({
        url: '/admin/getAdminInfo',
        method: 'get',
        params: {
            token: token,
        }
    })
}

export const logout = (token) => {
    return request({
        url: '/base/logout',
        method: 'post'
    })
}

// export function getInfo(token) {
//     return request({
//         url: '/routers/info',
//         method: 'get',
//         params: {token}
//     })
// }
