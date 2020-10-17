<template>
  <div class="content">
    <div class="row">
      <div class="col-xl-3 col-lg-4 col-sm-6"
           v-for="(concert, index) in concerts">
        <ConcertCard :concert="concert">
        </ConcertCard>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import store from "@/store";
import { FETCH_CONCERTS } from "@/store/actions.type";
import { ConcertCard } from "@/components/index";

export default {
  components: {
    ConcertCard
  },
  methods: {
    loadConcerts(){
      store.dispatch(FETCH_CONCERTS)
    }
  },
  watch: {
  },
  computed:{
    ...mapGetters(['concerts'])
  },
  mounted(){
    this.loadConcerts()
  }
}
</script>
<style>
</style>
