const BROWSER= chrome;
document.addEventListener('DOMContentLoaded', ()=>{
	document.getElementById('exp').addEventListener('change', function(){
		
	});
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
	
	
	
	document.getElementById().addEventListener('change', ()=>{});
});
//Request

function rGame(){
	BROWSER.permissions.request({
		permissions: ["https://gaming.youtube.com/watch*"]
	}, granted=>{
		if(!granted) document.getElementById('Game').checked= false
	});
}
function rChan(){
	if(document.getElementById('Game').checked=== true){
		BROWSER.permissions.request({
			permissions: ["https://gaming.youtube.com/watch*", "https://gaming.youtube.com/channel/*"]
		}, granted=>{
			if(!granted) document.getElementById('Chan').checked= false
		});
	}
	else{
		BROWSER.permissions.request({
			permissions: ["https://gaming.youtube.com/watch*"]
		}, granted=>{
			if(!granted) document.getElementById('Chan').checked= false
		});
	}
}

function rEmbed(){
	BROWSER.permissions.request({
		permissions: ["https://www.youtube.com/embed/*", "https://www.youtube-nocookie.com/embed/*",]
	}, granted=>{
		if(!granted) document.getElementById('Game').checked= false
	});
}
