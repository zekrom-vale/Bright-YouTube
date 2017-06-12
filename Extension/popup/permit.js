document.addEventListener('DOMContentLoaded', ()=>{
	document.getElementById('exp').addEventListener('click', function(){
		document.getElementById('permit').style.display= document.getElementById('permit').style.display==''? 'none': '';
	});
	//Set
	BROWSER.permissions.contains({
		origins: ["https://gaming.youtube.com/watch*"]
	}, rez=>{
		if(rez) document.getElementById('Game').checked= true;
	});
	BROWSER.permissions.contains({
		origins: ["https://www.youtube-nocookie.com/embed/*"]
	}, rez=>{
		if(rez) document.getElementById('embed').checked= true;
	});
	BROWSER.permissions.contains({
		origins: ["https://www.twitch.tv/videos/*"]
	}, rez=>{
		if(rez) document.getElementById('Twitch').checked= true;
	});
	BROWSER.permissions.contains({
		origins: ["<all_urls>"]//Exculde "https://www.youtube.com/watch*"/ reset
	}, rez=>{
		if(rez) document.getElementById('All').checked= true;
	});
	//End Set
	
	document.getElementById('Game').addEventListener('change', function(){//Extra
		this.checked? rGame(): dGame();
	});
	document.getElementById('embed').addEventListener('change', function(){
		this.checked? rEmbed(): dEmbed();
	});
	document.getElementById('Twitch').addEventListener('change', function(){
		this.checked? rTwitch(): dTwitch();
	});
	document.getElementById('All').addEventListener('change', function(){
		this.checked? rAll(): dAll();
	});
});
//Request
//Any path is ignored.
function rGame(){
	BROWSER.permissions.request({
		origins: ["https://gaming.youtube.com/watch*"]
	}, granted=>{
		if(!granted) document.getElementById('Game').checked= false;
	});
}

function rEmbed(){
	BROWSER.permissions.request({
		origins: ["https://www.youtube-nocookie.com/embed/*"]// "https://www.youtube.com/embed/*" cannot be removed
	}, granted=>{
		if(!granted) document.getElementById('embed').checked= false;
	});
}

function rTwitch(){
	BROWSER.permissions.request({
		origins: ["https://www.twitch.tv/videos/*"]
	}, granted=>{
		if(!granted) document.getElementById('Twitch').checked= false;
	});
}

function rAll(){
	BROWSER.permissions.request({
		origins: ["<all_urls>"]
	}, granted=>{
		if(!granted) document.getElementById('All').checked= false;
		else{
			document.getElementById('Game').checked= true;
			document.getElementById('embed').checked= true;
			document.getElementById('Twitch').checked= true;
		}
	});
}

//Depretiate //Not removing urls
function dGame(){
	BROWSER.permissions.remove({
		origins: ["https://gaming.youtube.com/watch*"]
	}, removed=>{
		if(!removed) document.getElementById('Game').checked= true;
	});
}

function dEmbed(){
	BROWSER.permissions.remove({
		origins: ["https://www.youtube-nocookie.com/embed/*"]
	}, removed=>{
		console.log(removed);
		if(!removed) document.getElementById('embed').checked= true;
	});
}

function dTwitch(){
	BROWSER.permissions.remove({
		origins: ["https://www.twitch.tv/videos/*"]
	}, removed=>{
		if(!removed) document.getElementById('Twitch').checked= true;
	});
}

function dAll(){
	BROWSER.permissions.remove({
		origins: ["<all_urls>"]//Eculde "https://www.youtube.com/watch*"/ reset
	}, removed=>{
		console.log(removed);
		if(!removed) document.getElementById('All').checked= true;
	});
}