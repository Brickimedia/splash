<?php
// variables
$sharedUserID = $_COOKIE['sharedUserID'];
$sharedUserName = $_COOKIE['sharedUserName'];
if ( is_file( '/var/www/wiki/images/avatars/' . $sharedUserID . '_l.png' ) ) {
	$avatar = 'http://images.brickimedia.org/avatars/' . $sharedUserID . '_l.png';
} elseif ( is_file( '/var/www/wiki/images/avatars/' . $sharedUserID . '_l.jpg' ) ) {
	$avatar = 'http://images.brickimedia.org/avatars/' . $sharedUserID . '_l.jpg';
} elseif ( is_file( '/var/www/wiki/images/avatars/' . $sharedUserID . '_l.gif' ) ) {
	$avatar = 'http://images.brickimedia.org/avatars/' . $sharedUserID . '_l.gif';
} else {
	$avatar = 'http://images.brickimedia.org/avatars/default_l.gif';
}
?>
<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<title>Brickimedia</title>
<meta name="viewport" content="width=device-width">

<meta name="application-name" content="&nbsp;">
<meta name="msapplication-TileColor" content="#429ec8">
<meta name="msapplication-TileImage" content="splashfiles/square.png">
<meta name="msapplication-square70x70logo" content="splashfiles/tiny.png">
<meta name="msapplication-square150x150logo" content="splashfiles/square.png">
<meta name="msapplication-wide310x150logo" content="splashfiles/wide.png">
<meta name="msapplication-square310x310logo" content="splashfiles/large.png">

<meta property="og:image" content="http://www.brickimedia.org/large.png">
<meta property="og:title" content="Brickimedia - An open project to create the largest LEGO fan network on the web">
<meta property="og:url" content="http://www.brickimedia.org">
<meta property="og:site_name" content="Brickimedia">

<link rel="shortcut icon" href="img/favicon.ico">
<link rel="stylesheet" type="text/css" href="resources/fonts/lato/lato.css">
<link rel="stylesheet" type="text/css" href="splashfiles/splash.css">
<script src="http://edge.quantserve.com/quant.js" async type="text/javascript"></script>
<script type="text/javascript" async src="http://www.google-analytics.com/ga.js"></script>
<script type="text/javascript" src="http://meta.brickimedia.org/resources/jquery/jquery.js"></script>
<script src="splashfiles/splash.js" type="text/javascript"></script>
<script type="text/javascript">
var _gaq=_gaq||[];_gaq.push(['_setAccount','UA-38958899-1']);_gaq.push(['_trackPageview']);(function(){var ga=document.createElement('script');ga.type='text/javascript';ga.async=true;ga.src=('https:'==document.location.protocol?'https://ssl':'http://www')+'.google-analytics.com/ga.js';var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(ga,s);})();
</script>
<!--[if IE]>
<script src="splashfiles/html5.js"></script>
<![endif]-->
</head>

