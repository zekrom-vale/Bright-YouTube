document.addEventListener('DOMContentLoaded', ()=>{
	document.getElementById('ROP').addEventListener('click', (tab)=>{
		chrome.tabs.executeScript({
			file: 'controll.js'
		});
	});
})