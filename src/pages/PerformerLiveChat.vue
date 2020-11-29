<template>
    <LiveConcert :stream="stream" :isPerformer="true"></LiveConcert>
</template>

<script>
    import { USER_MEDIA_CONF, API_URL, WEB_RTC_CONF } from "@/common/config";
    import LiveConcert from "./LiveConcert";
    import SockJS from "sockjs-client";
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
            // printConnection(){
            //     // console.log(this.connections);
            //     setTimeout(this.printConnection, 3000);
            // },
            connect() {
                this.stompClient = Stomp.over(new SockJS(API_URL + "/ws"));
                this.stompClient.connect(
                    {},
                    frame => {
                        this.stompClient.subscribe(this.listenPath + 'offer', this.listenOffer);
                        this.stompClient.subscribe(this.listenPath + 'audience_candidate', this.listenCandidate);
                        this.sendPerformerEnter();
                    },
                    error => {
                        console.log(error);
                    }
                );
            },
            disconnect() {
                this.sendPerformerOut();
                if (this.stompClient) {
                    this.stompClient.disconnect();
                }
                for(let connection in this.connections) {
                    this.connections[connection].close();
                }
            },
            async answer(data) {
                const connection = new RTCPeerConnection(WEB_RTC_CONF);
                this.connections[data.user] = connection;

                connection.onicecandidate = event => {
                    if(event.candidate) {
                        this.sendCandidate(event.candidate, data.user);
                    }
                };
                await connection.setRemoteDescription(
                    new RTCSessionDescription(data.offer)
                );

                await navigator.getUserMedia(
                    USER_MEDIA_CONF,
                    async stream => {
                        stream.getTracks().forEach(track => connection.addTrack(track, stream));
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
                if(this.connections[data.user]){
                    this.connections[data.user].addIceCandidate(
                        new RTCIceCandidate(data.candidate)
                    ).catch(e=> console.error(e));
                }
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
            sendPerformerEnter() {
                const msg = { message: {pk: this.$route.params.pk + ''}};
                this.stompClient.send(this.sendPath + 'performer/enter', JSON.stringify(msg), {});
            },
            sendPerformerOut() {
                const msg = { message: {pk: this.$route.params.pk + ''}};
                this.stompClient.send(this.sendPath + 'performer/out', JSON.stringify(msg), {});
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
            // this.printConnection();
        },
        beforeDestroy() {
            this.disconnect();
        },
        beforeRouteLeave(to, from, next) {
            const answer = window.confirm('Do you really want to leave? This concert will be end!')
            if (answer) {
                next()
            } else {
                next(false)
            }
        },
    }
</script>

<style scoped>

</style>