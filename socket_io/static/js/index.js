$(document).ready(function() {

    namespace = '/test';
    var socket = io(namespace);

    socket.on('connect', function() {
        // socket.emit('my_event_for_greeting', {data: 'Welcome to the SYA zone'});
        socket.emit('my_event_first');
    });

    socket.on('my_response', function(msg, cb) {
        $('#log').append('<br>' + $('<div/>').text('' + msg.count + ': ' + msg.data).html());
        if (cb)
            cb();
    });
    socket.on('my_response_for_greeting', function(msg, cb) {
        $('#log').append('<br>' + $('<div/>').text(msg.data).html());
        if (cb)
            cb();
    });
    $('form#emit').submit(function(event) {
        socket.emit('my_event', {data: $('#emit_data').val()});
        return false;
    });
    // $('form#broadcast').submit(function(event) {
    //     socket.emit('my_broadcast_event', {data: $('#broadcast_data').val()});
    //     return false;
    // });
    // $('form#disconnect').submit(function(event) {
    //     socket.emit('disconnect_request');
    //     return false;
    // });
});