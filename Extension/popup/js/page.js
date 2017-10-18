const LangsJS={};
LangsJS.en={
	'code':{
		null: '"No context": ',
		undefined: '"No context": ',
		100.7: 'Security Alert Overide: ',
		200:'OK: ',
		300: '',
		401:'Request Denied: ', 404.1:'Error, could not remove: ', 404: 'Could not find: ', 407:'Security Alert: ',
		502: 'Chromemium error: '
	},
	'Class':[
		undefined,
		'Informational',
		'Successful',
		'Redirection',
		'Client Err',
		'Server Err'
	],
	'fn':{
		'inOK':'input is OK',
		'saved':'Function saved',
		'inval': 'Invalid input: '
	}
}
LangsJS.enEx={
	'_code':{
		null: '"No context": ',
		undefined: '"No context": ',
		100.7: 'Security Alert Overide: ',
		200:'OK: ',
		300: '',
		401:'Request Denied: ', 404.1:'Error, could not remove: ', 404: 'Could not find: ', 407:'Security Alert: ',
		502: 'Chromemium error: '
	},
	'_Class':[
		undefined,
		'_Informational',
		'_Successful',
		'_Redirection',
		'_Client Err',
		'_Server Err'
	],
	'_fn':{
		'_inOK':'input is OK',
		'_saved':'Function saved',
		'_inval': 'Invalid input: '
	}
}
LangsJS.fr={
	'code':{
		null: '"Pas de contexte":',
		undefined: '"Pas de contexte":',
		100.7: 'Alerte de sécurité Overide:',
		200: 'OK:',
		300: '',
		401: 'Demande refusée:', 404.1: 'Erreur, n\'a pas pu supprimer:', 404: 'Impossible de trouver:', 407: 'Alerte de sécurité:',
		502: 'Erreur de chrominium:'
	},
	'Class':[
		'indéfini',
		'Informational',
		'Réussi',
		'Redirection',
		'Client Erreur',
		'Serveur Erreur'
	],
	'fn':{
		'inOK': 'entrée est OK',
		'saved': 'Fonction enregistrée',
		'inval': 'Entrée non valide:'
	}
}
//LangsJS above this
Object.freeze(LangsJS);
var lang;
try{
	document.addEventListener('DOMContentLoaded', ()=>{
		chrome.storage.sync.get('lang', items=>{
			LangsJS[items.lang];
		});
	});
}catch(e){
	console.warn('lang undefined, set to en');
	lang= LangsJS.en;
	chrome.strorage.sync.set({'lang': 'en'});
};
var n=0;
document.addEventListener('DOMContentLoaded', ()=>{
	//Rainbow
	setInterval(()=>document.getElementById('setRb').innerHTML= `.rb{filter:hue-rotate(${n=n<=360? n+2: 0}deg)}`, 200);
	chrome.storage.local.get(['Active', 'Auto'], items=>{
		if(items.Active===false) document.getElementById('IO').checked= false;
		else if(items.Active=== 'Short'){
			document.getElementById('ST').checked= true;
			document.getElementById('IO').checked= false;
		}
		else if(items.Auto===false) document.getElementById('Auto').checked= false;
	});
	with(document){
		getElementById("IO").addEventListener("change", IO);
		getElementById("ST").addEventListener("change", Srt);
		getElementById("Auto").addEventListener("change", AutoFn);
	}
	//Get ERR
	try{
		chrome.storage.local.get('Err', items=>{//Use Object.entries(obj);
			//https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html
			items.Err.text= lang.code[code];
			items.Err.Class= lang.Class[items.Err.code.toString().charAt(0)];
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