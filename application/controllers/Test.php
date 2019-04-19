<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Test extends CI_Controller {

	public function __construct()
	{
		parent::__construct();

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

		$this->load->model('test_model','user'); // Loading model 
	}

	public function users()
	{
		
		switch($_SERVER['REQUEST_METHOD']){
			case 'GET':
			$result = $this->user->get_users();
			echo json_encode($result);
			break;
			case 'POST':
			$datas = json_decode(file_get_contents("php://input"));
			$result = $this->user->save_user($datas);
			echo json_encode($result);
			break;

		}
	}

	public function send_mail() { 
		$from_email = "shreyas.foujdar@gmail.com"; 
		$to_email = "sfoujdar@integrative-systems.com, shreyas.foujdar@gmail.com"; 
  
		//Load email library 
		$this->load->library('email'); 
  
		$this->email->from($from_email, 'Integrative Systems'); 
		$this->email->to($to_email);
		$this->email->subject('Email Test'); 
		$this->email->message('Testing the email class.'); 
  
		//Send mail 
		if($this->email->send()) 
		echo "Email sent successfully."; 
		else 
		echo "Error in sending Email."; 
		
	 } 

}
