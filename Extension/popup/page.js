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
	var quit;
	document.documentElement.addEventListener("mouseleave",quit=>{
		quit= setTimeout(()=>window.close(),3000);
	});
	document.documentElement.addEventListener("mouseenter", quit=>clearTimeout(quit)); //*/
	document.getElementById("close").addEventListener("click", ()=>window.close() );
	//Get ERR
	BROWSER.storage.local.get('Err', items=>{//Use Object.entries(obj);
		switch(items.Err.code){//https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html
			case 200:
				items.Err.text= 'OK: '+ items.Err.text;
				break;
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
			case 100.7:
				items.Err.text= 'Security Alert Overide: '+ items.Err.text;
				break;
			case 502:
				items.Err.text= 'Controll script Error: '+ items.Err.text;
				break;
			default:
				items.Err.text= '"No context": '+ items.Err.text;
		}
		items.Err.Class= items.Err.code.toString().charAt(0);
		switch(items.Err.Class){
			case '1':
				items.Err.Class= 'Informational';
				break;
			case '2':
				items.Err.Class= 'Successful';
				break;
			case '3':
				items.Err.Class= 'Redirection';
				break;
			case '4':
				items.Err.Class= 'Client Err';
				break;
			case '5':
				items.Err.Class= 'Server Err';
		}
		console.log(items.Err.text);
		document.getElementById('display').innerHTML= items.Err.text+ ' '+ items.Err.code;
		document.getElementById('display').title= items.Err.time+ ': '+ items.Err.Class;
	});
	BROWSER.storage.local.get('Err', items=>{
		let d= new Date();
		d.setDate(d.getDate() - 4);
		if(Date.parse(items.Err.time)<= d){
			BROWSER.storage.local.set({'Err': ''});
			document.getElementById('display').innerHTML='';
		}
	});
});
function setErr(code, text){
	BROWSER.storage.local.set({'Err': {'time':Date(), 'code':code, 'text':text}});
}
//End Get ERR
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
	if(document.getElementById('IO').checked){
		BROWSER.browserAction.setIcon({
			path:{
				"16":"../img/YT16.png",
				"32":"../img/YT32.png",
				"64":"../img/YT64.png",
				"128":"../img/YT128.png"
			}
		});
	}
	else{
		BROWSER.browserAction.setIcon({
			path:{
				"16":"../img/off16.png",
				"32":"../img/off32.png",
				"64":"../img/off64.png"
			}
		});
	}
}