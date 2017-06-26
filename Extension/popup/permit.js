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
	FILE.addEventListener('change', ()=>{
		FILE.checked? rFile(FILE): dFile(FILE);
	});
	ALL.addEventListener('change', ()=>{
		ALL.checked? rAll(ALL,YTB,GAME,EMB,TWCH,FILE): dAll(ALL,YTB,GAME,EMB,TWCH,FILE);
	});
});
//Request
//! Any path is ignored.
//Compress
function rYT(YTB){
	chrome.permissions.request({
		origins: ["https://www.youtube.com/watch*"]
	}, granted=>{
		if(!granted) {
			YTB.checked= false;
			setErr(401, `"${YTB.id}"`);
		}
	});
}
function rGame(GAME){
	chrome.permissions.request({
		origins: ["https://gaming.youtube.com/watch*"]
	}, granted=>{
		if(!granted){
			GAME.checked= false;//Error in response to permissions.request: ReferenceError: date is not defined
			setErr(401, `"${GAME.id}"`);
		}
	});
}

function rEmbed(EMB){
	chrome.permissions.request({
		origins: ["https://www.youtube-nocookie.com/embed/*"/*, "https://www.youtube.com/embed/*"*/]// cannot be removed
	}, granted=>{
		if(!granted) {
			EMB.checked= false;
			setErr(401, `"${EMB.id}"`);
		}
	});
}

function rTwitch(TWCH){
	chrome.permissions.request({
		origins: ["https://www.twitch.tv/videos/*"]
	}, granted=>{
		if(!granted){
			TWCH.checked= false;
			setErr(401, `"${TWCH.id}"`);
		}
	});
}

function rFile(FILE){
	chrome.permissions.request({
		origins: ["file://*/*"]
	}, granted=>{
		if(!granted){
			FILE.checked= false;
			setErr(401, `"${FILE.id}"`);
		}
	});
}

function rAll(ALL,YTB,GAME,EMB,TWCH,FILE){
	chrome.permissions.request({
		origins: ["<all_urls>"]
	}, granted=>{
		if(granted) YTB.checked= GAME.checked= EMB.checked= TWCH.checked= FILE.checked= true
		else{
			ALL.checked= false;
			setErr(401, `"${ALL.id}"`);
		}
	});
}

//Depretiate
function dYT(YTB){
	chrome.permissions.remove({
		origins: ["https://www.youtube.com/watch*"]
	}, removed=>{
		if(!removed){
			YTB.checked= true;
			setErr(404.1, `"${YTB.id}"`);
		}
	});
}
function dGame(GAME){
	chrome.permissions.remove({
		origins: ["https://gaming.youtube.com/watch*"]
	}, removed=>{
		if(!removed) {
			GAME.checked= true;
			setErr(404.1, `"${GAME.id}"`);
		}
	});
}

function dEmbed(EMB){
	chrome.permissions.remove({
		origins: ["https://www.youtube-nocookie.com/embed/*"/*, "https://www.youtube.com/embed/*"*/]
	}, removed=>{
		console.log(removed);
		if(!removed){
			EMB.checked= true;
			setErr(404.1, `"${EMB.id}"`);
		}
	});
}

function dTwitch(TWCH){
	chrome.permissions.remove({
		origins: ["https://www.twitch.tv/videos/*"]
	}, removed=>{
		if(!removed){
			TWCH.checked= true;
			setErr(404.1, `"${TWCH.id}"`);
		}
	});
}
function dFile(FILE){
	chrome.permissions.remove({
		origins: ["file://*/*"]
	}, removed=>{
		if(!removed){
			FILE.checked= true;
			setErr(404.1, `"${FILE.id}"`);
		}
	});
}

function dAll(ALL,YTB,GAME,EMB,TWCH,FILE){
	chrome.permissions.remove({
		origins: ["<all_urls>"]
	}, removed=>{
		if(removed) YTB.checked= GAME.checked= EMB.checked= TWCH.checked= FILE.checked= false;
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