const setupSocket = (io) => {

    io.on("connection", (socket) => {

        console.log("User Connected:", socket.id);

        socket.on("hello", (data) => {

            console.log(data);

            socket.emit("reply", {
                message: "Hello Client, message received!"
            });

        });

        socket.on("disconnect", () => {

            console.log("User Disconnected:", socket.id);

        });

    });

};

export default setupSocket;