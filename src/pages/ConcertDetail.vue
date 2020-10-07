<template>
    <div class="content">
        <div class="row">
            <card
            :title="title"
            :sub-title="description"
            />
        </div>
    </div>
</template>
<script>

    import {
        Card
    } from "@/components/index";


    export default {
        components: {
            Card,
        },
        data(){
            return{
                title: '콘서트 제목',
                performer: '나훈아',
                description: '설명',
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
