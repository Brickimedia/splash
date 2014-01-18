$(document).ready(function() {
	
	$("#white-container").css({"background-position": "0 300px"}); //the bricks are at the top, they get cut off when you scroll down without this
	
	$.ajax({
		type: "GET",
		url: "http://meta.brickimedia.org/api.php?action=query&meta=siteinfo&siprop=statistics&format=json",
		dataType: "jsonp",
		success: function(data) {
			accounts = data.query.statistics.users;
			//if (accounts >= 1000) {
				accounts = ((accounts/1000).toFixed(1).replace(/\.?0+$/, "")) + "k";
			//}
			$("#circle-accounts .circle-number").append(accounts);
			$.ajax({
				type: "GET",
				url: "http://en.brickimedia.org/api.php?action=query&meta=siteinfo&siprop=statistics&format=json",
				dataType: "jsonp",
				success: function(data) {
					articles = parseInt(data.query.statistics.articles, 10);
					$.ajax({
						type: "GET",
						url: "http://customs.brickimedia.org/api.php?action=query&meta=siteinfo&siprop=statistics&format=json",
						dataType: "jsonp",
						success: function(data) {
							articles += parseInt(data.query.statistics.articles, 10);
							$.ajax({
								type: "GET",
								url: "http://stories.brickimedia.org/api.php?action=query&meta=siteinfo&siprop=statistics&format=json",
								dataType: "jsonp",
								success: function(data) {
									articles += parseInt(data.query.statistics.articles, 10);
									$.ajax({
										type: "GET",
										url: "http://cuusoo.brickimedia.org/api.php?action=query&meta=siteinfo&siprop=statistics&format=json",
										dataType: "jsonp",
										success: function(data) {
											articles += parseInt(data.query.statistics.articles, 10);
											//if (articles >= 10000) {
												articles = ((articles/1000).toFixed()) + "k";
											//}
											$("#circle-articles .circle-number").append(articles);
											$("#circles").css({"display": "block"});
										} //cuusoo success
									}); //cuusoo ajax
								} //stories success
							}); //stories ajax
						} //customs success
					}); //customs ajax		
				} //en success
			}); //en ajax
		} //meta success
	}); //meta ajax
	
	$(window).scroll(function() {
		var diffToTop = $(this).scrollTop();
		var diffToBottom = $(document).height() - ($(this).scrollTop() + $(this).height());
		if (window.innerWidth > 780) {
			$("#hero").css({"background-position": "0 " + parseInt(-diffToTop / 5, 10) + "px"});
			$("#blue-container").css({"background-position": "0 " + parseInt(-diffToTop / 5, 10) + "px"});
			$("#red-container").css({"background-position": "0 " + parseInt(-diffToTop / 5, 10) + "px"});
			$("#white-container").css({"background-position": "0 " + (300 + parseInt(-diffToTop / 5, 10)) + "px"});
			if (diffToBottom <= 150 && diffToBottom > 7) {
				$("#wiki-nav-bottom").css({"margin-top":  35 + diffToBottom / 4.5 + "px"});
  			}
			if (diffToBottom <= 100) {
				$("#wiki-nav-bottom").css({"opacity":  (100 - diffToBottom) / 100});
			}
		} else {
			$("#hero").css({"background-position": "0 0"});
			$("#blue-container").css({"background-position": "0 0"});
			$("#red-container").css({"background-position": "0 0"});
			$("#white-container").css({"background-position": "0 0"});
			$("#wiki-nav-bottom").css({"margin-top":  "35px", "opacity": 1});
		}
	});
});
