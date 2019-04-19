<?php

/*
 * send mail
 */

//send mail
function sendMail($userEmail, $subject, $mailTemplate, $data = '') {
    $CI = & get_instance();
    $CI->load->model('common_model');
    $global = $CI->common_model->getGlobalSettings();
    $message = $CI->load->view($mailTemplate, $data, true);

    $headers  = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=iso-8859-1\r\n"; 
    $headers .= "From: ".$global['from_email_title']." <".$global['from_email_id'].">\r\n" .
                "Return-Path: ".$global['from_email_title']." <".$global['from_email_id'].">\r\n" .
                "Reply-To: ".$global['from_email_title']." <".$global['from_email_id'].">\r\n";
    @mail($userEmail,$subject,$message,$headers, '-f '.$global['from_email_id']);
}

//Add Activity Log
function insert_activity_log($data) {
    $CI = & get_instance();
    $CI->load->model('common_model','common');
    $tblname="activity_log";
    $CI->common->insertRow($data,$tblname);
}

function fngenerate_uname($uname,$i='')
{
    $ci=& get_instance();
    $ci->load->database(); 
    $chkuname=$uname.$i;
    $sql = "select username from `user` where username='".$chkuname."'"; 

    $query = $ci->db->query($sql);
    $num_res=$query->num_rows();
    if($num_res > 0)
    {
        $i=(int)$i+1;
        return fngenerate_uname($uname,$i);

    }else{
        return $chkuname;
    }
}  
