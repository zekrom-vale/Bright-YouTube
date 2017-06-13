document.addEventListener('DOMContentLoaded', ()=>{
	const YTB= document.getElementById('YT'),
	GAME= document.getElementById('Game'),
	EMB= document.getElementById('embed'),
	TWCH= document.getElementById('Twitch'),
	ALL= document.getElementById('All');
	
	document.getElementById('exp').addEventListener('click', function(){
		document.getElementById('permit').style.display= document.getElementById('permit').style.display==''? 'none': '';
	});
	//Set
	BROWSER.permissions.contains({
		origins: ["https://www.youtube.com/watch*"]
	}, rez=>{
		if(rez) YTB.checked= true;
	});
	BROWSER.permissions.contains({
		origins: ["https://gaming.youtube.com/watch*"]
	}, rez=>{
		if(rez) GAME.checked= true;
	});
	BROWSER.permissions.contains({
		origins: ["https://www.youtube-nocookie.com/embed/*"]
	}, rez=>{
		if(rez) EMB.checked= true;
	});
	BROWSER.permissions.contains({
		origins: ["https://www.twitch.tv/videos/*"]
	}, rez=>{
		if(rez) TWCH.checked= true;
	});
	BROWSER.permissions.contains({
		origins: ["<all_urls>"]
	}, rez=>{
		if(rez) ALL.checked= true;
	});
	
	//End Set
	YTB.addEventListener('change', function(){//Extra
		this.checked? rYT(): dYT();
	});
	GAME.addEventListener('change', function(){//Extra
		this.checked? rGame(): dGame();
	});
	EMB.addEventListener('change', function(){
		this.checked? rEmbed(): dEmbed();
	});
	TWCH.addEventListener('change', function(){
		this.checked? rTwitch(): dTwitch();
	});
	ALL.addEventListener('change', function(){
		this.checked? rAll(): dAll();
	});
});
//Request
//Any path is ignored.
function rYT(){
	BROWSER.permissions.request({
		origins: ["https://www.youtube.com/watch*"]
	}, granted=>{
		if(!granted) YTB.checked= false;
	});
}
function rGame(){
	BROWSER.permissions.request({
		origins: ["https://gaming.youtube.com/watch*"]
	}, granted=>{
		if(!granted) GAME.checked= false;
	});
}

function rEmbed(){
	BROWSER.permissions.request({
		origins: ["https://www.youtube-nocookie.com/embed/*"/*, "https://www.youtube.com/embed/*"*/]// cannot be removed
	}, granted=>{
		if(!granted) EMB.checked= false;
	});
}

function rTwitch(){
	BROWSER.permissions.request({
		origins: ["https://www.twitch.tv/videos/*"]
	}, granted=>{
		if(!granted) TWCH.checked= false;
	});
}

function rAll(){
	BROWSER.permissions.request({
		origins: ["<all_urls>"]
	}, granted=>{
		if(!granted) ALL.checked= false;
		else{
			YTB.checked= GAME.checked= EMB.checked= TWCH.checked= true;
		}
	});
}

//Depretiate
function dYT(){
	BROWSER.permissions.remove({
		origins: ["https://www.youtube.com/watch*"]
	}, removed=>{
		if(!removed) YTB.checked= true;
	});
}
function dGame(){
	BROWSER.permissions.remove({
		origins: ["https://gaming.youtube.com/watch*"]
	}, removed=>{
		if(!removed) GAME.checked= true;
	});
}

function dEmbed(){
	BROWSER.permissions.remove({
		origins: ["https://www.youtube-nocookie.com/embed/*"/*, "https://www.youtube.com/embed/*"*/]
	}, removed=>{
		console.log(removed);
		if(!removed) EMB.checked= true;
	});
}

function dTwitch(){
	BROWSER.permissions.remove({
		origins: ["https://www.twitch.tv/videos/*"]
	}, removed=>{
		if(!removed) TWCH.checked= true;
	});
}

function dAll(){
	BROWSER.permissions.remove({
		origins: ["<all_urls>"]
	}, removed=>{
		if(!removed) ALL.checked= true;
		else{
			YTB.checked= GAME.checked= EMB.checked= TWCH.checked= false;
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