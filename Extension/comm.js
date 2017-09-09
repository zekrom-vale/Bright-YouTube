const lang={
	"warn":{
		"breach":'[BREACH DETECTED]Custom function is invalid, bypased first checheck',
		
	},
	"und":{
		"Active":'Active is not defined, forced to true'
	},
	"stat":{
		"starting": "Starting",
		"inIO": "[OFF] In line IO, User specification",
		"Short": "[STOP] User specification",
		"AudOn": "[STOP] audio_only detected",
		"VarIlg": "Variables illegally modified"
	},
	"word": {
		"START": "START",
		"STOP": "STOP",
		"SHORT": "SHORT"
	},
	"Reset": "Values successfully reset"
};
//inlineIO
function intINline(items){
	if(items.PozOn!== false){
		var opt= document.createElement('input');
		opt.type= 'checkbox';
		if(items.Auto!==false)opt.checked= items.Active;
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
		//act on undefined
		if(typeof items.AdvOn!= 'boolean') {
			reSet();
			items.AdvOn=false;
		}
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
		if(items.Active!== false && items.Auto!==false) opt.checked= true;
		if(items.Auto!==false){
			opt.setAttribute('mode', 'Local');
			opt.onchange=function(){
				chrome.storage.local.set({'Active': this.checked});
			}
		}
		else{
			opt.setAttribute('mode', 'Global');
			opt.onchange=function(){
				if(this.checked===true) START();
				else STOP();
			}
		}
	}
	else console.info(lang.stat.inIO);
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
				console.info(lang.stat.Short);
				SHORT();
			}
		}
	}catch(e){}
}
//End Active?
//STP
function SHORT(){
	console.log(lang.word.SHORT);
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
	console.log(lang.word.STOP);
	onPause();
	with(document.getElementsByTagName('video')[0]){
		style.willChange= 'auto';
		removeEventListener('play', onPlay);
		removeEventListener('pause', onPause);
	}
	document.getElementById('Brt-YT').innerHTML= '';
}
function START(){
	console.log(lang.word.START);
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
		console.info(lang.stat.AudOn);
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
		console.warn(lang.stat.VarIlg);
		clearInterval(clock);
		oldRgb= 140;
		clock= setInterval(evalu, DLY);
		chrome.storage.local.set({
			'Err':{
				'time':Date(),
				'code':100.7,
				'text': lang.stat.VarIlg
			}
		});
	}
	document.getElementById('Brt-YT').innerHTML= '';
	var av= getAvColor(),
	U= (av.r+av.g+av.b)/3,
	W= 0.2126*av.r+ 0.7152*av.g+ 0.0722*av.b,
	rgb= 255-(.9*U+.1*W);
	/*//Not in language
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


//reSet
function reSet(){
	var items={
		'PozCSS': {},
		'Adv': '/*error!*/',
		'fn': `var V= oRGB*(1-ic) + U*ic;
let _X= 0.0266813*V -6,
_PN= _X<0? -1: 1;
var brt= _PN*0.473474*Math.pow(Math.abs(_X), 1/7)+ 2.2,
//Math.pow of fraction can't have negative base
vrt=V<= 249? 0: V<253.5? (V-249)/15: V<=254.5? .3: -(((V-254.5)/10)+.3);
con=sat= 1;
/* 
can exclude any parameter 
ex(brt)
*/
setFilter(brt, vrt, con, sat);`
	}
	items.PozOn= true;
	items.PozSkip= items.PozSkip= items.AdvOn= false;
	with(items){
		PozCSS.apply= '#Brt-opt.Brt-Fixed';
		PozCSS.position= 'fixed';
		PozCSS.TB= ['top', ':', 5, 'px'];
		PozCSS.RL= ['right', ':', 5, 'px'];
		PozCSS.PT= PozCSS.PR= PozCSS.PB= PozCSS.PL= [5, 'px'];
		PozCSS.Rad= items.PozCSS.WH= [20, 'px'];
		PozCSS.Bc= '66ffff';
	}
	chrome.storage.sync.set(items);
	chrome.storage.local.set({"Active":true, "Auto": true});
	console.info(lang.Reset);
}