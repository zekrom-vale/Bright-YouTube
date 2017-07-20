var n=0;
document.addEventListener('DOMContentLoaded', ()=>{
	//Rainbow
	setInterval(()=>{
		n=n<=360? n+2: 0;
		document.getElementById('setRb').innerHTML= '.rb{filter:hue-rotate('+ n +'deg)}';
	}, 200);
	//End Rainbow
	chrome.storage.local.get(['Active', 'Auto'], items=>{
		if(items.Active===false) document.getElementById('IO').checked= false;
		else if(items.Active=== 'Short'){
			document.getElementById('ST').checked= true;
			document.getElementById('IO').checked= false;
		}
		if(items.Auto===false) document.getElementById('Auto').checked= false;
	});
	document.getElementById("IO").addEventListener("change", IO);
	document.getElementById("ST").addEventListener("change", Srt);
	document.getElementById("Auto").addEventListener("change", AutoFn);
	//Get ERR
	try{
		chrome.storage.local.get('Err', items=>{//Use Object.entries(obj);
			with(items.Err){
				switch(code){//https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html
					case 200:
						text= 'OK: '+ text;
						break;
					case 401:
						text= 'Request Denied: '+ text;
						break;
					case 404.1:
						text= 'Error, could not remove: '+ text;
						break;
					case 404:
						text= 'Error, could not find: '+ text;
						break;
					case 407:
						text= 'Security Alert: '+ text;
						break;
					case 100.7:
						text= 'Security Alert Overide: '+ text;
						break;
					case 502:
						text= 'Chromemium error: '+ text;
						break;
					default:
						text= '"No context": '+ text;
				}
				var Class= code.toString().charAt(0);
				switch(Class){
					case '1':
						Class= 'Informational';
						break;
					case '2':
						Class= 'Successful';
						break;
					case '3':
						Class= 'Redirection';
						break;
					case '4':
						Class= 'Client Err';
						break;
					case '5':
						Class= 'Server Err';
				}
			}
			console.log(items.Err.text);//May want to encodeURI
			document.getElementById('display').innerHTML= items.Err.text+ ' '+ items.Err.code;
			document.getElementById('display').title= items.Err.time+ ': '+ items.Err.Class;
		});
		chrome.storage.local.get('Err', items=>{
			let d= new Date();
			d.setDate(d.getDate() - 4);
			if(Date.parse(items.Err.time)<= d){
				chrome.storage.local.set({'Err': ''});
				document.getElementById('display').innerHTML='';
			}
		});
	}catch(e){}
});
function setErr(code, text){
	chrome.storage.local.set({'Err': {'time':Date(), 'code':code, 'text':text}});
}
//End Get ERR
function IO(){
	chrome.storage.local.set({'Active': document.getElementById('IO').checked});
	document.getElementById('ST').checked= false;
	Dlt();
}
function Srt(){
	if(document.getElementById('ST').checked){
		chrome.storage.local.set({'Active': 'Short'});
		document.getElementById('IO').checked= false;
	}
	else document.getElementById('IO').checked= true;
	Dlt();
}
function AutoFn(){
	chrome.storage.local.set({'Auto': document.getElementById('Auto').checked});
}
function Dlt(){
	if(document.getElementById('IO').checked){
		chrome.browserAction.setIcon({
			path:{
				"16":"../img/YT16.png",
				"32":"../img/YT32.png",
				"64":"../img/YT64.png",
				"128":"../img/YT128.png"
			}
		});
	}
	else{
		chrome.browserAction.setIcon({
			path:{
				"16":"../img/off16.png",
				"32":"../img/off32.png",
				"64":"../img/off64.png"
			}
		});
	}
}