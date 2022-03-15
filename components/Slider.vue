<template>
  <div class="container">
    <div class="carousel" @click="$refs['my-modal'].show()">
      <b-carousel
        id="carousel-1"
        :interval="0"
        fade
        indicators
        background="#eee"
        img-width="1024"
        img-height="480"
        style="text-shadow: 1px 1px 2px #333;"
        v-model="slide"
      >
        <b-carousel-slide
          v-for="item in getImages"
          :caption="item.name"
          :img-src="item.src"
          :text="item.desc"
          :key="item.id"
        ></b-carousel-slide>
      </b-carousel>
    </div>
    <b-form @submit="onSubmit">
      <b-form-file
        size="sm"
        accept="image/*"
        v-model="form.file"
      ></b-form-file>
      <b-form-group
        id="input-group-1"
        label=""
        label-for="input-1"
        description=""
      >
        <b-form-input
          id="input-1"
          v-model="form.name"
          type="text"
          placeholder="Name"
        ></b-form-input>
        <b-form-input
          id="input-2"
          v-model="form.desc"
          type="text"
          placeholder="Description"
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
    <b-modal ref="my-modal" size="xl" hide-header hide-footer>
      <div class="d-block text-center">
        <b-carousel
          :interval="4000"
          controls
          background="#eee"
          img-width="1024"
          img-height="480"
          style="text-shadow: 1px 1px 2px #333;"
          v-model="slide"
        >
          <b-carousel-slide
            v-for="item in getImages"
            :img-src="item.src"
            :key="item.id"
          ></b-carousel-slide>
        </b-carousel>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'Slider',
  data() {
    return {
      slide: 0,
      form: {
        desc: '',
        name: '',
        file: null,
      },
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
    showModal() {
      this.$refs['my-modal'].show();
    },
    hideModal() {
      this.$refs['my-modal'].hide();
    },
    onSubmit(e) {
      e.preventDefault();

      if (Object.values(this.form).some(item => item === '')) {
        alert('Fill in all the fields, please!');
        return;
      }

      const reader = new FileReader();
      const that = this;

      reader.onload = (function (theFile) {
        return function (e) {
          that.$store.dispatch('slider/pushImages', {
            src: e.target.result,
            name: that.form.name,
            desc: that.form.desc,
          });
        };
      })(that.form.file);
      if (that.form.file) {
        reader.readAsDataURL(that.form.file);
      }
      e.target.reset();
    },
  },

};
</script>

<style scoped>
.container {
  max-width: 480px;
  margin: 0 auto;
}
</style>
