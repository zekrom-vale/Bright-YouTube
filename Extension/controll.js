var oldRgb=140,
clock;
const DLY=1500,
VID= document.getElementsByTagName('video')[0],
//Canvas
SUB=0,
VAS= document.createElement('canvas'),
CONT= VAS.getContext && VAS.getContext('2d', {willReadFrequently:true});
VAS.id= 'Brt-canvas',
PLY= setPl();
setTimeout(()=>{
	if(document.querySelector('video')!== null)	chrome.storage.local.get('Active', items=>{Intlize(items);});
}, 1500);

function Intlize(items){
	switch(typeof items.Active){
		case 'undefined':
			throw new ReferenceError('Active is not defined, forced to true');
			chrome.storage.local.set({'Err': {'time':Date(), 'code':404, 'text':'Active und, overiden'}});
			chrome.storage.local.set({'Active': true});
			items.Active= true;		//fall-through
		case 'boolean':
			VID.addEventListener('canplay',()=>{
			//Style
				let Style= document.createElement('style');
				Style.id= 'Brt-YT';
				VID.appendChild(Style);
			//Canvas
				VID.appendChild(VAS);
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
							document.documentElement.appendChild(opt);
							//style
						}
						let sheet= document.createElement('style');
						sheet.id= 'Brt-FS';
						if(items.AdvOn=== false){
sheet.innerHTML= `.Brt-Fixed{
	position:${items.PozCSS.position};\n	${items.PozCSS.TB.join('')};
	${items.PozCSS.RL.join('')};\n	${items.PozCSS.PT.join('')};
	${items.PozCSS.PR.join('')};\n	${items.PozCSS.PB.join('')};
	${items.PozCSS.PL.join('')}
}
${items.PozCSS.apply}{
	${items.PozCSS.Bc}
}`;
						}
						else sheet.innerHTML= items.Adv;
						opt.addEventListener("change", function(){
							chrome.storage.local.set({'Active': this.checked});
							console.log('switch');
						});
					}
					else console.info('[OFF] Inline IO, User specification')
				});
			}, {once:true});
	}
}
function setPl(){
	try{
		if(/youtube/.test(window.location.hostname)){
			var PLY= document.getElementsByClassName('ytp-play-button')[0];
		}else if(/twitch/.test(window.location.hostname)){
			var PLY=document.getElementsByClassName('player-icon-pause')[0];
		}
		/* "//*"= on "/*"= off	//More options!
		else if(/___domain___/.test(window.location.hostname)){
			var PLY=document.getElementsByClassName('___class play button___')[0];
		}//*/
		else if(document.querySelector('#playpause')!== null){
			var PLY= document.querySelector('#playpause');
			console.info('Got normal HTML5 video button');
		}else{
			PLY= false;
			throw new ReferenceError('No button found');
		}
	}catch(e){
		PLY= false;
		console.warn(e);
	}
	return PLY;
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
		if(changes.Active.newValue=== true) START();
		else if(changes.Active.newValue=== false) STOP();
		else if(changes.Active.newValue== 'Short'){
			console.info('[STOP] User specification');
			SHORT();
		}
	}catch(e){}
}
//End Active?
//STP
function SHORT(){
	VID.style.willChange= 'auto';
	onPause();
	VID.removeEventListener('play', onPlay);
	VID.removeEventListener('pause', onPause);
	chrome.storage.onChanged.removeListener(StorageChange);
	VID.removeChild(VAS);
	VID.removeChild(document.getElementById('Brt-YT'));
	VID.style.willChange= '';
}
function STOP(){
	VID.style.willChange= 'auto';
	onPause();
	VID.removeEventListener('play', onPlay);
	VID.removeEventListener('pause', onPause);
	document.getElementById('Brt-YT').innerHTML= '';
}
function START(){
	VID.style.willChange= 'filter';
	clearInterval(clock);
	clock= setInterval(evalu, DLY);
	toggle();
	VID.addEventListener('play', onPlay);
	VID.addEventListener('pause', onPause);
}
//End STP
function evalu(){
	if(document.getElementsByClassName('audio_only_div')[0]){
		SHORT();
		console.info('[STOP] audio_only detected');
		return;
	}
	if(VID.style.filter!='' || VID.readyState< 4) return;
	if(document.webkitHidden || document.hidden) return;
	//security
	if(isNaN(oldRgb)){
		console.warn('Varables ilegaly modifyed');
		clearInterval(clock);
		let warning= confirm("Variables illegally modified, possibly malicious code.  Do you want to Reset and Continue?");
		if(warning=== true){
			console.warn('Continuing');
			oldRgb= rgb= 140;
			clock= setInterval(evalu, DLY);
			chrome.storage.local.set({'0': true});
			chrome.storage.local.set({'Err': {'time':Date(), 'code':100.7, 'text':'Varables ilegaly modifyed'}});
		}
		else{
			SHORT();
			chrome.storage.local.set({'Err': {'time':Date(), 'code':407, 'text':'Varables ilegaly modifyed'}});
			return;
		}
	}
	//End security
	document.getElementById('Brt-YT').innerHTML= '';
	var av= getAvColor();
	var U= (av.r+av.g+av.b)/3,
	W= 0.2126*av.r+ 0.7152*av.g+ 0.0722*av.b,
	rgb= 255-(.9*U+.1*W);
	//*
	console.groupCollapsed('%crgb: %.2f', "color:blue",rgb);
	console.info(av);
	console.info('Unweighted rgb(U): %.5f', U);
	console.info('Weighted rgb(W): %f.5', W);
	console.info('Diference (U-W): %f.5', U-W);
	console.info('rgb: %f.5', rgb);
	console.trace('from');
	console.timeStamp('time');
	console.groupEnd();//*/
	var IC= 1;
	const inc= 1;
	if(rgb< 254.9 && rgb> 20){
		while(IC< 10){
			let ic= IC;
			setTimeout(tick(ic, rgb, U, W/*, r, g, b*/), (DLY*ic)/10);
			IC+= inc;
		}
		oldRgb= rgb;
	}
	else if(rgb<= 20) setFilter(1, 1);
}

