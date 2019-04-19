<?php 

class Project_model extends CI_Model {

    function add_project($data)
    {
        $global = $this->common->getGlobalSettings();
        $shortform=$data->shortform;
        $projectname=$data->projectname; //username;//index_signin
        $clientname=$data->clientname; //password;//password_signin
        $authtoken=$data->usertoken;
        $token_data=$this->objOfJwt->DecodeToken($authtoken);
        
        $token_user_id=$token_data['uid'];
  
        $slug=(int)$global['project_slug_last_id']+1;
        $slug="P".$slug;
    
        //generate token
        $tokenData=array();
        
        $tokenData['timeStamp'] = Date('Y-m-d H:i:s');
        
        $arrin=array(
                        "shortform"=>$shortform,
                        "name" =>$projectname,
                        "client_id"=>$clientname,
                        "slug"=>$slug,
                        "created_by"=>$token_user_id,
                        "entry_time"=>date("Y-m-d H:i:s"),
                        "ip_address"=>$_SERVER['REMOTE_ADDR']
                        );
        //print_r($arrin);			 
        $this->db->insert("project", $arrin);
        $projID = $this->db->insert_id();
        if(isset($projID) && !empty($projID))
        {
            $table = 'user_project_rel';
            $arr_data = array(
                            'user_id' => $token_user_id,
                            'proj_id' => $projID,
                            'role' => '2'
                        );
          
            $this->common->insertRow($arr_data,$table);

            //Add activity log

            $arr_activity = array(
                'user_id' => $token_user_id,
                'proj_id' => $projID,
                'ticket_id' => '',
                'activity_desc' => "Project Created",
                'entry_time' => date("Y-m-d H:i:s"),
                'ip_address' => $_SERVER['REMOTE_ADDR']
            );
            insert_activity_log($arr_activity);

            //update global settings
            $gset=$this->common->getGlobalSettings();
            $new_id=(int)$gset['project_slug_last_id']+1;
            $this->common->updateRow('global_settings', array('meta_value' => $new_id), array('meta_key' => 'project_slug_last_id'));
        }

        return ($this->db->affected_rows() != 1) ? false : true;                  
        
    }

    function update_project($data)
    {
        $shortform=$data->shortform;
        $projectname=$data->projectname; //username;//index_signin
        $project_id=$data->project_id; //username;//index_signin
        $clientname=$data->clientname; //password;//password_signin
        $authtoken=$data->usertoken;
        $token_data=$this->objOfJwt->DecodeToken($authtoken);
        
        $token_user_id=$token_data['uid'];
        $arrup=array(
            "shortform"=>$shortform,
            "name" =>$projectname,
            "client_id"=>$clientname,
            "update_time"=>date("Y-m-d H:i:s"),
            "ip_address"=>$_SERVER['REMOTE_ADDR']
            );


            $table = 'project';
            $result=$this->common->updateRow($table, $arrup, array('proj_id' => $project_id));
            $affected_rows=$this->db->affected_rows();
            if(isset($affected_rows) && $affected_rows>0){
                //insert activity log
                $arr_activity = array(
                    'user_id' => $token_user_id,
                    'proj_id' => $project_id,
                    'ticket_id' => '',
                    'activity_desc' => "Project Updated",
                    'entry_time' => date("Y-m-d H:i:s"),
                    'ip_address' => $_SERVER['REMOTE_ADDR']
                );
                insert_activity_log($arr_activity);                          
                $response = array('req_status'=>'1', 'message' => 'Project Details Updated Successfully');
            }else{
                $response = array('req_status'=>'0', 'message' => 'Some Error Occurred. Please Try Again');
            }
            return $response;
        
    }

    function project_list($data)
    {
        // $query = $this->db->get('project');
        // return $query->result();
        $authtoken=$data->usertoken;
        $token_data=$this->objOfJwt->DecodeToken($authtoken);
        $loggeduserID=$token_data['uid'];

        $this->db->select('p.proj_id,p.name,p.shortform,p.shortform,c.c_name,c.c_logo');
        $this->db->from('project p');
        $this->db->join('client c', 'c.id = p.client_id');
        $this->db->join('user_project_rel upr', 'upr.proj_id = p.proj_id');
        $this->db->where('upr.user_id',$loggeduserID);
        $this->db->order_by('c.c_name','ASC');
        $this->db->order_by('p.name','ASC');
        $query = $this->db->get();
        return $query->result();
        // echo $this->db->last_query();
    }
    function fn_get_project_details($data)
    {
        $projectID=$data->project_id;

        $this->db->select('p.proj_id,p.name,p.shortform,p.client_id,p.slug');
        $this->db->from('project p');
        $this->db->where('p.proj_id',$projectID);
        $query = $this->db->get();
        return $query->result();
    }

    function fn_get_project_team($data)
    {
        //print_r($data);exit;
        $projectID=$data->p_id;
        
        $this->db->select('upr.user_id,upr.role as usr_project_role,u.first_name,u.last_name,ud.designation,u.role');
        $this->db->from('user_project_rel upr');
        $this->db->join('user u', 'u.uid = upr.user_id', 'left');
        $this->db->join('user_designation_cat ud', 'ud.id = u.designation', 'left');
        $this->db->where('upr.proj_id',$projectID);
        $this->db->where('u.acc_status','1');
        $this->db->order_by('u.first_name','ASC');
        $this->db->order_by('u.last_name','ASC');
        $query = $this->db->get();
        return $query->result();
    }

    function fn_update_user_project_role($data)
    {
        $authtoken=$data->usertoken;
        $token_data=$this->objOfJwt->DecodeToken($authtoken);
        $project_id=$data->project_id;
        $token_user_id=$token_data['uid'];        

        $arrup=array(
            "role"=>(string)$data->member_type
        );

        $table = 'user_project_rel';
        $result=$this->common->updateRow($table, $arrup, array('proj_id' => $project_id,'user_id'=>$data->member_id));
        $affected_rows=$this->db->affected_rows();

        if(isset($affected_rows) && $affected_rows>0){
            //insert activity log
            if($data->member_type=="1"){$urole="Lead";}else{$urole="User";}
            $uinfo=$this->common->getRecords('user',array('first_name,last_name'),array('uid' => $data->member_id));
            $arr_activity = array(
                'user_id' => $token_user_id,
                'proj_id' => $project_id,
                'ticket_id' => '',
                'activity_desc' => $uinfo[0]['first_name']." ".$uinfo[0]['last_name']."'s role changed to ".$urole,
                'entry_time' => date("Y-m-d H:i:s"),
                'ip_address' => $_SERVER['REMOTE_ADDR']
            );
            insert_activity_log($arr_activity);                          
            $response = array('req_status'=>'1', 'message' => 'User Role Updated Successfully');
        }else{
            $response = array('req_status'=>'0', 'message' => 'Some Error Occurred. Please Try Again');
        }
        return $response;
    }

    function fn_get_project_non_team_members($data)
    {
        $authtoken=$data->usertoken;
        $token_data=$this->objOfJwt->DecodeToken($authtoken);
        $projectID=$data->p_id;
        $adminID=$token_data['uid'];
        
        // Sub Query
        $this->db->select('user_id')->from('user_project_rel')->where('proj_id',$projectID);
        $subQuery =  $this->db->get_compiled_select();
 
        // Main Query
        $query = $this->db->select('u.uid,u.first_name,u.last_name')->from('user u')->where("u.uid NOT IN ($subQuery)", NULL, FALSE)->order_by('u.first_name ASC, u.last_name ASC')->get();
        return $query->result();
    }    
}


