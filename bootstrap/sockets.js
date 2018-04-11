/* global logger */

export default io => {
    io.on('connection', socket => {
        logger('Socket connection started');
        logger(`Socket ID: ${socket.id}`);
        
        socket.on('start', function(data) {
            console.log('New user connected:', data.id);
            socket.join('beline:' + data.id);
        });

        socket.on('NEW_MESSAGE', function(data) {
            console.log('NEW_MESSAGE', data);
            socket.broadcast.to('beline:' + data.client.id).emit('action', {type: 'RECEIVE_NEW_MESSAGE', payload: data});
        });

        socket.on('ADD_NEW_CONTACT', function(data) {
            console.log('ADD_NEW_CONTACT', data);
            socket.to('beline:' + data.contact.id).emit('action', {type: 'NEW_CONTACT', payload: data});
        });

        socket.on('DELETE_CONTACT', function(data) {
            console.log('DELETE_CONTACT', data);
            socket.to('beline:' + data.contact.id).emit('action', {type: 'DELETE_CONTACTS', payload: data.user});
        });

    });
};
