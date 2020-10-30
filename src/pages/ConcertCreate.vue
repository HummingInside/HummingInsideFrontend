<template>
  <ConcertForm :concert="concert"></ConcertForm>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";
import {RESET_CONCERT} from "@/store/actions.type";
import { ConcertForm } from "@/components/index";

export default {
  components: { ConcertForm },
  methods: {
    resetConcert(){
      store.dispatch(RESET_CONCERT)
    }
  },
  computed: {
    ...mapGetters(['concert'])
  },
  created() {
    this.resetConcert()
  }
}
</script>
