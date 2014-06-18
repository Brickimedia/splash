<?php
/*
** Avatar retrieval function for SocialProfile avatars in MediaWiki
** @author George Barnick <george.barnick@brickcraft.me>
*/

// Location to avatars on-server (may need to be changed periodically)
$directory = "/var/www/images/avatars/";

// The file to be displayed
$file = "";

// The file header type
$type = "image/";

if ( $_GET["id"] ) {
	$userID = $_GET["id"];
} else {
	$userID = $_COOKIE["sharedUserID"];
}

if ( file_exists( $directory . $userID . "_l.png" ) ) {
	$file = $directory . $userID . "_l.png";
	$type .= "png";
} elseif ( file_exists( $directory . $userID . "_l.jpg" ) ) {
	$file = $directory . $userID . "_l.jpg";
	$type .= "jpeg";
} elseif ( file_exists( $directory . $userID . "_l.gif" ) ) {
	$file = $directory . $userID . "_l.gif";
	$type .= "gif";
} else {
	$file = $directory . "default_l.gif";
	$type .= "gif";
}

header( 'Content-Type:' . $type );

readfile( $file );
