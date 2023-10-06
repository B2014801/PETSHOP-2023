<template>
    <div>
        <i @click="startRecognition" class="fa-solid fa-microphone text-white ms-3"></i>
    </div>
    <model :showVoucherModal="isShowmodel" @closeModel="closeModel">
        <div class="microphone-model-container">
            <div class="microphone-close-model">
                <i class="fa fa-times" aria-hidden="true" @click="closeModel()"></i>
            </div>

            <div v-if="isListening" class="microphone-model-title-event">Đang nghe...</div>

            <div v-if="!isEnableMicroVar" class="microphone-model-title-event">{{ Response }}</div>
            <div class="container">
                <button
                    id="speech"
                    class="micro-btn-animation"
                    @click="isEnableMicro()"
                    :style="{ background: isEnableActiveMircro() ? '#c00' : 'rgba(0, 0, 0, 0.5)' }"
                >
                    <div :class="{ 'pulse-ring': isEnableActiveMircro() }"></div>
                    <i class="fa fa-microphone" aria-hidden="true"></i>
                </button>
            </div>
        </div>
    </model>
</template>

<script>
import model from '@/components/models/Model1.vue';
export default {
    data() {
        return {
            isListening: null,
            isShowmodel: false,
            isEnableMicroVar: true,
            recognition: null,
            Result: null,
            Response: '',
        };
    },
    components: {
        model,
    },
    methods: {
        startRecognition() {
            this.isShowmodel = true;
            if ('webkitSpeechRecognition' in window) {
                this.recognition = new webkitSpeechRecognition();
                const recognition = this.recognition;

                recognition.lang = 'vi-VN'; // Set the language to Vietnamese

                recognition.onstart = () => {
                    this.isListening = true;
                    this.isEnableMicroVar = true;
                    this.Result = null;
                };

                recognition.onend = () => {
                    this.isListening = false;
                };

                recognition.onresult = (event) => {
                    const transcript = event.results[0][0].transcript.toLowerCase();
                    this.Result = transcript;
                    this.$router.push({
                        name: 'search',
                        query: {
                            keySearch: transcript, // 'keySearch' is the query parameter name
                        },
                    });
                    this.isShowmodel = false;
                };

                recognition.start();
            } else {
                alert('Speech recognition is not supported in your browser.');
            }
        },
        closeModel() {
            this.isEnableMicroVar = true;
            this.stopRecognition();
            this.isShowmodel = false;
        },
        stopRecognition() {
            if (this.recognition) {
                this.recognition.stop();
                this.isListening = false;
            }
        },
        isEnableMicro() {
            this.isEnableMicroVar = !this.isEnableMicroVar;
            if (this.isEnableMicroVar == false) {
                this.Response = 'Mi-crô đang tắt. Mời bạn nói lại.';
                this.stopRecognition();
            } else if (!this.isListening) {
                this.isListening = true;
                this.startRecognition();
            }
        },

        isEnableActiveMircro() {
            if (this.isEnableMicroVar) {
                if (this.Result == null && this.isListening == false) {
                    this.Response = 'Tôi chưa nghe rõ. Mời bạn nói lại.';
                    this.isEnableMicroVar = false;
                    return false;
                } else {
                    return true;
                }
            }
        },
    },
};
</script>

<style scoped lang="scss">
$primary: #189bff;
$secondary: #d8d8d8;
$size: 60px;
/* Add your component-specific styles here */
.microphone-model-container {
    padding: 0 0 16px 32px;
    background-color: #fff;
    color: #000;
    font-size: 24px;
    .microphone-close-model {
        margin: 8px;
        text-align: end;
    }
    .microphone-model-title-event {
        padding: 48px 0 24px;
    }
    .micro-btn-animation {
        border: none;
        padding: 0;
        border-radius: 100%;
        width: $size;
        height: $size;
        font-size: 3em;
        color: #fff;
        padding: 0;
        margin: 0;

        position: relative;
        z-index: 999;
        display: flex;
        line-height: $size;
        justify-content: center;
        align-items: center;
        white-space: nowrap;
        vertical-align: middle;
        -ms-touch-action: manipulation;
        touch-action: manipulation;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        background-image: none;
        i {
            font-size: 0.5em;
        }
    }

    .pulse-ring {
        content: '';
        width: $size;
        height: $size;
        background: $primary;
        border: 5px solid $primary;
        border-radius: 50%;
        position: absolute;
        top: 0px;
        left: 0px;
        animation: pulsate infinite 1.5s;
    }

    .pulse-ring.delay {
        // animation-delay: 1s;
    }

    @-webkit-keyframes pulsate {
        0% {
            -webkit-transform: scale(1, 1);
            opacity: 1;
        }
        100% {
            -webkit-transform: scale(1.3, 1.3);
            opacity: 0;
        }
    }

    .container {
        display: flex;
        align-items: end;
        justify-content: center;
        height: 30vh;
    }

    .type2 {
        background: $primary;
    }

    .type2 .pulse-ring {
        background: transparent;
    }
}
</style>
