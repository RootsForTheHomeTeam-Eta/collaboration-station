/**
 * Created by Manu on 1/29/16.
 */
rootsApp.factory('messages', function() {

    var messages = {};

    messages.list = [{id: '5', text: 'Bill'}, {id: '6', text: 'Alex'}, {id: '8', text: 'MIA'}];

    messages.add = function(message){
        messages.list.push({id: messages.list.length, text: message});
    };

    return messages;

    console.log(messages);
    console.log(messages.list);
});