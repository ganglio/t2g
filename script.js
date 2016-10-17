(function(){
	"use strict";

	var endTime = window.location.search.substr(1)*1000;

	function update() {
		var now = new Date();
		var then = endTime>0 ? endTime : (new Date(2013,11,20,16,0,0)).getTime();
		var timeDiff = Math.abs(then - now.getTime() + now.getTimezoneOffset()*60000);
		var values = {};

		values.w = Math.ceil(timeDiff/(1000*3600*24*7));
		values.d = Math.ceil(timeDiff/(1000*3600*24));
		values.h = Math.ceil(timeDiff/(1000*3600));
		values.m = Math.ceil(timeDiff/(1000*60));
		values.s = Math.ceil(timeDiff/(1000));

		//console.log(timeDiff);

		values.dd = Math.floor(timeDiff/(1000*3600*24));
		values.hh = Math.floor(timeDiff/(1000*3600))%24;
		values.mm = Math.floor(timeDiff/(1000*60))%60;
		values.ss = Math.ceil(timeDiff/(1000))%60;

		values.hh = (values.hh<10?"0":"") + values.hh;
		values.mm = (values.mm<10?"0":"") + values.mm;
		values.ss = (values.ss<10?"0":"") + values.ss;


		var $lis = document.querySelectorAll(".isTimer ul li");

		for (var index=0; index<$lis.length; index++) {
			$lis[index].classList.remove("changed");
			var oldValue = $lis[index].innerHTML;
			var newValue = values[$lis[index].getAttribute("data-after")];
			if (oldValue != newValue) {
				$lis[index].classList.add("changed");
				$lis[index].innerHTML = newValue;
			}
		}

		//document.querySelector(".isTimer div").innerHTML = values.dd+"d "+values.hh+"h "+values.mm+"m "+values.ss+"s";
	}

	window.addEventListener("load",function(){
		if (endTime > 0) {
			document.body.classList.add("isTimer");
			update();
			window.setInterval(update,250);
		} else {
			document.body.classList.add("isForm");
			document.querySelector(".isForm form").addEventListener("submit",function(e){
				e.preventDefault();
				var ts = Math.floor(new Date(document.querySelector(".isForm input[type=date]").value+"T"+document.querySelector(".isForm input[type=time]").value).getTime()/1000);
				window.location.href+=("?"+ts);
			},false);
		}
	});
})();
