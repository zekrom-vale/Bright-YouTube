document.addEventListener('DOMContentLoaded', function() {
	gettingItem= chrome.storage.local.get('Active', function(items){
		if(items.Active=== false) document.getElementById('IO').checked= false;
		console.log(items);
	});
	
	document.getElementById("IO").addEventListener("change", IO);
});


function IO(){
	var IOc= document.getElementById('IO').checked;
	chrome.storage.local.set({'Active': IOc}, function(){console.log('saved!')})
	if(IOc){
		delay= Number(delay);
		Initialize= setInterval(look, 1000);
	}
	else{
		clearInterval(Initialize);
		clearInterval(clock);
	}
}