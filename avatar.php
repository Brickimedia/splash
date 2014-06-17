<?php
/*
** Avatar retrieval function for SocialProfile avatars in MediaWiki
** @author George Barnick <george.barnick@brickcraft.me>
*/

// Location to avatars on-server (may need to be changed periodically)
$directory = "/var/www/images/avatars/";

// Location of avatars to the client
$client = "//images.brickimedia.org/avatars/";

// The output to be displayed
$output = "";

if ( $_GET["id"] ) {
	$userID = $_GET["id"];
} else {
	$userID = $_COOKIE["sharedUserID"];
}

if ( file_exists( $directory . $userID . "_l.png" ) ) {
	$output = $client . $userID . "_l.png";
} elseif ( file_exists( $directory . $userID . "_l.jpg" ) ) {
	$output = $client . $userID . "_l.jpg";
} elseif ( file_exists( $directory . $userID . "_l.gif" ) ) {
	$output = $client . $userID . "_l.gif";
} else {
	$output = $client . "default_l.gif";
}
?>

<html>
	<body>
		<?php
			if ( $_GET["url"] == "1" || $error ) {
				echo $output;
			} else {
				echo "<img src=\"{$output}\" alt=\"Avatar\" width=\"75\" />";
			}
		?>
	</body>
</html>

