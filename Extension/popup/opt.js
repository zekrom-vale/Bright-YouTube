document.addEventListener('DOMContentLoaded', (event)=>{
	document.getElementById('OnOff').addEventListener('change', function(){
		BROWSER.storage.sync.set({'PozOn':this.checked});
	});
	BROWSER.storage.sync.get(['PozOn', 'PozSkip', 'PozCSS', 'Adv', 'AdvOn'], items=>{
		document.getElementById('OnOff').checked= items.PozOn;
		//Set normal CSS
		document.getElementById('Apply').value= items.PozSkip=== true? 'ovrd,#Brt-opt': items.PozCSS.apply;
		document.getElementById('position').value= items.PozCSS.position;
		document.getElementById('TB').value= items.PozCSS.TB[0];		
		document.getElementById('TBn').value= items.PozCSS.TB[2];		
		document.getElementById('TBu').value= items.PozCSS.TB[3];
		document.getElementById('RL').value= items.PozCSS.RL[0];		
		document.getElementById('RLn').value= items.PozCSS.RL[2];		
		document.getElementById('RLu').value= items.PozCSS.RL[3];
		document.getElementById('PTn').value= items.PozCSS.PT[0];
		document.getElementById('PTu').value= items.PozCSS.PT[1];
		document.getElementById('PRn').value= items.PozCSS.PR[0];
		document.getElementById('PRu').value= items.PozCSS.PR[1];
		document.getElementById('PBn').value= items.PozCSS.PB[0];
		document.getElementById('PBu').value= items.PozCSS.PB[1];
		document.getElementById('PLn').value= items.PozCSS.PL[0];
		document.getElementById('PLu').value= items.PozCSS.PL[1];
		document.getElementById('Bc').value= items.PozCSS.Bc;
		//Set Advanced CSS
		items.Adv=== undefined? items.Adv= undefined :document.getElementById('adv').value= items.Adv;
		document.getElementById('AdvOn').checked= items.AdvOn;
	});
	document.getElementById('formCSS').addEventListener('change', saveCSS);
	//Save advanced CSS
	document.getElementById('adv').addEventListener('change', ()=>{
		BROWSER.storage.sync.set({'Adv': document.getElementById('adv').value});
	});
	document.getElementById('adv').addEventListener('keypress', ()=>{
		BROWSER.storage.sync.set({'Adv': document.getElementById('adv').value});
	});
	document.getElementById('AdvOn').addEventListener('change', function(){
		BROWSER.storage.sync.set({'AdvOn':this.checked});
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
		BROWSER.storage.sync.set({'Adv': document.getElementById('adv').value});
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
	BROWSER.storage.sync.set({'PozCSS': //Sync??
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
	BROWSER.storage.sync.set({'PozSkip': ovrd});
}