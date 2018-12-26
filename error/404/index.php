<?php
include_once($_SERVER["DOCUMENT_ROOT"] . "/site.php");

$site = Site::get();

$headTitle = $headerTitle = "404";

$headDesc = "Error: 404 - Page Not Found message on the portfolio of Jahidul Pabel Islam, a Full Stack Web & Software Developer in Bognor Regis, West Sussex Down by the South Coast of England.";
$site->echoHTMLHead($headTitle, $headDesc);

$headerDesc = "Page Not Found";
$site->echoHeader($headerTitle, $headerDesc);
?>

				<div class="article article--halved">
					<div class="container">
						<div class="article__half">
							<img src="/assets/images/404.jpg?v=2" alt="Missing page image" class="error__img">
						</div>
						<div class="article__half">
							<p>The page you are trying to view can not be found.</p>
							<p>Please consider to go back to the original page or try retyping in the URL.</p>
						</div>
					</div>
				</div>

<?php
$site->echoFooter();
?>               