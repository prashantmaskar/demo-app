<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Associate_rating extends CI_Controller {

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
   
    
    public function get_user_rating_criterias()
    {
        $que = $this->common->getRecords('user_rating_criteria',array('*'),'',array('position','asc'));
        echo json_encode($que);
    } 
    
    public function get_user_list()
    {
        $data = json_decode(file_get_contents("php://input"));
        
        $authtoken=$data->usertoken;
        $token_data=$this->objOfJwt->DecodeToken($authtoken);
        $token_user_id=$token_data['uid'];        
        //get user projects
        $projects = $this->common->getRecords('user_project_rel',array('proj_id'),"user_id='".$token_user_id."' AND role IN ('1','2')");
        
        //get projects team
        $projectArr=array(); 
        foreach($projects as $projectdata)
        {
            $projectArr[]=$projectdata['proj_id'];
        }
        $this->db->select('upr.user_id,upr.role as usr_project_role,u.first_name,u.last_name,u.role');
        $this->db->from('user_project_rel upr');
        $this->db->join('user u', 'u.uid = upr.user_id', 'left');
        $this->db->where_in('upr.proj_id',$projectArr);
        $this->db->where('upr.user_id!=',$token_user_id);
        $this->db->where('u.acc_status','1');
        $this->db->where('u.role','2');
        $this->db->group_by('u.uid');
        $this->db->order_by('u.first_name','ASC');
        $this->db->order_by('u.last_name','ASC');
        $query = $this->db->get();
        $res=$query->result();
        echo json_encode($res);
    }
    
    public function insert_update_associate_rating()
    {
        $data = json_decode(file_get_contents("php://input"));
        //exit;
        $authtoken=$data->usertoken;
        $token_data=$this->objOfJwt->DecodeToken($authtoken);
        
        $token_user_id=$token_data['uid'];
        $associate_id=$data->assoname;
        $fmonthyr=explode('-',$data->ratemonth);
        $feedbackmonth=$fmonthyr[1];
        $feedbackyear=$fmonthyr[0];

        $additional_comment=$data->rcomment;


        $chkifpresent=$this->common->getRecords('user_rating_details',array('id'),"user_id='".$associate_id."' AND month='".$feedbackmonth."' AND year='".$feedbackyear."'");
        if(count($chkifpresent)<=0)
        {
            $arrInsert=array(
                'user_id' => $associate_id,
                'month' => $feedbackmonth,
                'year' => $feedbackyear,
                'rating_by' => $token_user_id,
                'comment' =>  $additional_comment,         
                'entry_time' => date("Y-m-d H:i:s"),
                'ip_address' => $_SERVER['REMOTE_ADDR']            
            );
            $table = 'user_rating_details';
            $result = $this->common->insertRow($arrInsert,$table);
            if(isset($result) && !empty($result)){
                //store question ratings
                $quelist=$this->common->getRecords('user_rating_criteria',array('id'),'',array('id','asc'));
                $tot_score='0';
                $num=0;
                foreach($quelist as $que){
                    $feedbackVal="r".$que['id'];
                    $feedbackComment="rc".$que['id'];

                    $arrfeedback=array(
                        'rating_id' => $result,
                        'criteria_id' => $que['id'],
                        'rating' => $data->$feedbackVal, 
                        'comment' => $data->$feedbackComment,
                    );
                    $reltable = 'user_rating_criteria_rel';
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
                
                $this->db->set('avg_rating', $avg_score);   
                $this->db->where('id', $result);   
                $this->db->update('user_rating_details'); 
                $response = array('req_status'=>'1','message' => 'Rating Added Successfully');
            }else{
                $response = array('req_status'=>'0', 'message' => 'Something went Wrong, Please Try Again');
            }
    }else{
        
        $arrupdate=array(
            'rating_by' => $token_user_id,
            'comment' =>  $additional_comment,         
            'update_time' => date("Y-m-d H:i:s"),
            'ip_address' => $_SERVER['REMOTE_ADDR']             
        );
        $table = 'user_rating_details';
        $resultdata=$this->common->updateRow($table, $arrupdate, array('id' => $chkifpresent[0]['id']));
        $affected_rows=$this->db->affected_rows();
        $affrows=$this->db->affected_rows();
        
        if(isset($affrows) && $affrows>0){
            //store question ratings
            $quelist=$this->common->getRecords('user_rating_criteria',array('id'),'',array('id','asc'));
            $tot_score='0';
            $num=0;

            //delete old data
            $this->db->where('rating_id', $chkifpresent[0]['id']);
            $this->db->delete('user_rating_criteria_rel');
            //insert new rating
            foreach($quelist as $que){
                $feedbackVal="r".$que['id'];
                $feedbackComment="rc".$que['id'];

                $arrfeedback=array(
                    'rating_id' => $chkifpresent[0]['id'],
                    'criteria_id' => $que['id'],
                    'rating' => $data->$feedbackVal, 
                    'comment' => $data->$feedbackComment,
                );
                $reltable = 'user_rating_criteria_rel';
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
            
            $this->db->set('avg_rating', $avg_score);   
            $this->db->where('id', $chkifpresent[0]['id']);   
            $this->db->update('user_rating_details'); 
            $response = array('req_status'=>'1','message' => 'Rating Updated Successfully');
        }else{
            $response = array('req_status'=>'0', 'message' => 'Something went Wrong, Please Try Again');
        }

    }
        echo json_encode($response); 
    }    

    function get_users_with_rating()
    {
        $data = json_decode(file_get_contents("php://input"));
        
        $authtoken=$data->usertoken;
        $token_data=$this->objOfJwt->DecodeToken($authtoken);
        $token_user_id=$token_data['uid'];   
        
        $fmonthyr=explode('-',$data->ratemonth);
        $feedbackmonth=$fmonthyr[1];
        $feedbackyear=$fmonthyr[0];
        //get user projects
        $projects = $this->common->getRecords('user_project_rel',array('proj_id'),"user_id='".$token_user_id."' AND role IN ('1','2')");
        
        //get projects team
        $projectArr=array(); 
        foreach($projects as $projectdata)
        {
            $projectArr[]=$projectdata['proj_id'];
        }
        $this->db->select('upr.user_id,upr.role as usr_project_role,u.first_name,u.last_name,u.role,COALESCE(urd.avg_rating,0) as rating');
        $this->db->from('user_project_rel upr');
        $this->db->join('user u', 'u.uid = upr.user_id', 'left');
        $this->db->join('user_rating_details urd', 'u.uid = urd.user_id AND urd.month="'.$feedbackmonth.'" AND urd.year="'.$feedbackyear.'"', 'left');
        $this->db->where_in('upr.proj_id',$projectArr);
        $this->db->where('upr.user_id!=',$token_user_id);
        $this->db->where('u.acc_status','1');
        $this->db->where('u.role','2');
        $this->db->group_by('u.uid');
        $this->db->order_by('u.first_name','ASC');
        $this->db->order_by('u.last_name','ASC');
        $query = $this->db->get();
        $res=$query->result();
        echo json_encode($res);
    }

    function get_user_rating_details()
    {
        $data = json_decode(file_get_contents("php://input"));

        $fmonthyr=explode('-',$data->ratemonth);
        $feedbackmonth=$fmonthyr[1];
        $feedbackyear=$fmonthyr[0];

        $user_id=$data->associate_id;
        $this->db->select('ucr.criteria_id,ucr.rating,ucr.comment,ud.month,ud.year,ud.avg_rating,ud.comment as additional_comment,ud.id as rating_id');
        $this->db->from('user_rating_criteria_rel ucr');
        $this->db->join('user_rating_details ud', 'ud.id = ucr.rating_id','left');
        $this->db->where('ud.user_id',$user_id);
        $this->db->where('ud.month',$feedbackmonth);
        $this->db->where('ud.year',$feedbackyear);
        //$this->db->order_by("fq.position","asc");
        $query = $this->db->get();
        $result=$query->result();
        echo json_encode($result);
    }  

    function get_user_rating_details_by_id()
    {
        $data = json_decode(file_get_contents("php://input"));

        $rating_id=$data->rating_id;
        $this->db->select('fc.title,fc.description,ucr.criteria_id,ucr.rating,ucr.comment,ud.month,ud.year,ud.avg_rating,ud.comment as additional_comment,ud.id as rating_id');
        $this->db->from('user_rating_criteria_rel ucr');
        $this->db->join('user_rating_details ud', 'ud.id = ucr.rating_id','left');
        $this->db->join('user_rating_criteria fc', 'fc.id = ucr.criteria_id','left');
        $this->db->where('ud.id',$rating_id);
        $this->db->order_by("fc.position","asc");
        $query = $this->db->get();
        $result=$query->result();
        echo json_encode($result);
    }  
    
    function get_user_monthly_avg_rating()
    {
        $data = json_decode(file_get_contents("php://input"));

        $authtoken=$data->usertoken;
        $token_data=$this->objOfJwt->DecodeToken($authtoken);
        $token_user_id=$token_data['uid'];

        $this->db->select('ud.month,ud.year,ud.avg_rating,ud.id as rating_id');
        $this->db->from('user_rating_details ud');
        $this->db->where('ud.user_id',$token_user_id);
        $this->db->order_by("ud.year","desc");
        $this->db->order_by("ud.month","desc");
        $query = $this->db->get();
        $result=$query->result();
        echo json_encode($result);
    } 

    function chk_if_can_rate()
    {
        $data = json_decode(file_get_contents("php://input"));

        $authtoken=$data->usertoken;
        $token_data=$this->objOfJwt->DecodeToken($authtoken);
        $token_user_id=$token_data['uid'];

        //get user projects
        $projects = $this->common->getRecords('user_project_rel',array('proj_id'),"user_id='".$token_user_id."' AND role IN ('1','2')");
        if( count($projects) > 0)
        {
            $response = array('can_rate'=>true);
        }else{
            $response = array('can_rate'=>false);
        }
        echo json_encode($response);
    }
}
