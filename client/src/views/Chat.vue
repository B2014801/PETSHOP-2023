<template>
    <div class="chat">
        <div class="chat-window">
            <ul>
                <li v-for="message in messages" :key="message.id">
                    {{ message.text }}
                </li>
            </ul>
        </div>
        <input v-model="message" @keyup.enter="sendMessage" placeholder="Type your message..." />
    </div>
</template>

<script>
export default {
    data() {
        return {
            message: '',
            messages: [],
        };
    },
    methods: {
        sendMessage() {
            if (this.message) {
                this.$socket.emit('chat message', this.message);
                this.message = '';
            }
        },
    },
    sockets: {
        'chat message'(msg) {
            this.messages.push({ text: msg });
        },
    },
};
</script>

<style scoped>
/* Add your chat styles here */
</style>
