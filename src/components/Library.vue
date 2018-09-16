<template>
  <div id="library">
    <search-bar :search="search" :choose-website="chooseWebsite" @change-data="changeData"></search-bar>
    <div class="library-body">
      <book-list v-if="bookList.length && bookList.length > 0" :search="search" :choose-website="chooseWebsite" :book-list="bookList" :page="bookPage" @append-list="appendList" @change-data="changeData"></book-list>
      <div v-else>未找到数据</div>
    </div>
  </div>
</template>

<script>
import SearchBar from 'components/SearchBar'
import BookList from 'components/BookList'

export default {
  name: 'home',
  data () {
    return {
      search: '',
      chooseWebsite: '88dus',
      bookList: [],
      bookPage: 1
    }
  },
  methods: {
    appendList (data) {
      this.bookList.push(...data)
    },
    changeData (item) {
      this[item.key] = item.value
      console.info('changeData:', this[item.key], item.key)
    }
  },
  components: {
    'search-bar': SearchBar,
    'book-list': BookList
  }
}
</script>

<style scoped>
  #library {
    height: 100%;
  }
  .library-body {
    height: calc(100% - 40px);
    overflow: auto;
  }
</style>
