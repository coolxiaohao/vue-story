import Admin_Login from '@/views/admin/login/login'
import error404 from '@/views/error-page/404.vue'
import error401 from '@/views/error-page/401.vue'
import error500 from '@/views/error-page/500.vue'
import Main from '_c/main'
// import Vue from  'vue'
// import Router from "vue-router";
/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */
//记得加上前台登陆的路由 以及前端主页的路由
export default [
    {
        path: '/admin/login',
        name: 'admin_login',
        meta: {
            // title: 'admin_login',
            hideInMenu: true
        },
        component: Admin_Login,
    },
    {
        path: '/',
        name: 'admin_index',
        redirect: '/admin/index',
        component: Main,
        meta: {
            icon: 'md-home',
            title: "首页",
            notCache: true
        },
        children: [
            {
                path: '/admin/index',
                name: 'admin_index', //name 一定要对应默认的
                meta: {
                    // hideInMenu: true,
                    icon: 'md-home',
                    title: '首页',
                    notCache: true,
                },
                component: () => import('@/views/admin')
            },
        ]
    },
    {
        path: '/admin/index/list',
        name: 'admin_model',
        redirect: '/admin/index/list',
        component: Main,
        meta: {
            // hideInMenu: true,
            icon: 'md-ionitron',
            title: "管理员",
            notCache: true
        },
        children: [
            {
                path:'/admin/index/list',
                name: 'admin_index_list',
                meta: {
                    icon: 'md-people',
                    title: '管理员列表',
                    notCache: true,
                },
                component: () => import('@/views/admin/admin-list')
            },
            // {
            //     path:'/admin/index/list2',
            //     name: 'admin_index_list2',
            //     meta: {
            //         icon: 'md-people',
            //         title: '管理员列表2',
            //         notCache: true,
            //     },
            //     component: () => import('@/views/admin/admin-list')
            // }
        ]
    },
    {
        path: '/error_page',
        name: 'error_page',
        redirect: '/error_page',
        meta: {
            title: "错误页面",
            icon: 'md-document',
            hideInMenu: true
        },
        component: () => import('@/App.vue'),
        children: [
            {
                path: '/404',
                name: '404',
                component: error404,
                meta: {
                    title: "404",
                    icon: "md-outlet"
                }
            },
            {
                path: '/401',
                title: '401',
                name: '401',
                component: error401,
                meta: {
                    title: "401",
                    icon: 'md-planet'
                }
            },
            {
                path: '/500',
                title: '500',
                name: '500',
                component: error500,
                meta: {
                    title: "500",
                    icon: 'ios-paper-plane'
                }
            }
        ]
    },
]