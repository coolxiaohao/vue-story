<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <!--@on-lang-change="setLocal" 配合组件click自定义绑定组件点击事件，:lang="local"传值给组件使用-->
<!--    <language v-if="$config.useI18n" @on-lang-change="setLocal"  style="margin-right: 10px;" :lang="local"/>-->
<!--    <Button type="primary" long>取消</Button>-->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
// import Language from "@/components/Language";
// import { mapMutations, mapActions } from 'vuex' //引用vuex mapMutations
export default {
  name: 'home',
  components: {
    // Language,
    HelloWorld
  },
  methods:{
    // ...mapMutations([
    //   'setLocal',
    // ]),
    // ...mapActions([
      // 'handleLogin',
      // 'getUnreadMessageCount'
    // ]),
  },
  computed:{
    // local(){
    //   return this.$store.state.base.local
    // }
  },

}
</script>
