//Mobile is 800px wide or less
var desktop = window.innerWidth > 800 ? false : true; //starts opposite
var desktopHistory = false;
var mobileHistory = false; //prevent double bindings
var ajaxPool = [];
var listWikis = ['en', 'customs', 'ideas', 'stories', 'meta', 'books'];
var sideActive = false;
var offset = 0;

$(document).ready(function() {
	resetWindow();

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
		for (var i = 0; i < listWikis.length; i++) {
			ajaxPool[i] = $.get('http://' + listWikis[i] + '.brickimedia.org/api.php?action=opensearch&search=' + uriText + '&limit=3&namespace=0&origin=http%3A%2F%2F' + document.domain + '&format=json',
				function(data) {
					addSearchResults(data[1], this.url);
				} //success
			); //ajax
		}
	}); //search

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
		
	$('#searchInput').click(function() {
		$('body').animate({ scrollTop: 0 }, 50, function() {
			$('html').animate({ scrollTop: 0 }, 50, function() {
				$(this).css('overflow-y', 'hidden');
				$('#searchClose').css('right', '16px');
				$('#searchResults').css({'pointer-events': 'auto', 'opacity': 1});
			});
		});
	}); //show search
	
	if (!desktopHistory) {
		desktopHistory = true;
		
		$('#searchClose').click(function() {
			$('#searchClose').css('right', '-25px');
			$('#searchResults').css({'pointer-events': 'none', 'opacity': 0});
			$('html').css('overflow-y', 'auto');
		}); //hide search

	} //first time desktop
} //desktop

function goMobile() {
	desktop = false;
	resetWindow();
	
	if (!mobileHistory) {
		mobileHistory = true;
		$('#sideToggle').click(function() {
			if (sideActive) {
				sideActive = false;
				$("#hero a, .text-container").unbind('click');
				$('#content').animate({'margin-left': '0px'}, 500);
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
			$('#searchInput').blur();
			if (sideActive) {
				sideActive = false;
				$("#hero a, .text-container").unbind('click');
				$('#content').css('margin-left', '0px');
			}
			goDesktop();
		} else if (window.innerWidth <= 800 && desktop) {
			$('#searchInput').unbind('click');
			$('#searchClose').click();
			$('#searchInput').blur();
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
			$('#hero a, .text-container').unbind('click');
			$('#content').animate({'margin-left': '0px'}, 250);
		} else {
			$('#content').animate({'margin-left': '240px'}, 250);
		}
		setTimeout(function() { document.getSelection().removeAllRanges(); }, 100);
	}
} //move content to final position
