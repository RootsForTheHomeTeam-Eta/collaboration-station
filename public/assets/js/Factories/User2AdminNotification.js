/**
 * Created by Manu on 1/29/16.
 */
rootsApp.factory('messages', function() {

    var messages = {};

    //this is hardcoded- would need dynamic values
    messages.list = [{id: 'Urban Roots Farm'}, {id: 'Youth Farm Lyndale'}, {id: 'Dream of Wild Health'}];

    messages.add = function(message){
        // get request pulls orgnames from submitted forms
        //push orgnames from organizations that have submitted forms into
        messages.list.push({id: user.orgName});
    };

    return messages;

    console.log(messages);
    console.log(messages.list);
});