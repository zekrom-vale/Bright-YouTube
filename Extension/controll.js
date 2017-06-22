var oldRgb= rgb=140,
clock;
const DLY=1000,
VID= document.getElementsByTagName('video')[0],
//Canvas
SUB=25,
VAS= document.createElement('canvas'),
CONT= VAS.getContext && VAS.getContext('2d', {alpha:false, willReadFrequently:true, premultipliedAlpha:false, antialias: false});
VAS.id= 'Brt-canvas',
PLY= setPl();
setTimeout(()=>{//Detect if vid does not exist.
	chrome.storage.local.get('Active', function(items){Intlize(items);});
}, 1500);

function Intlize(items){
	switch(typeof items.Active){
		case 'undefined':
			chrome.storage.local.set({'Err': {'time':Date(), 'code':404, 'text':'Active und, overiden to true'}});
			chrome.storage.local.set({'Active': true});
			items.Active= true;		//fallthrough
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
			//Inline IO
				chrome.storage.sync.get(['PozOn', 'PozSkip', 'PozCSS', 'Active', 'Adv', 'AdvOn'], items=>{
					if(items.PozOn!== false){
						var opt= document.createElement('input');
						opt.type= 'checkbox';
						opt.checked= items.Active;
						opt.id= 'Brt-opt';
						if(/youtube/.test(window.location.hostname)
							&& /watch/.test(window.location.pathname)
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
	position:${items.PozCSS.position};
	${items.PozCSS.TB.join('')};
	${items.PozCSS.RL.join('')};
	${items.PozCSS.PT.join('')};
	${items.PozCSS.PR.join('')};
	${items.PozCSS.PB.join('')};
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
				});
			}, {once:true});
	}
}
function setPl(){
	//Set PLY
	try{
		if(/youtube/.test(window.location.hostname)){
			var PLY= document.getElementsByClassName('ytp-play-button')[0];
		}
		else if(/twitch/.test(window.location.hostname)){
			var PLY=document.getElementsByClassName('player-icon-pause')[0];
		}
		/* "//*"= on "/*"= off	//More options!
		else if(/___domain___/.test(window.location.hostname)){
			var PLY=document.getElementsByClassName('___class play button___')[0];
		}//*/
		else if(document.getElementsByClassName('playpause')[0]){
			var PLY= document.getElementsByClassName('playpause')[0];
		}
		else PLY= false;
	}catch(e){
		PLY= false;
	}
	return PLY;
}

//Active?
function onPlay(){
	clock= setInterval(evalu, DLY);
	toggle();
}

function onPause(){
	clearInterval(clock);
	toggle(false);
}

function StorageChange(changes){
	try{//Error in event handler for storage.onChanged: TypeError: Cannot read property 'newValue' of undefined
		if(changes.Active.newValue=== true) START();
		else if(changes.Active.newValue=== false) STOP();
		else if(changes.Active.newValue== 'Short') SHORT();
	}catch(e){}
}
//End Active?
//STP
function SHORT(){
	VID.style.willChange= 'auto';
	onPause();//Not stoping
	VID.removeEventListener('play', onPlay);
	VID.removeEventListener('pause', onPause);
	chrome.storage.onChanged.removeListener(StorageChange);//privates(this).impl of undefined
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
	clock= setInterval(evalu, DLY);
	toggle();
	VID.addEventListener('play', onPlay);
	VID.addEventListener('pause', onPause);
}
//End STP
function evalu(){
	if(document.getElementsByClassName('audio_only_div')[0]){
		SHORT();
		return;
	}
	if(VID.style.filter!='' || VID.readyState< 4) return;//Uncaught TypeError: Cannot read property 'style' of undefined
	if(document.webkitHidden || document.hidden) return;
	//security
	if(isNaN(rgb+ oldRgb)){
		
		clearInterval(clock);
		let warning= confirm("Varables ilegaly modifyed, posibly malicious code.  Do you want to Reset and Continue?");
		if(warning=== true){
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
	getAvColor();
	rgb= 255-rgb;
	/*
	console.log(rgb);//*/
	var ic= 0.1;
	const inc= 0.1;
	if(rgb< 254.9 && rgb> 20){
		if(Math.round(rgb/3)!= Math.round(oldRgb/3)){
			while(ic< 1){
				setTimeout(tick(ic), DLY*ic);
				ic+= inc;
			}
			oldRgb= rgb;
		}
		else tick(0);
	}
	else if(rgb<= 20) setFilter(1, 1);
}

function tick(ic){
	let V= oldRgb*(1-ic) + rgb*ic,
	X= 0.0266813*V -6.6303;
	let PN= X<0? -1: 1;
	var brt= PN*0.473474*Math.pow(Math.abs(X), 1/7)+ 1.53771,//247 is to dark
	vrt= 0;
	con= 1;
	sat= 1;
	setFilter(brt, vrt, con, sat);
}

function setFilter(brt=1, vrt=0, con=1, sat=1){
	brt= brt==1? '': `brightness(${brt}) `;
	vrt= vrt==0? '': `invert(${vrt}) `;
	con= con==1? '': `contrast(${con}) `;
	sat= sat==1? '': `saturate(${sat})`;
	document.getElementById('Brt-YT').innerHTML= `:root video{\n\tfilter:${brt+ vrt+ con+ sat}\n}`;
}

function getAvColor(){
	let o= (VID.clientWidth<= 550)? 0:1;
	var height= VAS.height= VID.clientHeight-SUB*2*o,
	width= VAS.width= VID.clientWidth-SUB*2*o;
	CONT.drawImage(VID, SUB*o, SUB*o, width, height,0,0,width,height);//hardware exceleration
    data= CONT.getImageData(0,0, width, height);
	
	let i= C= 0;
	while(i< data.data.length){
		rgb+= data.data[i]+ data.data[i+1]+ data.data[i+2];
		i+= Math.round(Math.random()*50 +1)*4;
		C+=3;
	}
    rgb/= C;
}
//Indicate
function toggle(poz= true){
	if(PLY!= false){
		(poz)?PLY.classList.add('active'):PLY.classList.remove('active');
	}
}