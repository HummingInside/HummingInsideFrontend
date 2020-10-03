export default {
  install(Vue) {
    let app = new Vue({
      data() {
        return {
        }
      },
      methods: {
        getDocClasses() {
          return document.body.classList
        },
      }
    });
  }
}
