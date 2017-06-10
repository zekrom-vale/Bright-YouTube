var quit;
document.addEventListener('DOMContentLoaded', function() {
	gettingItem= chrome.storage.local.get('Active', function(items){
		if(items.Active=== false) document.getElementById('IO').checked= false;
		else if(items.Active=== 'Short'){
			document.getElementById('ST').checked= true;
			document.getElementById('IO').checked= false;
		}
	});
	document.getElementById("IO").addEventListener("change", IO);
	document.getElementById("ST").addEventListener("change", Srt);
	document.documentElement.addEventListener("mouseleave",function(){
		quit= setTimeout(function(){
			window.close();
		},2000);
	});
	document.documentElement.addEventListener("mouseenter", function(){
		clearTimeout(quit);
	});
	document.getElementById("close").addEventListener("click", function(){
		window.close();
	});
});


function IO(){
	chrome.storage.local.set({'Active': document.getElementById('IO').checked});
	document.getElementById('ST').checked= false;
	Dlt();
}
function Srt(){
	var STc= document.getElementById('ST').checked;
	if(STc){
		chrome.storage.local.set({'Active': 'Short'});
		document.getElementById('IO').checked= false;
	}
	else document.getElementById('IO').checked= true;
	Dlt();
}

function Dlt(){
	if(document.getElementById('IO').checked=== false) disabled();
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