<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Project extends CI_Controller {

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

		$this->load->model('project_model','project'); // Loading model 
		$this->load->model('common_model','common'); // Loading model 
	}

	public function add_project()
	{
		$data = json_decode(file_get_contents("php://input"));
		$result = $this->project->add_project($data);
		echo json_encode($result);
	}

	public function update_project()
	{
		$data = json_decode(file_get_contents("php://input"));
		$result = $this->project->update_project($data);
		echo json_encode($result);
	}
	public function fn_update_user_project_role()
	{
		$data = json_decode(file_get_contents("php://input"));
		$result = $this->project->fn_update_user_project_role($data);
		echo json_encode($result);
	}
	public function delete_project()
	{
		$data = json_decode(file_get_contents("php://input"));
		$projectID=$data->project_id;

		$authtoken=$data->usertoken;
        $token_data=$this->objOfJwt->DecodeToken($authtoken);
		$token_user_id=$token_data['uid'];

		$table = 'project';
		$this->db->where('proj_id', $projectID);
		$this->db->delete($table);

		//Add activity log			
		$arr_activity = array(
			'user_id' => $token_user_id,
			'proj_id' => $projectID,
			'ticket_id' => '',
			'activity_desc' => "Deleted Project",
			'entry_time' => date("Y-m-d H:i:s"),
			'ip_address' => $_SERVER['REMOTE_ADDR']
		);
		insert_activity_log($arr_activity);

		$response = array('req_status'=>'1', 'message' => 'Project Removed Successfully');
		echo json_encode($response);
	}
      
    public function get_project_list()
	{
		$data = json_decode(file_get_contents("php://input"));
		$result = $this->project->project_list($data);
		echo json_encode($result);
	}

	public function get_project_details()
	{
		$data = json_decode(file_get_contents("php://input"));
		$result = $this->project->fn_get_project_details($data);
		echo json_encode($result);
	}

	public function get_client_list()
	{
		$data = json_decode(file_get_contents("php://input"));
		$result = $this->common->getRecords('client',array('id','c_name'),'');
		echo json_encode($result);
	}	

	//Manage Project Team Functions
	public function get_project_team()
	{
		$data = json_decode(file_get_contents("php://input"));
		$result = $this->project->fn_get_project_team($data);
		echo json_encode($result);
	}
	public function get_user_project_role()
	{
		$data = json_decode(file_get_contents("php://input"));
		$authtoken=$data->usertoken;
		$token_data=$this->objOfJwt->DecodeToken($authtoken);
		$token_user_id=$token_data['uid'];

		$projectID=$data->project_id;

		$userrole = $this->common->getRecords('user_project_rel',array('usr_proj_role'),array('user_id'=>$token_user_id,'proj_id'=>$projectID));

		echo json_encode($userrole);
	}
	public function get_project_non_team_members()
	{
		$data = json_decode(file_get_contents("php://input"));
		$result = $this->project->fn_get_project_non_team_members($data);
		echo json_encode($result);
	}
	public function add_member_to_project()
	{
		$success="0";
		$data = json_decode(file_get_contents("php://input"));
		$authtoken=$data->usertoken;
        $token_data=$this->objOfJwt->DecodeToken($authtoken);
		$token_user_id=$token_data['uid'];
		
		$arrMembers=$data->teammembers;
		$projectID=$data->p_id;
		$table = 'user_project_rel';
		foreach($arrMembers as $uid)
		{
			$chkexists = $this->common->getRecords('user_project_rel',array('user_id'),array('user_id'=>$uid,'proj_id'=>$projectID));
			if(count($chkexists)<=0)
			{
				$success="1";
				$arr_to_insert = array(
					'user_id' => $uid,
					'proj_id' => $projectID,
				);
				$this->common->insertRow($arr_to_insert,$table);


				//Add activity log
				$userinfo = $this->common->getRecords('user',array('first_name','last_name'),array('uid'=>$uid));
				
				$arr_activity = array(
					'user_id' => $token_user_id,
					'proj_id' => $projectID,
					'ticket_id' => '',
					'activity_desc' => "Added ".$userinfo['0']['first_name']." ".$userinfo['0']['last_name']." In Team",
					'entry_time' => date("Y-m-d H:i:s"),
					'ip_address' => $_SERVER['REMOTE_ADDR']
				);
				insert_activity_log($arr_activity);
			}
		}
		if($success=="1"){
			$response = array('req_status'=>'1', 'message' => 'Member(s) Added Successfully');
		}else{
			$response = array('req_status'=>'0', 'message' => 'Member(s) Already Exists');
		}
		echo json_encode($response); 	
	}
	public function remove_member_from_project()
	{
		$data = json_decode(file_get_contents("php://input"));
		$uid=$data->user_id;
		$projectID=$data->project_id;

		$authtoken=$data->usertoken;
        $token_data=$this->objOfJwt->DecodeToken($authtoken);
		$token_user_id=$token_data['uid'];

		$table = 'user_project_rel';
		$this->db->where('proj_id', $projectID);
		$this->db->where('user_id', $uid);
		$this->db->delete($table);

		//Add activity log
		$userinfo = $this->common->getRecords('user',array('first_name','last_name'),array('uid'=>$uid));
			
		$arr_activity = array(
			'user_id' => $token_user_id,
			'proj_id' => $projectID,
			'ticket_id' => '',
			'activity_desc' => "Removed ".$userinfo['0']['first_name']." ".$userinfo['0']['last_name']." From Team",
			'entry_time' => date("Y-m-d H:i:s"),
			'ip_address' => $_SERVER['REMOTE_ADDR']
		);
		insert_activity_log($arr_activity);

		$response = array('req_status'=>'1', 'message' => 'Member(s) Removed Successfully');
		echo json_encode($response); 	
	}

	function fn_chk_if_lead()
	{
		$data = json_decode(file_get_contents("php://input"));
		$authtoken=$data->usertoken;
        $token_data=$this->objOfJwt->DecodeToken($authtoken);
		$token_user_id=$token_data['uid'];

		//get user projects
        $projects = $this->common->getRecords('user_project_rel',array('proj_id'),"user_id='".$token_user_id."' AND role IN ('1','2')");
        if( count($projects) > 0)
        {
            $response = array('is_lead'=>true);
        }else{
            $response = array('is_lead'=>false);
        }
        echo json_encode($response);
	}
}
