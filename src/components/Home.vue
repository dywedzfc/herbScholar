<template>
  <div id="home">
    <search-bar></search-bar>
  </div>
</template>

<script>
import SearchBar from 'components/SearchBar'

export default {
  name: 'Home',
  data () {
    return {}
  },
  components: {
    'search-bar': SearchBar
  }
}
</script>

<style scoped>

</style>
