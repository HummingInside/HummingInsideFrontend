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
            <div class="flex-shrink-0 d-flex flex-column" style="width: 340px;height: 803px; border-top-right-radius: 4px;">
                <div style="border-bottom:1px solid rgb(229,229,229);border-top-right-radius: 4px">
                    <p class="text-center font-dark" style="font-size: 14px; font-weight: 600;margin: 10px">Live Chat</p>
                </div>
                <div class="flex-grow-1">
                </div>
<!--                <div class="input-group mb-3">-->
<!--                    <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2">-->
<!--                    <div class="input-group-append">-->
<!--                        <base-button type="success" fill style="padding: 11px">send</base-button>-->
<!--                    </div>-->
<!--                </div>-->

                <div style="border-top:1px solid rgb(229,229,229);padding: 10px">
                    <input style="width: 80%;border-top-left-radius: 5px;border-bottom-left-radius: 5px;height: 30px;border: 1px solid rgb(142,146,156);padding-left: 10px" placeholder="enter message...">
                    <button class="shadow" style="height: 30px;width: 19%;background: rgb(89,158,242);color: white;font-weight: 600; border: none;border-top-right-radius: 5px; border-bottom-right-radius: 5px">
<!--                    <i class="tim-icons icon-send"></i>-->
                    send
                </button>
<!--                        <div class="form-group">-->
<!--                            <input class="form-control" style="margin: 0">-->
<!--                        </div>-->
<!--                        <div style="padding: 0">-->
<!--                            <base-button type="success" fill style="padding: 11px;margin: 0">send</base-button>-->
<!--                        </div>-->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {
        BaseInput
    } from "@/components/index";

    export default {
        components: {
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
