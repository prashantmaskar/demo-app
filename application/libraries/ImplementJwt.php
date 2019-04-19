<?php
require APPPATH . '/libraries/JWT.php';

class ImplementJwt
{
   

    //////////The function generate token///////////// 
    PRIVATE $key = "FRapZgHjD6mUpV4drMw9mawOL4aYMAPp"; // url: https://www.youtube.com/watch?v=zD4IGp1lBWs
    public function GenerateToken($data)
    {          
        $jwt = JWT::encode($data, $this->key);
        return $jwt;
    }
    


   //////This function decode the token//////////////////// 
    public function DecodeToken($token)
    {          
        $decoded = JWT::decode($token, $this->key, array('HS256'));
        $decodedData = (array) $decoded;
        return $decodedData;
    }
}
?> 