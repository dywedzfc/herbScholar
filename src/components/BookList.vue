<template>
  <div class="bookshelf" ref="bookshelf">
    <div class="card-item" v-for="(item, index) in bookList" :key="index" @click="openBookDetails(item)">
      <img :src="item.img" class="card-image">
      <div class="card-body">
        <h3 v-text="item.name"></h3>
        <p class="author" v-text="item.author"></p>
        <p class="type" v-text="item.type"></p>
        <p class="desc" v-text="descLength(item.desc)"></p>
      </div>
    </div>
    <div v-if="bookList.length % 10 === 0" @click="handlePullDownLoading">更多</div>
  </div>
</template>

<script>
import {Card} from 'element-ui'
import axios from 'axios'

export default {
  name: 'BookList',
  data () {
    return {}
  },
  props: [
    'bookList', 'page', 'search', 'chooseWebsite'
  ],
  methods: {
    descLength (desc) {
      if (window.outerWidth > 768) {
        return desc.length > 60 ? desc.substring(0, 60) + '...' : desc
      } else {
        return desc.length > 40 ? desc.substring(0, 40) + '...' : desc
      }
    },
    openBookDetails (item) {
      // this.$router.push({path: '/bookDetails'})
      console.info('openBookDetails:', item)
      axios.get('/search/getBookSearch', {
        params: {
          url: item.url + item.book,
          type: this.chooseWebsite
        }
      }).then(response => {
        console.info('getBookSearch:', response.data)
        // this.$emit('append-list', response.data.data)
        // this.$emit('change-data', {key: 'bookPage', value: response.data.page})
      })
    },
    handlePullDownLoading () {
      axios.get('/search/getBookAuthorSearch', {
        params: {
          search: this.search,
          page: this.page,
          type: this.chooseWebsite
        }
      }).then(response => {
        console.info('getBookAuthorSearch:', response.data)
        this.$emit('append-list', response.data.data)
        this.$emit('change-data', {key: 'bookPage', value: response.data.page})
      })
    }
  },
  components: {
    [Card.name]: Card
  }
}
</script>

<style scoped>
  .bookshelf {
    padding: 0 20px;
  }
  .card-item {
    position: relative;
    height: 171px;
    padding-top: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid #ebeef5;
    box-sizing: border-box;
  }
  .card-image {
    position: absolute;
    top: 15px;
    left: 0;
    display: inline-block;
    width: 105px;
    height: 140px;
  }
  .card-body {
    width: calc(100% - 105px);
    height: 100%;
    margin-left: 105px;
    padding-left: 15px;
    box-sizing: border-box;
  }
  .card-body h3 {
    line-height: 1.4em;
    margin: 0;
    font-size: 20px;
  }
  .card-body p {
    line-height: 1.5em;
    margin: 0;
    font-size: 16px;
  }
  .card-body .desc {
    line-height: 1.5em;
    font-size: 14px;
  }
  @media screen and (max-width: 768px) {
    .card-item {
      height: 151px;
    }
    .card-image {
      width: 90px;
      height: 120px;
    }
    .card-body {
      width: calc(100% - 90px);
      margin-left: 90px;
      padding-left: 10px;
    }
    .card-body h3 {
      line-height: 1.4em;
      font-size: 18px;
    }
    .card-body p {
      line-height: 1.5em;
      font-size: 14px;
    }
    .card-body .desc   {
      line-height: 1.6em;
      font-size: 12px;
    }
  }
</style>
