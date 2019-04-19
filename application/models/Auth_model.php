<?php 
class Auth_model extends CI_Model {

	function fn_login_auth()
	{  
		if ((!(isset($_SESSION['le_sess_user_email']) && $_SESSION['le_sess_user_email'] != '')) && (!(isset($_SESSION['le_sess_user_id']) && $_SESSION['le_sess_user_id'] != ''))) {
			return FALSE;
		}
		if (((isset($_SESSION['le_sess_user_email']) && $_SESSION['le_sess_user_email'] != '')) && ((isset($_SESSION['le_sess_user_id']) && $_SESSION['le_sess_user_id'] != ''))) {
			$lastime = date("Y-m-d H:i:s");
			$sqlUpdate = $this->db->query("UPDATE `le_tbladmin_login_details` SET `last_active` = '$lastime' WHERE ID='".$_SESSION['le_sess_user_login_id']."'");
			return TRUE;
		}	
	}
}