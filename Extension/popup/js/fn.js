document.addEventListener('DOMContentLoaded', ()=>{
	document.getElementById('func').addEventListener('change', ()=>{
		var fn=document.getElementById('func').value,//Order is important
		rez=fn.replace(/(\/{2}.*\n|\/\*([^*/]|\s)*\*\/|\s|Math\.((pow|round|ceil|floor|abs|log|exp|random|a?(cos|sin2?|tan)m(ax|in)|sqrt)|SQRT(1_)?2|PI|E|(LN|LOG)(10|2)E?)|setFilter|(([bv]r|sa)t|con|[rgbUWV]|o(RGB|U|W)|ic)(?!(\w|\d))|_(\w|\d)+(?!\()|var|let|(if|(if )?else)\(|[!%&(-?{-}]|true|false|undefined|null|arguments([\d+]|\.lenght)|is(NaN|Finite)(?=\(.*\)))/g,'');
		fn= fn.replace(/(window|document|evalu?|const|[Ff]unction|(chrom|toggl|Intliz)e|setPl|on(Play|Pause)|S(torageChange|HORT|TOP|TART)|clock|tick|getAvColor|fn|(inn|out)erHTML)|re(place|[sS]et|z)/g, 'return;');
		if((rez==''&&! /(\=>{|\(.?\)\=>)/.test(fn))){
			console.info(lang.fn.inOK);
			chrome.storage.sync.set({'fn':fn});
			document.getElementById('valit').innerHTML= lang.fn.saved;
		}
		else{
			console.warn(lang.fn.inval+ rez);
			document.getElementById('valit').innerHTML=lang.fn.inval+ rez;
		}
	});
});