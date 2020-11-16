<template>
    <LiveConcert :stream="stream"></LiveConcert>
</template>

<script>
    import { USER_MEDIA_CONF } from "@/common/config";
    import LiveConcert from "./LiveConcert";
    import SockJS from "sockjs-client";
    import {API_URL, WEB_RTC_CONF} from "../common/config";
    import Stomp from "webstomp-client";

    export default {
        name: "PerformerLiveChat",
        components: {LiveConcert},
        data(){
            return {
                stream: null,
                connections: {},
                sendPath: `/send/${this.$route.params.pk}/`,
                listenPath: `/listen/${this.$route.params.pk}/`,
            }
        },
        methods: {
            connect() {
                this.stompClient = Stomp.over(new SockJS(API_URL + "/ws"));
                this.stompClient.connect(
                    {},
                    frame => {
                        this.stompClient.subscribe(this.listenPath + 'offer', this.listenOffer);
                        this.stompClient.subscribe(this.listenPath + 'audience_candidate', this.listenCandidate);
                    },
                    error => {
                        console.log(error);
                    }
                );
            },
            disconnect() {
                if (this.stompClient) {
                    this.stompClient.disconnect();
                }
            },
            async answer(data) {
                const connection = new RTCPeerConnection(WEB_RTC_CONF);
                this.connections[data.user] = connection;

                connection.onicecandidate = event => {
                    if(event.candidate) {
                        this.sendCandidate(event.candidate);
                    }
                };
                await connection.setRemoteDescription(
                    new RTCSessionDescription(data.offer)
                );

                await navigator.getUserMedia(
                    USER_MEDIA_CONF,
                    async stream => {
                        stream.getTracks().forEach(track => connection.addTrack(track, stream));
                        console.log(this.stream);
                        const answer = await connection.createAnswer();
                        await connection.setLocalDescription(new RTCSessionDescription(answer));
                        this.sendAnswer(answer, data.user);
                    },
                    error => {
                        console.warn(error.message);
                    }
                );
            },
            listenCandidate(data) {
                data = JSON.parse(data.body).message;
                this.connections[data.user].addIceCandidate(
                    new RTCIceCandidate(data.candidate)
                ).catch(e=> console.error(e));
            },
            listenOffer(data) {
                data = JSON.parse(data.body).message;
                this.answer(data);
            },
            sendAnswer(answer, user) {
                const msg = { message: {user: user, answer: answer}};
                this.stompClient.send(this.sendPath + 'answer', JSON.stringify(msg), {});

            },
            sendCandidate(candidate, user) {
                const msg = { message: {user: user, candidate: candidate}};
                this.stompClient.send(this.sendPath + 'performer_candidate', JSON.stringify(msg), {});
            },

        },
        created() {
            this.connect();

            navigator.getUserMedia(
                USER_MEDIA_CONF,
                stream => {
                    this.stream = stream;
                },
                error => {
                    alert("비디오, 오디오 스트림 획득에 실패했습니다.");
                }
            );
        },
        mounted(){
        },
        beforeDestroy() {
            this.disconnect();
        }
    }
</script>

<style scoped>

</style>