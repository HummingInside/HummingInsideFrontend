<template>
    <div class="content">
        <div id="main-content" class="container">
            <div class="row">
                <div class="col-md-6">
                    <form class="form-inline">
                        <div class="form-group">
                            <label for="connect">WebSocket connection:</label>
                            <button id="connect" class="btn btn-default" type="submit" :disabled="connected == true" @click.prevent="connect">Connect</button>
                            <button id="disconnect" class="btn btn-default" type="submit" :disabled="connected == false" @click.prevent="disconnect">Disconnect
                            </button>
                        </div>
                    </form>
                </div>
                <div class="col-md-6">
                    <form class="form-inline">
                        <div class="form-group">
                            <label for="name">What is your name?</label>
                            <input type="text" id="name" class="form-control" v-model="send_message" placeholder="Your name here...">
                        </div>
                        <button id="send" class="btn btn-default" type="submit" @click.prevent="send">Send</button>
                    </form>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <table id="conversation" class="table table-striped">
                        <thead>
                        <tr>
                            <th>Greetings</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="item in received_messages" :key="item">
                            <td>{{ item }}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
    import SockJS from "sockjs-client";
    import Stomp from "webstomp-client";
    import {
        Card
    } from "@/components/index";


    export default {
        components: {
            Card,
        },
        data() {
            return {
                received_messages: [],
                send_message: null,
                connected: false
            };
        },
        computed:{
        },
        methods:{
            send() {
                console.log("Send message:" + this.send_message);
                if (this.stompClient && this.stompClient.connected) {
                    const msg = { message: {key: this.send_message, temp: {
                        sekyo: "sekyo"
                            }} };
                    console.log(JSON.stringify(msg));
                    this.stompClient.send("/send/" + this.$route.params.pk, JSON.stringify(msg), {});
                }
            },
            connect() {
                alert(this.$route.params.pk);
                this.socket = new SockJS("http://localhost:8080/ws");
                this.stompClient = Stomp.over(this.socket);
                this.stompClient.connect(
                    {},
                    frame => {
                        this.connected = true;
                        console.log(frame);
                        this.stompClient.subscribe("/listen/" + this.$route.params.pk, tick => {
                            console.log(tick);
                            this.received_messages.push(JSON.parse(tick.body).message);
                        });
                    },
                    error => {
                        console.log(error);
                        this.connected = false;
                    }
                );
            },
            disconnect() {
                if (this.stompClient) {
                    this.stompClient.disconnect();
                }
                this.connected = false;
            },
            tickleConnection() {
                this.connected ? this.disconnect() : this.connect();
            }
        },
        // mounted(){
        //     const USER_MEDIA_CONF = {
        //         video: true,
        //         audio: true,
        //     }
        //     navigator.getUserMedia(
        //         USER_MEDIA_CONF,
        //         stream => {
        //             document.getElementById("my-video").srcObject = stream;
        //         },
        //         error => {
        //             alert("비디오, 오디오 스트림 획득에 실패했습니다.");
        //         }
        //     );
        // },
        beforeDestroy() {
        },
        created() {
        }
    }
</script>
<style>
</style>
