<template>
  <error-content code="404" :desc="$t('error.404')" :src="src"/>
</template>

<script>
import error404 from '@/assets/error-page/error-404.svg'
import errorContent from './error-content.vue'
export default {
  name: 'error_404',
  components: {
    errorContent
  },
  data () {
    return {
      src: error404
    }
  }
}
</script>