<body>
    <div id="fb-root"></div>
    <script>(function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=170482364649";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));</script>
	<div id="sideBar">
		<?php
			if ( empty($sharedUserID) ) {
				echo '<div id="account">
					<a id="loginOpen" href="javascript:;">Log in</a> | 
					<a href="http://meta.brickimedia.org/wiki/Special:UserLogin/signup">Sign up</a>
					</div>';
			} else {
				echo '<div id="account" class="loggedIn">
					<a href="http://meta.brickimedia.org/wiki/Special:MyPage"><img src="' . $avatar . '">' . $sharedUserName . '</a>
					</div>';
			}
		?>
		<input title="Search Brickimedia [alt-shift-f]" id="searchInput" accesskey="f" type="search" placeholder="Search Brickimedia" autocomplete="off"/>
		<div id="searchResults">
			<div id="searchOffset"></div>
			<div class="search-result" id="en">Brickipedia<div class="result"></div></div>
			<div class="search-result" id="customs">Customs<div class="result"></div></div>
			<div class="search-result" id="cuusoo">Cuusoo<div class="result"></div></div>
			<div class="search-result" id="stories">Stories<div class="result"></div></div>
			<div class="search-result" id="meta">Brickimedia<div class="result"></div></div>
		</div>
		<?php
			if ( empty($sharedUserID) )
				echo '<div id="loginForm">
						<h1>One account, 4 wikis.</h1>
						<span>Log in to Brickimedia</span>
						<input class="loginInput" id="loginUsername" type="text" placeholder="Username"/>
						<input class="loginInput" id="loginPassword" type="password" placeholder="Password"/>
						<input id="loginSubmit" type="submit" value="Log in"/>
						<span class="small-links">
							<a href="http://meta.brickimedia.org/wiki/Special:UserLogin/signup">Create an account</a> / 
							<a href="http://meta.brickimedia.org/wiki/Special:PasswordReset">Forgotten your password?</a>
						</span>
						<span id="loginError"></span>
					</div>'
		?>
		<div id="clearContainer">
			<a id="searchClear">&times;</a>
			<a id="clearOverlay">&times;</a>
		</div>
	</div>
	<div id="content">
		<header id="header">
			<div id="sideMenu">&#9776;</div>
			<a href="http://brickimedia.org"></a>
		</header>
		<section id="hero">
			<header>
				<h1 id="heroHeader">Welcome to <b>Brickimedia</b></h1>
				<span>An open project to create the largest LEGO fan network on the web</span>
			</header>
			<div class="wiki-nav">
				<div class="wiki-nav-item meta"><a href="http://meta.brickimedia.org">Meta</a></div>
				<div class="wiki-nav-item en"><a href="http://en.brickimedia.org">Brickipedia</a></div>
				<div class="wiki-nav-item customs"><a href="http://customs.brickimedia.org">Customs</a></div>
				<div class="wiki-nav-item stories"><a href="http://stories.brickimedia.org">Stories</a></div>
				<div class="wiki-nav-item cuusoo"><a href="http://cuusoo.brickimedia.org">CUUSOO</a></div>
			</div>
			<div id="ad">
				<script async src="http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
				<ins class="adsbygoogle" style="display:inline-block;width:728px;height:90px" data-ad-client="ca-pub-9543775174763951" data-ad-slot="9998611139"></ins>
				<script>
					(adsbygoogle = window.adsbygoogle || []).push({});
				</script>
			</div>
		</section>
		<div class="text-container" id="blue-container">
			<section id="about">
				<header>
					<h1>What is Brickimedia?</h1>
				</header>
				<p>Brickimedia is an open network of LEGO fan communities founded in early 2013. In addition to a <a href="http://meta.brickimedia.org/">coordination wiki</a>, Brickimedia hosts 4 projects: <a href="http://en.brickimedia.org/">Brickipedia</a>, <a href="http://customs.brickimedia.org/">Customs</a>, <a href="http://stories.brickimedia.org/">LEGO Stories Wiki</a>, and <a href="http://cuusoo.brickimedia.org/">LEGO CUUSOO Wiki</a>.</p>
				
				<p>Brickimedia was originally launched in February 2013, but several months later the site's data was lost during an attack on its webhost. Since that downtime, Brickimedia has been through several testing periods and is now officially open!</p>
			<aside id="circles">
				<div class="circle-container" id="circle-projects">
					<div class="circle"></div>
					<div class="circle-text">
						<div class="circle-number">4</div><span>projects</span>
					</div>
				</div>
				<div class="circle-container" id="circle-articles">
					<div class="circle"></div>
					<div class="circle-text">
						<div class="circle-number"></div><span>articles</span>
					</div>
				</div>
				<div class="circle-container" id="circle-accounts">
					<div class="circle"></div>
					<div class="circle-text">
						<div class="circle-number"></div><span>accounts</span>
					</div>
				</div>
				<div id="stretch"></div>
				</aside>
			</section>
		</div>
		<div class="text-container" id="red-container">
			<section id="updates">
				<header>
					<h1>Recent Updates</h1>
				</header>
				<ul>
				<li>Brickimedia is officially open!</li>
				<li>As of November 1st, Brickimedia is in public beta! Learn more about the open beta period <a href="http://meta.brickimedia.org/wiki/User_blog:ToaMeiko/Open_Beta_-_What_to_expect">here</a>.</li>
				<li>Brickimedia is now in a closed beta stage. <a href="http://www.brickimedia.org/george-test/2013-2014-beta-planning.pdf" target="_blank">Download this PDF</a> to learn more about our beta and release planning schedule.</li>
				<li>An alpha preview of the Brickimedia wikis can be seen on <a href="http://meta.brickimedia.org/wiki/Main_Page">Brickimedia Meta</a>. As this is in alpha stage, you should expect errors and frequent changes. Anything you add (user accounts, edits, etc) may not transfer over after the alpha period ends.</li>
				<li>You can now follow development and give feedback/issues on <a href="http://www.github.com/Brickimedia/brickimedia">GitHub</a>!</li>
				<li>Development has started back up!</li>
				</ul>
			</section>
		</div>
		<div class="text-container" id="white-container">
			<section id="contribute">
				<header>
					<h1>Be a Part</h1>
				</header>
				<p>The best way you can contribute to Brickimedia is by <a href="http://meta.brickimedia.org/wiki/Special:UserLogin/signup">signing up</a> for an account and editing wikis on the Brickimedia network.</p>
				<p>Here are some other ways to contribute:</p>
				<div id="contribute-table">
				<section class="contribute-small-box" id="social">
					<header>
						<h2>Social</h2>
					</header>
					<p>Stay up to date with Brickimedia on the following networks:</p>
					<div id="social-links">
						<a href="http://www.facebook.com/brickimedia"><img src="splashfiles/facebook.png" width="32" height="32" alt="Facebook"></a>
						<a href="http://www.twitter.com/brickimedia"><img src="splashfiles/twitter.png" width="32" height="32" alt="Twitter"></a>
						<a href="http://plus.google.com/112287617429747667081"><img src="splashfiles/googleplus.png" width="32" height="32" alt="Google+"></a>
						<a href="http://www.youtube.com/brickimedia"><img src="splashfiles/youtube.png" width="32" height="32" alt="YouTube"></a>
						<a href="http://www.github.com/Brickimedia"><img src="splashfiles/github.png" width="32" height="32" alt="GitHub"></a>
					</div>
					<div>
						<div class="fb-like" data-href="https://www.facebook.com/brickimedia" data-width="100px" data-layout="button_count" data-action="like" data-show-faces="false" data-share="false"></div>
					</div>
				</section>
				<section class="contribute-small-box" id="donate">
					<h2>Donate</h2>
					<p>As a private organization, Brickimedia relies on ad revenue and donations to keep running. Every cent counts, so even the smallest donations help make Brickimedia better.</p>
					<form class="paypal-form" action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank">
							<input type="hidden" name="cmd" value="_s-xclick">
							<input type="hidden" name="encrypted" value="-----BEGIN PKCS7-----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-----END PKCS7-----
							">
							<input type="image" src="splashfiles/pp-donate.png" name="submit" alt="PayPal - The safer, easier way to pay online!">
							<img alt="" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">
						</form>
				</section>
				</div>
				<footer>
					<div class="wiki-nav" id="wiki-nav-bottom">
						<div class="wiki-nav-item meta"><a href="http://meta.brickimedia.org">Meta</a></div>
						<div class="wiki-nav-item en"><a href="http://en.brickimedia.org">Brickipedia</a></div>
						<div class="wiki-nav-item customs"><a href="http://customs.brickimedia.org">Customs</a></div>
						<div class="wiki-nav-item stories"><a href="http://stories.brickimedia.org">Stories</a></div>
						<div class="wiki-nav-item cuusoo"><a href="http://cuusoo.brickimedia.org">CUUSOO</a></div>
					</div>
				</footer>
			</section>
		</div>
	</div>
	<!-- Quantcast Tag -->
	<script type="text/javascript">
	var _qevents = _qevents || [];

	(function() {
		var elem = document.createElement('script');
		elem.src = (document.location.protocol == "https:" ? "https://secure" : "http://edge") + ".quantserve.com/quant.js";
		elem.async = true;
		elem.type = "text/javascript";
		var scpt = document.getElementsByTagName('script')[0];
		scpt.parentNode.insertBefore(elem, scpt);
	})();

	_qevents.push({
		qacct:"p-PSLuHGN8ESzUr"
	});
	</script>
	<noscript>
		<div style="display:none;">
			<img src="//pixel.quantserve.com/pixel/p-PSLuHGN8ESzUr.gif" height="1" width="1" alt="Quantcast">
		</div>
	</noscript>
	<!-- End Quantcast tag -->
</body>
</html>
