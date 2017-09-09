var oldRgb= oldU= oldW= 140,
clock,
DLY=1500,
FN;
function CSfn(ic, rgb, U, W, r, g, b, oRGB, oW, oU){
	var V= oRGB*(1-ic) + rgb*ic;
	let _X= 0.0266813*V -6,
	_PN= _X<0? -1: 1;
	var brt= _PN*0.473474*Math.pow(Math.abs(_X), 1/7)+ 2.2,
	vrt=V<= 249? 0: V<253.5? (V-249)/15: V<=254.5? .3: -(((V-254.5)/10)+.3);
	setFilter(brt, vrt);
}
document.documentElement.addEventListener('yt-navigate-finish', ()=>{
	if(document.querySelector('video')===null){
		STOP();
		return;
	}
	oldRgb= oldU= oldW= 140;
	chrome.storage.sync.get('fn', items=>{getFN(items)});
	if(document.querySelector('video')!== null)	chrome.storage.local.get('Active', items=>{Intlize(items);});
});
function getFN(items){
	try{
		if(items.fn==undefined) console.warn('fn is undefined');
		else{
			rez= items.fn.replace(/(\/{2}.*\n|\/\*([^*/]|\s)*\*\/|\s|Math\.((pow|round|ceil|floor|abs|log|exp|random|a?(cos|sin2?|tan)m(ax|in)|sqrt)|SQRT(1_)?2|PI|E|(LN|LOG)(10|2)E?)|setFilter|(([bv]r|sa)t|con|[rgbUWV]|o(RGB|U|W)|ic)(?!(\w|\d))|_(\w|\d)+(?!\()|var|let|(if|(if )?else)\(|[!%&(-?{-}]|true|false|undefined|null|arguments([\d+]|\.lenght)|is(NaN|Finite)(?=\(.*\)))/g,'');
			items.fn= items.fn.replace(/(window|document|evalu?|const|[Ff]unction|(chrom|toggl|Intliz)e|setPl|on(Play|Pause)|S(torageChange|HORT|TOP|TART)|clock|tick|getAvColor|fn|(inn|out)erHTML)|re(place|[sS]et|z)/g, 'return;');
			if(rez==''&&! /(\=>{|\(.?\)\=>)/.test(fn)){
				var fn= items.fn;
			}
			else{
				items.fn= undefined;
				chrome.storage.local.set({'Err': {'time':Date(), 'code':407, 'text':lang.warn.breach}});
				alert(warn+ ':\n'+ rez);
				throw new SyntaxError(`%c${lang.warn.breach}:\n`+ rez, 'font-weight:bold');
			}
		}
	}catch(e){
		console.warn(e);
		return;
	}
	window.CSfn= new Function("ic", "rgb", "U", "W", "r", "g", "b", "oRGB", "oW", "oU", fn);
}
function Intlize(items){
	switch(typeof items.Active){
		case 'undefined':
		case 'null':
			console.warn(lang.und.Active);
			chrome.storage.local.set({
				'Err':{
					'time':Date(),
					'code':404,
					'text':lang.und.Active
				},
				'Active': true
			});
			reSet();
			items.Active= true;		//fall-through
		case 'boolean':
			if(document.getElementsByTagName('video')[0].readyState>= 2) Int2(items);
			else{
				document.getElementsByTagName('video')[0].addEventListener('canplay', items=>{
					Int2(items);
				}, {once: true});
			}
	}
}
function Int2(items){
	if(document.querySelector('#Brt-canvas')===null){
		let VAS= document.createElement('canvas');
		VAS.id= 'Brt-canvas';
		document.getElementsByTagName('video')[0].appendChild(VAS);
	}
	if(document.querySelector('#Brt-YT')===null){
		let Style= document.createElement('style');
		Style.id= 'Brt-YT';
		document.getElementsByTagName('video')[0].appendChild(Style);
	}
	chrome.storage.onChanged.addListener(StorageChange);
	console.info(items.Active);
	//Add option NOT to auto start
	chrome.storage.local.get(['Active', 'Auto'], items=>{
		if(items.Active!==false && items.Auto!==false){
			console.log(lang.stat.starting);
			START();
		}
	});
	if(document.querySelector('#Brt-opt')===null){
		chrome.storage.sync.get(['PozOn', 'PozSkip', 'PozCSS', 'Active', 'Adv', 'AdvOn', 'Auto'], intINline(items));
	}
}
//Indicate
function toggle(poz= true){
	var PLY= document.getElementsByClassName('ytp-play-button')[0];
	if(PLY!= false){
		poz?PLY.classList.add('active'):PLY.classList.remove('active');
	}
}