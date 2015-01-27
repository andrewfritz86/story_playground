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
		prepareToAppend(data);
	})
}

//function that loops through each dom element, finding the highlighted word, and getting it ready for the dom
function prepareToAppend(data){
	data.forEach(function(contentsFromDb){
		wordArray.forEach(function(wordFromArray){
			if(contentsFromDb.contents.search(wordFromArray) !== -1){
				highlight = wordFromArray;
				htmlReadyWord = "<span class='highlight'>"+ wordFromArray + "</span>";
				// debugger;
				//words are reset, now need to call addEntryView (does anything need to be passed?)
			}
		})
				addEntryView(contentsFromDb);
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

loadAllToDom();


