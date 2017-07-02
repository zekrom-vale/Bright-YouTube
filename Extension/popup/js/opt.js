document.addEventListener('DOMContentLoaded', event=>{
	chrome.storage.sync.get('type', items=>{
		if(items.type== undefined) runSelect(['px', 'in', 'cm', 'mm', 'vw', 'vh', 'vmax', 'vmin', '%']);
		else runSelect(items.type);
	});
	if(document.querySelector('#cUnit')!== null){
		document.getElementById('cUnit').addEventListener('change', ()=>{
			var unit= document.getElementById('cUnit').value.split(/\s*,\s*/);
			chrome.storage.sync.set({'type': unit});
			runSelect(unit);
		});
	}
	document.getElementById('OnOff').addEventListener('change', function(){
		chrome.storage.sync.set({'PozOn':this.checked});
	});
	chrome.storage.sync.get(['PozOn', 'PozSkip', 'PozCSS', 'Adv', 'AdvOn'], items=>{
		document.getElementById('OnOff').checked= items.PozOn;
		//Set normal CSS
		with(items){
			document.getElementById('Apply').value= PozSkip=== true? 'ovrd,'+ PozCSS.apply: PozCSS.apply;
		}
		function SetPad(n, it, ext=0){
			var i=0;
			if(ext== true){
				document.getElementById(n).value= it[i];
				i+=2;
			}
			document.getElementById(n+ 'n').value= it[i++];
			document.getElementById(n+ 'u').value= it[i];
		}
		with(items.PozCSS){
			document.getElementById('position').value= position;
			SetPad('TB', TB, 1);
			SetPad('RL', RL, 1);
			SetPad('PT', PT);
			SetPad('PR', PR);
			SetPad('PB', PB);
			SetPad('PL', PL);
			SetPad('WH', WH);
			SetPad('Rad', Rad);
			document.getElementById('Bc').value=  Bc;
		}
		preView(items.PozCSS);
		//Set Advanced CSS
		if(items.Adv!== undefined) document.getElementById('adv').value= items.Adv;
		document.getElementById('AdvOn').checked= items.AdvOn;
	});
	document.getElementById('formCSS').addEventListener('change', saveCSS);
	//Save advanced CSS
	with(document.getElementById('adv')){
		addEventListener('change', setAdv);
		addEventListener('keypress', setAdv);
	}
	function setAdv(){
		chrome.storage.sync.set({'Adv': this.value});
	}
	document.getElementById('AdvOn').addEventListener('change', function(){
		chrome.storage.sync.set({'AdvOn':this.checked});
	});
	//Reset Key
	document.getElementById('arm').addEventListener('change', function(){
		document.getElementById('reset').disabled=this.checked=== true? false: true;
	});
	document.getElementById('reset').addEventListener('click', function(){
		this.disabled= true;
		this.value= 'Cleared';
		with(document){
			getElementById('arm').checked= false;
			getElementById('adv').value= getElementById('adv').innerHTML;
		}
		chrome.storage.sync.set({'Adv': document.getElementById('adv').value});
		setTimeout(()=>{
			this.value= 'Reset';
		}, 1000);
	});
	document.getElementById('Nreset').addEventListener('click', function(){
		document.getElementById('formCSS').reset();
		saveCSS();
	});
});

//Save Normal CSS
function saveCSS(){
	with(document.getElementById('Apply')){
		var ovrd= /ovrd/.test(value),
		apply= ovrd=== false? value: value.replace('ovrd,','');
	}
	var items= {PozCSS:{}, PozSkip: ovrd};
	items.PozCSS.position= document.getElementById('position').value;
	items.PozCSS.TB= Pad('TB', 1);
	items.PozCSS.RL= Pad('RL', 1);
	items.PozCSS.PT= Pad('PT');
	items.PozCSS.PR= Pad('PR');
	items.PozCSS.PB= Pad('PB');
	items.PozCSS.PL= Pad('PL');
	items.PozCSS.WH= Pad('WH');
	items.PozCSS.Rad= Pad('Rad');
	items.PozCSS.Bc= document.getElementById('Bc').value;
	items.PozCSS.apply= apply;
	chrome.storage.sync.set(items);
	preView(items.PozCSS);
}
function Pad(n, ext=0){
	var arr= [
		document.getElementById(n+ 'n').value,
		document.getElementById(n+'u').value
	];
	if(ext== true) arr= [document.getElementById(n).value,':'].concat(arr);
	return arr;
}
function runSelect(type){
	var div= document.createElement('div'),
	i,
	select= document.getElementsByClassName('unit');
	for(i in type){
		let unit= document.createElement('option');
		unit.value= unit.innerHTML= type[i];
		div.appendChild(unit);
	}
	for(i in select){
		select[i].innerHTML= div.innerHTML;
	}
	if(document.querySelector('#cUnit')!== null) document.getElementById('cUnit').value= type.join(', ');
}
function preView(PozCSS){
	with(PozCSS){
		document.getElementById('Brt-FS').innerHTML= `.Brt-FxDiv{
	padding-top:${PT.join('')};		padding-right:${PR.join('')};
	padding-bottom:${PB.join('')};	padding-left:${PL.join('')};
	width:${WH.join('')};	height:${WH.join('')};
	border-radius:${Rad.join('')};
	background:${Bc}
}
#Brt-opt{
	width:${WH.join('')};
	height:${WH.join('')};
	margin:0
}`
	}
}