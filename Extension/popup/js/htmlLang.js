//may not run on En
var htmlLang={//To be translated
	'title': 'Bright YouTube Options',
	'enabled': 'Enabled',
	'short': 'Short',
	'autoStart': 'Auto Start',
	'permissions': 'Permissions',
	'permissions_Title': 'What sites to run on',
	'YT_Title': 'youtube.com/embed/* Included',
	'YTgames': 'YT Games',
	'embedded': 'Embedded',
	'dot_tv': 'Dot tv',
	'allURLs': '[NO OFF]All URLs',
	'file_Title': 'Enable also at chrome://extensions',
	'file': 'File',
	'Ilnf': 'In-line On / Off',
	'CSS':{
		'apply':{
			'head': 'Apply to:',
			'nonYT': 'Non-YouTube',
			'YT': 'YouTube',
			'both': 'Both',
			'ovYT': 'Override YouTube'
		},
		'pos':{
			'head': 'position:',
			'fix': 'fixed',
			'fix_Title': 'relative to the page',
			'abs': 'absolute',
			'abs_Title': 'relative to the window'
		},
		'top': 'top',
		'bottom': 'bottom',
		'R': 'right',
		'L': 'left',
		'pad':{
			'top': 'padding-top:',
			'R': 'padding-right:',
			'bottom': 'padding-bottom:',
			'L': 'padding-left:'
		},
		'size': 'size:',
		'backClolor': 'background-color:',
		'adv': 'CSS Style (Advanced)',
		'units': 'Custom units',
		'filter':{
			'head': '[BETA]Custom filter function',
			'JSrule': 'Limited JavaScript Rules',
			'list': `<li>Custom function variables MUST start with an underscore</li>
<li>No functions (includes arrow functions)</li>
<li>if else statements allowed</li>
<li>document, window, and getElement are all disabled</li>
<li>Most Math functions are allowed</li>
<li>
	Use <code>setFilter(brt, vrt, con, sat)</code> to set the filter
</li>`,
			'pre':`<var>r</var>average red
<var>g</var>average green
<var>b</var>average blue
<var>a</var>average alpha[DISABLED]
<var>ic</var>(0-10) pass number
<var>U</var>unweighted RGB
<var>W</var>weighted RGB
<var>oRGB</var>old RGB
<var>oU</var>old unweighted RGB
<var>oW</var>old weighted RGB</pre>`
		}
	}
}
document.addEventListener('DOMContentLoaded', ()=>{
	var allKey= document.querySelectorAll('[key]');
	console.log(allKey);
	for(var i in allKey){
		console.log(allKey[i]);
		allKey[i].innerHTML=htmlLang[allKey[i].getAttrabute('key')];
		if(allKey[i].getAttrabute('key-title')=''){
			allKey[i].title=htmlLang[allKey[i].getAttrabute('key')+'_Title'];
		}
	}
	var keyT0= document.querySelectorAll('[key-title]:not([key])');
	for(var i in keyT0){
		keyT0[i].title=htmlLang[keyT0[i].getAttrabute('key')+'_Title'];
	}
});