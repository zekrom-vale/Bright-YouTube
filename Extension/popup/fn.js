document.addEventListener('DOMContentLoaded', ()=>{
	document.getElementById('func').addEventListener('change', ()=>{
		var fn=document.getElementById('func').value,
		rez=fn.replace(/(\d|Math\.(pow|round|ceil|floor|PI|abs|log|exp|random|a?cos|a?sin|a?tan|sqrt|atan2)|setFilter|(brt|vrt|con|sat|r|g|b|U|W|V|oRGB|ic)(?!(\w|\d))|_(\w|\d|_)+(?!\()|var|let|(if|else|if else)\(| |\(|\)|\+|\-|\=|\/|\*|\%|\!|\?|\<|\>|\,|\.|\n|\t|\|\||\&\&|\;|\:|true|false|undefined|null|\{|\})/g,'');
		fn= fn.replace(/(window|document|eval|const|chrome)/, 'return;');
		if((rez==''&&! /(\=\>\{|\((\d|\w|[,\._])?\)\=\>)/.test(fn))){
			console.info('input is OK');
			chrome.storage.sync.set({'fn':fn});
			document.getElementById('valit').innerHTML= 'Function saved';
		}
		else{
			document.getElementById('valit').innerHTML='Invalid input: '+ rez;
		}
	});
});