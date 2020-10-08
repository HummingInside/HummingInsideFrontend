<template>
  <div class="content">
    <div class="row">
      <div class="col-11" id="custom-header">
        <div class="row title">
        {{ title }}
        </div>
        <div class="row" id="date">
          {{ date }}
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-5 mb-5">
        <img id="concert-img" :src="img">
      </div>
      <div class="col-lg-7">
        <div class="row desc-row">
          <div class="col-lg-3 font-weight-bold text-left">Performer</div>
          <div class="col-lg-7 text-left desc-content">{{ performer }}</div>
        </div>
        <div class="row desc-row">
          <div class="col-lg-3 font-weight-bold text-left">Show Time</div>
          <div class="col-lg-7 text-left desc-content">{{ time }}</div>
        </div>
        <div class="row desc-row">
          <div class="col-lg-3 font-weight-bold text-left">Remaining Seat</div>
          <div class="col-lg-7 text-left desc-content">{{ maxAudience }}</div>
        </div>
        <div class="row desc-row">
          <div class="col-lg-3 font-weight-bold text-left">Charge</div>
          <div class="col-lg-7 text-left desc-content">{{ price }} ￦</div>
        </div>
        <div class="row desc-row">
          <div class="col-lg-3 font-weight-bold text-left">Likes</div>
          <div class="col-lg-7 text-left desc-content">{{ likesCount }}</div>
        </div>
        <div class="row desc-row">
          <div class="col-lg-3 font-weight-bold text-left">Status</div>
          <div class="col-lg-7 text-left desc-content">{{ status }}</div>
        </div>
        <div class="row desc-row">
          <div class="col-lg-3 font-weight-bold text-left">Description</div>
          <div class="col-lg-7 text-left desc-content">{{ description }}</div>
        </div>
      </div>
    </div>
    <div class="row desc-row mt-1">
      <div class="col-lg-12 font-weight-bold">
        <base-button class="big-button blue-gradation">Reservation</base-button>
        <base-button class="small-button pink-gradation">🤍</base-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      title: "The play, <History Boys>",
      performer: "Daesuk Oh / Youngkyu Cho / Jungbok Park",
      date: "2020.10.16 / 18:00",
      description: 'The story about \'Learning\' and \'Maturity\' told to everyone in this era!\n' +
              'The play <History Boys> is the masterpiece of Alan Burnett, a master of the British performing arts, and won three honors at the Olivier Awards in the UK in 2005 and the Tony Awards in the US in 2006.',
      maxAudience: '150 / 2000',
      price: '35,000',
      likesCount: 20,
      status: "Upcoming",
      img: 'http://tkfile.yes24.com/upload2/PerfBlog/202009/20200915/20200915-37361_01.jpg',
      time: '3 hours'
    }
  },
  computed: {},
  methods: {},
  mounted() {},
  beforeDestroy() {}
}
</script>
<style scoped="scss">
  @import url(http://fonts.googleapis.com/earlyaccess/notosanskr.css);

  .content {
    font-family: 'Noto Sans KR', sans-serif;
  }
  .font-weight-bold {
    font-weight: 800 !important;
    font-size: 1rem;
  }
  #concert-img {
    box-shadow: 0 2px 22px 0 rgba(0, 0, 0, 0.1), 0 4px 20px 0 rgba(0, 0, 0, 0.15);
  }
  #custom-header{
    margin-left: 13px;
    border-bottom: 2px solid #333;
    margin-bottom: 30px;
  }
  #date{
    margin-top: 15px;
    margin-bottom: 21px;
    margin-left: -5px;
    font-size: 1rem;
  }
  .big-button {
    padding: 1rem 5rem;
    font-size: 1.1rem;
  }
  .small-button {
    margin-left: 0.5rem;
    padding: 1rem 1rem;
    font-size: 1.1rem;
  }
  .pink-gradation {
    background-image: linear-gradient(to bottom left, pink, deeppink) !important;
  }
  .blue-gradation {
    background-image: linear-gradient(to bottom left, dodgerblue, white) !important;
  }
  .title{
    color: #333;
    font-size: 2rem;
  }
  .desc-row{
    margin-bottom: 0.5rem;
  }
  .desc-content{
    line-height: 1.7rem;
  }
</style>
