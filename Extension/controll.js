//Not for pages that handle navigation
var oldRgb= oldU= oldW= 140,
clock;
const DLY=1500,
//Canvas
SUB=0;
PLY= setPl();
var FN;
function CSfn(ic, rgb, U, W, r, g, b, oRGB, oW, oU){
	var V= oRGB*(1-ic) + rgb*ic;
	let _X= 0.0266813*V -6,
	_PN= _X<0? -1: 1;
	var brt= _PN*0.473474*Math.pow(Math.abs(_X), 1/7)+ 2.2,
	vrt=V<= 249? 0: V<253.5? (V-249)/15: V<=254.5? .3: -(((V-254.5)/10)+.3);
	con=sat= 1;
	setFilter(brt, vrt, con, sat);
}
chrome.storage.sync.get('fn', items=>{
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
});
setTimeout(()=>{
	if(document.querySelector('video')!== null)	chrome.storage.local.get('Active', items=>{Intlize(items);});
}, 1500);

function Intlize(items){
	switch(typeof items.Active){
		case 'undefined':
		case 'null':
			throw console.warn(lang.und.Active);
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
			document.getElementsByTagName('video')[0].addEventListener('canplay', items=>{
				Int2(items);
			}, {once: true});
	}
}
function Int2(items){
	let VAS= document.createElement('canvas');
	VAS.id= 'Brt-canvas';
	document.getElementsByTagName('video')[0].appendChild(VAS);
	//Style
		let Style= document.createElement('style');
		Style.id= 'Brt-YT';
		document.getElementsByTagName('video')[0].appendChild(Style);
	//Canvas
		chrome.storage.onChanged.addListener(StorageChange);
		//Start?
		chrome.storage.local.get(['Active', 'Auto'], items=>{
			if(items.Active!==false && items.Auto!==false){
				console.log(lang.stat.starting);
				START();
			}
		}
	//In line IO
		chrome.storage.sync.get(['PozOn', 'PozSkip', 'PozCSS', 'Active', 'Adv', 'AdvOn', 'Auto'], items=>{
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
			else console.info(lang.stat.inIO)
		});
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
		else if(document.querySelector('#playpause')!== null){//Or find by CSS selectors
			var PLY= document.querySelector('#playpause');
		}else{
			PLY= false;
		}
	}catch(e){
		PLY= false;
	}
	return PLY;
}
//Indicate
function toggle(poz= true){
	if(PLY!= false){
		poz?PLY.classList.add('active'):PLY.classList.remove('active');
	}
}