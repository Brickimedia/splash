var suggestions = {};
var ajaxPool = [];
var listWikis = ['en', 'customs', 'cuusoo', 'stories', 'meta'];

$(document).ready(function() {
	
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
			$("#hero").css("background-position", "center " + parseInt(-diffToTop / 5, 10) + "px");
			$("#blue-container").css("background-position", "center " + parseInt(-diffToTop / 5, 10) + "px");
			$("#red-container").css("background-position", "center " + (150 + parseInt(-diffToTop / 5, 10)) + "px");
			$("#white-container").css("background-position", "center " + (300 + parseInt(-diffToTop / 5, 10)) + "px");
			if (diffToBottom <= 150 && diffToBottom > 7) {
				$("#wiki-nav-bottom").css("margin-top", 35 + diffToBottom / 4.5 + "px");
  			}
			if (diffToBottom <= 100) {
				$("#wiki-nav-bottom").css("opacity", (100 - diffToBottom) / 100);
			}
		} else {
			$("#hero").css("background-position", "center 0");
			$("#blue-container").css("background-position", "center 0");
			$("#red-container").css("background-position", "center 0");
			$("#white-container").css("background-position", "center 0");
			$("#wiki-nav-bottom").css({"margin-top": "35px", "opacity": 1});
		}
	});
	
	$(window).resize(function() {
		$(this).scroll();
		if (window.innerWidth < 750) {
			$('#searchInput').hide();
		} else if (window.innerWidth < 950) {
			$('#searchInput').show().css('width', window.innerWidth / 2 - 275).attr('placeholder', 'Search');
		} else {
			$('#searchInput').show().css('width', 200).attr('placeholder', 'Search Brickimedia');
		}
	});
	
	$('#searchInput').keyup(function() {
		for (var i in ajaxPool) {
			ajaxPool[i].abort();
		}
		var searchText = $('#searchInput').val();
		var uriText = encodeURIComponent(searchText);
		$('#searchSuggestions').html('');
		for (var i = 0; i < listWikis.length; i++) {
			ajaxPool[i] = $.ajax({
				type: "GET",
				url: "http://" + listWikis[i] + ".brickimedia.org/api.php?action=opensearch&search=" + uriText + "&limit=3&namespace=0&format=json",
				dataType: "jsonp",
				success: function(data) {
					addSearchResults(data[1], this.url);
				}
			}); //search ajax
		}
	}); //on search change
	
	$('#searchInput').click(function() {
		$('#searchClear').css('right', '17px');
		$('#searchResults').css({'pointer-events': 'auto', 'opacity': 1});
		$('html, body').animate({ scrollTop: 0 }, 500).css('overflow-y', 'hidden');
		$(this).keyup();
	}); //show search
	
	$('#searchClear').click(function() {
		$('#searchClear').css('right', '-24px');
		$('#searchResults').css({'pointer-events': 'none', 'opacity': 0});
		$('html, body').css('overflow-y', 'auto');
	}); //hide search
	
	$(window).resize();
});

function addSearchResults(results, name) {
	name = name.replace(/http:\/\/([^\.]*).*/, '$1');
	$('#' + name + ' .result').html('');
	for (var i in results) {
		$('#' + name + ' .result').append('<a href="http://' + name + '.brickimedia.org/wiki/' + results[i] + '">' + results[i] + '</a>');
	}
	if (results.length) {
		$('#' + name).show();
	} else {
		$('#' + name).hide();
	}
} //add search results
