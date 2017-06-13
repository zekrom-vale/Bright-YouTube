var quit;
const BROWSER= chrome;
document.addEventListener('DOMContentLoaded', ()=>{
	BROWSER.storage.local.get('Active', items=>{
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
	
	//Get ERR
	BROWSER.storage.local.get('Err', items=>{
		switch(items.Err.code){
			case 401:
				items.Err.text= 'Request Denied: '+ items.Err.text;
				break;
			case 404.1:
				items.Err.text= 'Error, could not remove: '+ items.Err.text;
				break;
			case 404:
				items.Err.text= 'Error, could not find: '+ items.Err.text;
				break;
			case 407:
				items.Err.text= 'Security Alert: '+ items.Err.text;
				break;
			case 502:
				items.Err.text= 'Controll script Error: '+ items.Err.text;
		}
		document.getElementById('display').innerHTML= items.Err.text;
		document.getElementById('display').title= items.Err.time;
	});
	BROWSER.storage.local.get('Err', items=>{
		let d= new Date();
		d.setDate(d.getDate() - 14);
		if(Date.parse(items.Err.time)<= d) {
			console.log('old');
			BROWSER.storage.local.set({'Err': ''});
			document.getElementById('display').innerHTML='';
		}
		else console.log('not old');
		
	});
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