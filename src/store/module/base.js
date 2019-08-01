import {
    localSave,
    localRead,
    setToken
} from '@/utils' //引用之前写好的本地储存读写操作的两个方法
import {login} from '@/api/user'
//请查看vuex官方文档 https://vuex.vuejs.org/zh/guide/state.html
export default {
    state:{ //单一状态树
        local: localRead('local'),
        access: '',
    },
    mutations:{ //变更状态 必須為同步
        setLocal (state, lang) {
            //存入本地储存
            localSave('local', lang)
            //立即更新
            state.local = lang
        },
    },
    actions:{ //异步发行
        login({commit}, userInfo) {
            const { username, password,form,model } = userInfo
            return new Promise((resolve, reject) => {
                login({ username: username.trim(), password: password,form:form,model:model }).then(response => {
                    const { data } = response;
                    commit('SET_TOKEN', data.token)
                    setToken(data.token)
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
    }
}
// const state = {
    // token: getToken(),
    // local: localRead('local'),
    // name: '',
    // avatar: '',
    // introduction: '',
    // roles: []
// }
// console.log(state)
// const mutations = {
//     SET_TOKEN: (state, token) => {
//         state.token = token
//     },
//     // SET_INTRODUCTION: (state, introduction) => {
//     //     state.introduction = introduction
//     // },
//     SET_NAME: (state, name) => {
//         state.name = name
//     },
//     setLocal (state, lang) {
//         console.log(1111234564687642);
//         localSave('local', lang)
//         state.local = lang
//     },
    // SET_AVATAR: (state, avatar) => {
    //     state.avatar = avatar
    // },
    // SET_ROLES: (state, roles) => {
    //     state.roles = roles
    // }
// }

/*const actions = {
    // base login
    login({ commit }, userInfo) {
        const { username, password,form,model } = userInfo
        return new Promise((resolve, reject) => {
            login({ username: username.trim(), password: password,form:form,model:model }).then(response => {
                const { data } = response;
                commit('SET_TOKEN', data.token)
                setToken(data.token)
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // get user info
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            getInfo(state.token).then(response => {
                const { data } = response
                if (!data) {
                    reject('Verification failed, please Login again.')
                }
                // console.log(data)
                // const { roles, adminName, avatar, introduction } = data

                // roles must be a non-empty array
                // if (!roles || roles.length <= 0) {
                //   reject('getInfo: roles must be a non-null array!')
                // }

                // commit('SET_ROLES', ["routers"])
                commit('SET_NAME', data.adminName)
                commit('SET_AVATAR', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')
                commit('SET_INTRODUCTION', 'I am a super administrator')
                console.log(state);
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // user logout
    logout({ commit, state }) {
        return new Promise((resolve, reject) => {
            logout(state.token).then(() => {
                commit('SET_TOKEN', '')
                // commit('SET_ROLES', [])
                removeToken()
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            commit('SET_TOKEN', '')
            // commit('SET_ROLES', [])
            removeToken()
            resolve()
        })
    },

    // Dynamically modify permissions
    // changeRoles({ commit, dispatch }, role) {
    //     return new Promise(async resolve => {
    //         const token = role + '-token'
    //         commit('SET_TOKEN', token)
    //         setToken(token)
    //         const { roles } = await dispatch('getInfo')
    //         resetRouter()
    //         // generate accessible routes map based on roles
    //         const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    //
    //         // dynamically add accessible routes
    //         router.addRoutes(accessRoutes)
    //
    //         resolve()
    //     })
    // }
}*/

// export default {
//     namespaced: true,
//     state,
//     mutations,
//     actions
// }
