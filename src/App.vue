<template>
  <div id="app">
    <Navbar/>

    <transition name="fade">
      <router-view></router-view>
    </transition>
    <router-view name="modal"></router-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Navbar from '@/components/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style lang="scss" scoped>
#app {
  padding: 10px;
}

// transitions
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.25s;
}

.fade-enter-active {
  transition-delay: 0.25s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
