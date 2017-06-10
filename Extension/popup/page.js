document.addEventListener('DOMContentLoaded', function() {
	gettingItem= chrome.storage.local.get('Active', function(items){
		if(items.Active=== false) document.getElementById('IO').checked= false;
	});
	gettingItem= chrome.storage.local.get('Short', function(items){
		if(items.Short=== true) document.getElementById('ST').checked= true;
	});
	document.getElementById("IO").addEventListener("change", IO);
	document.getElementById("ST").addEventListener("change", Srt);
});


function IO(){
	var IOc= document.getElementById('IO').checked;
	chrome.storage.local.set({'Active': IOc});
	Dlt();
}
function Srt(){
	var STc= document.getElementById('ST').checked;
	chrome.storage.local.set({'Short': STc});
	Dlt();
}

function Dlt(){
	if(document.getElementById('ST').checked=== true || document.getElementById('IO').checked=== false) disabled();
	else enabled();
}

function enabled(){
	chrome.browserAction.setIcon({
		path:{
			"16": "../img/YT16.png",
			"32": "../img/YT32.png",
			"64": "../img/YT64.png",
			"128": "../img/YT128.png"
		}
	});
}
function disabled(){
	chrome.browserAction.setIcon({
		path:{
			"16": "../img/off16.png",
			"32": "../img/off32.png",
			"64": "../img/off64.png"
		}
	});
}