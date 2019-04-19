<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Feedback extends CI_Controller {

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
    //project list with score
    public function get_project_list()
    {
        $data = json_decode(file_get_contents("php://input"));
        $authtoken=$data->usertoken;
        $token_data=$this->objOfJwt->DecodeToken($authtoken);
        $loggeduserID=$token_data['uid'];

        $this->db->select('p.proj_id,p.name,p.shortform,c.c_name,c.c_logo,coalesce(avg(f.score),0) as project_score');
        $this->db->from('project p');
        $this->db->join('client c', 'c.id = p.client_id');
        $this->db->join('feedback f', 'p.proj_id = f.project_id','left');
        $this->db->join('user_project_rel upr', 'upr.proj_id = p.proj_id');
        $this->db->where('upr.user_id',$loggeduserID);
        $this->db->group_by('p.proj_id'); 
        $this->db->order_by('c.c_name','ASC');
        $this->db->order_by('p.name','ASC');
        // echo "fsd";
        $query = $this->db->get();
        $result=$query->result();
         //echo $this->db->last_query();
        echo json_encode($result);
    }
    //task list with score
    public function get_project_tasks()
    {
        $data = json_decode(file_get_contents("php://input"));
        $project_id=$data->project_id;
        $this->db->select('t.*,p.name as project_name,p.shortform,coalesce(avg(f.score),0) as task_score');
        $this->db->from('ticket t');
        $this->db->join('feedback f', 't.ticket_id = f.task_id','left');
        $this->db->join('project p', 'p.proj_id = t.proj_id','left');
        $this->db->where('t.proj_id',$project_id);
        $this->db->where('t.column_id!=','1');
        $this->db->group_by('t.ticket_id'); 
        $this->db->order_by('t.name','ASC');
        $query = $this->db->get();
        $result=$query->result();
        echo json_encode($result);
    }

    public function get_task_drf_list()
    {
        $data = json_decode(file_get_contents("php://input"));
        $task_id=$data->task_id;
        $this->db->select('f.*,t.name as task_name');
        $this->db->from('feedback f');
        $this->db->join('ticket t', 't.ticket_id = f.task_id','left');
        $this->db->where('f.task_id',$task_id);
        $this->db->order_by("feedback_id","desc");
        $query = $this->db->get();
        $result=$query->result();
        echo json_encode($result);
    }

    public function get_task_drf_details()
    {
        $data = json_decode(file_get_contents("php://input"));
        $feedback_id=$data->feedback_id;
        $this->db->select('frl.question_id,fq.question,frl.rating,frl.comment,f.feedback_date,f.score,f.comment as additional_comment,t.name as task_name, CONCAT(u.first_name," ",u.last_name) as feedback_by');
        $this->db->from('feedback_question_rating_rel frl');
        $this->db->join('feedback f', 'f.feedback_id = frl.feedback_id','left');
        $this->db->join('ticket t', 't.ticket_id = f.task_id','left');
        $this->db->join('feedback_questions fq', 'fq.id = frl.question_id','left');
        $this->db->join('user u', 'u.uid = f.user_id','left');
        $this->db->where('frl.feedback_id',$feedback_id);
        $this->db->order_by("fq.position","asc");
        $query = $this->db->get();
        $result=$query->result();
        echo json_encode($result);
    }
  
    public function get_project_score()
    {
        $msc = microtime(true);
        $data = json_decode(file_get_contents("php://input"));
        $project_id=$data->project_id;
        
        $this->db->select('coalesce(avg(f.score),0) as project_score');
        $this->db->from('project p');
        $this->db->join('feedback f', 'p.proj_id = f.project_id');
        $this->db->where('p.proj_id',$project_id);
        $query = $this->db->get();
        $result=$query->result();
        $msc = microtime(true)-$msc;
        echo json_encode($result);
    }
    //task score
    public function get_task_score()
    {
        $msc = microtime(true);
        $data = json_decode(file_get_contents("php://input"));
        $task_id=$data->task_id;
        
        $this->db->select('coalesce(avg(f.score),0) as task_score');
        $this->db->from('feedback f');
        $this->db->where('f.task_id',$task_id);
        $query = $this->db->get();
        $result=$query->result();
        $msc = microtime(true)-$msc;
        echo json_encode($result);
    }    
    //feedback task listing
    /*public function get_task_list()
    {
        $data = json_decode(file_get_contents("php://input"));
        $project_id=$data->project_id;
        $authtoken=$data['usertoken'];
        $token_data=$this->objOfJwt->DecodeToken($authtoken);      
        $token_user_id=$token_data['uid'];
        
        $this->db->select('ROUND(coalesce(avg(f.score),0),1) as project_score');
        $this->db->from('project p');
        $this->db->join('feedback f', 'p.proj_id = f.project_id');
        $this->db->where('p.proj_id',$project_id);
        $query = $this->db->get();
        $result=$query->result();
        echo json_encode($result);
    }*/
    //task DRF details

    //feedback questions    
    public function get_feedback_questions()
    {
        $feedque = $this->common->getRecords('feedback_questions',array('*'),'',array('position','asc'));
        echo json_encode($feedque);
    }
  
    public function insert_client_feedback()
    {
        $data = json_decode(file_get_contents("php://input"));

        $authtoken=$data->usertoken;
        $token_data=$this->objOfJwt->DecodeToken($authtoken);
        
        $token_user_id=$token_data['uid'];
        $feedbackdate=date("Y-m-d 00:00:00");

        $arrInsert=array(
            'project_id' => $data->project_id,
            'task_id' => $data->task_id,
            'user_id' => $token_user_id,
            'feedback_date' => $feedbackdate, 
            'comment' =>  $data->qcomment,         
            'entry_time' => date("Y-m-d H:i:s"),
            'ip_address' => $_SERVER['REMOTE_ADDR']            
        );
        $table = 'feedback';
        $result = $this->common->insertRow($arrInsert,$table);
        if(isset($result) && !empty($result)){
            //store question ratings
            $quelist=$this->common->getRecords('feedback_questions',array('id'),'',array('id','asc'));
            $tot_score='0';
            $num=0;
            foreach($quelist as $que){
                $feedbackVal="q".$que['id'];
                $feedbackComment="qc".$que['id'];

                $arrfeedback=array(
                    'feedback_id' => $result,
                    'question_id' => $que['id'],
                    'rating' => $data->$feedbackVal, 
                    'comment' => $data->$feedbackComment,
                );
                $reltable = 'feedback_question_rating_rel';
                $this->common->insertRow($arrfeedback,$reltable);  
                if($data->$feedbackVal > 0){
                    $tot_score=$data->$feedbackVal + $tot_score;
                    $num++; 
                }
                             
            }
            //Update score
            if($num > 0){
                $avg_score=$tot_score/$num;
            }else{
                $avg_score='0';
            }
            
            $this->db->set('score', $avg_score);   
            $this->db->where('feedback_id', $result);   
            $this->db->update('feedback'); 
            $response = array('req_status'=>'1','message' => 'Feedback Added Successfully');
        }else{
            $response = array('req_status'=>'0', 'message' => 'Something went Wrong, Please Try Again');
        }
        echo json_encode($response); 
    }
}
