var ajaxPool = [];
var listWikis = ['en', 'customs', 'cuusoo', 'stories', 'meta'];
var articles = 0;
var ii = 0;
var activeCover = 0;

$(document).ready(function() {
	$.get('http://meta.brickimedia.org/api.php?action=query&meta=siteinfo&siprop=statistics&origin=http%3A%2F%2F' + document.domain + '&format=json',
		function(data) {
			var accounts = data.query.statistics.users;
			accounts = ((accounts/1000).toFixed(1).replace(/\.?0+$/, "")) + "k";
			$('#circle-accounts .circle-number').text(accounts);
			for (var i = 0; i < listWikis.length - 1; i++) {
				$.get('http://' + listWikis[i] + '.brickimedia.org/api.php?action=query&meta=siteinfo&siprop=statistics&origin=http%3A%2F%2F' + document.domain + '&format=json',
					function(data) {
						articles += parseInt(data.query.statistics.articles, 10);
						ii++; //total successes
						if (ii == listWikis.length - 1) {
							articles = ((articles/1000).toFixed()) + 'k';
							$('#circle-articles .circle-number').text(articles);
							$('#circles').show();
						} //last success
					} //success
				); //ajax
			} //not meta
		} //meta success
	); //meta ajax
	
	$(window).scroll(function() {
		var diffToTop = $(this).scrollTop();
		var diffToBottom = $(document).height() - ($(this).scrollTop() + $(this).height());
		if (window.innerWidth > 780) { //mobile or tablet
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
		} else { //desktop
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
	}); //resize search
	
	$('#searchInput').keyup(function() {
		for (var i in ajaxPool) {
			ajaxPool[i].abort();
		}
		var searchText = $('#searchInput').val();
		var uriText = encodeURIComponent(searchText);
		$('#searchSuggestions').html('');
		for (var i = 0; i < listWikis.length; i++) {
			ajaxPool[i] = $.get('http://' + listWikis[i] + '.brickimedia.org/api.php?action=opensearch&search=' + uriText + '&limit=3&namespace=0&origin=http%3A%2F%2F' + document.domain + '&format=json',
				function(data) {
					addSearchResults(data[1], this.url);
				} //success
			); //ajax
		}
	}); //on search change
	
	$('#searchInput').click(function() {
		$('#clearOverlay').css('right', '-24px');
		$('#loginForm').css({'pointer-events': 'none', 'opacity': 0});
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
	
	$('#loginSubmit').click(function() {
		if ( !$('#loginUsername').val() ) {
			$('#loginUsername').css('background-color', '#f00');
			setTimeout(function() { $('#loginUsername').css('background-color', '#fff'); }, 2000);
		}
		if ( !$('#loginPassword').val() ) {
			$('#loginPassword').css('background-color', '#f00');
			setTimeout(function() { $('#loginPassword').css('background-color', '#fff'); }, 2000);
		} else if ( $('#loginUsername').val() ) {
			var username = encodeURIComponent( $('#loginUsername').val() );
			var password = encodeURIComponent( $('#loginPassword').val() );
			$.ajax({
				'type': 'POST',
				'url': 'http://meta.brickimedia.org?action=login&lgusername=' + username + '&lgpassword=' + password + '&origin=http%3A%2F%2F' + document.domain + '&format=json',
				'cache': false,
				'xhrFields': {
					'withCredentials': true
				},
				'success': function(data) {
					if (data.login.result == 'NeedToken') {
						$.ajax({
							'type': 'POST',
							'url': 'http://meta.brickimedia.org?action=login&lgusername=' + username + '&lgpassword=' + password + '&lgtoken=' + data.login.token + '&origin=http%3A%2F%2F' + document.domain + '&format=json',
							'cache': false,
							'xhrFields': {
								'withCredentials': true
							},
							'success': function() {
								location.reload();
							}
						});
					} else if (data.login.result == 'Blocked') {
						showError('Your account is blocked');
					} else {
						showError('Username or password is incorrect');
					}
				},
				'error': function() {
					showError('Login failed because of an error');
				}
			});
		}
	});
	
	$('.loginOpen').click(function() {
		$('#searchClear').css('right', '-24px');
		$('#searchResults').css({'pointer-events': 'none', 'opacity': 0});
		$('#clearOverlay').css('right', '17px');
		$('#loginForm').css({'pointer-events': 'auto', 'opacity': 1});
		$('html, body').animate({ scrollTop: 0 }, 500).css('overflow-y', 'hidden');
		$('#loginUsername').select();
	}); //show login
	
	$('#clearOverlay').click(function() {
		$('#clearOverlay').css('right', '-24px');
		$('#loginForm').css({'pointer-events': 'none', 'opacity': 0});
		$('html, body').css('overflow-y', 'auto');
	}); //hide login
	
	$('#loginUsername').keyup(function(e) {
		if (e.keyCode == 13) {
			$('#loginPassword').select();
		}
	});
	$('#loginPassword').keydown(function(e) {
		if (e.keyCode == 13) {
			$('#loginSubmit').css('background-color', '#fff');
		}
	});
	$('#loginPassword').keyup(function(e) {
		if (e.keyCode == 13) {
			$('#loginSubmit').click();
			$('#loginSubmit').css('background-color', '#aaa');
		}
	});
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

function showError(text) {
	$('#loginError').text(text).css({'pointer-events': 'auto', 'opacity': 1});
	$('#loginSubmit').css('background-color', '#f00');
	setTimeout(function() { 
		$('#loginError').css({'pointer-events': 'none', 'opacity': 0}); 
		$('#loginSubmit').css('background-color', '#aaa'); 
	}, 3000);
}
