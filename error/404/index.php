<?php
include_once($_SERVER["DOCUMENT_ROOT"] . "/Site.php");

$site = Site::get();

$pageId = $title = basename(__DIR__);
$pageDesc = "Page Not Found";
$headDesc = "Error: 404 - Page Not Found message on the portfolio of Jahidul Pabel Islam, a Full Stack Web & Software Developer in Bognor Regis, West Sussex Down by the South Coast of England.";

$pageData = [
    "pageId" => $pageId,
    "headTitle" => "{$title} - {$pageDesc}",
    "headDesc" => $headDesc,
    "headerTitle" => $title,
    "headerDesc" => $pageDesc,
];
$site->addPageData($pageData);

$site->renderHTMLHead();
$site->renderNav();
$site->renderHeader();
?>

                <div class="article article--halved">
                    <div class="container">
                        <div class="article__half">
                            <img src="<?php $site->echoWithAssetVersion("/assets/images/404.jpg"); ?>" alt="Missing page image" class="error__img">
                        </div>
                        <div class="article__half">
                            <p>The page you are trying to view can not be found.</p>
                            <p>Please consider to go back to the original page or try retyping in the URL.</p>
                        </div>
                    </div>
                </div>

<?php
$similarLinks = [
    [
        "title" => "Projects",
        "url" => "projects",
        "text" => "View My Work",
        "colour" => "purple",
    ], [
        "title" => "Contact",
        "url" => "contact",
        "text" => "Get in Touch",
        "colour" => "blue",
    ],
];
$site->renderFooter($similarLinks);
