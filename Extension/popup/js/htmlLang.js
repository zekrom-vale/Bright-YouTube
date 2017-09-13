//may not run on En
const Langs={};
Langs.en={//To be translated
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
		}
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
//Encoding warning!
Langs.es= {};
Langs.enEX={//To be translated
	'_title': 'Bright YouTube Options',
	'_enabled': 'Enabled',
	'_short': 'Short',
	'_autoStart': 'Auto Start',
	'_permissions': 'Permissions',
	'_permissions_Title': 'What sites to run on',
	'_YT_Title': 'youtube.com/embed/* Included',
	'_YTgames': 'YT Games',
	'_embedded': 'Embedded',
	'_dot_tv': 'Dot tv',
	'_allURLs': '[NO OFF]All URLs',
	'_file_Title': 'Enable also at chrome://extensions',
	'_file': 'File',
	'_Ilnf': 'In-line On / Off',
	'_CSS':{
		'_apply':{
			'_head': 'Apply to:',
			'_nonYT': 'Non-YouTube',
			'_YT': 'YouTube',
			'_both': 'Both',
			'_ovYT': 'Override YouTube'
		},
		'_pos':{
			'_head': 'position:',
			'_fix': 'fixed',
			'_fix_Title': 'relative to the page',
			'_abs': 'absolute',
			'_abs_Title': 'relative to the window'
		},
		'_top': 'top',
		'_bottom': 'bottom',
		'_R': 'right',
		'_L': 'left',
		'_pad':{
			'_top': 'padding-top:',
			'_R': 'padding-right:',
			'_bottom': 'padding-bottom:',
			'_L': 'padding-left:'
		},
		'_size': 'size:',
		'_backClolor': 'background-color:',
		'_adv': 'CSS Style (Advanced)',
		'_units': 'Custom units',
		'_filter':{
			'_head': '[BETA]Custom filter function',
			'_JSrule': 'Limited JavaScript Rules',
			'_list': `<li>Custom function variables MUST start with an underscore</li>
<li>No functions (includes arrow functions)</li>
<li>if else statements allowed</li>
<li>document, window, and getElement are all disabled</li>
<li>Most Math functions are allowed</li>
<li>
	Use <code>setFilter(brt, vrt, con, sat)</code> to set the filter
</li>`,
			'_pre':`<var>r</var>average red
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
Langs.fr={
	'title': 'Bright YouTube Options',
	'enabled': 'Enabled',
	'short': 'Short',
	'autoStart': 'D�marrage automatique',
	'permissions': 'Autorisations',
	'permissions_Title': 'Quels sites � ex�cuter',
	'YT_Title': 'youtube.com/embed/* Inclus',
	'YTgames': 'YT Games',
	'embedded': 'Embedded',
	'dot_tv': 'Dot tv',
	'allURLs': '[NO OFF] Toutes les URL',
	'file_Title': 'Activer aussi � chrome: // extensions',
	'file': 'Fichier',
	'Ilnf': 'In-line On / Off',
	'CSS':{
		'apply':{
			'head': 'Appliquer �:',
			'nonYT': 'Non-YouTube',
			'YT': 'YouTube',
			'both': 'les deux',
			'ovYT': 'Override YouTube'
		},
		'pos': {
			'head': 'position:',
			'fix': 'fix�',
			'fix_Title': 'relatif � la page',
			'abs': 'absolu',
			'abs_Title': 'relative � la fen�tre'
		},
		'top': 'top',
		'bottom': 'bas',
		'R': 'droit',
		'L': 'left',
		'pad':{
			'top': 'padding-top:',
			'R': 'rembourrage-droit:',
			'bottom': 'padding-bottom:',
			'L': 'rembourrage-gauche:'
		}
	},
	'size': 'taille:',
	'backClolor': 'background-color:',
	'adv': 'Style CSS (Avanc�)',
	'units':' unit�s personnalis�es ',
	'filtre':{
		'head': '[BETA] Fonction de filtre personnalis�e',
		'JSrule': 'R�gles JavaScript limit�es',
		'list': `<li> Les variables de fonction personnalis�es DOIVENT commencer par un trait de soulignement </ li>
<li> Pas de fonctions (comprend les fonctions de fl�che) </ li>
<li> si d'autres instructions ont �t� autoris�es </ li>
<li> document, fen�tre et getElement sont tous d�sactiv�s </ li>
<li> La plupart des fonctions math�matiques sont autoris�es </ li>
<li>
Utilisez <code> setFilter (brt, vrt, con, sat) </ code> pour d�finir le filtre
</ li> `,
		'_pre': `<var> r </ var> rouge moyen
<var> g </ var> moyenne verte
<var> b </ var> bleu moyen
<var> a </ var> alpha moyen [DISABLED]
<var> ic </ var> (0-10) num�ro de passage
<var> U </ var> RGB non pond�r�
<var> W </ var> RGB pond�r�
<var> oRGB </ var> ancien RVB
<var> oU </ var> ancien RGB non pond�r�
<var> oW </ var> ancien RGB pond�r� </ pre> `
	}
}
Langs.it= {};
Langs.gr= {};
Langs.jp= {};
document.addEventListener('DOMContentLoaded', ()=>{
	/*chrome.storage.sync.get('lang', items=>{
		setHTML(Langs[items.lang]);
	});*/
	setHTML(Langs.fr);
});
function setHTML(L){
	var allKey= document.querySelectorAll('[key]');
	console.log(allKey);
	var i=0;
	while(i< allKey.length){
		console.log(allKey[i]);
		console.log(allKey[i].getAttribute('key'));
		allKey[i].innerHTML=L[allKey[i].getAttribute('key').toString()];
		if(allKey[i].getAttribute('key-title')==''){
			allKey[i].title=L[allKey[i].getAttribute('key')+'_Title'];
		}
		i++;
	}
	var keyT0= document.querySelectorAll('[key-title]:not([key])');
	var I=0;
	while(I< keyT0.length){
		keyT0[I].title=L[keyT0[I].getAttribute('key')+'_Title'];
		I++;
	}
}