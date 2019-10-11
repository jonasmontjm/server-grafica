import { Socket } from 'socket.io';
import  socketIO  from 'socket.io';
import Server from '../classes/server';
import { UsuariosLista } from '../classes/usuario-lista';
import { Usuario } from '../classes/usuario';
// 5.7 seguir con la 5.8


export const usuariosConectados = new UsuariosLista();


export const conectarCliente = (client: Socket, io: socketIO.Server) => {
    const usuario = new Usuario(client.id);
    usuariosConectados.agregar(usuario)
   // io.emit('usuarios-activos', usuariosConectados.getLista());
}

export const desconectar = (client: Socket, io: socketIO.Server) =>{
     client.on('disconnect',()=>{
         //console.log('Cliente desconectado');

         const usuarioBorrado = usuariosConectados.borrarUsuario(client.id);
         console.log('usuario borrado',usuarioBorrado);
         io.emit('usuarios-activos', usuariosConectados.getLista());

         

     })
}




export const mensaje = (client: Socket, io: socketIO.Server) =>{
    client.on('mensaje',(payload:{de:string, cuerpo: string}) => {
        console.log('mensaje recibido',payload);
        
        //io.emit('mensaje-nuevo', payload);
        //client.emit('mensaje-nuevo', {de: payload.de, cuerpo: payload.cuerpo});
        //io.emit('mensaje-nuevo', {de: payload.de, cuerpo: payload.cuerpo});
        io.emit('mensaje-nuevo', payload);

    })


    


}


export const configurarUsuario = (client: Socket, io: socketIO.Server) =>{
    client.on('configurar-usuario',(payload:{nombre:string}, callback: Function) => {
        //console.log('configurar-usuario', payload);
        usuariosConectados.actualizarNombre(client.id, payload.nombre);
        io.emit('usuarios-activos', usuariosConectados.getLista());
        callback({
            ok:true,
            mensaje:`Usuario ${payload.nombre}, configurado`
        });

        
        //io.emit('mensaje-nuevo', payload);
        //client.emit('mensaje-nuevo', {de: payload.de, cuerpo: payload.cuerpo, para:'Angular'});

    })
} //fin login


export const obtenerUsuarios = (client: Socket, io: socketIO.Server) =>{
    client.on('obtener-usuarios',() => {

        io.to(client.id).emit('usuarios-activos', usuariosConectados.getLista());
     

    })
} //fin login


