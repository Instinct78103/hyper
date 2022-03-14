<template>
  <div class="container">
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="item in getImages" :key="item.id">
        <h3 class="medium">{{ item.name }}</h3>
        <img :src="item.src" :alt="item.name">
      </el-carousel-item>
    </el-carousel>
    <input type="file" @change="handlePreview">
  </div>
</template>

<script>

export default {
  name: 'Slider',

  data() {
    return {
      file: '',
    };
  },

  created() {
    this.$store.dispatch('slider/fetchList');
  },

  computed: {
    getImages() {
      return this.$store.getters['slider/get_list'];
    },
  },

  methods: {
    readFile() {
      console.log(this.fileList);
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },

    handlePreview(e) {

      const file = e.target.files[0];

      const reader = new FileReader();
      const that = this;

      reader.onload = (function (theFile) {
        return function (e) {
          that.$store.dispatch('slider/pushImages', {
            src: e.target.result,
            name: 'Hardcoded Name'
          });
        };
      })(file);

      reader.readAsDataURL(e.target.files[0]);
    },

    handleExceed(files, fileList) {
      this.$message.warning(`The limit is 3, you selected ${files.length} files this time, add up to ${files.length + fileList.length} totally`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`Cancel the transfert of ${file.name} ?`);
    },
  },

};
</script>

<style scoped>
.container {
  max-width: 992px;
  margin: 0 auto;
}
</style>
