<template>
  <el-input placeholder="请输入内容" v-model="searchValue" class="input-with-select">
    <el-select class="choose-website" v-model="chooseWebsite" slot="prepend" placeholder="请选择小说网">
      <el-option v-for="item in chooseWebsiteOption" :label="item.title" :key="item.id" :value="item.id"></el-option>
    </el-select>
    <el-button slot="append" icon="el-icon-search" @click="_getBookAuthorSearch"></el-button>
  </el-input>
</template>

<script>
import {Input, Select, Option, Button} from 'element-ui'
import axios from 'axios'
import {webLibrary} from 'common/script/config'

export default {
  data () {
    return {
      searchValue: this.search,
      chooseWebsiteOption: webLibrary
    }
  },
  props: ['search', 'chooseWebsite'],
  methods: {
    _getBookAuthorSearch () {
      let _this = this
      axios.get('/search/getBookAuthorSearch', {
        params: {
          search: this.searchValue,
          type: this.chooseWebsite
        }
      }).then(response => {
        console.info('getBookAuthorSearch:', response.data, response.data.data)
        this.$emit('change-data', {key: 'bookList', value: response.data.data})
        this.$emit('change-data', {key: 'bookPage', value: response.data.page})
        this.$emit('change-data', {key: 'search', value: _this.searchValue})
        // this.$emit('change-data', {key: 'chooseWebsite', _this.chooseWebsiteValue})
      })
    }
  },
  components: {[Input.name]: Input, [Select.name]: Select, [Option.name]: Option, [Button.name]: Button}
}
</script>

<style scoped>
  .choose-website {
    width: 120px;
  }
  @media screen and (max-width: 768px) {
    .choose-website {
      width: 120px;
    }
  }
</style>
