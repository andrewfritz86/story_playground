console.log("mainjslinked")
//grab DOM elements
var $storyBox = $("#story-box");
var $userEntry = $("#entry-form");
var $entryButton = $("#enter-text");
var highlight = ""
var htmlReadyWord = ""
var wordArray = ["girl", "house", "floor", "cat", "laptop", "fan"];

//add eventlistener to entryButton

$entryButton.on("click",function(){
	getContent();
})


//a function to load up the DOM

function loadAllToDom(){
	console.log("load all to the dom called!")
	$.ajax({
		url: "/entries",
		contentType: "json"
	}).done(function(data){
		data = JSON.parse(data);
		console.log(data);
		//need to loop through here and add everything to the dom with the span tag added
		//need to set highlight word and htmlready content, can then just execute regular append function each time
		//need two loops here
	})
}

//functions for adding to DB, appending to DOM
function getContent(){
	console.log('addEntryModel fired');
	var content = $userEntry.val();
	if(contentChecker(content)){
		addEntryModel(content)
	}else{
		alert("you gotta use one of the words!")
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
	for(i = 0; i < wordArray.length; i++){
		if(content.search(wordArray[i]) !== -1){
			highlight = wordArray[i];
			htmlReadyWord = "<span class='highlight'>"+ wordArray[i] + "</span>";
			console.log("true");
			return true
		}
	}
}

//a function to add the view to the DOM
function addEntryView(data){
	data = data.contents.replace(highlight,htmlReadyWord);
	console.log("addEntryView fired!")
	var $newP = $("<p>"  + data + "</p>");
	$storyBox.append($newP);
}



