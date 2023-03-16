<?php
    //Import PHPMailer classes into the global namespace
    //These must be at the top of your script, not inside a function
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;

    //Load Composer's autoloader
    require 'vendor/autoload.php';

    //Create an instance; passing `true` enables exceptions
    $mail = new PHPMailer(true);

    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];

    $message = '
        <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
        <html>
        <body>
            <table border="1" style="border-collapse: collapse; width: 300px;" cellpadding="10">
                <tr>
                    <th>Имя</th>
                    <th>E-mail</th>
                    <th>Тема</th>
                </tr>
                <tr>
                    <td>' . $name .'</td>
                    <td>' . $email . '</td>
                    <td>' . $subject . '</td>
                </tr>
            </table>
        </body>
        </html>
    ';

    try {
        //Server settings
        $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
        $mail->isSMTP();                                            //Send using SMTP
        $mail->Host       = 'mail.liftron.com.ua';                     //Set the SMTP server to send through
        $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
        $mail->Username   = '_mainaccount@liftron.com.ua';                     //SMTP username
        $mail->Password   = '2I3Jiic8q7';                               //SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
        $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
    
        //Recipients
        $mail->setFrom('_mainaccount@liftron.com.ua', 'liftron.com.ua');
        $mail->addAddress('anna.liftron@gmail.com');
    
        //Content
        $mail->isHTML(true);                                  //Set email format to HTML
        // $mail->Subject = $subject;
        $mail->Subject = "LIFTRON.COM.UA from {$email}";
        $mail->Body    = $message;
        $mail->AltBody = "name: {$name};\n email: {$email};\n subject: {$subject}";
    
        $mail->send();
        file_put_contents('error.txt', 'Message has been sent');
    } catch (Exception $e) {
        file_put_contents('error.txt', "Message could not be sent. Mailer Error: {$mail->ErrorInfo}");
    }

    