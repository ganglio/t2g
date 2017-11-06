(function(){
	"use strict";

	let [endTime, title] = window.location.search.substr(1).split("/");

	function update() {
		var then = moment.unix(endTime);
		var now = moment();

		var values = moment.preciseDiff(then,now,true);
    values.weeks = now.diff(then,'week')+1;

		document
			.querySelectorAll(".isTimer ul li")
			.forEach(function(li) {
				li.classList.remove("changed");
				var oldValue = ~~li.innerHTML;
				var newValue = ~~values[li.dataset.after];
				if (newValue != oldValue || typeof newValue != typeof oldValue) {
					li.classList.add("changed");
					li.innerHTML = newValue;
				}
			});
	}

	window.addEventListener("load",function(){
		if (endTime > 0) {
			document.body.classList.add("isTimer");
			if (title != undefined && title != "") {
				document.querySelector("title").innerHTML = decodeURIComponent(title);
				document.querySelector('#title').innerHTML = decodeURIComponent(title);
			}
			update();
			window.setInterval(update,250);
		} else {
			document.body.classList.add("isForm");
			document.querySelector(".isForm form").addEventListener("submit",function(e){
				e.preventDefault();
				var ts = Math.floor(new Date(document.querySelector(".isForm input[type=date]").value+"T"+document.querySelector(".isForm input[type=time]").value).getTime()/1000);
				var title = document.querySelector(".isForm #titleinput").value;
				window.location.href+=("?"+ts+"/" + (title!=undefined?title:""));
			},false);
		}
	});
})();
