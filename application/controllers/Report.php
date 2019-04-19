<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Report extends CI_Controller {

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

        $this->load->model('Common_model','common'); // Loading model 
    }
   
    function get_user_ratings()
    {
        $data = json_decode(file_get_contents("php://input"));
               
        $fmonthyr=explode('-',$data->ratemonth);
        $feedbackmonth=$fmonthyr[1];
        $feedbackyear=$fmonthyr[0];
        $monthname=date("F", mktime(0, 0, 0, (int)$feedbackmonth, 10));
        $this->db->select('"'.$monthname.'" as Month, urd.year as Year, u.first_name as First_Name, u.last_name as Last_Name, COALESCE(ROUND(urd.avg_rating,1),0) as Rating, CONCAT(rby.first_name," ",rby.last_name) as Rating_By');
        $this->db->from('user_rating_details urd');
        $this->db->join('user u', 'u.uid = urd.user_id', 'left');
        $this->db->join('user rby', 'rby.uid = urd.rating_by', 'left');
        
        $this->db->where('urd.month',$feedbackmonth);
        $this->db->where('urd.year',$feedbackyear);
        
        $this->db->group_by('u.uid');
        $this->db->order_by('u.first_name','ASC');
        $this->db->order_by('u.last_name','ASC');
        $query = $this->db->get();
        $res=$query->result();
        echo json_encode($res);
    }
 



}
