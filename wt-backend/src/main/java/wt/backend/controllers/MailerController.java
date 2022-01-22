package wt.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import wt.backend.dtos.TestEmailRequest;
import wt.backend.enums.LogType;
import wt.backend.services.LogsService;
import wt.backend.services.MailsService;

@RestController
@CrossOrigin
@RequestMapping("api/mailer")
public class MailerController {

    @Autowired
    private MailsService mailsService;

    @Autowired
    private LogsService logsService;

    @PostMapping("test")
    public ResponseEntity<?> testMail(@RequestBody TestEmailRequest request)
    {
        if(request.getMail().isBlank() || !request.getMail().contains("@gmail.com"))
        {
            return ResponseEntity.badRequest().body("Email is invalid");
        }
        if(request.getPassword().isBlank() || request.getPassword().length() != 16)
        {
            return ResponseEntity.badRequest().body("Invalid app password");
        }
        if(mailsService.isMailValid(request.getMail(), request.getPassword()))
        {
            return ResponseEntity.ok().build();
        }

        logsService.log(LogType.EMAIL_SEND_FAILURE, "Self Email failed to send because of wrong credentials");

        return ResponseEntity.badRequest().body("Failed to send a test email. Check credentials");

    }
}
