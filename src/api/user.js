import request from '@/plugins/request'

export function login(data) {
    return request({
        url: '/base/login',
        method: 'post',
        params:{username:data.username,
            password:data.password,model:data.model,form:data.form}
    })
}

export function getInfo(token) {
    return request({
        url: '/admin/info',
        method: 'get',
        params: { token }
    })
}

export function logout() {
    return request({
        url: '/user/logout',
        method: 'post'
    })
}
