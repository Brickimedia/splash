<?php
$username = $_COOKIE["sharedUserName"];
$url = "http://en.brickimedia.org/index.php?title=Brickipedia:Pick_the_Hero_contest/entries/" . $_COOKIE["sharedUserName"] . "&action=edit&preload=MediaWiki:Createplate-ContestEntry&redlink=1";
//header("Location: $url");
echo $username;
echo $url;
?>