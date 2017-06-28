document.addEventListener('DOMContentLoaded', ()=>{
	const YTB= document.getElementById('YouTube'),
	GAME= document.getElementById('Game'),
	EMB= document.getElementById('Embed'),
	TWCH= document.getElementById('Twitch'),
	ALL= document.getElementById('All'),
	FILE= document.getElementById('file');
	//Set
	chrome.permissions.getAll(callback=>{
		console.info(callback.origins);
		info= callback.origins.toString();
		if(info.includes("www.youtube.com/*")) YTB.checked= true;
		if(info.includes("gaming.youtube.com/*")) GAME.checked= true;
		if(info.includes("youtube-nocookie.com/*")) EMB.checked= true;
		if(info.includes("twitch.tv/*")) TWCH.checked= true;
		if(info.includes("file://")) FILE.checked= true;
		if(info.includes("*://*/*")) ALL.checked= true;
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
		url= ["*://*/*"];
		if(ALL.checked) reQuest(url, ALL);
		permReSet(ALL.checked);
		if(ALL.checked==false){
			chrome.permissions.getAll(callback=>{
				chrome.permissions.remove({
					origins: callback.origins
				}, removed=>{
					if(!removed){
						ent.checked= true;
						setErr(404.1, `"${ent.id}"`);
					}
				});
			});
		}
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
function permReSet(trlse){
	with(document){
		getElementById('YouTube').checked= trlse;
		getElementById('Game').checked= trlse;
		getElementById('Embed').checked= trlse;
		getElementById('Twitch').checked= trlse;
		getElementById('All').checked= trlse;
		getElementById('Dailymotion').checked= trlse;
		getElementById('hulu').checked= trlse;
		getElementById('Vimeo').checked= trlse;
		getElementById('Liveleak').checked= trlse;
		getElementById('Break').checked= trlse;
		getElementById('Netflix').checked= trlse;
		getElementById('Vine').checked= trlse;
		getElementById('Yahoo2').checked= trlse;
		getElementById('Viewster').checked= trlse;
		getElementById('Dot_tv').checked= trlse;
		getElementById('Vevo').checked= trlse;
		getElementById('Veoh').checked= trlse;
		
	}
}