<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sign_in extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->objOfJwt = new ImplementJwt();
		if (isset($_SERVER['HTTP_ORIGIN'])){
			header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
			header('Access-Control-Allow-Credentials: true');
			header('Access-Control-Max-Age: 86400');    // cache for 1 day
		}

		// Access-Control headers are received during OPTIONS requests
		if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') 
		{

			if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
				header("Access-Control-Allow-Methods: GET, POST,OPTIONS");         

			if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
				header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

			exit(0);
		}

		$this->load->model('signin_model','signin'); // Loading model 
	}

	public function login_auth()
	{
        $data = json_decode(file_get_contents("php://input"));
        $result = $this->signin->authenticate_user($data);
        echo json_encode($result);
	}
      
        public function check_login_status()
	{
        $data = json_decode(file_get_contents("php://input"));
        $result = $this->signin->check_status($data);
        echo json_encode($result);
	}

}
