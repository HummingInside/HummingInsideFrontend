<template>
  <div class="content">
    <div class="row">
      <div class="col-xl-3 col-lg-4 col-sm-6"
           v-for="(concert, index) in concerts">
        <ConcertCard
        :title="concert.title"
        :performer="concert.performer"
        :date="concert.date"
        :imgUrl="concert.imgUrl"
        :status="concert.status"
        :likesCount="concert.likesCount"
        >
        </ConcertCard>
      </div>
    </div>
  </div>
</template>
<script>

import {
  ConcertCard
} from "@/components/index";


export default {
  components: {
    ConcertCard,
  },
  data(){
    return{
      concerts: [
        {
          title: 'DMZPOP DRIVE IN CONCERT',
          performer: 'Psy',
          imgUrl: 'http://tkfile.yes24.com/upload2/perfblog/202009/20200911/20200911-37429_1.jpg/dims/quality/70/',
          date: '2020.10.09 / 18:00',
          status: 'UPCOMING',
          likesCount: 10
        },
        {
          title: 'Forestella Concert',
          performer: 'Forestella',
          imgUrl: 'http://tkfile.yes24.com/upload2/perfblog/202009/20200909/20200909-37516_11.jpg/dims/quality/70/',
          date: '2020.10.06 / 09:00',
          status: 'ON-AIR',
          likesCount: 30
        },
        {
          title: 'Christopher concert in Korea',
          performer: 'Chirstopher',
          imgUrl: 'http://tkfile.yes24.com/upload2/perfblog/202007/20200729/20200729-36086_1.jpg/dims/quality/70/',
          date: '2021.01.15 / 13:00',
          status: 'ENDED',
          likesCount: 1000
        },
        {
          title: '2020 Myungsub Choi Solo Concert',
          performer: 'Myungsub Choi',
          imgUrl: 'http://tkfile.yes24.com/upload2/perfblog/202008/20200818/20200818-37419_11.jpg/dims/quality/70/',
          date: '2020.12.31 / 20:00',
          status: 'UPCOMING',
          likesCount: 400
        },
        {
          title: 'Jiyoung Baek National Tour',
          performer: 'Jiyoung Baek',
          imgUrl: 'http://tkfile.yes24.com/upload2/perfblog/202008/20200826/20200826-37467_1.jpg/dims/quality/70/',
          date: '2020.11.28 / 18:00',
          status: 'ENDED',
          likesCount: 350
        },
        {
          title: 'Phantom Signer Concert',
          performer: 'KBS',
          imgUrl: 'http://tkfile.yes24.com/upload2/perfblog/202008/20200828/20200828-37463_1.jpg/dims/quality/70/',
          date: '2020.10.08 / 19:00',
          status: 'ON-AIR',
          likesCount: 20
        },
      ],
    }
  },
  computed:{
  },
  methods:{
  },
  mounted(){
  },
  beforeDestroy() {
  }
}
</script>
<style>
</style>
