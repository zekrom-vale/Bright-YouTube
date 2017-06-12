document.addEventListener('DOMContentLoaded', ()=>{
	/* document.getElementById('exp').addEventListener('change', function(){
		
	}); */
	document.getElementById('Game').addEventListener('change', function(){//Extra
		this.checked? rGame(): dGame();
	});
	document.getElementById('Chan').addEventListener('change', function(){//Extra
		this.checked? rChan(): dChan();
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
	
	
	
	//document.getElementById().addEventListener('change', ()=>{});
});
//Request

function rGame(){
	if(document.getElementById('Chan').checked=== true){
			BROWSER.permissions.request({
			origins: ["https://gaming.youtube.com/watch*", "https://gaming.youtube.com/channel/*"]
		}, granted=>{
			if(!granted) document.getElementById('Game').checked= false;
		});
	}
	else{
		BROWSER.permissions.request({
			origins: ["https://gaming.youtube.com/watch*"]
		}, granted=>{
			if(!granted) document.getElementById('Game').checked= false;
		});
	}
}
function rChan(){
	if(document.getElementById('Game').checked=== true){
		BROWSER.permissions.request({
			origins: ["https://gaming.youtube.com/watch*", "https://gaming.youtube.com/channel/*"]
		}, granted=>{
			if(!granted) document.getElementById('Chan').checked= false;
		});
	}
	else{
		BROWSER.permissions.request({
			origins: ["https://gaming.youtube.com/watch*"]
		}, granted=>{
			if(!granted) document.getElementById('Chan').checked= false;
		});
	}
}

function rEmbed(){
	BROWSER.permissions.request({
		origins: ["https://www.youtube.com/embed/*", "https://www.youtube-nocookie.com/embed/*"]
	}, granted=>{
		if(!granted) document.getElementById('Embed').checked= false;
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
	});
}

//Depretiate
function dGame(){
	if(document.getElementById('Chan').checked=== true){
			BROWSER.permissions.remove({
			origins: ["https://gaming.youtube.com/watch*", "https://gaming.youtube.com/channel/*"]
		}, removed=>{
			if(!removed) document.getElementById('Game').checked= true;
		});
	}
	else{
		BROWSER.permissions.remove({
			origins: ["https://gaming.youtube.com/watch*"]
		}, removed=>{
			if(!removed) document.getElementById('Game').checked= true;
		});
	}
}
function dChan(){
	if(document.getElementById('Game').checked=== true){
		BROWSER.permissions.remove({
			origins: ["https://gaming.youtube.com/watch*", "https://gaming.youtube.com/channel/*"]
		}, removed=>{
			if(!removed) document.getElementById('Chan').checked= true;
		});
	}
	else{
		BROWSER.permissions.remove({
			origins: ["https://gaming.youtube.com/watch*"]
		}, removed=>{
			if(!removed) document.getElementById('Chan').checked= true;
		});
	}
}

function dEmbed(){
	BROWSER.permissions.remove({
		origins: ["https://www.youtube.com/embed/*", "https://www.youtube-nocookie.com/embed/*"]
	}, removed=>{
		if(!removed) document.getElementById('Embed').checked= true;
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
		origins: ["<all_urls>"]
	}, removed=>{
		if(!removed) document.getElementById('All').checked= true;
	});
}