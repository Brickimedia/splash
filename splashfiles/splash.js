//Mobile is 800px wide or less
var desktop = window.innerWidth > 800 ? false : true; //starts opposite
var desktopHistory = false;
var mobileHistory = false; //prevent double bindings
var ajaxPool = [];
var listWikis = ['en', 'customs', 'cuusoo', 'stories', 'meta'];
var sideActive = false;
var offset = 0;

$(document).ready(function() {
	resetWindow();
	
	//*** Needs to be converted to php ***
	var articles = 0;
	var ii = 0;
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
						if (ii === listWikis.length - 1) {
							articles = ((articles/1000).toFixed()) + 'k';
							$('#circle-articles .circle-number').text(articles);
							$('#circles').show();
						} //last success
					} //success
				); //ajax
			} //not meta
		} //meta success
	); //meta ajax
	
	$('#searchInput').keyup(function() {
		for (var i in ajaxPool) {
			ajaxPool[i].abort();
		} //cancel existing
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
	}); //search
	
	$('#loginSubmit').click(function() {
		if ( !$('#loginUsername').val() ) { //username
			$('#loginUsername').css('background-color', '#f00');
			setTimeout(function() { $('#loginUsername').css('background-color', '#fff'); }, 2000);
		}
		if ( !$('#loginPassword').val() ) { //password
			$('#loginPassword').css('background-color', '#f00');
			setTimeout(function() { $('#loginPassword').css('background-color', '#fff'); }, 2000);
		} else if ( $('#loginUsername').val() ) { //both set
			var username = encodeURIComponent( $('#loginUsername').val() );
			var password = encodeURIComponent( $('#loginPassword').val() );
			$.ajax({
				'type': 'POST',
				'url': 'http://meta.brickimedia.org/api.php?action=login&lgname=' + username + '&lgpassword=' + password + '&origin=http%3A%2F%2F' + document.domain + '&format=json',
				'xhrFields': {
					'withCredentials': true
				},
				'success': function(data) {
					$.ajax({
						'type': 'POST',
						'url': 'http://meta.brickimedia.org/api.php?action=login&lgname=' + username + '&lgpassword=' + password + '&lgtoken=' + data.login.token + '&origin=http%3A%2F%2F' + document.domain + '&format=json',
						'xhrFields': {
							'withCredentials': true
						},
						'success': function(data) {
							if (data.login.result === 'Success') {
								$('#loginSubmit').css('background-color', '#0f0');
								location.reload();
							} else if (data.login.result === 'Blocked') {
								showError('Your account is blocked');
							} else if (data.login.result === 'NeedToken') {
								showError('Login was blocked by the browser');
							} else {
								showError('Username or password is incorrect');
							}
						} //token success
					}); //token ajax
				}, //login success
				'error': function() {
					showError('Login failed because of an error');
				}
			}); //login ajax
		}
	}); //login
	
	$('#logout').click(function() {
		$.ajax({
			'type': 'POST',
			'url': 'http://meta.brickimedia.org/api.php?action=logout&origin=http%3A%2F%2F' + document.domain + '&format=json',
			'xhrFields': {
				'withCredentials': true
			},
			'success': function() {
				location.reload();
			}
		});
	}); //logout
}); //both desktop and mobile

function goDesktop() {
	desktop = true;
	
	$(window).scroll(function() {
		var diffToTop = $(this).scrollTop();
		var diffToBottom = $(document).height() - ($(this).scrollTop() + $(this).height());
		$("#hero").css("background-position", "center " + parseInt(-diffToTop / 5, 10) + "px");
		$("#blue-container").css("background-position", "center " + parseInt(-diffToTop / 5, 10) + "px");
		$("#red-container").css("background-position", "center " + (150 + parseInt(-diffToTop / 5, 10)) + "px");
		$("#white-container").css("background-position", "center " + (300 + parseInt(-diffToTop / 5, 10)) + "px");
		if (diffToBottom <= 100) {
			$("#wiki-nav-bottom").css("opacity", (100 - diffToBottom) / 100);
		}
	}); //move background images
	
	$(window).resize(function() {
		$(this).scroll();
		$('#account.loggedIn').css('width', window.innerWidth / 2 - 295);
		if (window.innerWidth <= 800) {
			$('#searchInput').attr('placeholder', 'Search Brickimedia');
		} else if (window.innerWidth < 1030) {
			$('#searchInput').css('width', window.innerWidth / 2 - 315).attr('placeholder', 'Search');
		} else {
			$('#searchInput').css('width', 200).attr('placeholder', 'Search Brickimedia');
		}
	}); //resize search and username
	
	$(window).resize();
	
	$('#loginOpen').click(function() {
		$('body').animate({ scrollTop: 0 }, 50, function() {
			$('html').animate({ scrollTop: 0 }, 50, function() {
				$(this).css('overflow-y', 'hidden');
				$('#searchClose').css('right', '-25px');
				$('#searchResults').css({'pointer-events': 'none', 'opacity': 0});
				$('#loginClose').css('right', '16px');
				$('#loginForm').css({'pointer-events': 'auto', 'opacity': 1});
				$('#loginUsername').select();
			});
		});
	}); //show login
		
	$('#searchInput').click(function() {
		$('body').animate({ scrollTop: 0 }, 50, function() {
			$('html').animate({ scrollTop: 0 }, 50, function() {
				$(this).css('overflow-y', 'hidden');
				$('#loginClose').css('right', '-25px');
				$('#loginForm').css({'pointer-events': 'none', 'opacity': 0});
				$('#searchClose').css('right', '16px');
				$('#searchResults').css({'pointer-events': 'auto', 'opacity': 1});
			});
		});
	}); //show search
	
	if (!desktopHistory) {
		desktopHistory = true;
		$('#loginClose').click(function() {
			$('#loginClose').css('right', '-25px');
			$('#loginForm').css({'pointer-events': 'none', 'opacity': 0});
			$('html').css('overflow-y', 'auto');
		}); //hide login
		
		$('#searchClose').click(function() {
			$('#searchClose').css('right', '-25px');
			$('#searchResults').css({'pointer-events': 'none', 'opacity': 0});
			$('html').css('overflow-y', 'auto');
		}); //hide search
		
		$('#loginUsername').keyup(function(e) {
			if (e.keyCode === 13) {
				$('#loginPassword').select();
			}
		}); //username "enter" up
		
		$('#loginPassword').keydown(function(e) {
			if (e.keyCode === 13) {
				$('#loginSubmit').css('background-color', '#fff');
			}
		}); //password "enter" down
		
		$('#loginPassword').keyup(function(e) {
			if (e.keyCode === 13) {
				$('#loginSubmit').click();
				$('#loginSubmit').css('background-color', '#aaa');
			}
		}); //password "enter" up
	} //first time desktop
} //desktop

