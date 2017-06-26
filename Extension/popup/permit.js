document.addEventListener('DOMContentLoaded', ()=>{
	const YTB= document.getElementById('YouTube'),
	GAME= document.getElementById('Game'),
	EMB= document.getElementById('Embed'),
	TWCH= document.getElementById('Twitch'),
	ALL= document.getElementById('All'),
	FILE= document.getElementById('file');
	//! NOT global and must be delayed!
	//Set
	chrome.permissions.getAll(callback=>{
		console.log(callback.origins);
		info= callback.origins.toString();
		if(info.includes("www.youtube.com/*")) YTB.checked= true;
		if(info.includes("gaming.youtube.com/*")) GAME.checked= true;
		if(info.includes("youtube-nocookie.com/*")) EMB.checked= true;
		if(info.includes("twitch.tv/*")) TWCH.checked= true;
		if(info.includes("file://")) FILE.checked= true;
		if(info.includes("<all_urls>")) ALL.checked= true;
	});
	//End Set
	//Listen
	YTB.addEventListener('change', ()=>{
		var url=["https://www.youtube.com/watch*"];
		YTB.checked? reQuest(url): dePre(url);
	});
	GAME.addEventListener('change', ()=>{
		var url= ["https://gaming.youtube.com/watch*"];
		GAME.checked? reQuest(url): dePre(url);
	});
	EMB.addEventListener('change', ()=>{
		var url= ["https://www.youtube-nocookie.com/embed/*"/*, "https://www.youtube.com/embed/*"*/];
		EMB.checked? reQuest(url): dePre(url);
	});
	TWCH.addEventListener('change', ()=>{
		var url= ["https://www.twitch.tv/videos/*"];
		TWCH.checked? reQuest(url): dePre(url);
	});
	FILE.addEventListener('change', ()=>{
		var url= ["file://*/*"];
		FILE.checked? reQuest(url): dePre(url);
	});
	ALL.addEventListener('change', ()=>{
		ALL.checked? rAll(ALL,YTB,GAME,EMB,TWCH): dAll(ALL,YTB,GAME,EMB,TWCH);
	});
});
//Request
//! Any path is ignored.
//Compress
function reQuest(url){
	chrome.permissions.request({
		origins: url
	}, granted=>{
		if(!granted) {
			this.checked= false;
			setErr(401, `"${this.id}"`);
		}
	});
}

function rAll(ALL,YTB,GAME,EMB,TWCH,FILE){
	chrome.permissions.request({
		origins: ["<all_urls>"]
	}, granted=>{
		if(granted) YTB.checked= GAME.checked= EMB.checked= TWCH.checked= true
		else{
			ALL.checked= false;
			setErr(401, `"${ALL.id}"`);
		}
	});
}

//Depreciate
function dePre(url){
	chrome.permissions.remove({
		origins: url
	}, removed=>{
		if(!removed){
			this.checked= true;
			setErr(404.1, `"${this.id}"`);
		}
	});
}

function dAll(ALL,YTB,GAME,EMB,TWCH,FILE){
	chrome.permissions.remove({
		origins: ["<all_urls>"]
	}, removed=>{
		if(removed) YTB.checked= GAME.checked= EMB.checked= TWCH.checked= false;
		else{
			ALL.checked= true;
			setErr(404.1, `"${ALL.id}"`);
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