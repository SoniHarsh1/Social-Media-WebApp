require('dotenv').config()

const io = require('socket.io')(process.env.PORT, {
    cors: {
        origin: process.env.CLIENT_LINK
    }
})

let activeUsers = [];

io.on('connection', (socket) => {

    // add new user
    socket.on('new-user-add', (newUserId)=>{
        // check if user does not already exists
        if(!activeUsers.some((user)=> user.userId === newUserId)){
            activeUsers.push({
                userId: newUserId,
                socketId: socket.id
            })
        }
        console.log("Connected Users", activeUsers);
        io.emit('get-users', activeUsers);
    })

    // disconnect user
    socket.on('disconnect', ()=>{
        activeUsers = activeUsers.filter((user)=> user.socketId !== socket.id);
        console.log("User Disconnected", activeUsers);
        io.emit('get-users', activeUsers)
    })

    // send message
    socket.on('send-message', (data)=>{
        const {recieverId} = data;
        const user = activeUsers.find((user)=> user.userId === recieverId);
        if(user){
            io.to(user.socketId).emit('recieve-message', data);
        }
    })
})
