export default [
    {
        path: '/404',
        name: '404',
        component: ()=>import('@/views/error-page/404.vue'),
        meta: {
            title: "404",
            icon:"md-outlet",
            hideInMenu:true
        }
    },
    {
        path: '/admin/login',
        name: 'admin_login',
        meta:{
            // title: 'admin_login',
            hideInMenu:true
        },
        component:()=>import('@/views/admin/login/login.vue'),

    },
]