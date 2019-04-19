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

					<td style="text-align: center; padding: 30px 0px 30px 0px;"><a href="<?php echo $site_path;?>frontend/"><img src="<?php echo $site_path;?>assets/images/emailtemplate_logo.png" alt="Integrative Logo"></a></td> 

				</tr>
				<tr>  
					<td style="padding: 50px 65px 50px 65px; border-radius: 15px;" bgcolor="#fff">
						<table border="0" cellpadding="0" cellspacing="0"> 
							<tr>
								<td style="padding:5px 0 15px 0; color: #565656; font-family: Arial, sans-serif; font-size: 30px; line-height: 40px; text-align: center;">
                                    <b>Hi <?php echo $assignee_name; ?>,<br/>
									<?php echo $assigner_name.' '.$task_update_msg;?></b>

								</td>
							</tr>
							<tr>
								<td style="color: #565656; font-family: Arial, sans-serif; font-size: 16px; padding: 25px 0 30px 0;">
									<p style="padding: 5px 0; margin: 0;">Project: <?php echo $project_ttl; ?></p>
									<p style="padding: 5px 0; margin: 0;">Task: <?php echo $task_ttl; ?></p>
								</td>
							</tr>
						</table>	
					</td>
				</tr>
				<tr> 
					<td style="text-align: center; color: #565656; font-family: Arial, sans-serif; font-size: 14px; padding: 30px 0 30px 0; line-height: 22px;">
						<div style="text-align: center; color: #565656; font-family: Arial, sans-serif; font-size: 16px; padding: 15px 0px 0px 0px;">&copy; All rights reserved <?php echo date("Y");?> <a href="#" target="blank" style="color: #565656; text-decoration: none;"><b>Integrative Team</b></a></div>

					</td> 
				</tr>
			</table>
			</td>
		</tr>
	</table> 

</body>
</html>