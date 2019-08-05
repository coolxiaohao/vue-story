import axios from 'axios'
import {Message} from 'iview'
import store from '@/store'
//webpack.config.js
import {getToken} from '@/utils'

// create an axios instance
const service = axios.create({
    baseURL: '/api', //使用代理yarn remove [package]
    withCredentials: true, // send cookies when cross-domain requests
    timeout: 3000 // request timeout
})

// request interceptor
service.interceptors.request.use(
    config => {
        // do something before request is sent
        if (store.getters.token) {
            // let each request carry token --['X-Token'] as a custom key.
            config.headers['X-Token'] = getToken()
        }
        // config.timeout=1000
        return config
    },
    error => {
        // do something with request error
        // console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get information such as headers or status 如果您想获得诸如头信息或状态信息
     * Please return  response => response 请返回response => response
     */

    /**
     * Determine the request status by custom code 通过自定义代码确定请求状态
     * Here is just an example 这里只是一个例子
     * You can also judge the status by HTTP Status Code. 您还可以通过HTTP状态代码来判断状态。
     */
    response => {
        const res = response.data
        // if the custom code is not 20000, it is judged as an error.
        if (res.code !== 200) {
            Message.error(res.msg || 'error');
            if (res.code === 401) {
                // this.next({name:'401'})
                this.$router.push('/401');
            } else if (res.code === 404) {
                this.$router.push('/404');
            } else if (res.code === 500) {
                this.$router.push('/500');
            }else if (res.code ===403) {
                // to re-login
                Message.error(this.$t('login.land-expiration'));
                this.$router.replace({name:this.$store.state.app});
            }
            return Promise.reject(res.msg || 'error')
        } else {
            return res;
        }
    },
    error => {
        Message.error(error.message)
        return Promise.reject(error)
    }
)

export default service
