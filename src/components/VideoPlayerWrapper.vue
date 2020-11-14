<template>
    <VideoPlayer class="vjs-custom-skin" :options="playerOptions" :stream="stream">
    </VideoPlayer>
</template>

<script>
    import {videoPlayer} from "../vue-video-player"
    import "../vue-video-player/custom-theme.css"

    export default {
        name: "VideoPlayerWrapper",
        components: {
            VideoPlayer: videoPlayer,
        },
        props: {
            stream: {
                default: null,
            }
        },
        data() {
            return {
                playerOptions: {
                    height: '706px',
                    autoplay: true,
                    muted: true,
                    language: 'en',
                    playbackRates: [0.7, 1.0, 1.5, 2.0],
                    sources: [{
                        type: "video/mp4",
                        // // mp4
                        src: "http://vjs.zencdn.net/v/oceans.mp4",
                        // webm
                        // src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
                    }],
                    poster: "https://surmon-china.github.io/vue-quill-editor/static/images/surmon-1.jpg",
                }
            }
        },
        created() {
        }
    }
</script>

<style scoped>

</style>