function goMobile() {
	desktop = false;
	resetWindow();
	
	$('#loginOpen').click(function() {
		$('#loginForm').css({'pointer-events': 'auto', 'opacity': 1});
	}); //show login
	
	if (!mobileHistory) {
		mobileHistory = true;
		$('#sideToggle').click(function() {
			if (sideActive) {
				sideActive = false;
				$("#hero a, .text-container").unbind('click');
				$('#content').animate({'margin-left': '0px'}, 500, function() {
					$('#loginForm').css({'pointer-events': 'none', 'opacity': 0});
				});
			} else {
				sideActive = true;
				$("#hero a, .text-container").click(function(e) {
					e.preventDefault();
				});
				$('#content').animate({'margin-left': '240px'}, 500);
			}
		}); //toggle side menu
		
		$('#content').bind('touchstart', function(e) {
			startTouch(e, true);
		}); //touch down
		
		$('#content').bind('touchmove', function(e) {
			moveTouch(e, true);
		}); //touch move
		
		$('#content').bind('touchend', function() {
			endTouch();
		}); //touch up
		
		$('#content').mousedown(function(e) {
			startTouch(e, false);
			$(document).mousemove(function(ee) {
				moveTouch(ee, false);
			}); //mouse move
			$('body').mouseleave(function(ee) {
				$('#content').mouseup();
			});
			$('#content').mouseup(function() {
				$(document).unbind('mousemove');
				$('body').unbind('mouseleave');
				$('#content').unbind('mouseup');
				endTouch();
			}); //mouse up
		}); //mouse down
	} //first time mobile
} //mobile

function resetWindow() {
	$(window).unbind();
	$(window).resize(function() {
		if (window.innerWidth > 800 && !desktop) {
			$('#loginOpen').unbind('click');
			$('#searchInput, #loginUsername, #loginPassword').blur();
			if (sideActive) {
				sideActive = false;
				$("#hero a, .text-container").unbind('click');
				$('#content').css('margin-left', '0px');
			}
			goDesktop();
		} else if (window.innerWidth <= 800 && desktop) {
			$('#loginOpen, #searchInput').unbind('click');
			$('#searchClose, #loginClose').click();
			$('#searchInput, #loginUsername, #loginPassword').blur();
			goMobile();
		}
	}); //toggle mobile and desktop on resize
	$(window).resize();
} //reset the window element

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
	$('#loginError').html(text).css({'pointer-events': 'auto', 'opacity': 1});
	$('#loginSubmit').css('background-color', '#f00');
	setTimeout(function() { 
		$('#loginError').css({'pointer-events': 'none', 'opacity': 0}); 
		$('#loginSubmit').css('background-color', '#aaa'); 
	}, 3000);
} //show login errors

function startTouch(e, type) {
	if (sideActive) {
		offset = (type ? e.originalEvent.changedTouches[0].pageX : e.pageX) - $('#content').css('margin-left').replace('px', '');
	}
} //record the starting position

function moveTouch(e, type) {
	if (sideActive) {
		e.preventDefault();
		var orig = (type ? e.originalEvent.changedTouches[0].pageX : e.pageX) - offset;
		if (orig > 240) {
			orig = orig / 3 + 160;
		} else if (orig < 0) {
			orig = orig / 3;
		}
		$('#content').css('margin-left', orig);
	}
} //move content

function endTouch() {
	if (sideActive) {
		if ($('#content').css('margin-left').replace('px', '') <= 120) {
			sideActive = false;
			$('#content').animate({'margin-left': '0px'}, 250);
			$('#loginForm').css({'pointer-events': 'none', 'opacity': 0});
		} else {
			$('#content').animate({'margin-left': '240px'}, 250);
		}
		setTimeout(function() { document.getSelection().removeAllRanges(); }, 100);
	}
} //move content to final position