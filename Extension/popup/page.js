var quit;
const BROWSER= chrome;
document.addEventListener('DOMContentLoaded', ()=>{
	gettingItem= BROWSER.storage.local.get('Active', items=>{
		if(items.Active=== false) document.getElementById('IO').checked= false;
		else if(items.Active=== 'Short'){
			document.getElementById('ST').checked= true;
			document.getElementById('IO').checked= false;
		}
	});
	document.getElementById("IO").addEventListener("change", IO);
	document.getElementById("ST").addEventListener("change", Srt);
	/* 
	document.documentElement.addEventListener("mouseleave",()=>{
		quit= setTimeout(()=>window.close(),3000);
	});
	document.documentElement.addEventListener("mouseenter", ()=>clearTimeout(quit)); //*/
	document.getElementById("close").addEventListener("click", ()=>window.close());
});
function IO(){
	BROWSER.storage.local.set({'Active': document.getElementById('IO').checked});
	document.getElementById('ST').checked= false;
	Dlt();
}
function Srt(){
	if(document.getElementById('ST').checked){
		BROWSER.storage.local.set({'Active': 'Short'});
		document.getElementById('IO').checked= false;
	}
	else document.getElementById('IO').checked= true;
	Dlt();
}
function Dlt(){
	(!document.getElementById('IO').checked)? disabled(): enabled();
}
function enabled(){
	BROWSER.browserAction.setIcon({
		path:{
			"16": "../img/YT16.png",
			"32": "../img/YT32.png",
			"64": "../img/YT64.png",
			"128": "../img/YT128.png"
		}
	});
}
function disabled(){
	BROWSER.browserAction.setIcon({
		path:{
			"16": "../img/off16.png",
			"32": "../img/off32.png",
			"64": "../img/off64.png"
		}
	});
}