function tick(ic, rgb, U, W/*, r, g, b*/){
	//More calibration required
	let V= oldRgb*(1-ic) + rgb*ic,
	X= 0.0266813*V -6;
	let PN= X<0? -1: 1;
	var brt= PN*0.473474*Math.pow(Math.abs(X), 1/7)+ 1.33771,
	/*		Anomaly
too dark
	248.8117272654424

too bright
	244.29555905921788
	245.78281672545228
	246.01222483370788
	
	*/
	W2= .8*U+ .2*W
	vrt=W2<= 249? 0: W2<353.5? (W2-249)/15: W2<=354.5? .3: -(((W2-254.5)/10)+.3);
	con=sat= 1;
	setFilter(brt, vrt, con, sat);
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
	let o= (VID.clientWidth<= 550)? 0:1;
	var height= VAS.height= VID.clientHeight-SUB*2*o,
	width= VAS.width= VID.clientWidth-SUB*2*o;
	CONT.drawImage(VID, SUB*o, SUB*o, width, height,0,0,width,height);//hardware acceleration
    data= CONT.getImageData(0,0, width, height);
	var i= r= g= b= a= C= 0;
	while(i< data.data.length){
		r+= data.data[i];
		g+= data.data[i+1];
		b+= data.data[i+2];
		//a+= data.data[i+3];
		i+= Math.round(Math.random()*20 +1)*4;
		C++;
	}
	return {'r':r/C, 'g':g/C, 'b':b/C, 'C':C};
}
//Indicate
function toggle(poz= true){
	if(PLY!= false){
		poz?PLY.classList.add('active'):PLY.classList.remove('active');
	}
}