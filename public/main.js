console.log("mainjslinked")
//grab DOM elements
var $storyBox = $("#story-box");
var $userEntry = $("#entry-form");
var $entryButton = $("#enter-text");


//add eventlistener to entryButton

$entryButton.on("click",function(){
	getContent();
})

//functions for adding to DB, appending to DOM
function getContent(){
	console.log('addEntryModel fired');
	var content = $userEntry.val();
	addEntryModel(content);
}

function addEntryModel(content){
	console.log(content);
	$.ajax({
		type: "POST",
		data: {value: content},
		url: "/entries"
	}).done(function(data){
		console.log(data);
		data = JSON.parse(data);
		//check if magic word exists, if so, add to dom
		if(contentChecker(data.contents)){
			console.log("contents are there!")
			addEntryView(data.contents)
		}
		else
		{
			console.log("nope, no contents!")
			//eventually an alert here?
		}
	})
}

//a function to check the string
function contentChecker(content){
	if(content === "matt"){
		return true
	}
	else
	{
		return false
	}
}

//a function to add the view to the DOM
function addEntryView(){
	console.log("addEntryView fired!")
}



