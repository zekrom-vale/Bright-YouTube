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
		with(items.PozCSS){
			document.getElementById('position').value= position;
			document.getElementById('TB').value=  TB[0];		
			document.getElementById('TBn').value= TB[2];		
			document.getElementById('TBu').value= TB[3];
			document.getElementById('RL').value=  RL[0];		
			document.getElementById('RLn').value= RL[2];		
			document.getElementById('RLu').value= RL[3];
			document.getElementById('PTn').value= PT[0];
			document.getElementById('PTu').value= PT[1];
			document.getElementById('PRn').value= PR[0];
			document.getElementById('PRu').value= PR[1];
			document.getElementById('PBn').value= PB[0];
			document.getElementById('PBu').value= PB[1];
			document.getElementById('PLn').value= PL[0];
			document.getElementById('PLu').value= PL[1];
			document.getElementById('Bc').value=  Bc;
		}
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
	with(document){
		chrome.storage.sync.set({'PozCSS':
			{
				'apply': apply,
				'position': getElementById('position').value,
				'TB': [
					getElementById('TB').value,
					':',
					getElementById('TBn').value,
					getElementById('TBu').value
				],
				'RL':[
					getElementById('RL').value,
					':',
					getElementById('RLn').value,
					getElementById('RLu').value
				],
				'PT':[
					getElementById('PTn').value,
					getElementById('PTu').value
				],
				'PR':[
					getElementById('PRn').value,
					getElementById('PRu').value
				],
				'PB':[
					getElementById('PBn').value,
					getElementById('PBu').value
				],
				'PL':[
					getElementById('PLn').value,
					getElementById('PLu').value
				],
				'Bc': getElementById('Bc').value
			}
		});
	}
	chrome.storage.sync.set({'PozSkip': ovrd});
}
function runSelect(type){
	//['pt', 'pc', 'ch', 'em', 'rem']
	var div= document.createElement('div'),
	unit= [],
	i,
	select= document.getElementsByClassName('unit');
	for(i in type){
		unit[i]= document.createElement('option');
		unit[i].value= unit[i].innerHTML= type[i];
		div.appendChild(unit[i]);
	}
	for(i in select){
		select[i].innerHTML= div.innerHTML;
	}
	if(document.querySelector('#cUnit')!== null)document.getElementById('cUnit').value= type.join(', ');
}