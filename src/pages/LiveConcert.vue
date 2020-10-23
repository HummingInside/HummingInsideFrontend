<template>
    <div class="content">
        <div class="d-flex text-left shadow" style="background: white;border-radius: 6px">
            <div class="flex-grow-1 flex-shrink-1 d-flex flex-column" style="border-top-left-radius: 4px; border-bottom-left-radius: 4px;border-right:1px solid rgb(229,229,229);">
                <div class="flex-grow-1 d-flex" style="overflow-y: hidden">
                    <div class="w-100" style="background: black; border-top-left-radius: 6px">
                        <video
                                autoplay playsinline muted
                                id="my-video"
                                style="width: 100%;height: 706px;object-fit: contain;"
                        ></video>
                    </div>
                </div>
                <div style="border-bottom-left-radius: 4px;padding: 15px 25px;">
                    <p class="font-dark" style="font-size: 18px;font-weight: 600;">Christopher</p>
                    <p class="font-dark" style="font-size: 14px;font-weight: 600;">Christopher concert in Korea</p>
                </div>
            </div>
            <LiveChat></LiveChat>
        </div>
    </div>
</template>
<script>
    import {
        BaseInput
    } from "@/components/index";
    import LiveChat from "../components/LiveChat";

    export default {
        components: {
            LiveChat,
            BaseInput,
        },
        data() {
            return {
                currentChatMessage: "",
            };
        },
        computed:{
        },
        methods:{
        },
        beforeDestroy() {
        },
        created() {
        },
        mounted(){
            const USER_MEDIA_CONF = {
                video: true,
                audio: true,
            }
            navigator.getUserMedia(
                USER_MEDIA_CONF,
                stream => {
                    document.getElementById("my-video").srcObject = stream;
                },
                error => {
                    alert("비디오, 오디오 스트림 획득에 실패했습니다.");
                }
            );
        },
    }
</script>
<style>
    .font-dark{
        color: rgb(100,100,100);
    }
</style>
