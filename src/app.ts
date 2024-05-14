import BoardClass from "./Classes/BoardClass.ts";
import {Server, Socket} from "socket.io";
import {createServer} from "http";
import {Room} from "./interfaces/interfaces.ts";

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:5173'
    }
});




let rooms: { [key: string]: Room } = {
    room1: {room:[], board:new BoardClass()},
    room2: {room:[], board:new BoardClass()},
    room3: {room:[], board:new BoardClass()},
};

function leaveRoom(socket: Socket, roomID: string | undefined) {
    if (roomID !== undefined) {
        const indexOfSocket = rooms[roomID].room.indexOf(socket.id)
        try {
            rooms[roomID].room.splice(indexOfSocket, 1);
            rooms[roomID].board = new BoardClass();
            socket.leave(roomID);
        }
        catch (error : any){
            console.log(error)
        }


    }
}

function checkAndNotifyIfRoomFull(socket: Socket, roomLength: number): boolean {
    if (roomLength === 2) {
        socket.emit('room full');
        return true
    }
    return false
}

function joinRoom(socket: Socket, room: string[]) {
    room.push(socket.id);
    console.log(room)
    socket.join(room);
}

function checkAndNotifyIfStarting(socket: Socket, room: string[]): boolean {
    if (room.length === 1) {
        socket.emit('waiting for opponent');
        return false;
    } else {
        io.to(room).emit('start game');
        return true;
    }
}

    function listenForMoveRequests(socket: Socket, board: BoardClass, room: string[]) {
        socket.on("move request", (startingX:number, startingY:number, destinationX:number, destinationY:number) => {

            if (board.checkIfMoveValid(startingX, startingY, destinationX, destinationY)){

                io.to(room).emit("move piece",startingX, startingY, destinationX, destinationY);

                board.MovePiece(startingX, startingY, destinationX, destinationY);
                console.log(board.getBoard())
            }

        })
    }

io.on("connection", (socket) => {

    let tempRoomID: string;

    socket.on("join room", (roomID: string) => {
        tempRoomID = roomID;

        const room = rooms[roomID].room;
        if (!checkAndNotifyIfRoomFull(socket, room.length)) {
            joinRoom(socket, room)
            if (checkAndNotifyIfStarting(socket, room)) {

                listenForMoveRequests(socket, rooms[roomID].board, rooms[roomID].room)

            }

        }

    })

    socket.on('disconnect', () => {


        leaveRoom(socket, tempRoomID)
        try{
            console.log(tempRoomID)
            console.log(rooms[tempRoomID].room)
        }
        catch (error:any){
            console.log(error)
        }




    });
});
io.listen(3000)
