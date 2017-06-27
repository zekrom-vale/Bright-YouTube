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
	//End Set	//Listen
	YTB.addEventListener('change', ()=>{
		var url=["https://www.youtube.com/watch*"];
		YTB.checked? reQuest(url, YTB): dePre(url, YTB);
	});
	GAME.addEventListener('change', ()=>{
		var url= ["https://gaming.youtube.com/watch*"];
		GAME.checked? reQuest(url, GAME): dePre(url, GAME);
	});
	EMB.addEventListener('change', ()=>{
		var url= ["https://www.youtube-nocookie.com/embed/*"/*, "https://www.youtube.com/embed/*"*/];
		EMB.checked? reQuest(url, EMB): dePre(url, EMB);
	});
	TWCH.addEventListener('change', ()=>{
		var url= ["https://www.twitch.tv/videos/*"];
		TWCH.checked? reQuest(url, TWCH): dePre(url, TWCH);
	});
	FILE.addEventListener('change', ()=>{
		var url= ["file://*/*"];
		FILE.checked? reQuest(url, FILE): dePre(url, FILE);
	});
	ALL.addEventListener('change', ()=>{
		ALL.checked? rAll(ALL,YTB,GAME,EMB,TWCH): dAll(ALL,YTB,GAME,EMB,TWCH);
	});
});
//! Any path is ignored.
function reQuest(url, ent){
	chrome.permissions.request({
		origins: url
	}, granted=>{
		if(!granted) {
			ent.checked= false;
			setErr(401, `"${ent.id}"`);
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
function dePre(url, ent){
	chrome.permissions.remove({
		origins: url
	}, removed=>{
		if(!removed){
			ent.checked= true;
			setErr(404.1, `"${ent.id}"`);
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