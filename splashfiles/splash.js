//Mobile is 800px wide or less
var desktop = window.innerWidth > 800 ? true : false;
var listWikis = ['en', 'customs', 'ideas', 'stories', 'meta', 'books'];
var userData;
var defaultAvi = new Image();
var imageLoop = 0;

//Load the avi
var aviPath = '//images.brickimedia.org/avatars/';
$.ajax({
	'url': '//meta.brickimedia.org/api.php?action=query&meta=userinfo&origin=http%3A%2F%2F' + document.domain + '&format=json',
	'xhrFields': {
		'withCredentials': true
	},
	'success': function(data) {
		if (data.query.userinfo.id != "0") {
			userData = data.query.userinfo;
			$('#user').attr('href', '//meta.brickimedia.org/wiki/User:' + userData.name).attr('title', 'User:' + userData.name);
			var fullPath = aviPath + userData.id;
			var pathArray = [fullPath + '_l.png', fullPath + '_l.jpg', fullPath + '_l.gif', aviPath + 'default_l.gif'];
			for (i = 0; i < pathArray.length - 1; i++) {
				image = new Image();
				image.src = pathArray[i];
				image.onerror = function() {
					checkImages();
				}
				image.onload = function() {
					$('#userAvi').attr('src', this.src);
				}
			}
			defaultAvi.src = pathArray[3];
		} else {
			$('#userAvi').attr('src', aviPath + 'default_l.gif');
		}
	},
	'error': function() {
		$('#userAvi').attr('src', aviPath + 'default_l.gif');
	}
});

$(document).ready(function() {
	//Load circles
	var articles = 0;
	var ii = 0;
	$.get('//meta.brickimedia.org/api.php?action=query&meta=siteinfo&siprop=statistics&origin=http%3A%2F%2F' + document.domain + '&format=json',
		function(data) {
			var accounts = data.query.statistics.users;
			accounts = ((accounts/1000).toFixed(1).replace(/\.?0+$/, "")) + "k";
			$('#circle-accounts .circle-number').text(accounts);
			for (var i = 0; i < listWikis.length - 1; i++) {
				$.get('//' + listWikis[i] + '.brickimedia.org/api.php?action=query&meta=siteinfo&siprop=statistics&origin=http%3A%2F%2F' + document.domain + '&format=json',
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

	if (desktop) {
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
	}
});

function checkImages() {
	imageLoop++;
	if (imageLoop == 3) {
		$('#userAvi').attr('src', defaultAvi.src);
	}
}
