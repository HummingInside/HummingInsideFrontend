import Vue from 'vue'
import Vuex from 'vuex'

import auth from "./auth.module";
import concert from "./concert.module"
import mypage from "./mypage.module"

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        auth,
        concert,
        mypage
    }
});
