<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8"> 
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Integrative PMS</title>
    </head>
    <body style="margin: 0; padding: 0;">

        <table align="center" border="0" cellpadding="0" cellspacing="0" width="850" bgcolor="#f6f6f6">
            <tr>
                <td>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="700" style="border-collapse: collapse;">
                        <tr>
                            <td style="text-align: center; padding: 30px 0px 30px 0px;"><a href="<?php echo SITE_PATH; ?>"><img src="http://qa.mu.clientim.com/assets/images/emailtemplate_logo.png" alt="MusicU Logo"></a></td> 
                        </tr>
                        <tr>  
                            <td style="padding: 50px 65px 50px 65px; border-radius: 15px;" bgcolor="#fff">
                                <table border="0" cellpadding="0" cellspacing="0"> 
                                    <tr>
                                        <td style="padding:5px 0 15px 0; color: #565656; font-family: Arial, sans-serif; font-size: 30px; line-height: 40px; text-align: center;">
                                            <b><?php echo $title; ?></b>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="color: #565656; font-family: Arial, sans-serif; font-size: 16px; padding: 25px 0 30px 0;">
                                            <p style="padding: 5px 0; margin: 0;">Class Name: <?php echo $class_name; ?></p>
                                            <p style="padding: 5px 0; margin: 0;">Class Length: <?php echo $class_length; ?></p>
                                            <p style="padding: 5px 0; margin: 0;">Teacher Name: <?php echo $teacher_name; ?></p>
                                            <p style="padding: 5px 0; margin: 0;">Class Date: <?php echo '<span>' . $class_start_date . '</span>'; ?></p>
                                            <p style="padding: 5px 0; margin: 0;">Class Time: <?php echo '<span>' . $class_start_time . '</span>'; ?></p>
                                            <?php if ($class_cancel_reason != '') { ?>
                                                <p style="padding: 5px 0; margin: 0;">Cancellation Reason: <?php echo $class_cancel_reason; ?></p>
                                            <?php } ?>
                                        </td>
                                    </tr>
                                </table>	
                            </td>
                        </tr>
                        <tr> 
                            <td style="text-align: center; color: #565656; font-family: Arial, sans-serif; font-size: 14px; padding: 30px 0 30px 0; line-height: 22px;">
                                <a href="#" target="blank" style="padding: 0px 5px;"><img src="http://qa.mu.clientim.com/assets/images/facebook.png" alt="Facebook"></a>
                                <a href="#" target="blank" style="padding: 0px 5px;"><img src="http://qa.mu.clientim.com/assets/images/twitter.png" alt="Twitter"></a>
                                <a href="#" target="blank" style="padding: 0px 5px;"><img src="http://qa.mu.clientim.com/assets/images/google-plus.png" alt="Google Plus"></a>
                                <a href="#" target="blank" style="padding: 0px 5px;"><img src="http://qa.mu.clientim.com/assets/images/instagram.png" alt="Instagram"></a> </br>
                                <div style="text-align: center; color: #565656; font-family: Arial, sans-serif; font-size: 16px; padding: 15px 0px 0px 0px;">&copy; All rights reserved 2017 <a href="<?php echo SITE_PATH; ?>" target="blank" style="color: #565656; text-decoration: none;"><b>MusicU Team</b></a></div>
                            </td> 
                        </tr>
                    </table>
                </td>
            </tr>
        </table> 

    </body>
</html>