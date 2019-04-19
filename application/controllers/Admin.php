<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Admin extends CI_Controller {

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

	public function add_designation()
	{
		
        $data = json_decode(file_get_contents("php://input"));

        $authtoken=$data->usertoken;
        $token_data=$this->objOfJwt->DecodeToken($authtoken);
        
        $token_user_id=$token_data['uid'];

        $arr_to_inser_desg = array(
                    'designation' => $data->designation ,
                    'created_by' => $token_user_id,
                    'entry_time' => date("Y-m-d H:i:s"),
                    'ip_address' => $_SERVER['REMOTE_ADDR']
                );
        $table = 'user_designation_cat';
        $result = $this->common->insertRow($arr_to_inser_desg,$table);
        if(isset($result) && !empty($result)){
           $response = array('req_status'=>'1', 'message' => 'Designation Added Successfully');
        }
        else{
           $response = array('req_status'=>'0', 'message' => 'Something went Wrong, Please Try Again');

        }
       echo json_encode($response); 
	}
      
        public function get_designation_list()
	{
		$table = 'user_designation_cat';
        $result = $this->common->getRecords($table,array('id','designation'),'',array('designation','asc'));
        echo json_encode($result);
        }
        public function get_role_list()
	{
		$table = 'user_role_cat';
        $result = $this->common->getRecords($table,array('id','role'),'',array('role','asc'));
        echo json_encode($result);
	}
	public function  del_designation(){
		$data = json_decode(file_get_contents("php://input"));
       $table = 'user_designation_cat';
       $arr_delete_array = array(
       	$data->id
       );
       $result = $this->common->deleteRows($arr_delete_array, $table, 'id');
       $response = array('req_status'=>'1', 'message' => 'Deleted Successfully');
       echo json_encode($response); 
		
	}
	/*CLient records*/
	public function add_client()
	{
	
        $data = $_POST;
      
        $authtoken=$data['usertoken'];
        $token_data=$this->objOfJwt->DecodeToken($authtoken);
        
        $token_user_id=$token_data['uid'];
        $logofile_name="";
        if ($_FILES['upload']['name'] != '') {
                $config['upload_path'] = 'assets/clients/';
    //            $config['allowed_types'] = 'docx|pdf';
                $config['allowed_types'] = '*'; // add the asterisk instead of extensions
                $config['max_size'] = "2048000"; // Can be set to particular file size , here it is 2 MB(2048 Kb)
                $logofile_name = time() . str_replace(" ", "_", $_FILES["upload"]['name']);
                $config['file_name'] = $logofile_name;
                $this->load->library('upload', $config);
                $this->upload->do_upload('upload');
        }

        $arr_to_inser_clnt = array(
                    'c_name' => $data['client'] ,
                    'c_logo' => $logofile_name,
                    'created_by' => $token_user_id,
                    'entry_time' => date("Y-m-d H:i:s"),
                    'ip_address' => $_SERVER['REMOTE_ADDR']
                );
        $table = 'client';
        $result = $this->common->insertRow($arr_to_inser_clnt,$table);
        if(isset($result) && !empty($result)){
           $response = array('req_status'=>'1', 'message' => 'Client Added Successfully');
        }
        else{
           $response = array('req_status'=>'0', 'message' => 'Something went Wrong, Please Try Again');

        }
       echo json_encode($response); 
	}
      
        public function get_client_list()
	{
		$table = 'client';
        $result = $this->common->getRecords($table,array('id','c_name','c_logo'),'',array('c_name','asc'));
        echo json_encode($result);
	}
	public function  del_client(){
		$data = json_decode(file_get_contents("php://input"));
       $table = 'client';
       $arr_delete_array = array(
       	$data->id
       );
       $result = $this->common->deleteRows($arr_delete_array, $table, 'id');
       $response = array('req_status'=>'1', 'message' => 'Deleted Successfully');
       echo json_encode($response); 
		
	}

	public function add_member(){
                
    $password = random_string('alnum', 8);
    $encpass = $this->encryption->encrypt($password);
    $data = json_decode(file_get_contents("php://input"));
    
     $authtoken=$data->usertoken;
     $token_data=$this->objOfJwt->DecodeToken($authtoken);
        
       $token_user_id=$token_data['uid'];
    $table = 'user';

    $chkemail = $this->common->getRecords($table,array('uid'),array('email'=>$data->membereamil));
    
    if (count($chkemail)<1) {
                $splitemail=explode("@",$data->membereamil);
                $usrname=fngenerate_uname($splitemail[0]);
                $arr_data = array(
                                'first_name' => $data->teammembername ,
                                'last_name' => $data->teammemberlname,
                                'email'=>$data->membereamil,
                                'username'=>$usrname,
                                'password' =>$encpass,
                                'role'=>$data->utype,
                                'acc_status'=>'1',
                                'designation'=>$data->mainrole,
                                'created_by' => $token_user_id,
                                'entry_time' => date("Y-m-d H:i:s"),
                                'ip_address' => $_SERVER['REMOTE_ADDR']
                );

                $result = $this->common->insertRow($arr_data,$table);

                if(isset($result) && !empty($result)){
                        $pass =  $this->encryption->decrypt($encpass);
                        $subject = "Account Activation Email";

                        $mailTemplate = "emailtemplates/new_user";
                        $mailData["email"] = $data->membereamil;
                        $mailData["password"] = $pass;
                        $mailData["site_path"] = base_url();
                        $user_email = $data->membereamil;
                        
                        //send email to user for confirmation mail
                        sendMail($user_email, $subject, $mailTemplate, $mailData);
                        $response = array('req_status'=>'1', 'message' => 'Member Added Successfully');
                        
                }
        }else{
                $response = array('req_status'=>'0', 'message' => 'User Already Exists');     
        }
        echo json_encode($response); 


}

        public function get_member_details(){
                $data = json_decode(file_get_contents("php://input"));
                $uID=$data->uid;

                $this->db->select('u.*');
                $this->db->from('user u');
                $this->db->where('u.uid',$uID);

                $usrdetails = $this->db->get();
                //echo $this->db->last_query();
                
                echo json_encode($usrdetails->row());
        }
        public function update_member_details(){
                $data = json_decode(file_get_contents("php://input"));
                
                $arr_to_update = array(
                        'first_name' => $data->first_name,
                        'last_name' => $data->last_name,
                        'designation' => $data->designation,
                        'role' => $data->utype,
                        'update_time' => date("Y-m-d H:i:s"),
                        'ip_address' => $_SERVER['REMOTE_ADDR']
                );
        
                $table = 'user';
                $result=$this->common->updateRow($table, $arr_to_update, array('uid' => $data->uid));
                $affected_rows=$this->db->affected_rows();
                if(isset($affected_rows) && $affected_rows>0){
                $response = array('req_status'=>'1', 'message' => 'Member Details Updated Successfully');
                }else{
                $response = array('req_status'=>'0', 'message' => 'Some Error Occurred. Please Try Again');
                }
                echo json_encode($response); 
        }


        public function get_client_details(){
                $data = json_decode(file_get_contents("php://input"));
                $clientID=$data->client_id;

                $this->db->select('c.*');
                $this->db->from('client c');
                $this->db->where('c.id',$clientID);

                $clientdetails = $this->db->get();
                //echo $this->db->last_query();
                
                echo json_encode($clientdetails->row());
        }
        public function update_client_details(){
                $data = $_POST;
                

                $arr_to_update = array(
                        'c_name' => $data['client'],
                        'update_time' => date("Y-m-d H:i:s"),
                        'ip_address' => $_SERVER['REMOTE_ADDR']
                );

                $logofile_name="";
                if (isset($_FILES['upload']['name']) && $_FILES['upload']['name'] != '') {
                        $config['upload_path'] = 'assets/clients/';
            //            $config['allowed_types'] = 'docx|pdf';
                        $config['allowed_types'] = '*'; // add the asterisk instead of extensions
                        $config['max_size'] = "2048000"; // Can be set to particular file size , here it is 2 MB(2048 Kb)
                        $logofile_name = time() . str_replace(" ", "_", $_FILES["upload"]['name']);
                        $config['file_name'] = $logofile_name;
                        $this->load->library('upload', $config);
                        $this->upload->do_upload('upload');
                        $arr_to_update['c_logo']=$logofile_name;
                }
        //echo $data['cid'];//exit;
                $table = 'client';
                $result=$this->common->updateRow($table, $arr_to_update, array('id' => $data['cid']));
                $affected_rows=$this->db->affected_rows();
                //echo '$affected_rows'.$affected_rows;
                if(isset($affected_rows) && $affected_rows>0){
                $response = array('req_status'=>'1', 'message' => 'Client Details Updated Successfully');
                }else{
                $response = array('req_status'=>'0', 'message' => 'Some Error Occurred. Please Try Again');
                }
                echo json_encode($response); 
        }

        public function get_designation_details(){
                $data = json_decode(file_get_contents("php://input"));
                $desgID=$data->desig_id;

                $this->db->select('d.*');
                $this->db->from('user_designation_cat d');
                $this->db->where('d.id',$desgID);

                $desgdetails = $this->db->get();
                //echo $this->db->last_query();
                
                echo json_encode($desgdetails->row());
        }
        public function update_designation_details(){
                $data = json_decode(file_get_contents("php://input"));
                
                $arr_to_update = array(
                        'designation' => $data->designation,
                        'update_time' => date("Y-m-d H:i:s"),
                        'ip_address' => $_SERVER['REMOTE_ADDR']
                );
        
                $table = 'user_designation_cat';
                $result=$this->common->updateRow($table, $arr_to_update, array('id' => $data->did));
                $affected_rows=$this->db->affected_rows();
                if(isset($affected_rows) && $affected_rows>0){
                $response = array('req_status'=>'1', 'message' => 'Designation Details Updated Successfully');
                }else{
                $response = array('req_status'=>'0', 'message' => 'Some Error Occurred. Please Try Again');
                }
                echo json_encode($response); 
        }


        public function update_detail(){
                $data = json_decode(file_get_contents("php://input"));

                $authtoken=$data->usertoken;
                $token_data=$this->objOfJwt->DecodeToken($authtoken);
                        
                $token_user_id=$token_data['uid'];
                $table = 'user';

                $arr_data = array(
                        'first_name' => $data->first_name,
                        'last_name' => $data->last_name,
                        'update_time' => date("Y-m-d H:i:s"),
                        'ip_address' => $_SERVER['REMOTE_ADDR']
                );

                $result = $this->common->updateRow($table, $arr_data, array('uid' =>$token_user_id ));
                $affecterows=$this->db->affected_rows();
                if($affecterows>0){
                        $response = array('req_status'=>'1', 'message' => 'Details Updated Successfully');        
                }
                else
                {   
                        $response = array('req_status'=>'0', 'message' => 'Some error occured, please try again');
                }
                echo json_encode($response); 
        }

        public function reset_password(){
                
                $data = json_decode(file_get_contents("php://input"));
                
                $authtoken=$data->usertoken;
                $token_data=$this->objOfJwt->DecodeToken($authtoken);
                
                $token_user_id=$token_data['uid'];
                $table = 'user';
                //Check if old password match
                $getuserpass=$this->common->getRecords("user",array('password'),array('uid'=>$token_user_id));
                $usrcurrentpass=$this->encryption->decrypt($getuserpass[0]['password']);
                // print_r($getuserpass);
                // echo $usrcurrentpass;exit;
                $oldpassword=$data->old_password;
                if($oldpassword==$usrcurrentpass)
                {
                        $encpass = $this->encryption->encrypt($data->new_password);     

                        $arr_data = array(
                                'password' =>$encpass,
                                'update_time' => date("Y-m-d H:i:s"),
                                'ip_address' => $_SERVER['REMOTE_ADDR']
                        );
                        $result = $this->common->updateRow($table, $arr_data, array('uid' =>$token_user_id ));
                        $affecterows=$this->db->affected_rows();
                        if($affecterows>0){
                                $response = array('req_status'=>'1', 'message' => 'Password Updated Successfully');
                        }
                        else
                        {   
                                $response = array('req_status'=>'0', 'message' => 'Some error occured, please try again');
                        }
                }else{
                        $response = array('req_status'=>'0', 'message' => 'Incorrect old password, please try again');
                }
                echo json_encode($response); 
        }

public function get_team_list(){
	
        $this->db->select('u.uid,u.email,u.first_name,u.last_name,ud.designation');
        $this->db->from('user u');
        $this->db->where('role!=','1');
        $this->db->join('user_designation_cat ud', 'ud.id = u.designation', 'left');
        $this->db->order_by('u.first_name','asc');
        $this->db->order_by('u.last_name','asc');
        $teamdetails = $this->db->get();
        //echo $this->db->last_query();
        
        echo json_encode($teamdetails->result());
}
public function del_member(){
	$data = json_decode(file_get_contents("php://input"));
       $table = 'user';
       $arr_delete_array = array(
       	$data->uid
       );
       $result = $this->common->deleteRows($arr_delete_array, $table, 'uid');
       $response = array('req_status'=>'1', 'message' => 'Deleted Successfully');
       echo json_encode($response); 
}

        public function get_logged_user_details()
        {
                $data = json_decode(file_get_contents("php://input"));
                $authtoken=$data->usertoken;
                $token_data=$this->objOfJwt->DecodeToken($authtoken);
                $token_user_id=$token_data['uid'];
                
                $result = $this->common->getRecords('user',array('first_name','last_name','email'),array('uid'=>$token_user_id));
                echo json_encode($result);
        }
}
