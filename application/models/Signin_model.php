<?php 

class Signin_model extends CI_Model {

    function authenticate_user($data)
    {
        $username=$data->username; //username;//index_signin
        $password=$data->password; //password;//password_signin
        
        $qry=$this->db->query("SELECT * FROM user WHERE email='".$username."'");
        $num_rows=$qry->num_rows();
        if($num_rows > 0)
        {
            $res=$qry->row();
            if($res->acc_status=='1')
            {
            if($password== $this->encryption->decrypt($res->password))
            {
                //generate token
                $tokenData=array();
                $tokenData['uid'] = $res->uid;
                $tokenData['timeStamp'] = Date('Y-m-d H:i:s');
                $token = $this->objOfJwt->GenerateToken($tokenData);
               
                $arrin=array("token"=>$token,
                             "login_time"=>date("Y-m-d H:i:s"),
                             "last_active"=>date("Y-m-d H:i:s"),
                             "ip_address"=>$_SERVER['REMOTE_ADDR']
                             );
                //print_r($arrin);			 
                $this->db->insert("user_login_details", $arrin);

                $response = array('req_status'=>'1', 'message' => '', 'auth_token' => $token, 'user_role'=>$res->role, 'user_fname'=>$res->first_name);                
                
            }else{
                $response = array('req_status'=>'0', 'message' => 'Username & Password Do Not Match. Please Try Again!');
            }
            }else{//not active
                $response = array('req_status'=>'0', 'message' => 'Your Account Access Is Blocked. Please Contact To Admin!');
            }
        }else{
            $response = array('req_status'=>'0', 'message' => 'Username does not exists!');
        }
        return $response;
    }
    
    function check_status($data)
    {
        $authtoken=$data->usertoken;
        $token_data=$this->objOfJwt->DecodeToken($authtoken);
        
        $token_user_id=$token_data['uid'];
        
        $check_token=$this->db->query("SELECT * FROM user_login_details WHERE token='".$authtoken."'");
	$num_rows=$check_token->num_rows();
	if($num_rows > 0)
	{
            $res_user=$check_token->row();
            $dbdate = strtotime($res_user->last_active);            
            $current_date = strtotime(date("Y-m-d H:i:s"));
            $time_passed= $current_date-$dbdate;
            
            if($time_passed < 900) //15 minutes
            {
               $sqlUpdate = $this->db->query("UPDATE `user_login_details` SET `last_active` = '".date("Y-m-d H:i:s")."' WHERE id='".$res_user->id."'"); 
               $response = array('req_status'=>'1', 'message' => "");
               
            }else{
                $response = array('req_status'=>'0', 'message' => "Your session is expired. Login again!");
            }
        
        }else{
            $response = array('req_status'=>'0', 'message' => "Token is invalid!");
        }
        return $response;
    }

}