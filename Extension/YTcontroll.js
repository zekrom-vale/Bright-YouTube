document.documentElement.addEventListener('yt-navigate-finish', ()=>{
	//Remove excess nodes
	if(document.querySelector('video')== null){
		SHORT();
		return;
	}
	if(document.querySelector('#Brt-canvas')!== null 
		&& document.querySelector('#Brt-YT')!== null
		&& typeof CSfn== 'function'
		&& typeof clock!= 'undefined'){
			return;
	}
	//*
	function removeIfNn(Q){
		if(document.querySelector(Q)!== null){
			let parent= document.getElementsByTagName('video')[0],
			child= document.querySelector(Q);
			parent.removeChild(child);
		}
	}
	removeIfNn('#Brt-FS');
	removeIfNn('#Brt-canvas');
	removeIfNn('#Brt-YT');
	removeIfNn('#Brt-opt'); //*/
	window.oldRgb= window.oldU= window.oldW= 140;
	window.clock;
	window.DLY=1500;
	window.FN;
	window.CSfn= function(ic, rgb, U, W, r, g, b, oRGB, oW, oU){
		var V= oRGB*(1-ic) + rgb*ic;
		let _X= 0.0266813*V -6,
		_PN= _X<0? -1: 1;
		var brt= _PN*0.473474*Math.pow(Math.abs(_X), 1/7)+ 2.2,
		vrt=V<= 249? 0: V<253.5? (V-249)/15: V<=254.5? .3: -(((V-254.5)/10)+.3);
		con=sat= 1;
		setFilter(brt, vrt, con, sat);
	}
	chrome.storage.sync.get('fn', items=>{getFN(items)});
	setTimeout(()=>{
		if(document.querySelector('video')!== null)	chrome.storage.local.get('Active', items=>{Intlize(items);});
	}, 1500);
	console.log('navigated');
});
//Navigation is triggered regardless of DOM load
/* var oldRgb= oldU= oldW= 140,
clock,
DLY=1500,
//Canvas
FN;
function CSfn(ic, rgb, U, W, r, g, b, oRGB, oW, oU){
	var V= oRGB*(1-ic) + rgb*ic;
	let _X= 0.0266813*V -6,
	_PN= _X<0? -1: 1;
	var brt= _PN*0.473474*Math.pow(Math.abs(_X), 1/7)+ 2.2,
	vrt=V<= 249? 0: V<253.5? (V-249)/15: V<=254.5? .3: -(((V-254.5)/10)+.3);
	con=sat= 1;
	setFilter(brt, vrt, con, sat);
}
chrome.storage.sync.get('fn', items=>{getFN(items)}); */
function getFN(items){
	try{
		if(items.fn==undefined) throw new ReferenceError('fn is undefined');
		else{
			rez= items.fn.replace(/(\/{2}.*\n|\/\*([^*/]|\s)*\*\/|\s|Math\.((pow|round|ceil|floor|abs|log|exp|random|a?(cos|sin2?|tan)m(ax|in)|sqrt)|SQRT(1_)?2|PI|E|(LN|LOG)(10|2)E?)|setFilter|(([bv]r|sa)t|con|[rgbUWV]|o(RGB|U|W)|ic)(?!(\w|\d))|_(\w|\d)+(?!\()|var|let|(if|(if )?else)\(|[!%&(-?{-}]|true|false|undefined|null|arguments([\d+]|\.lenght)|is(NaN|Finite)(?=\(.*\)))/g,'');
			items.fn= items.fn.replace(/(window|document|evalu?|const|[Ff]unction|(chrom|toggl|Intliz)e|setPl|on(Play|Pause)|S(torageChange|HORT|TOP|TART)|clock|tick|getAvColor|fn|(inn|out)erHTML)|re(place|[sS]et|z)/g, 'return;');
			if(rez==''&&! /(\=>{|\(.?\)\=>)/.test(fn)){
				var fn= items.fn;
			}
			else{
				items.fn= undefined;
				var warn= '[BREACH DETECTED]Custom function is invalid, bypased first checheck';
				chrome.storage.local.set({'Err': {'time':Date(), 'code':407, 'text':warn}});
				alert(warn+ ':\n'+ rez);
				throw new SyntaxError(`%c${warn}:\n`+ rez, 'font-weight:bold');
			}
		}
	}catch(e){
		console.warn(e);
		return;
	}
	window.CSfn= new Function("ic", "rgb", "U", "W", "r", "g", "b", "oRGB", "oW", "oU", fn);
}
setTimeout(()=>{
	if(document.querySelector('video')!== null)	chrome.storage.local.get('Active', items=>{Intlize(items);});
}, 1500);

function Intlize(items){
	switch(typeof items.Active){
		case 'undefined':
		case 'null':
			throw new ReferenceError('Active is not defined, forced to true');
			chrome.storage.local.set({
				'Err':{
					'time':Date(),
					'code':404,
					'text':'Active und, overiden'
				},
				'Active': true
			});
			reSet();
			items.Active= true;		//fall-through
		case 'boolean':
			document.getElementsByTagName('video')[0].addEventListener('canplay', items=>{
				Int2(items);
			}, {once: true});
	}
}
function Int2(){
	let VAS= document.createElement('canvas');
	VAS.id= 'Brt-canvas';
	document.getElementsByTagName('video')[0].appendChild(VAS);
	//Style
		let Style= document.createElement('style');
		Style.id= 'Brt-YT';
		document.getElementsByTagName('video')[0].appendChild(Style);
	//Canvas
		chrome.storage.onChanged.addListener(StorageChange);
		if(items.Active) START();
	//In line IO
		chrome.storage.sync.get(['PozOn', 'PozSkip', 'PozCSS', 'Active', 'Adv', 'AdvOn'], items=>{
			if(items.PozOn!== false){
				var opt= document.createElement('input');
				opt.type= 'checkbox';
				opt.checked= items.Active;
				opt.id= 'Brt-opt';
				if(document.querySelector('#menu-container')!== null
					&& items.PozSkip!== true){
						document.getElementById('menu-container').appendChild(opt);
				}
				else{
					opt.classList.add('Brt-Fixed');
					var div= document.createElement('div');
					div.classList.add('Brt-FxDiv');
					div.appendChild(opt);
					document.documentElement.appendChild(div);
					//style
				}
				var sheet= document.createElement('style');
				sheet.id= 'Brt-FS';
				if(items.AdvOn!== true){
					with(items.PozCSS){
sheet.innerHTML= `.Brt-FxDiv{
	position:${position};
	${TB.join('')};	${RL.join('')};
	padding-top:${PT.join('')};	padding-right:${PR.join('')};
	padding-bottom:${PB.join('')};	padding-left:${PL.join('')};
	width:${WH.join('')};	height:${WH.join('')};
	z-index:16644;\n	border-radius:${Rad.join('')};
	background:${Bc}
}
${apply}{
	width:${WH.join('')};
	height:${WH.join('')};
	margin:0
}`;
				}
			}
			else sheet.innerHTML= items.Adv;
			document.documentElement.appendChild(sheet);
			if(items.Active!= false) opt.checked= true;
			opt.addEventListener("change", function(){
				chrome.storage.local.set({'Active': this.checked});
			});
		}
		else console.info('[OFF] Inline IO, User specification')
	});
}
//Active?
function onPlay(){
	clearInterval(clock);
	clock= setInterval(evalu, DLY);
	toggle();
}

function onPause(){
	clearInterval(clock);//Sometimes fails
	toggle(false);
}

function StorageChange(changes){
	try{
		with(changes.Active){
			if(newValue== true) START();
			else if(newValue== false) STOP();
			else if(newValue== 'Short'){
				console.info('[STOP] User specification');
				SHORT();
			}
		}
	}catch(e){}
}
//End Active?
//STP
function SHORT(){
	onPause();
	with(document.getElementsByTagName('video')[0]){
		style.willChange= 'auto';
		removeEventListener('play', onPlay);
		removeEventListener('pause', onPause);
		removeChild(document.getElementById('Brt-canvas'));
		removeChild(document.getElementById('Brt-YT'));
		style.willChange= '';
	}
	chrome.storage.onChanged.removeListener(StorageChange);
}
function STOP(){
	onPause();
	with(document.getElementsByTagName('video')[0]){
		style.willChange= 'auto';
		removeEventListener('play', onPlay);
		removeEventListener('pause', onPause);
	}
	document.getElementById('Brt-YT').innerHTML= '';
}
function START(){
	document.getElementsByTagName('video')[0].style.willChange= 'filter';
	clearInterval(clock);
	clock= setInterval(evalu, DLY);
	toggle();
	with(document.getElementsByTagName('video')[0]){
		addEventListener('play', onPlay);
		addEventListener('pause', onPause);
	}
}
//End STP
function evalu(){
	if(document.getElementsByClassName('audio_only_div')[0]){
		SHORT();
		console.info('[STOP] audio_only detected');
		return;
	}
	if(document.getElementsByTagName('video')[0].style.filter!='' || document.getElementsByTagName('video')[0].readyState< 4) return;
	if(document.webkitHidden || document.hidden){
		//*
			clearInterval(clock);
			setTimeout(()=>{
				clock= setInterval(evalu, DLY);
			}, 5000);
		//*/
		return;
	}
	//security
	if(isNaN(oldRgb)){
		console.warn('Varables ilegaly modifyed');
		clearInterval(clock);
		oldRgb= 140;
		clock= setInterval(evalu, DLY);
		chrome.storage.local.set({
			'Err':{
				'time':Date(),
				'code':100.7,
				'text':'oldRgb isNaN->140'
			}
		});
	}
	document.getElementById('Brt-YT').innerHTML= '';
	var av= getAvColor(),
	U= (av.r+av.g+av.b)/3,
	W= 0.2126*av.r+ 0.7152*av.g+ 0.0722*av.b,
	rgb= 255-(.9*U+.1*W);
	/*
	with(console){
		groupCollapsed('%crgb: %.2f', "color:blue",rgb);
		info(av);
		info('Unweighted rgb(U): %.5f', U);
		info('Weighted rgb(W): %f.5', W);
		info('Difference (U-W): %f.5', U-W);
		info('rgb: %f.5', rgb);
		timeStamp('time');
		groupEnd();
	}//*/
	var IC= 1;
	const inc= 1;
	if(rgb< 254.9 && rgb> 20){
		while(IC< 10){
			let ic= IC;
			setTimeout(CSfn(ic, rgb, U, W, r, g, b, oldRgb, oldW, oldU), (DLY*ic)/10);
			IC+= inc;
		}
		oldRgb= rgb;
		oldW= W;
		oldU= U;
	}
	else if(rgb<= 20) setFilter(1, 1);
}
function setFilter(brt=1, vrt=0, con=1, sat=1){
	brt= brt==1? '': `brightness(${brt}) `;
	vrt= vrt==0? '': `invert(${vrt}) `;
	con= con==1? '': `contrast(${con}) `;
	sat= sat==1? '': `saturate(${sat})`;
	if(brt+vrt+con+sat=='') document.getElementById('Brt-YT').innerHTML='';
	else document.getElementById('Brt-YT').innerHTML= `video{\n\tfilter:${brt+ vrt+ con+ sat}\n}`;
}

function getAvColor(){
	let VID=document.getElementsByTagName('video')[0];
	var height= document.getElementById('Brt-canvas').height= VID.clientHeight,
	width= document.getElementById('Brt-canvas').width= VID.clientWidth;
	document.getElementById('Brt-canvas').getContext('2d', {willReadFrequently:true}).drawImage(VID, 0, 0, width, height,0,0,width,height);//hardware acceleration
    data= document.getElementById('Brt-canvas').getContext('2d', {willReadFrequently:true}).getImageData(0,0, width, height);
	var i= r= g= b= a= C= 0;
	while(i< data.data.length){
		r+= data.data[i];
		g+= data.data[i+1];
		b+= data.data[i+2];
		//a+= data.data[i+3];
		i+= Math.round(Math.random()*5 +1)*4;
		C++;
	}
	return {'r':r/C, 'g':g/C, 'b':b/C, 'C':C};
}
//Indicate
function toggle(poz= true){
	var PLY= document.getElementsByClassName('ytp-play-button')[0];
	if(PLY!= false){
		poz?PLY.classList.add('active'):PLY.classList.remove('active');
	}
}

//reSet
function reSet(){
	var items={
		'PozCSS': {},
		'PozOn': true
	}
	items.PozSkip= items.PozSkip= items.AdvOn= false;
	with(items){
		PozCSS.apply= '#Brt-opt.Brt-Fixed';
		PozCSS.position= 'fixed';
		PozCSS.TB= ['top', ':', 5, 'px'];
		PozCSS.RL= ['right', ':', 5, 'px'];
		PozCSS.PT= PozCSS.PR= PozCSS.PB= PozCSS.PL= [5, 'px'];
		PozCSS.Rad= items.PozCSS.WH= [20, 'px'];
		PozCSS.BC= '66ffff';
	}
	chrome.storage.sync.set(items);
}