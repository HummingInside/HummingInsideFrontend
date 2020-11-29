<template>
    <LiveConcert :stream="stream"></LiveConcert>
</template>

<script>
    import LiveConcert from "./LiveConcert";
    import Stomp from "webstomp-client";
    import SockJS from "sockjs-client";
    import {API_URL, WEB_RTC_CONF} from "@/common/config";

    export default {
        name: "AudienceLiveChat",
        components: {LiveConcert},
        data(){
            return {
                stream: null,
                connection: null,
                me: Math.random().toString(36).substr(2),
                sendPath: `/send/${this.$route.params.pk}/`,
                listenPath: `/listen/${this.$route.params.pk}/`,
            }
        },
        methods: {
            // printConnection(){
            //     console.log(this.connection);
            //     setTimeout(this.printConnection, 3000);
            // },
            connect() {
                this.stompClient = Stomp.over(new SockJS(API_URL + "/ws"));
                this.stompClient.connect(
                    {},
                    frame => {
                        this.stompClient.subscribe(this.listenPath + 'answer', this.listenAnswer);
                        this.stompClient.subscribe(this.listenPath + 'performer_candidate', this.listenCandidate);
                        // listen answer
                        // listen PerformerIceCandidate
                        // send AudienceIceCandidate
                        // send Offer
                        this.call();
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
                if (this.connection) {
                    this.connection.close();
                }
            },
            async call(){
                const connection = new RTCPeerConnection(WEB_RTC_CONF);
                this.connection = connection;

                connection.onicecandidate = event => {
                    if(event.candidate) {
                        this.sendCandidate(event.candidate);
                    }
                };

                connection.oniceconnectionstatechange = () => {
                    if(connection.iceConnectionState === 'disconnected') {
                        alert('The connection with the performer has ended.');
                        this.$router.push({ name: "concert-list" });
                    }
                }

                connection.ontrack = ({streams: [stream]}) => {
                    this.stream = stream;
                }
                const stream = this.dummyTrack();
                stream.getTracks().forEach(track => connection.addTrack(track, stream));
                const offer = await connection.createOffer();
                await connection.setLocalDescription(new RTCSessionDescription(offer));
                this.sendOffer(offer);
            },
            listenCandidate(data) {
                data = JSON.parse(data.body).message;
                if(data.user === this.me) {
                    this.connection.addIceCandidate(
                        new RTCIceCandidate(data.candidate)
                    ).catch(e=> console.error(e));
                }
            },
            listenAnswer(data) {
                data = JSON.parse(data.body).message;
                if(data.user === this.me){
                    this.connection.setRemoteDescription(
                        new RTCSessionDescription(data.answer)
                    ).catch(e=> console.error(e));
                }
            },
            sendOffer(offer) {
                const msg = { message: {user: this.me, offer: offer}};
                this.stompClient.send(this.sendPath + 'offer', JSON.stringify(msg), {});
            },
            sendCandidate(candidate) {
                const msg = { message: {user: this.me, candidate: candidate}};
                this.stompClient.send(this.sendPath + 'audience_candidate', JSON.stringify(msg), {});
            },
            dummyTrack(){
                let silence = () => {
                    let ctx = new AudioContext(), oscillator = ctx.createOscillator();
                    let dst = oscillator.connect(ctx.createMediaStreamDestination());
                    oscillator.start();
                    return Object.assign(dst.stream.getAudioTracks()[0], {enabled: false});
                }

                let black = ({width = 1, height = 1} = {}) => {
                    let canvas = Object.assign(document.createElement("canvas"), {width, height});
                    canvas.getContext('2d').fillRect(0, 0, width, height);
                    let stream = canvas.captureStream();
                    return Object.assign(stream.getVideoTracks()[0], {enabled: false});
                }

                return ((...args) => new MediaStream([black(...args), silence()]))();
            }
        },
        computed: {
        },
        created() {
            this.connect();
        },
        mounted(){
            // this.printConnection();
        },
        beforeDestroy() {
            this.disconnect();
        }
    }
</script>

<style scoped>

</style>