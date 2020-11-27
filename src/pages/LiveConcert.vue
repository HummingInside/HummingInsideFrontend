<template>
    <div class="content">
        <div class="d-flex text-left shadow" style="background: white;border-radius: 6px">
            <div class="flex-grow-1 flex-shrink-1 d-flex flex-column" style="border-top-left-radius: 4px; border-bottom-left-radius: 4px;border-right:1px solid rgb(229,229,229);">
                <div class="flex-grow-1 d-flex" style="overflow-y: hidden">
                    <div class="w-100" style="background: black; border-top-left-radius: 6px" ref="videoWrapper">
                        <VideoPlayerWrapper :stream="stream"></VideoPlayerWrapper>
                    </div>
                </div>
                <div style="border-bottom-left-radius: 4px;padding: 15px 25px;">
                    <p class="font-dark" style="font-size: 18px;font-weight: 600;">{{ concert.performer }}</p>
                    <p class="font-dark" style="font-size: 14px;font-weight: 600;">{{ concert.description }}</p>
                </div>
            </div>
            <LiveChat :isPerformer="isPerformer"></LiveChat>
        </div>
    </div>
</template>
<script>
    import {BaseInput} from "@/components/index";
    import LiveChat from "../components/LiveChat";
    import {videoPlayer} from "../vue-video-player"
    import "../vue-video-player/custom-theme.css"
    import VideoPlayerWrapper from "../components/VideoPlayerWrapper";
    import {mapGetters} from "vuex";
    import {FETCH_CONCERT} from "../store/actions.type";

    export default {
        components: {
            VideoPlayerWrapper,
            LiveChat,
            BaseInput,
            VideoPlayer: videoPlayer,
        },
        methods: {
            loadConcert() {
                this.$store.dispatch(FETCH_CONCERT, this.$route.params.pk)
            },
        },
        props: {
            stream: {
                required: true,
            },
            isPerformer: {
                default: false,
            }
        },
        computed: {
            ...mapGetters(['concert'])
        },
        created() {
            this.loadConcert()
        }
    }
</script>
<style scoped>
    .font-dark{
        color: rgb(100,100,100);
    }

</style>
