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
		function SetPadding(n, it, ext=false){
			var i=0;
			if(ext=== true){
				document.getElementById(n).value= it[i];
				i+=2;
			}
			document.getElementById(n+ 'n').value= it[i];
			i++;
			document.getElementById(n+ 'u').value= it[i];
		}
		with(items.PozCSS){
			document.getElementById('position').value= position;
			SetPadding('TB', TB, true);
			SetPadding('RL', RL, true);
			SetPadding('PT', PT);
			SetPadding('PR', PR);
			SetPadding('PB', PB);
			SetPadding('PL', PL);
			SetPadding('WH', WH);
			SetPadding('Rad', Rad);
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
	var items= {PozCSS:{}};
	items.PozCSS.position= document.getElementById('position').value;
	items.PozCSS.TB= Padding('TB', true);
	items.PozCSS.RL= Padding('RL', true);
	items.PozCSS.PT= Padding('PT');
	items.PozCSS.PR= Padding('PR');
	items.PozCSS.PB= Padding('PB');
	items.PozCSS.PL= Padding('PL');
	items.PozCSS.WH= Padding('WH');
	items.PozCSS.Rad= Padding('Rad');
	items.PozCSS.Bc= document.getElementById('Bc').value
	items.PozCSS.apply= apply;
	with(chrome.storage.sync){
		set(items);
		set({'PozSkip': ovrd});
	}
	preView(items.PozCSS);
}
function Padding(n, ext=false){
	var arr= [
		document.getElementById(n+ 'n').value,
		document.getElementById(n+'u').value
	];
	if(ext===true) arr= [document.getElementById(n).value,':'].concat(arr);
	return arr;
}
function runSelect(type){
	var div= document.createElement('div'),
	unit= [], i,
	select= document.getElementsByClassName('unit');
	for(i in type){
		unit[i]= document.createElement('option');
		unit[i].value= unit[i].innerHTML= type[i];
		div.appendChild(unit[i]);
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