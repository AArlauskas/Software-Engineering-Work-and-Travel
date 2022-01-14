package wt.backend.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import wt.backend.dtos.TestEmailRequest;

@RestController
@CrossOrigin
@RequestMapping("api/mailer")
public class MailerController {

    @PostMapping("test")
    public ResponseEntity<?> testEmail(@RequestBody TestEmailRequest request)
    {
        return ResponseEntity.ok().build();
    }
}
