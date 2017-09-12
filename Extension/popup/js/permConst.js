document.addEventListener('DOMContentLoaded', ()=>{
document.getElementById('permitCore').innerHTML= constructSlide(
/*[title, id, name, chked, Class]*/
['youtube.com/embed/* Included', 'YouTube', 'YouTube'],
['', 'Game', 'YT Games'],
['youtube.com/embed/* Excluded', 'Embed', 'Embedded'],
['', 'Twitch', 'Twitch'],
['', 'Dailymotion', 'Dailymotion'],
['', 'hulu', 'Hulu'],
['', 'Vimeo', 'Vimeo'],
['', 'Liveleak', 'Liveleak'],
['', 'Break', 'Break'],
['', 'Netflix', 'Netflix'],
['', 'Vine', 'Vine'],
['', 'Yahoo2', 'Yahoo'],
['', 'Yahoo2', 'Yahoo'],
['', 'Viewster', 'Viewster'],
['', 'Dot_tv', 'Dot tv'],
['', 'Vevo', 'Vevo'],
['', 'Veoh', 'Veoh']);
function constructSlide(){
	console.log('runing')
	var html='';
	for (var i in arguments){
		var title= arguments[i][0],
		id= arguments[i][1],
		name= arguments[i][2];
		var chked= typeof arguments[i][3]=='undefined'? '':arguments[i][3];
		var Class= typeof arguments[i][4]=='undefined'? "slider round": "slider round "+arguments[i][4];
html+=`<span class="box" title="${title}">
	<label class="switch">
		<input type="checkbox" id="${ID}" ${ch} />
		<div class="${divClass}"></div>
	</label>
	<span class="name"> ${name}</span>
</span>`
	}
	return html;
}
});