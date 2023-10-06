<template>
    <div>
        <i @click="startRecognition" class="fa-solid fa-microphone text-white ms-3"></i>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isListening: false,
        };
    },
    methods: {
        startRecognition() {
            if ('webkitSpeechRecognition' in window) {
                const recognition = new webkitSpeechRecognition();
                recognition.lang = 'vi-VN'; // Set the language to Vietnamese

                recognition.onstart = () => {
                    this.isListening = true;
                };

                recognition.onend = () => {
                    this.isListening = false;
                };

                recognition.onresult = (event) => {
                    const transcript = event.results[0][0].transcript.toLowerCase();
                    console.log('Recognized:', transcript);

                    // Handle recognized text here
                    if (transcript === 'xin chào') {
                        // Handle recognized command
                        console.log('Xin chào!'); // "Xin chào!" means "Hello!" in Vietnamese
                    }

                    // Add more commands as needed
                };

                recognition.start();
            } else {
                alert('Speech recognition is not supported in your browser.');
            }
        },
    },
};
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
