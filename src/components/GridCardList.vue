<template>
    <div class="content">
        <div class="row">
            <div class="col-lg-3"
                 v-for="(concert, index) in concerts">
                <card
                        type="chart"
                        cardCol
                        title="Korea Again"
                        sub-title="Na Hoon-Ah          2020.10.1"
                >
                    <template slot="image">
                        <img src="data:image/jpeg;base64,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">
                    </template>
                </card>
            </div>
        </div>
    </div>
</template>
<script>

    import {Card} from "@/components/index";


    export default {
        components: {
            Card,
        },
        data(){
            return{
                concerts: [
                    {
                    },
                    {
                    },
                    {
                    },
                    {
                    },
                    {
                    },
                    {
                    },
                    {
                    },
                    {
                    },
                    {
                    },
                    {
                    },
                    {
                    },
                    {
                    },
                    {
                    },
                    {
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
    }
</script>
<style>
</style>
