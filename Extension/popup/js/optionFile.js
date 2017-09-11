document.addEventListener('DOMContentLoaded', ()=>{
	const DLMN= document.getElementById('Dailymotion'),
	HLU= document.getElementById('hulu'),
	VIM= document.getElementById('Vimeo'),
	LIVE= document.getElementById('Liveleak'),
	BRK= document.getElementById('Break'),
	FLIX= document.getElementById('Netflix'),
	VINE= document.getElementById('Vine'),
	YAH= document.getElementById('Yahoo2'),
	VIE= document.getElementById('Viewster'),
	DTV= document.getElementById('Dot_tv'),
	VEV= document.getElementById('Vevo'),
	VEHO= document.getElementById('Veoh');
	chrome.permissions.getAll(callback=>{
		info= callback.origins.toString();
		if(info.includes("dailymotion.com")) DLMN.checked= true;
		if(info.includes("hulu.com")) HLU.checked= true;
		if(info.includes("vimeo.com")) VIM.checked= true;
		if(info.includes("liveleak.com")) LIVE.checked= true;
		if(info.includes("break.com")) BRK.checked= true;
		if(info.includes("netflix.com")) FLIX.checked= true;
		if(info.includes("vine.co")) VINE.checked= true;
		if(info.includes("view.yahoo.com")) YAH.checked= true;
		if(info.includes("viewster.com")) VIE.checked= true;
		if(info.includes("*.tv")) DTV.checked= true;
		if(info.includes("vevo.com")) VEV.checked= true;
		if(info.includes("veoh.com")) VEHO.checked= true;
	});
	//Listen
	DLMN.addEventListener('change', ()=>{
		pros(["http://www.dailymotion.com/video/*"], DLMN);
	});
	HLU.addEventListener('change', ()=>{
		pros(["https://www.hulu.com/*"], HLU);
	});
	VIM.addEventListener('change', ()=>{
		pros(["https://vimeo.com/*"], VIM);
	});
	LIVE.addEventListener('change', ()=>{
		pros(["https://www.liveleak.com/view*"], LIVE);
	});
	BRK.addEventListener('change', ()=>{
		pros(["http://www.break.com/video/*"], BRK);
	});
	FLIX.addEventListener('change', ()=>{
		pros(["https://www.netflix.com/"], FLIX);
	});
	VINE.addEventListener('change', ()=>{
		pros(["https://vine.co/*"], VINE);
	});
	YAH.addEventListener('change', ()=>{
		pros(["https://view.yahoo.com/show/*"], YAH);
	});
	VIE.addEventListener('change', ()=>{
		pros(["http://www.viewster.com/serie/*"], VIE);
	});
	DTV.addEventListener('change', ()=>{
		pros(["*://*.tv/*"], DTV);
	});
	VEV.addEventListener('change', ()=>{
		pros(["https://www.vevo.com/watch/*"], VEV);
	});
	VEHO.addEventListener('change', ()=>{
		pros(["http://www.veoh.com/*"], VEHO);
	});
});