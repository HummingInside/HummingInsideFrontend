<template>
    <div class="flex-shrink-0 d-flex flex-column" style="width: 340px;height: 803px; border-top-right-radius: 4px;">
        <div style="border-bottom:1px solid rgb(229,229,229);border-top-right-radius: 4px">
            <p class="text-center font-dark" style="font-size: 14px; font-weight: 600;margin: 10px;color:#343a40!important">Live Chat</p>
        </div>
        <div style="border-bottom:1px solid rgb(229,229,229);border-top-right-radius: 4px">
            <p class="text-center font-dark" style="font-size: 14px; font-weight: 600;margin: 10px;color:#e66ad2!important">
                <i class="tim-icons icon-pin font-weight-bold"></i> Notice: Receive the requested song.</p>
        </div>
        <div class="flex-grow-1" style="overflow-y: scroll" ref="messageSection">
            <p class="chat-message font-weight-600" v-for="message in chatMessages">
                <span class="font-weight-bold">{{message.username}}: </span>{{message.content}}
            </p>
        </div>
        <div style="border-top:1px solid rgb(229,229,229);padding: 10px">
            <input v-on:keyup.enter="clickSend" v-model="currentMessage" style="width: 80%;border-top-left-radius: 5px;border-bottom-left-radius: 5px;height: 30px;border: 1px solid rgb(142,146,156);padding-left: 10px" placeholder="enter message...">
            <button @click="clickSend()" class="shadow" style="height: 30px;width: 19%;background: rgb(89,158,242);color: white;font-weight: 600; border: none;border-top-right-radius: 5px; border-bottom-right-radius: 5px">
                send
            </button>
        </div>
    </div>
</template>

<script>
    import SockJS from "sockjs-client";
    import Stomp from "webstomp-client";
    import API_URL from "../common/config";
    import {mapGetters} from "vuex";

    export default {
        name: "LiveChat",
        data(){
            return {
                chatMessages: [],
                currentMessage: '',
            }
        },
        created() {
            this.connect();
        },
        updated() {
          this.$refs.messageSection.scrollTop = this.$refs.messageSection.lastElementChild.offsetTop;
        },
        methods:{
            clickSend(){
                if(this.currentMessage){
                    this.send(this.currentMessage);
                    this.currentMessage = '';
                }
            },
            send(message) {
                if (this.stompClient && this.stompClient.connected) {
                    const msg = { message: {msg: message, username: this.currentUser.username}};
                    this.stompClient.send("/send/" + this.$route.params.pk + "/chat", JSON.stringify(msg), {});
                }
            },
            connect() {
                this.socket = new SockJS(API_URL + "/ws");
                this.stompClient = Stomp.over(this.socket);
                this.stompClient.connect(
                    {},
                    frame => {
                        this.connected = true;
                        this.stompClient.subscribe("/listen/" + this.$route.params.pk + "/chat", tick => {
                            const msg = {
                                username: JSON.parse(tick.body).message.username,
                                content: JSON.parse(tick.body).message.msg
                            }
                            this.chatMessages.push(msg);
                        });
                        this.send("Entered this chat room")
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

        },
        computed: {
            ...mapGetters(['currentUser'])
        }
    }
</script>

<style scoped>
    .chat-message{
        padding: 0 10px;
        color: black;
    }
</style>