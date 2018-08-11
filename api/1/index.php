<?php
/*
 * A RESTful API router.
 * @author Jahidul Pabel Islam
*/

//include all files needed
include $_SERVER['DOCUMENT_ROOT'] . '/api/inc/init.php';

//do relevant stuff with path[1]
switch ($path[0]) {
    case "login":
        switch ($method) {
            case "POST":
                $results = Auth::login($data);
                break;
            default:
                $results["meta"] = methodNotAllowed($method, $path);
        }
        break;
	case "logout":
		switch ($method) {
			case "GET":
				$results = Auth::logout();
				break;
			default:
				$results["meta"] = methodNotAllowed($method, $path);
		}
		break;
	case "session":
		switch ($method) {
			case "GET":
				$results = API::getAuthStatus();
				break;
			default:
				$results["meta"] = methodNotAllowed($method, $path);
		}
		break;
    case "projects":
        switch ($method) {
            case "GET":
                if (isset($path[1]) && trim($path[1]) !== "") {
                    $results = API::getProject($path[1]);
                } else {
                    $results = API::getProjects($data);
                }
                break;
            case "POST":
                $results = API::addProject($data);
                break;
	        case "PUT":
		        if (isset($path[1]) && trim($path[1]) !== "") {
			        $data["projectID"] = $path[1];
			        $results = API::editProject($data);
		        }
		        break;
	        case "DELETE":
		        if (isset($path[1]) && trim($path[1]) !== "") {
			        $data["projectID"] = $path[1];
			        $results = API::deleteProject($data);
		        }
		        break;
            default:
                $results["meta"] = methodNotAllowed($method, $path);
        }
        break;
    case "pictures":
        switch ($method) {
            case "POST":
                if (isset($_FILES["picture"]) && isset($path[1]) && trim($path[1]) !== "") {
                    $data["projectID"] = $path[1];
                    $results = API::addPicture($data);
                }
                break;
	        case "DELETE":
		        if (isset($data["file"]) && isset($path[1]) && trim($path[1]) !== "") {
			        $data["projectID"] = $path[1];
			        $results = API::deletePicture($data);
		        }
		        break;
            default:
                $results["meta"] = methodNotAllowed($method, $path);
        }
        break;
    default:
        $results["meta"]["ok"] = false;
        $results["meta"]["status"] = 404;
        $results["meta"]["feedback"] = "Unrecognised URI.";
        $results["meta"]["message"] = "Not Found";
}

sendData($results, $data, $method, $path);