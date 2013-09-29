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
function setCookie(c_name, value, expiredays){
　　　　var exdate=new Date();
　　　　exdate.setDate(exdate.getDate() + expiredays);
　　　　document.cookie=c_name+ "=" + escape(value) + ((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}
 　　//使用方法：setCookie('username','Darren',30)  



function clickLink(){
	if(document.referrer == "http://www.wz123.com/?sum") {
		window.close();
		return;
	}
	else if(window.location.href.indexOf("wz123.com") < 0){
		return;
	}
	var links = $("a[href]");
	var random = parseInt(Math.random() * links.length);
	var url = $(links[random]).attr("href");
	console.log(url);
	var delay = parseInt(Math.random()*5)*1000;
	//delay=1000;
	setTimeout(function(){
		//simulateClick(url);
		chrome.runtime.sendMessage({pageUrl: url}, function(response) {
            console.log(response);
        });
		//simulateClick("http://www.sokibuy.com");
	},delay);
	console.log(chrome.cookies);
}

//clickLink();
