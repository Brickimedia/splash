//Mobile is 800px wide or less
var desktop = window.innerWidth > 800 ? true : false;
var a = '.brickimedia.org'
var listWikis = ['en' + a, 'customs' + a, 'ideas' + a, 'greatballcontraption.com', 'meta' + a];
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
			var fullPath = aviPath + 'global_' + userData.id + '_l.';
			var pathArray = [fullPath + 'png', fullPath + 'jpg', fullPath + 'gif', aviPath + 'default_l.gif'];
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
				$.get('//' + listWikis[i] + '/api.php?action=query&meta=siteinfo&siprop=statistics&origin=http%3A%2F%2F' + document.domain + '&format=json',
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
		var heightAboveBlue, heightAboveRed, heightAboveWhite;
		$(window).scroll(function() {
			var diffToTop = $(this).scrollTop();
			var diffToBottom = $(document).height() - (diffToTop + $(this).height());
			$("#hero").css("background-position", "center " + ( -diffToTop / 5 ) + "px");
			$("#blue-container").css("background-position", "center " + ( heightAboveBlue - diffToTop / 5 - 50 ) + "px");
			$("#red-container").css("background-position", "center " + ( heightAboveRed - diffToTop / 5 - 50 ) + "px");
			$("#white-container").css("background-position", "center " + ( heightAboveWhite - diffToTop / 5 - 50 ) + "px");
			if (diffToBottom <= 100) {
				$("#wiki-nav-bottom").css("opacity", (100 - diffToBottom) / 100);
			}
		}) //move background images
		.resize(function() {
			heightAboveBlue = $('#blue-container').offset().top / 5;
			heightAboveRed = $('#red-container').offset().top / 5;
			heightAboveWhite = $('#white-container').offset().top / 5;
		}) //update variables on resize
		.resize();
	}
});

function checkImages() {
	imageLoop++;
	if (imageLoop == 3) {
		$('#userAvi').attr('src', defaultAvi.src);
	}
}
