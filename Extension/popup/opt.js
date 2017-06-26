document.addEventListener('DOMContentLoaded', (event)=>{
	document.getElementById('OnOff').addEventListener('change', function(){
		chrome.storage.sync.set({'PozOn':this.checked});
	});
	chrome.storage.sync.get(['PozOn', 'PozSkip', 'PozCSS', 'Adv', 'AdvOn'], items=>{
		document.getElementById('OnOff').checked= items.PozOn;
		//Set normal CSS
		document.getElementById('Apply').value= items.PozSkip=== true? 'ovrd,#Brt-opt': items.PozCSS.apply;
		with(items.PozCSS){//with test
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
		items.Adv=== undefined? items.Adv= undefined :document.getElementById('adv').value= items.Adv;
		document.getElementById('AdvOn').checked= items.AdvOn;
	});
	document.getElementById('formCSS').addEventListener('change', saveCSS);
	//Save advanced CSS
	document.getElementById('adv').addEventListener('change', ()=>{
		chrome.storage.sync.set({'Adv': document.getElementById('adv').value});
	});
	document.getElementById('adv').addEventListener('keypress', ()=>{
		chrome.storage.sync.set({'Adv': document.getElementById('adv').value});
	});
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
		document.getElementById('arm').checked= false;
		document.getElementById('adv').value= document.getElementById('adv').innerHTML;
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
	var ovrd= /ovrd/.test(document.getElementById('Apply').value),
	apply= ovrd=== false? document.getElementById('Apply').value: '#Brt-opt';
	chrome.storage.sync.set({'PozCSS': //Sync??
		{
			'apply': apply,
			'position': document.getElementById('position').value,
			'TB': [
				document.getElementById('TB').value,
				':',
				document.getElementById('TBn').value,
				document.getElementById('TBu').value
			],
			'RL':[
				document.getElementById('RL').value,
				':',
				document.getElementById('RLn').value,
				document.getElementById('RLu').value
			],
			'PT':[
				document.getElementById('PTn').value,
				document.getElementById('PTu').value
			],
			'PR':[
				document.getElementById('PRn').value,
				document.getElementById('PRu').value
			],
			'PB':[
				document.getElementById('PBn').value,
				document.getElementById('PBu').value
			],
			'PL':[
				document.getElementById('PLn').value,
				document.getElementById('PLu').value
			],
			'Bc': document.getElementById('Bc').value
		}
	});
	chrome.storage.sync.set({'PozSkip': ovrd});
}