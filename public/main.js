console.log("mainjslinked")
//grab DOM elements
var $storyBox = $("#story-box");
var $userEntry = $("#entry-form");
var $entryButton = $("#enter-text");


//add eventlistener to entryButton

$entryButton.on("click",function(){
	addEntryModel();
})

function addEntryModel(){
	console.log('addEntryModel fired');
	var content = $userEntry.val();
	addEntryView(content);
}

function addEntryView(content){
	console.log(content);
}