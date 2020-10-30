<template>
    <div class="content">
        <div class="d-flex text-left shadow" style="background: white;border-radius: 6px">
            <div class="flex-grow-1 flex-shrink-1 d-flex flex-column" style="border-top-left-radius: 4px; border-bottom-left-radius: 4px;border-right:1px solid rgb(229,229,229);">
                <div class="flex-grow-1 d-flex" style="overflow-y: hidden">
                    <div class="w-100" style="background: black; border-top-left-radius: 6px" ref="videoWrapper">
<!--                        <VideoPlayer class="vjs-custom-skin" :options="playerOptions">-->
<!--                        </VideoPlayer>-->
                        <VideoPlayerWrapper></VideoPlayerWrapper>
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
    import {BaseInput} from "@/components/index";
    import LiveChat from "../components/LiveChat";
    import { USER_MEDIA_CONF } from "@/common/config";
    import {videoPlayer} from "../vue-video-player"
    import "../vue-video-player/custom-theme.css"
    import VideoPlayerWrapper from "../components/VideoPlayerWrapper";

    export default {
        components: {
            VideoPlayerWrapper,
            LiveChat,
            BaseInput,
            VideoPlayer: videoPlayer,
        },
        data() {
            return {
                currentChatMessage: "",
                playerOptions: {
                    height: '706px',
                    autoplay: true,
                    muted: true,
                    language: 'en',
                    playbackRates: [0.7, 1.0, 1.5, 2.0],
                    sources: [{
                        type: "video/mp4",
                        // mp4
                        src: "http://vjs.zencdn.net/v/oceans.mp4",
                        // webm
                        // src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
                    }],
                    poster: "https://surmon-china.github.io/vue-quill-editor/static/images/surmon-1.jpg",
                }

                // options: {
                //
                //     // muted: true,
                //     // language: 'en',
                //     // playbackRates: [0.7, 1.0, 1.5, 2.0],
                //     // sources: [{
                //     //     type: "video/mp4",
                //     //     src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
                //     // }],
                //     // poster: "/static/images/author.jpg",
                //
                //     autoplay: true,
                //     controls: true,
                //     sources: [
                //         {
                //             src:
                //                 "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm",
                //             type: "video/mp4"
                //         }
                //     ]
                // }
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
            navigator.getUserMedia(
                USER_MEDIA_CONF,
                stream => {
                    // this.$refs.videoPlayer.srcObject = stream;

                    // this.player = videojs(this.$refs.videoPlayer, this.options)
                },
                error => {
                    alert("비디오, 오디오 스트림 획득에 실패했습니다.");
                }
            );
        },
    }
</script>
<style scoped>
    .font-dark{
        color: rgb(100,100,100);
    }

</style>
