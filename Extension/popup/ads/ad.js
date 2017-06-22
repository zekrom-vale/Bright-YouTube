const Time= 2000,
Ads=[
	'<p>ad1</p>',
	'<p>ad2</p>',
	'<p>ad3</p>'
];
var loop,
shadow;//!!
document.addEventListener('DOMContentLoaded', ()=>{
	shadow= document.getElementById('ad').attachShadow({mode: 'open'});
	shadow.innerHTML= '<div id="Shadow">'+
		'<div id="adCore">'+
			Ads[0]+
		'</div>'+
	'<style>\n#Shadow,\n#adCore{\n\t padding:0;\n\t margin:0\n }\n</style>'+
	'</div>';
	loop= setInterval(()=>{
		if(document.hidden|| document.webkitHidden|| document.mozHidden) return;
		shadow.getElementById('adCore').innerHTML= Ads[loop];
		loop= loop==Ads.length-1? 0: loop+1;
	},Time);
});