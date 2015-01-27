console.log("mainjslinked")
//grab DOM elements
var $storyBox = $("#story-box");
var $userEntry = $("#entry-form");
var $entryButton = $("#enter-text");
var $counterHeader = $("#counter-header");
var $counterSpan = $("#counter");

//a counter for keeping track of a player's score
var counter = 0

//declare two variables to be assigned later
var highlight, htmlReadyWord

//stand in for an array of words for a given story
//TODO once a dictionary is built in, this list will be populated by making a call to the datbase and getting all the 
//words for a particular story instance.
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
				htmlReadyWord = "<span class='highlight animated flash'>"+ wordFromArray + "</span>";
			}
		})
				addEntryView(contentsFromDb);
				// counter++
				// $counterSpan.text(counter);
				// // debugger

	})

}

//functions for adding to DB, appending to DOM
function getContent(){
	console.log('addEntryModel fired');
	var content = $userEntry.val();
	if(contentChecker(content)){
		addEntryModel(content)
	}else{
		alert("Looks like that word isn't in the array! Try again!")
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

//a function to add the view to the DOM
function addEntryView(data){
	data = data.contents.replace(highlight,htmlReadyWord);
	console.log("addEntryView fired!")
	var $newP = $("<p>"  + data + "</p>");
	$storyBox.append($newP);
	counter++
	$counterSpan.text(counter);
}

//a function to check the string to make sure the word added is part of the array
function contentChecker(content){
	for(i = 0; i < wordArray.length; i++){
		if(content.search(wordArray[i]) !== -1){
			highlight = wordArray[i];
			htmlReadyWord = "<span class='highlight animated flash'>"+ wordArray[i] + "</span>";
			console.log("true");
			return true
		}
	}
}


loadAllToDom();


