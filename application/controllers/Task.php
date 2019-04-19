<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Task extends CI_Controller {

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
    //Task functions
	public function create_task()
	{
        $data = json_decode(file_get_contents("php://input"));      
        $global = $this->common->getGlobalSettings();
        $authtoken=$data->usertoken;
        $token_data=$this->objOfJwt->DecodeToken($authtoken);
        
        $token_user_id=$token_data['uid'];
        $slug=(int)$global['ticket_slug_last_id']+1;
        $slug="T".$slug;

        $assigned_to=$data->member;
        $taskstartdate=date("Y-m-d H:i:s", strtotime(@$data->taskscdate." 00:00:00"));
        if(isset($data->taskecdate) && $data->taskecdate!=""){
            $taskenddate=date("Y-m-d H:i:s", strtotime(@$data->taskecdate." 23:59:59"));
        }else{
            $taskenddate=date("Y-m-d H:i:s", strtotime(date("Y-m-d 23:59:59"). " +2 week"));
        }
        if(isset($data->taskname) && $data->taskname!=""){
            $taskname=$data->taskname;
        }else{
            $taskname="";
        }
        $arr_to_insert = array(
                    'proj_id' => $data->project_id,
                    'name' => $taskname,
                    'slug' => $slug,
                    'description' => $data->taskdesc,
                    'start_date' => $taskstartdate,
                    'end_date' => $taskenddate,
                    'column_id' => '1',
                    'estimated_hours' => $data->estimated_hours,
                    'actual_hours' => $data->actual_hours,
                    'rework_hours' => $data->rework_hours,
                    'created_by' => $token_user_id,
                    'entry_time' => date("Y-m-d H:i:s"),
                    'ip_address' => $_SERVER['REMOTE_ADDR']
                );
        $table = 'ticket';
        $result = $this->common->insertRow($arr_to_insert,$table);
        if(isset($result) && !empty($result)){
            //insert activity log
            $arr_activity = array(
                'user_id' => $token_user_id,
                'proj_id' => $data->project_id,
                'ticket_id' => $result,
                'activity_desc' => "Task Created",
                'entry_time' => date("Y-m-d H:i:s"),
                'ip_address' => $_SERVER['REMOTE_ADDR']
            );
            insert_activity_log($arr_activity);
            
            //update global settings
            $gset=$this->common->getGlobalSettings();
            $new_id=(int)$gset['ticket_slug_last_id']+1;
            $this->common->updateRow('global_settings', array('meta_value' => $new_id), array('meta_key' => 'ticket_slug_last_id'));
            
            //Assign task to selected members
            $project_details=$this->common->getRecords('project',array('name,slug'),array('proj_id' => $data->project_id));
            $assigner_details=$this->common->getRecords('user',array('first_name,email'),array('uid' => $token_user_id));
            if(isset($assigned_to) && !empty($assigned_to))
            {
                foreach($assigned_to as $user)
                {
                    $arr_members_rel = array(
                        'user_id' => $user,
                        'ticket_id' => $result
                    );
                    $reltable = 'user_ticket_rel';
                    if($this->common->insertRow($arr_members_rel,$reltable))
                    {
                        
                        $assignee_details=$this->common->getRecords('user',array('first_name,email'),array('uid' => $user));
                        //Send mail to users whom task is assigned
                        $subject = "PMS Task Updates";
                        $mailTemplate = "emailtemplates/task_updates";
                        $mailData["assignee_email"] = $assignee_details[0]['email'];
                        $mailData["assignee_name"] = $assignee_details[0]['first_name'];
                        $mailData["assigner_email"] = $assigner_details[0]['email'];
                        $mailData["assigner_name"] = $assigner_details[0]['first_name'];
                        $mailData["task_ttl"] = $taskname;
                        $mailData["task_id"] = $result;
                        $mailData["task_slug"] = $slug;
                        $mailData["project_id"] = $data->project_id;
                        $mailData["project_ttl"] = $project_details[0]['name'];
                        $mailData["project_slug"] = $project_details[0]['slug'];
                        $mailData["task_update_msg"] = "assigned new task to you.";
                        $mailData["site_path"] = base_url();
                        $user_email = $assignee_details[0]['email'];
                        
                        //send email to user for confirmation mail
                        sendMail($user_email, $subject, $mailTemplate, $mailData);
                    }

                }
            }
           $response = array('req_status'=>'1', 'task_id'=>$result, 'message' => 'Task Created Successfully');
        }
        else{
           $response = array('req_status'=>'0', 'message' => 'Something went Wrong, Please Try Again');
        }
       echo json_encode($response); 
    }  
    public function update_task()
	{
        $data = json_decode(file_get_contents("php://input"));
        $global = $this->common->getGlobalSettings();
        $authtoken=$data->usertoken;
        $token_data=$this->objOfJwt->DecodeToken($authtoken);
        
        $token_user_id=$token_data['uid'];
        
        $assigned_to=$data->member;
        $taskstartdate=date("Y-m-d H:i:s", strtotime(@$data->taskscdate." 00:00:00"));
        $taskenddate=date("Y-m-d H:i:s", strtotime($data->taskecdate." 23:59:59"));
        $arr_to_update = array(
                    'name' => $data->taskname,
                    'description' => $data->taskdesc,
                    'start_date' => $taskstartdate,
                    'end_date' => $taskenddate,
                    'estimated_hours' => $data->estimated_hours,
                    'actual_hours' => $data->actual_hours,
                    'rework_hours' => $data->rework_hours,
                    'status' => '1',
                    'update_time' => date("Y-m-d H:i:s"),
                    'ip_address' => $_SERVER['REMOTE_ADDR']
                );
        if(isset($data->status) && $data->status!=null){
            $arr_to_update['column_id'] = $data->status;
        }
        
        $table = 'ticket';
        $result=$this->common->updateRow($table, $arr_to_update, array('ticket_id' => $data->ticket_id));
        $affected_rows=$this->db->affected_rows();
        if(isset($affected_rows) && $affected_rows>0){

            //insert activity log
            $arr_activity = array(
                'user_id' => $token_user_id,
                'proj_id' => $data->project_id,
                'ticket_id' => $data->ticket_id,
                'activity_desc' => "Task Updated",
                'entry_time' => date("Y-m-d H:i:s"),
                'ip_address' => $_SERVER['REMOTE_ADDR']
            );
            insert_activity_log($arr_activity);
            
            //Assign task to selected members
            if(isset($assigned_to) && $assigned_to!=null){
                $prev_assignee=$this->common->getRecords('user_ticket_rel',array('user_id'),array('ticket_id' => $data->ticket_id));
                $arrprusr=array();
                foreach($prev_assignee as $prevuser)
                {
                    $arrprusr[]=$prevuser['user_id'];
                }
                //print_r($arrprusr);exit;
                $project_details=$this->common->getRecords('project',array('name,slug'),array('proj_id' => $data->project_id));
                $assigner_details=$this->common->getRecords('user',array('first_name,email'),array('uid' => $token_user_id));
                $ticket_details=$this->common->getRecords('ticket',array('slug'),array('ticket_id' => $data->ticket_id));
                $reltable = 'user_ticket_rel';
                $this->db->where('ticket_id', $data->ticket_id);
                $this->db->delete($reltable);
                foreach($assigned_to as $user)
                {
                    $arr_members_rel = array(
                        'user_id' => $user,
                        'ticket_id' => $data->ticket_id
                    );
                    
                    if($this->common->insertRow($arr_members_rel,$reltable))
                    {
                        if(!in_array($user,$arrprusr)){
                            $assignee_details=$this->common->getRecords('user',array('first_name,email'),array('uid' => $user));
                            //Send mail to users whom task is assigned
                            $subject = "PMS Task Updates";
                            $mailTemplate = "emailtemplates/task_updates";
                            $mailData["assignee_email"] = $assignee_details[0]['email'];
                            $mailData["assignee_name"] = $assignee_details[0]['first_name'];
                            $mailData["assigner_email"] = $assigner_details[0]['email'];
                            $mailData["assigner_name"] = $assigner_details[0]['first_name'];
                            $mailData["task_ttl"] = $data->taskname;
                            $mailData["task_id"] = $data->ticket_id;
                            $mailData["task_slug"] = $ticket_details[0]['slug'];
                            $mailData["project_id"] = $data->project_id;
                            $mailData["project_ttl"] = $project_details[0]['name'];
                            $mailData["project_slug"] = $project_details[0]['slug'];
                            $mailData["task_update_msg"] = "assigned task to you.";
                            $mailData["site_path"] = base_url();
                            $user_email = $assignee_details[0]['email'];
                            
                            //send email to user for confirmation mail
                            sendMail($user_email, $subject, $mailTemplate, $mailData);
                        }
                    }
                }
            }
            //Send mail to users whom task is assigned            
            $response = array('req_status'=>'1', 'message' => 'Task Details Updated Successfully');
        }else{
            $response = array('req_status'=>'0', 'message' => 'Some Error Occurred. Please Try Again');
        }
        echo json_encode($response);
    } 
    public function update_task_status()
	{
        $data = json_decode(file_get_contents("php://input"));
        $global = $this->common->getGlobalSettings();
        $authtoken=$data->usertoken;
        $token_data=$this->objOfJwt->DecodeToken($authtoken);
        
        $token_user_id=$token_data['uid'];
        
        

        $arr_to_update = array(
                    'column_id' => $data->status,
                    'update_time' => date("Y-m-d H:i:s"),
                    'ip_address' => $_SERVER['REMOTE_ADDR']
                );
        
        $table = 'ticket';
        $result=$this->common->updateRow($table, $arr_to_update, array('ticket_id' => $data->ticket_id));
        $affected_rows=$this->db->affected_rows();
        if(isset($affected_rows) && $affected_rows>0){

            //insert activity log
            $ticketcolname=$this->common->getRecords('ticket_column',array('column_name'),array('id' => '1'));
            
            $arr_activity = array(
                'user_id' => $token_user_id,
                'proj_id' => $data->project_id,
                'ticket_id' => $data->ticket_id,
                'activity_desc' => "Task Moved To <b>".$ticketcolname[0]['column_name']."</b>",
                'entry_time' => date("Y-m-d H:i:s"),
                'ip_address' => $_SERVER['REMOTE_ADDR']
            );
            insert_activity_log($arr_activity);
            
            //Send mail to users whom task is assigned            

            $response = array('req_status'=>'1', 'message' => 'Task Status Changed Successfully');
        }else{
            $response = array('req_status'=>'0', 'message' => 'Some Error Occurred. Please Try Again');
        }
        echo json_encode($response);
    } 
    public function get_task_column_list()
	{
        $result = $this->common->getRecords('ticket_column',array('id','column_name'),'');
        echo json_encode($result);
    }
    public function get_task_details()
    {
        $data = json_decode(file_get_contents("php://input"));
        $taskID=$data->task_id;

        $this->db->select('t.*,c.column_name,GROUP_CONCAT(r.user_id SEPARATOR ",") as members');
        $this->db->from('ticket t');
        $this->db->join('ticket_column c', 't.column_id = c.id', 'left');
        $this->db->join('user_ticket_rel r', 't.ticket_id = r.ticket_id', 'left');
        $this->db->where('t.ticket_id',$taskID);

        $taskdetails = $this->db->get();
        //echo $this->db->last_query();
        
         echo json_encode($taskdetails->result());
    }
    public function get_task_users()
    {
        $data = json_decode(file_get_contents("php://input"));
        $taskID=$data->task_id;

        $this->db->select('u.uid,u.first_name,u.last_name,u.email,u.username');
        $this->db->from('user u');
        $this->db->join('user_ticket_rel utr', 'u.uid = utr.user_id', 'inner');
        $this->db->where('utr.ticket_id',$taskID);
        $taskUsers = $this->db->get();
        echo json_encode($taskUsers->result());
    }
    public function get_task_user_username()
    {
        $data = json_decode(file_get_contents("php://input"));
        $projID=$data->project_id;
        $arruname=array();
        $this->db->select('u.username');
        $this->db->from('user u');
        $this->db->join('user_project_rel utr', 'u.uid = utr.user_id', 'inner');
        $this->db->where('utr.proj_id',$projID);
        $taskUsers = $this->db->get();
        $restaskUsers=$taskUsers->result();
        foreach($restaskUsers as $key=>$val)
        {
            $arruname[]=$val->username;
        }
        echo json_encode($arruname);
    }    
    //Task dashboard listing
    public function task_dashboard_listing()
    {
        $data = json_decode(file_get_contents("php://input"));
        $projectID=$data->project_id;

        $task_arr=array();
        $ticket_cols = $this->common->getRecords('ticket_column',array('id','column_name'),'');
        $k="0";
        foreach($ticket_cols as $ticket_col)
        {
            $col_tasks_arr=array();
            $task_arr[$k]['id']=$ticket_col['id'];
            $task_arr[$k]['name']=$ticket_col['column_name'];

            $tasks = $this->common->getRecords('ticket','*',array('column_id'=>$ticket_col['id'],'proj_id'=>$projectID,'status'=>'1'),array('ticket_id','desc'));
            $task_arr[$k]['ticketarr']=$tasks;
            /*$t='0';
            foreach($tasks as $val)
            {
                $userrole = $this->common->getRecords('user_project_rel',array('role'),array('user_id'=>$val['created_by'],'proj_id'=>$projectID));
                $task_arr[$k]['ticketarr'][$t]['creater_user_role']=$userrole[0]['role'];
                $t++;
            }*/
            $k++;
        }
        echo json_encode($task_arr);
        
    }

    //Comment functions
    public function add_comment()
	{
        $data = json_decode(file_get_contents("php://input"));
        
        $authtoken=$data->usertoken;
        $token_data=$this->objOfJwt->DecodeToken($authtoken);
        
        $token_user_id=$token_data['uid'];
        
        $arr_to_insert = array(
                    'ticket_id' => $data->ticket_id,
                    'comment' => $data->taskcomment,
                    'created_by' => $token_user_id,
                    'entry_time' => date("Y-m-d H:i:s"),
                    'ip_address' => $_SERVER['REMOTE_ADDR']
                );
        $table = 'comment';
        $result = $this->common->insertRow($arr_to_insert,$table);
        if(isset($result) && !empty($result)){
            //Insert Activity Log
            $arr_activity = array(
                'user_id' => $token_user_id,
                'proj_id' => $data->project_id,
                'ticket_id' => $data->ticket_id,
                'activity_desc' => "Added Comment",
                'entry_time' => date("Y-m-d H:i:s"),
                'ip_address' => $_SERVER['REMOTE_ADDR']
            );
            insert_activity_log($arr_activity);
                            //update task status
            $arr_sts_update = array(
                'status' => '1'
            );
            $this->common->updateRow('ticket', $arr_sts_update, array('ticket_id' => $data->ticket_id));
            //send email to members mentioned in comment
            preg_match_all('/@([^@\s]+)/', $data->taskcomment, $matches);
            $mentions = array_unique($matches[1]);
            if(count($mentions)>0)
            {
                $this->db->select('uid,first_name,email');
                $this->db->from('user');
                $this->db->where_in('username', $mentions);
                $qry=$this->db->get();
                $resusrlist=$qry->result();


                $project_details=$this->common->getRecords('project',array('name,slug'),array('proj_id' => $data->project_id));
                $assigner_details=$this->common->getRecords('user',array('first_name,email'),array('uid' => $token_user_id));
                $ticket_details=$this->common->getRecords('ticket',array('slug,name'),array('ticket_id' => $data->ticket_id));
                foreach($resusrlist as $usrdata)
                {
                    
                    $subject = "PMS Task Updates";
                    $mailTemplate = "emailtemplates/task_updates";
                    $mailData["assignee_email"] = $usrdata->email;
                    $mailData["assignee_name"] = $usrdata->first_name;
                    $mailData["assigner_email"] = $assigner_details[0]['email'];
                    $mailData["assigner_name"] = $assigner_details[0]['first_name'];
                    $mailData["task_ttl"] = $ticket_details[0]['name'];
                    $mailData["task_id"] = $data->ticket_id;
                    $mailData["task_slug"] = $ticket_details[0]['slug'];
                    $mailData["project_id"] = $data->project_id;
                    $mailData["project_ttl"] = $project_details[0]['name'];
                    $mailData["project_slug"] = $project_details[0]['slug'];
                    $mailData["task_update_msg"] = "mentioned you in comment.";
                    $mailData["site_path"] = base_url();
                    $user_email = $usrdata->email;
                    sendMail($user_email, $subject, $mailTemplate, $mailData);
                }
            }

            $response = array('req_status'=>'1', 'message' => 'Comment Added Successfully');           
        }
        else{
           $response = array('req_status'=>'0', 'message' => 'Something went Wrong, Please Try Again');
        }
        echo json_encode($response);
    }  
    public function update_comment()
	{
        $data = json_decode(file_get_contents("php://input"));
        
        $authtoken=$data->usertoken;
        $token_data=$this->objOfJwt->DecodeToken($authtoken);
        
        $token_user_id=$token_data['uid'];
        
        $arr_to_update = array(
            
            'comment' => $data->taskcomment,
            
            'update_time' => date("Y-m-d H:i:s"),
            'ip_address' => $_SERVER['REMOTE_ADDR']
        );
       
        $table = 'comment';
        $result=$this->common->updateRow($table, $arr_to_update, array('comment_id' => $data->comment_id));
        $affected_rows=$this->db->affected_rows();
        if(isset($affected_rows) && $affected_rows>0){

            //insert activity log
            $arr_activity = array(
                'user_id' => $token_user_id,
                'proj_id' => $data->project_id,
                'ticket_id' => $data->ticket_id,
                'activity_desc' => "Comment Updated",
                'entry_time' => date("Y-m-d H:i:s"),
                'ip_address' => $_SERVER['REMOTE_ADDR']
            );
            insert_activity_log($arr_activity);      
            
            //send email to members mentioned in comment
            preg_match_all('/@([^@\s]+)/', $data->taskcomment, $matches);
            $mentions = array_unique($matches[1]);
            if(count($mentions)>0)
            {
                $this->db->select('uid,first_name,email');
                $this->db->from('user');
                $this->db->where_in('username', $mentions);
                $qry=$this->db->get();
                $resusrlist=$qry->result();


                $project_details=$this->common->getRecords('project',array('name,slug'),array('proj_id' => $data->project_id));
                $assigner_details=$this->common->getRecords('user',array('first_name,email'),array('uid' => $token_user_id));
                $ticket_details=$this->common->getRecords('ticket',array('slug,name'),array('ticket_id' => $data->ticket_id));
                foreach($resusrlist as $usrdata)
                {
                    $subject = "PMS Task Updates";
                    $mailTemplate = "emailtemplates/task_updates";
                    $mailData["assignee_email"] = $usrdata->email;
                    $mailData["assignee_name"] = $usrdata->first_name;
                    $mailData["assigner_email"] = $assigner_details[0]['email'];
                    $mailData["assigner_name"] = $assigner_details[0]['first_name'];
                    $mailData["task_ttl"] = $ticket_details[0]['name'];
                    $mailData["task_id"] = $data->ticket_id;
                    $mailData["task_slug"] = $ticket_details[0]['slug'];
                    $mailData["project_id"] = $data->project_id;
                    $mailData["project_ttl"] = $project_details[0]['name'];
                    $mailData["project_slug"] = $project_details[0]['slug'];
                    $mailData["task_update_msg"] = "updated comment you are mentioned in.";
                    $mailData["site_path"] = base_url();
                    $user_email = $usrdata->email;
                    sendMail($user_email, $subject, $mailTemplate, $mailData);
                }
            }

            $response = array('req_status'=>'1', 'message' => 'Comment Updated Successfully');
        }else{
            $response = array('req_status'=>'0', 'message' => 'Some Error Occurred. Please Try Again');
        }
        echo json_encode($response);        
	} 
    public function get_task_comments()
    {
        $data = json_decode(file_get_contents("php://input"));
        $taskID=$data->task_id;

        $this->db->select('c.*,u.first_name,u.last_name');
        $this->db->from('comment c');
        $this->db->join('user u', 'u.uid = c.created_by', 'left');
        $this->db->where('c.ticket_id',$taskID);
        $this->db->order_by("entry_time", "desc");
        $taskComments = $this->db->get();
        echo json_encode($taskComments->result());
    }
    public function delete_comment()
	{
		$data = json_decode(file_get_contents("php://input"));
		$commentID=$data->comment_id;

		$authtoken=$data->usertoken;
        $token_data=$this->objOfJwt->DecodeToken($authtoken);
		$token_user_id=$token_data['uid'];

		$table = 'comment';
		$this->db->where('comment_id', $commentID);
		$this->db->delete($table);

		//Add activity log			
		$arr_activity = array(
			'user_id' => $token_user_id,
			'proj_id' => $data->project_id,
			'ticket_id' => $data->task_id,
			'activity_desc' => "Deleted Comment",
			'entry_time' => date("Y-m-d H:i:s"),
			'ip_address' => $_SERVER['REMOTE_ADDR']
		);
		insert_activity_log($arr_activity);

		$response = array('req_status'=>'1', 'message' => 'Comment Deleted Successfully');
		echo json_encode($response);
    }
        //Feedback functions
        public function add_feedback()
        {
            $data = json_decode(file_get_contents("php://input"));
            
            $authtoken=$data->usertoken;
            $token_data=$this->objOfJwt->DecodeToken($authtoken);
            
            $token_user_id=$token_data['uid'];
            
            $arr_to_insert = array(
                        'ticket_id' => $data->ticket_id,
                        'feedback' => $data->taskfeedback,
                        'created_by' => $token_user_id,
                        'entry_time' => date("Y-m-d H:i:s"),
                        'ip_address' => $_SERVER['REMOTE_ADDR']
                    );
            $table = 'task_feedback';
            $result = $this->common->insertRow($arr_to_insert,$table);
            if(isset($result) && !empty($result)){
                //Insert Activity Log
                $arr_activity = array(
                    'user_id' => $token_user_id,
                    'proj_id' => $data->project_id,
                    'ticket_id' => $data->ticket_id,
                    'activity_desc' => "Added Feedback",
                    'entry_time' => date("Y-m-d H:i:s"),
                    'ip_address' => $_SERVER['REMOTE_ADDR']
                );
                insert_activity_log($arr_activity);

                //update task status
                $arr_sts_update = array(
                    'status' => '1'
                );
                $this->common->updateRow('ticket', $arr_sts_update, array('ticket_id' => $data->ticket_id));
                //send email to members mentioned in feedback
                preg_match_all('/@([^@\s]+)/', $data->taskfeedback, $matches);
                $mentions = array_unique($matches[1]);
                if(count($mentions)>0)
                {
                    $this->db->select('uid,first_name,email');
                    $this->db->from('user');
                    $this->db->where_in('username', $mentions);
                    $qry=$this->db->get();
                    $resusrlist=$qry->result();
    
    
                    $project_details=$this->common->getRecords('project',array('name,slug'),array('proj_id' => $data->project_id));
                    $assigner_details=$this->common->getRecords('user',array('first_name,email'),array('uid' => $token_user_id));
                    $ticket_details=$this->common->getRecords('ticket',array('slug,name'),array('ticket_id' => $data->ticket_id));
                    foreach($resusrlist as $usrdata)
                    {
                        
                        $subject = "PMS Task Updates";
                        $mailTemplate = "emailtemplates/task_updates";
                        $mailData["assignee_email"] = $usrdata->email;
                        $mailData["assignee_name"] = $usrdata->first_name;
                        $mailData["assigner_email"] = $assigner_details[0]['email'];
                        $mailData["assigner_name"] = $assigner_details[0]['first_name'];
                        $mailData["task_ttl"] = $ticket_details[0]['name'];
                        $mailData["task_id"] = $data->ticket_id;
                        $mailData["task_slug"] = $ticket_details[0]['slug'];
                        $mailData["project_id"] = $data->project_id;
                        $mailData["project_ttl"] = $project_details[0]['name'];
                        $mailData["project_slug"] = $project_details[0]['slug'];
                        $mailData["task_update_msg"] = "mentioned you in feedback.";
                        $mailData["site_path"] = base_url();
                        $user_email = $usrdata->email;
                        sendMail($user_email, $subject, $mailTemplate, $mailData);
                    }
                }
    
                $response = array('req_status'=>'1', 'message' => 'Feedback Added Successfully');           
            }
            else{
               $response = array('req_status'=>'0', 'message' => 'Something went Wrong, Please Try Again');
            }
            echo json_encode($response);
        }  
        public function update_feedback()
        {
            $data = json_decode(file_get_contents("php://input"));
            
            $authtoken=$data->usertoken;
            $token_data=$this->objOfJwt->DecodeToken($authtoken);
            
            $token_user_id=$token_data['uid'];
            
            $arr_to_update = array(
                
                'feedback' => $data->taskfeedback,
                
                'update_time' => date("Y-m-d H:i:s"),
                'ip_address' => $_SERVER['REMOTE_ADDR']
            );
           
            $table = 'task_feedback';
            $result=$this->common->updateRow($table, $arr_to_update, array('feedback_id' => $data->feedback_id));
            $affected_rows=$this->db->affected_rows();
            if(isset($affected_rows) && $affected_rows>0){
    
                //insert activity log
                $arr_activity = array(
                    'user_id' => $token_user_id,
                    'proj_id' => $data->project_id,
                    'ticket_id' => $data->ticket_id,
                    'activity_desc' => "Feedback Updated",
                    'entry_time' => date("Y-m-d H:i:s"),
                    'ip_address' => $_SERVER['REMOTE_ADDR']
                );
                insert_activity_log($arr_activity);      
                
                //send email to members mentioned in comment
                preg_match_all('/@([^@\s]+)/', $data->taskfeedback, $matches);
                $mentions = array_unique($matches[1]);
                if(count($mentions)>0)
                {
                    $this->db->select('uid,first_name,email');
                    $this->db->from('user');
                    $this->db->where_in('username', $mentions);
                    $qry=$this->db->get();
                    $resusrlist=$qry->result();
    
    
                    $project_details=$this->common->getRecords('project',array('name,slug'),array('proj_id' => $data->project_id));
                    $assigner_details=$this->common->getRecords('user',array('first_name,email'),array('uid' => $token_user_id));
                    $ticket_details=$this->common->getRecords('ticket',array('slug,name'),array('ticket_id' => $data->ticket_id));
                    foreach($resusrlist as $usrdata)
                    {
                        $subject = "PMS Task Updates";
                        $mailTemplate = "emailtemplates/task_updates";
                        $mailData["assignee_email"] = $usrdata->email;
                        $mailData["assignee_name"] = $usrdata->first_name;
                        $mailData["assigner_email"] = $assigner_details[0]['email'];
                        $mailData["assigner_name"] = $assigner_details[0]['first_name'];
                        $mailData["task_ttl"] = $ticket_details[0]['name'];
                        $mailData["task_id"] = $data->ticket_id;
                        $mailData["task_slug"] = $ticket_details[0]['slug'];
                        $mailData["project_id"] = $data->project_id;
                        $mailData["project_ttl"] = $project_details[0]['name'];
                        $mailData["project_slug"] = $project_details[0]['slug'];
                        $mailData["task_update_msg"] = "updated feedback you are mentioned in.";
                        $mailData["site_path"] = base_url();
                        $user_email = $usrdata->email;
                        sendMail($user_email, $subject, $mailTemplate, $mailData);
                    }
                }
    
                $response = array('req_status'=>'1', 'message' => 'Feedback Updated Successfully');
            }else{
                $response = array('req_status'=>'0', 'message' => 'Some Error Occurred. Please Try Again');
            }
            echo json_encode($response);        
        } 
        public function get_task_feedbacks()
        {
            $data = json_decode(file_get_contents("php://input"));
            $taskID=$data->task_id;
    
            $this->db->select('f.*,u.first_name,u.last_name');
            $this->db->from('task_feedback f');
            $this->db->join('user u', 'u.uid = f.created_by', 'left');
            $this->db->where('f.ticket_id',$taskID);
            $this->db->order_by("entry_time", "desc");
            $taskComments = $this->db->get();
            echo json_encode($taskComments->result());
        }
        public function delete_feedback()
        {
            $data = json_decode(file_get_contents("php://input"));
            $commentID=$data->feedback_id;
    
            $authtoken=$data->usertoken;
            $token_data=$this->objOfJwt->DecodeToken($authtoken);
            $token_user_id=$token_data['uid'];
    
            $table = 'task_feedback';
            $this->db->where('feedback_id', $commentID);
            $this->db->delete($table);
    
            //Add activity log			
            $arr_activity = array(
                'user_id' => $token_user_id,
                'proj_id' => $data->project_id,
                'ticket_id' => $data->task_id,
                'activity_desc' => "Deleted Feedback",
                'entry_time' => date("Y-m-d H:i:s"),
                'ip_address' => $_SERVER['REMOTE_ADDR']
            );
            insert_activity_log($arr_activity);
    
            $response = array('req_status'=>'1', 'message' => 'Feedback Deleted Successfully');
            echo json_encode($response);
        }
    //attachment functions
    public function add_attachment()
	{
        $data = $_POST;
        
        $authtoken=$data['usertoken'];
        $token_data=$this->objOfJwt->DecodeToken($authtoken);
        
        $token_user_id=$token_data['uid'];
        
        if ($_FILES['upload']['name'] != '') {
            $config['upload_path'] = 'assets/uploads/';
//            $config['allowed_types'] = 'docx|pdf';
            $config['allowed_types'] = '*'; // add the asterisk instead of extensions
            $config['max_size'] = "2048000"; // Can be set to particular file size , here it is 2 MB(2048 Kb)
            $new_name = time() . str_replace(" ", "_", $_FILES["upload"]['name']);
            $config['file_name'] = $new_name;
            $this->load->library('upload', $config);
            if (!$this->upload->do_upload('upload')) {
                $error = array('error' => $this->upload->display_errors());
                //print_r($error);
            } else {
                $updata = array('upload_data' => $this->upload->data());

                $arr_to_insert = array(
                    'proj_id' => $data['project_id'],
                    'ticket_id' => $data['ticket_id'],
                    'file' => $new_name,
                    'display_name' => $_FILES["upload"]['name'],
                    'created_by' => $token_user_id,
                    'entry_time' => date("Y-m-d H:i:s"),
                    'ip_address' => $_SERVER['REMOTE_ADDR']
                );
                $table = 'attachment';
                $inresult = $this->common->insertRow($arr_to_insert,$table);

                //Insert Activity Log
                $arr_activity = array(
                    'user_id' => $token_user_id,
                    'proj_id' => $data['project_id'],
                    'ticket_id' => $data['ticket_id'],
                    'activity_desc' => "Added Attachment",
                    'entry_time' => date("Y-m-d H:i:s"),
                    'ip_address' => $_SERVER['REMOTE_ADDR']
                );
                insert_activity_log($arr_activity);

                //update task status
                $arr_sts_update = array(
                    'status' => '1'
                );
                $this->common->updateRow('ticket', $arr_sts_update, array('ticket_id' => $data['ticket_id']));
            }
            $response = array('req_status'=>'1', 'message' => 'File Uploaded Successfully');
        }else{
            $response = array('req_status'=>'0', 'message' => 'Please Select File To Upload');
        }
        echo json_encode($response);
    }  
    public function get_attachment_list()
	{
        $data = json_decode(file_get_contents("php://input"));
        $taskID=$data->task_id;

        $this->db->select('a.*,u.first_name,u.last_name');
        $this->db->from('attachment a');
        $this->db->join('user u', 'u.uid = a.created_by', 'left');
        $this->db->where('a.ticket_id',$taskID);
        $this->db->order_by("entry_time", "desc");
        $taskattachments = $this->db->get();
        echo json_encode($taskattachments->result());
    }
    public function delete_attachment()
	{
        $data = json_decode(file_get_contents("php://input"));
		$atchmntID=$data->attachment_id;

		$authtoken=$data->usertoken;
        $token_data=$this->objOfJwt->DecodeToken($authtoken);
		$token_user_id=$token_data['uid'];

		$table = 'attachment';
		$this->db->where('attachment_id', $atchmntID);
		$this->db->delete($table);

		//Add activity log			
		$arr_activity = array(
			'user_id' => $token_user_id,
			'proj_id' => $data->project_id,
			'ticket_id' => $data->task_id,
			'activity_desc' => "Deleted Attachment",
			'entry_time' => date("Y-m-d H:i:s"),
			'ip_address' => $_SERVER['REMOTE_ADDR']
		);
		insert_activity_log($arr_activity);

		$response = array('req_status'=>'1', 'message' => 'Attachment Deleted Successfully');
		echo json_encode($response);
    }

    //activity log functions
    public function get_activity_logs()
	{
        $result = $this->project->project_list();
        echo json_encode($result);
    }

    public function delete_task()
	{
		$data = json_decode(file_get_contents("php://input"));
		$taskID=$data->task_id;

		$authtoken=$data->usertoken;
        $token_data=$this->objOfJwt->DecodeToken($authtoken);
		$token_user_id=$token_data['uid'];

		$table = 'ticket';
		$this->db->where('ticket_id', $taskID);
		$this->db->delete($table);

		//Add activity log			
		$arr_activity = array(
			'user_id' => $token_user_id,
			'proj_id' => $data->project_id,
			'ticket_id' => $data->task_id,
			'activity_desc' => "Deleted Task",
			'entry_time' => date("Y-m-d H:i:s"),
			'ip_address' => $_SERVER['REMOTE_ADDR']
		);
		insert_activity_log($arr_activity);

		$response = array('req_status'=>'1', 'message' => 'Task Deleted Successfully');
		echo json_encode($response);
    }
}
