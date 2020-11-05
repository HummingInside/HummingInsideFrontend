<template>
  <ConcertForm :concert="concert"></ConcertForm>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";
import {FETCH_CONCERT} from "@/store/actions.type";
import { ConcertForm } from "@/components/index";
import {state} from "@/store/concert.module";

export default {
  components: { ConcertForm },
  methods: {
    loadConcert(){
      store.dispatch(FETCH_CONCERT, this.$route.params.pk)
      console.log(state.concert)
    },
  },
  computed: {
    ...mapGetters(['concert'])
  },
  created() {
    this.loadConcert()
  }
}
</script>
