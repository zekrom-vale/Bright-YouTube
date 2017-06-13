document.addEventListener('DOMContentLoaded', ()=>{
	const YTB= document.getElementById('YT'),
	GAME= document.getElementById('Game'),
	EMB= document.getElementById('embed'),
	TWCH= document.getElementById('Twitch'),
	ALL= document.getElementById('All');
	
	document.getElementById('exp').addEventListener('click', function(){
		const PRMT= document.getElementById('permit');
		PRMT.style.display= PRMT.style.display==''? 'none': '';
	});
	//Set
	BROWSER.permissions.getAll(callback=>{
		console.log(callback.origins);
		info= callback.origins.toString();
		if(info.includes("https://www.youtube.com/*")) YTB.checked= true;
		if(info.includes("https://gaming.youtube.com/*")) GAME.checked= true;
		if(info.includes("https://www.youtube-nocookie.com/*")) EMB.checked= true;
		if(info.includes("https://www.twitch.tv/*")) TWCH.checked= true;
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
});
//Request
//Any path is ignored.
function rYT(YTB){
	BROWSER.permissions.request({
		origins: ["https://www.youtube.com/watch*"]
	}, granted=>{
		if(!granted) YTB.checked= false;
	});
}
function rGame(GAME){
	BROWSER.permissions.request({
		origins: ["https://gaming.youtube.com/watch*"]
	}, granted=>{
		if(!granted) GAME.checked= false;
	});
}

function rEmbed(EMB){
	BROWSER.permissions.request({
		origins: ["https://www.youtube-nocookie.com/embed/*"/*, "https://www.youtube.com/embed/*"*/]// cannot be removed
	}, granted=>{
		if(!granted) EMB.checked= false;
	});
}

function rTwitch(TWCH){
	BROWSER.permissions.request({
		origins: ["https://www.twitch.tv/videos/*"]
	}, granted=>{
		if(!granted) TWCH.checked= false;
	});
}

function rAll(ALL,YTB,GAME,EMB,TWCH){
	BROWSER.permissions.request({
		origins: ["<all_urls>"]
	}, granted=>{
		granted? YTB.checked= GAME.checked= EMB.checked= TWCH.checked= true: ALL.checked= false;
	});
}

//Depretiate
function dYT(YTB){
	BROWSER.permissions.remove({
		origins: ["https://www.youtube.com/watch*"]
	}, removed=>{
		if(!removed) YTB.checked= true;
	});
}
function dGame(GAME){
	BROWSER.permissions.remove({
		origins: ["https://gaming.youtube.com/watch*"]
	}, removed=>{
		if(!removed) GAME.checked= true;
	});
}

function dEmbed(EMB){
	BROWSER.permissions.remove({
		origins: ["https://www.youtube-nocookie.com/embed/*"/*, "https://www.youtube.com/embed/*"*/]
	}, removed=>{
		console.log(removed);
		if(!removed) EMB.checked= true;
	});
}

function dTwitch(TWCH){
	BROWSER.permissions.remove({
		origins: ["https://www.twitch.tv/videos/*"]
	}, removed=>{
		if(!removed) TWCH.checked= true;
	});
}

function dAll(ALL,YTB,GAME,EMB,TWCH){
	BROWSER.permissions.remove({
		origins: ["<all_urls>"]
	}, removed=>{
		removed? YTB.checked= GAME.checked= EMB.checked= TWCH.checked= false: ALL.checked= true;
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