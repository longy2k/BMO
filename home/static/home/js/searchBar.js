let searchBar = document.getElementById("search");
let pos = -1;

searchBar.addEventListener("keydown", function(event) {
	if (event.code === "ArrowUp") {
		event.preventDefault();
	}
});

var searchValue;
var splitValue;

var suggestionSelectColor = "#9cc9bc";

searchBar.addEventListener("keyup", function(event) {
  
  if (event.code === "ArrowUp") {
	if (newUl.childNodes.length != 0) {
		pos--;
		if (pos < 0) {
			pos = newUl.childNodes.length-1;
			newUl.childNodes[pos].style.backgroundColor = suggestionSelectColor;
			//~ console.log("Down: " + pos +  " | " + newUl.childNodes[pos].innerHTML);
			searchValue = newUl.childNodes[pos].innerHTML;
		}
		else {
			newUl.childNodes[pos].style.backgroundColor = suggestionSelectColor;
			//~ console.log("Down: " + pos +  " | " + newUl.childNodes[pos].innerHTML);
			searchValue = newUl.childNodes[pos].innerHTML;
		}
	}
  }
  else if (event.code === "ArrowDown") {
	if (newUl.childNodes.length != 0) {
		pos++;
		if (pos >= newUl.childNodes.length) {
			pos = 0;
			newUl.childNodes[pos].style.backgroundColor = suggestionSelectColor;
			//~ console.log("Down: " + pos +  " | " + newUl.childNodes[pos].innerHTML);
			searchValue = newUl.childNodes[pos].innerHTML;
		}
		else {
			newUl.childNodes[pos].style.backgroundColor = suggestionSelectColor;
			//~ console.log("Down: " + pos +  " | " + newUl.childNodes[pos].innerHTML);
			searchValue = newUl.childNodes[pos].innerHTML;
		}
	} 
  }
  else {
	if (event.code != "Enter") {
		pos = -1;	
	}
  }
  
  if (pos < 0) {
	searchValue = searchBar.value;
	splitValue = searchValue.split(" ");
  }
  
  if (event.code === "Enter") {
	  //~ console.log("pos: " + pos);
	  //~ console.log("Inside: " + searchValue);
    // COMMANDS
    if (splitValue[0].charAt(0) == "/") {
      let command = splitValue.shift();
      let searchText = splitValue.join(" ");
      switch (command.substring(1)) {
        case 'a': //Amazon
          window.open("https://www.amazon.com/s?k=" + searchText, "_self") // Working on this part ATM!
          break;
        case 'yt': //YouTube
          window.open("https://www.youtube.com/results?search_query=" + searchText, "_self");
          break;
        case 'g': //Google
          window.open("https://www.google.com/search?q=" + searchText, "_self");
          break;
        case 'github': //Github Search
          window.open("https://github.com/search?q=" + searchText, "_self");
          break;
        case 'ddg': //DuckDuckGo
          window.open("https://duckduckgo.com/?q=" + searchText, "_self");
          break;
        case 'steam': //Steam
          window.open("https://store.steampowered.com/search/?term=" + searchText, "_self");
          break;
        case 'sof': //StackOverFlow
          window.open("https://stackoverflow.com/search?q=" + searchText, "_self");
          break;
        case 'reddit':
          window.open("https://old.reddit.com/search/?q=" + searchText, "_self");
          break;
        case 'subreddit':
          window.open("https://old.reddit.com/r/" + searchText, "_self");
          break;
        case 'umb': //University of Massachusetts Boston Search
          window.open("https://www.umb.edu/search?q=" + searchText, "_self");
          break;
      }
    }
    else {
      window.open("https://www.google.com/search?q=" + searchValue, "_self");
    }
  }
  
  console.log("pos: " + pos);
 
});

let search_terms = ['apple', 'battery', 'cheese', 'what', 'huh', 'audio', 'Once upon a time', 'ABCDEFGHIJKL', 'xxx', 'banana', 'bowling'];
function autocompleteMatch(input) {
  if (input == '') {
    return [];
  }
  let reg = new RegExp(input, 'i');

  function check_term(term) {
    if (term.match(reg)) {
      return term;
    }
  }

  return search_terms.filter(check_term);
}

let newUl = document.createElement("ul");

function showResults(val) {
  let result = document.getElementById("searchSuggestion");
  let terms = autocompleteMatch(val);
  let limit = 6;
  
  newUl.innerHTML = '';
  
	
  for (let i = 0; i < terms.length; i++){
	if (i < limit) {
		let newLi = document.createElement("li");
		let text = document.createTextNode(terms[i]);
		newLi.appendChild(text);
		newLi.style.borderBottom = "1px solid black";
		newUl.appendChild(newLi);
	}
  }
  
  if (newUl.lastChild) {
	  newUl.lastChild.style.borderBottom = "";
  }
  
  result.appendChild(newUl);
 
}

document.addEventListener('click', function(event){
	let searchSuggestion = document.querySelectorAll("#searchSuggestion li");
	console.log(event.target);
	for (let i = 0; i < searchSuggestion.length; i++) {
		if (event.target != searchSuggestion[i]) {
			searchSuggestion[i].style.display = "none";
		}
	}
	if (event.target == searchBar) {
		showResults(searchValue);
	}
	
	
});





document.addEventListener('mouseover', function(event) {
	let highlightCursor = document.querySelectorAll("#searchSuggestion li");
	let target = autocompleteMatch(event.target.innerHTML);

	for (let i = 0; i < search_terms.length; i++) {
		if (highlightCursor[i] != null) {
			let text = '' + highlightCursor[i].innerHTML; 
			if (target[0] == text) {
				highlightCursor[i].style.backgroundColor = suggestionSelectColor;
			}
			else {
				highlightCursor[i].style.backgroundColor = "white";
			}	
		}
	}
	
});














