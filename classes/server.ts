import express from 'express';
import { SERVER_PORT } from '../global/enviroment';
import socketIO from 'socket.io';
import http from 'http';
//const socketIO = require('socket.io');
import * as socket from '../sockets/sockets';


export default class Server {

    private static _instance: Server; 
    public app: express.Application;
    public port: number;

    public io: SocketIO.Server;
    private httpServer: http.Server;

    private constructor(){
        this.app = express();
        this.port = SERVER_PORT;
        this.httpServer = new http.Server(this.app);
        this.io = socketIO(this.httpServer);
        this.escucharSockets();
    }

    public static get instance(){
        return this._instance || (this._instance = new this());

    }


    private escucharSockets(){
        console.log('Escuchando conexiones - sockets');
        this.io.on('connection', client => {
            //console.log('Nuevo Cliente Conectado');

            //Escuchar mensajes

            //socket.mensaje(client, this.io);
            //console.log(client.id);

            socket.conectarCliente( client , this.io);

            socket.mensaje(client, this.io);

            //desconectar
            socket.desconectar(client, this.io);

            socket.configurarUsuario(client, this.io);

            socket.obtenerUsuarios(client, this.io);



        });

        
    }

    start(){
        this.httpServer.listen(this.port, ()=>{
            console.log(`Servidor corriendo en el puerto ${SERVER_PORT}`);
        });
    }



}