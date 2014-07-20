var PUBNUB = require("pubnub")
var location = require("../models/Location").LocationModel;
console.log(location);
var LocationService = new location();
var pubnub = PUBNUB({
    publish_key   : "pub-c-acddd84b-6986-471f-8515-e6b8b23f59cb",
    subscribe_key : "sub-c-b240b038-0f7a-11e4-9284-02ee2ddab7fe",
    //cipher_key : "demo"
});

pubnub.subscribe({
    channel : "SafeWalk",
    message : handleMessage,
    connect : function(){
    	console.log("CONNECTED!!");
    }
 })

function handleMessage(m){
	var message = JSON.parse(m);
	switch(message.type){
		case "Location" : 
						handleLocationMessage(message);
						break;
		}
	}

function handleLocationMessage(message){
	console.log("HANDLING LOCATION MESSAGE", message);
	LocationService.AddLocation(message, function(err){
		console.log(err);
	});

}

exports.publish = function(message){
	     pubnub.publish({
         post: false,
         channel: 'SafeWalk',
         message: message,
         callback: function (details) {
             console.log(details);
         }
     });
}