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
	if(contentChecker(content)){
		addEntryModel(content)
	}else{
		alert("ohhh kevin")
	}
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
		addEntryView(data)
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
function addEntryView(data){
	console.log("addEntryView fired!")
	var $newP = $("<p>checking the word <span class='highlight'>" + data.contents + "</span> </p>");
	$storyBox.append($newP);
}



