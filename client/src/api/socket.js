const createSocket = (setMessageToMe, setNotificationToMe) => {
    const socket = new WebSocket('wss://81.177.141.123:637/web_socket');

    socket.onopen = () => {}

    socket.onclose = () => {}

    socket.onerror = (err) => {
        console.error("ERROR in WEBSOCKES:", err);
    };

    socket.onmessage = (event) => {
        const eventObj = JSON.parse(event.data);
        switch(eventObj.Type) {
            case 'Message': {
                setMessageToMe(eventObj.Message);
                break;
            }
            case 'Notification': {
                setNotificationToMe(eventObj.Notification);
                break;
            }
            default: {

            }
        }
    }

    const sendMessage = (content, receiverId) => {
        socket.send(JSON.stringify({
            type: "message",
            receiver: receiverId,
            message: {
                "content": content
            },
        }));
    }

    const onClose = () => {
        socket.close();
    }
    // function registerHandler(onMessageReceived) {
    //     socket.on('chat message', onMessageReceived)
    // }
    //
    // function unregisterHandler() {
    //     socket.off('chat message')
    // }
    //
    // function registerNotification(onNotifReceived) {
    //     socket.on('notif', onNotifReceived)
    // }
    //
    // function unregisterNotification() {
    //     socket.off('notif')
    // }
    //
    // function message(mess) {
    //     socket.emit('chat message', mess)
    // }
    //
    // function notif(data) {
    //     socket.emit('notif', data)
    // }

    // return {
    //     notif,
    //     message,
    //     registerHandler,
    //     unregisterHandler,
    //     registerNotification,
    //     unregisterNotification
    // }

    return {
        onClose,
        sendMessage,
    }
}

export default createSocket;