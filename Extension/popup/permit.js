document.addEventListener('DOMContentLoaded', ()=>{
	const YTB= document.getElementById('YT'),
	GAME= document.getElementById('Game'),
	EMB= document.getElementById('embed'),
	TWCH= document.getElementById('Twitch'),
	ALL= document.getElementById('All');
	//NOT global and must be delayed!
	
	document.getElementById('exp').addEventListener('click', ()=>{
		const PRMT= document.getElementById('permit');
		PRMT.style.display= PRMT.style.display==''? 'none': '';
	});
	//Set
	BROWSER.permissions.getAll(callback=>{
		console.log(callback.origins);
		info= callback.origins.toString();
		if(info.includes("www.youtube.com/*")) YTB.checked= true;
		if(info.includes("gaming.youtube.com/*")) GAME.checked= true;
		if(info.includes("youtube-nocookie.com/*")) EMB.checked= true;
		if(info.includes("twitch.tv/*")) TWCH.checked= true;
		if(info.includes("<all_urls>")) ALL.checked= true;
	});
	//End Set
	YTB.addEventListener('change', ()=>{
		YTB.checked? rYT(YTB): dYT(YTB);
	});
	GAME.addEventListener('change', ()=>{
		GAME.checked? rGame(GAME): dGame(GAME);
	});
	EMB.addEventListener('change', ()=>{
		EMB.checked? rEmbed(EMB): dEmbed(EMB);
	});
	TWCH.addEventListener('change', ()=>{
		TWCH.checked? rTwitch(TWCH): dTwitch(TWCH);
	});
	ALL.addEventListener('change', ()=>{
		ALL.checked? rAll(ALL,YTB,GAME,EMB,TWCH): dAll(ALL,YTB,GAME,EMB,TWCH);
	});
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
//Request
//Any path is ignored.
function rYT(YTB){
	BROWSER.permissions.request({
		origins: ["https://www.youtube.com/watch*"]
	}, granted=>{
		if(!granted) {
			YTB.checked= false;
			BROWSER.storage.local.set({'Err': {'time':Date(), 'code':401, 'text':`"${YTB.id}"`}});
		}
	});
}
function rGame(GAME){
	BROWSER.permissions.request({
		origins: ["https://gaming.youtube.com/watch*"]
	}, granted=>{
		if(!granted){
			GAME.checked= false;//Error in response to permissions.request: ReferenceError: date is not defined
			BROWSER.storage.local.set({'Err': {'time':Date(), 'code':401, 'text':`"${GAME.id}"`}});
		}
	});
}

function rEmbed(EMB){
	BROWSER.permissions.request({
		origins: ["https://www.youtube-nocookie.com/embed/*"/*, "https://www.youtube.com/embed/*"*/]// cannot be removed
	}, granted=>{
		if(!granted) {
			EMB.checked= false;
			BROWSER.storage.local.set({'Err': {'time':Date(), 'code':401, 'text':`"${EMB.id}"`}});
		}
	});
}

function rTwitch(TWCH){
	BROWSER.permissions.request({
		origins: ["https://www.twitch.tv/videos/*"]
	}, granted=>{
		if(!granted){
			TWCH.checked= false;
			BROWSER.storage.local.set({'Err': {'time':Date(), 'code':401, 'text':`"${TWCH.id}"`}});
		}
	});
}

function rAll(ALL,YTB,GAME,EMB,TWCH){
	BROWSER.permissions.request({
		origins: ["<all_urls>"]
	}, granted=>{
		if(granted) YTB.checked= GAME.checked= EMB.checked= TWCH.checked= true
		else{
			ALL.checked= false;
			BROWSER.storage.local.set({'Err': {'time':Date(), 'code':401, 'text':`"${ALL.id}"`}});
		}
	});
}

//Depretiate
function dYT(YTB){
	BROWSER.permissions.remove({
		origins: ["https://www.youtube.com/watch*"]
	}, removed=>{
		if(!removed){
			YTB.checked= true;
			BROWSER.storage.local.set({'Err': {'time':Date(), 'code':404.1, 'text':`"${YTB.id}"`}});
		}
	});
}
function dGame(GAME){
	BROWSER.permissions.remove({
		origins: ["https://gaming.youtube.com/watch*"]
	}, removed=>{
		if(!removed) {
			GAME.checked= true;
			BROWSER.storage.local.set({'Err': {'time':Date(), 'code':404.1, 'text':`"${GAME.id}"`}});
		}
	});
}

function dEmbed(EMB){
	BROWSER.permissions.remove({
		origins: ["https://www.youtube-nocookie.com/embed/*"/*, "https://www.youtube.com/embed/*"*/]
	}, removed=>{
		console.log(removed);
		if(!removed){
			EMB.checked= true;
			BROWSER.storage.local.set({'Err': {'time':Date(), 'code':404.1, 'text':`"${EMB.id}"`}});
		}
	});
}

function dTwitch(TWCH){
	BROWSER.permissions.remove({
		origins: ["https://www.twitch.tv/videos/*"]
	}, removed=>{
		if(!removed){
			TWCH.checked= true;
			BROWSER.storage.local.set({'Err': {'time':Date(), 'code':404.1, 'text':`"${TWCH.id}"`}});
		}
	});
}

function dAll(ALL,YTB,GAME,EMB,TWCH){
	BROWSER.permissions.remove({
		origins: ["<all_urls>"]
	}, removed=>{
		if(removed) YTB.checked= GAME.checked= EMB.checked= TWCH.checked= false
		else{
			ALL.checked= true;
			BROWSER.storage.local.set({'Err': {'time':Date(), 'code':404.1, 'text':`"${ALL.id}"`}});
		}
	});
}


/*
	chrome.permissions.onAdded.addListener(callback=>{
		document.getElementById('display').innerHTML= 'Obrained: '+ Object.values(callback);
	});
	chrome.permissions.onRemoved.addListener(callback=>{
		document.getElementById('display').innerHTML= 'Removed: '+ Object.values(callback);
	});
*/