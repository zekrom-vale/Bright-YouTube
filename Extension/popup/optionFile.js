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
	//Expand
	document.getElementById('expandM').addEventListener('click', ()=>{
		if(document.getElementById('more').style.display==''){
			document.getElementById('more').style.display= 'none';
			document.getElementById('formCSS').style.marginBottom='';
			document.getElementById('expandM').innerHTML='More';
		}
		else{
			document.getElementById('more').style.display= '';
			document.getElementById('formCSS').style.marginBottom='531px';
			document.getElementById('expandM').innerHTML='Less';
		}
	});
	//Listen
	DLMN.addEventListener('change', ()=>{
		var url=["http://www.dailymotion.com/video/*"];
		DLMN.checked? reQuest(url, DLMN): dePre(url, DLMN);
	});
	HLU.addEventListener('change', ()=>{
		var url=["https://www.hulu.com/*"];
		HLU.checked? reQuest(url, HLU): dePre(url, HLU);
	});
	VIM.addEventListener('change', ()=>{
		var url=["https://vimeo.com/*"];
		VIM.checked? reQuest(url, VIM): dePre(url, VIM);
	});
	LIVE.addEventListener('change', ()=>{
		var url=["https://www.liveleak.com/view*"];
		LIVE.checked? reQuest(url, LIVE): dePre(url, LIVE);
	});
	BRK.addEventListener('change', ()=>{
		var url=["http://www.break.com/video/*"];
		BRK.checked? reQuest(url, BRK): dePre(url, BRK);
	});
	FLIX.addEventListener('change', ()=>{
		var url=["https://www.netflix.com/"];
		FLIX.checked? reQuest(url, FLIX): dePre(url, FLIX);
	});
	VINE.addEventListener('change', ()=>{
		var url=["https://vine.co/*"];
		VINE.checked? reQuest(url, VINE): dePre(url, VINE);
	});
	YAH.addEventListener('change', ()=>{
		var url=["https://view.yahoo.com/show/*"];
		YAH.checked? reQuest(url, YAH): dePre(url, YAH);
	});
	VIE.addEventListener('change', ()=>{
		var url=["http://www.viewster.com/serie/*"];
		VIE.checked? reQuest(url, VIE): dePre(url, VIE);
	});
	DTV.addEventListener('change', ()=>{
		var url=["*://*.tv/*"];
		DTV.checked? reQuest(url, DTV): dePre(url, DTV);
	});
	VEV.addEventListener('change', ()=>{
		var url=["https://www.vevo.com/watch/*"];
		VEV.checked? reQuest(url, VEV): dePre(url, VEV);
	});
	VEHO.addEventListener('change', ()=>{
		var url=["http://www.veoh.com/*"];
		VEHO.checked? reQuest(url, VEHO): dePre(url, VEHO);
	});
});