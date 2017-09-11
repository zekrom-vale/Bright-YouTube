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
		pros(["https://www.youtube.com/*"], YTB);
	});
	GAME.addEventListener('change', ()=>{
		pros(["https://gaming.youtube.com/*"], GAME);
	});
	EMB.addEventListener('change', ()=>{
		var url= ["https://www.youtube-nocookie.com/embed/*"/*, "https://www.youtube.com/embed/*"*/];
		pros(url, EMB);
	});
	TWCH.addEventListener('change', ()=>{
		pros(["https://www.twitch.tv/*"], TWCH);
	});
	FILE.addEventListener('change', ()=>{
		pros(["file://*/*"], FILE);
	});
	ALL.addEventListener('change', ()=>{
		pros(["*://*/*"], ALL);
		permReSet(ALL.checked);
	});
});
function pros(url=undefined, ent, per=undefined){
	var obj={};
	if(url!==undefined) obj.origins= url;
	if(per!== undefined) obj.permissions= per;
	if(ent.checked){
		chrome.permissions.request(obj, granted=>{
			if(!granted) {
				ent.checked= false;
				setErr(401, `"${ent.id}"`);
			}
		});
	}
	else{
		chrome.permissions.remove(obj, removed=>{
			if(!removed){
				ent.checked= true;
				setErr(404.1, `"${ent.id}"`);
			}
		});
	}
}