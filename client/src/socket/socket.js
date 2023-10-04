import { io } from 'socket.io-client';

// import { BACKEND_SERVER } from '@/configs/constants';

const socket = io('http://localhost:3001/api/petshop/', { autoConnect: false });

function createWebSocketPlugin(socket) {
    return (store) => {
        store.$socket = socket;
        // Thêm các socket event listening
    };
}

// Plugin lưu giá trị nhận được từ Socket vào Vuex store
export const websocketPlugin = createWebSocketPlugin(socket);

export default socket;
