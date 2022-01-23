package wt.backend.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import wt.backend.dtos.EmailTemplateTestRequest;
import wt.backend.dtos.TestEmailRequest;
import wt.backend.models.User;
import wt.backend.enums.LogType;
import wt.backend.services.LogsService;
import wt.backend.services.MailsService;
import wt.backend.services.UsersService;

@Tag(name = "Mailer")
@RestController
@CrossOrigin
@RequestMapping("api/mailer")
public class MailerController {

    @Autowired
    private MailsService mailsService;

    @Autowired
    private LogsService logsService;

    @Autowired
    private UsersService usersService;

    @Operation(summary = "Send a test email to see if the app password works")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success", content = @Content),
            @ApiResponse(responseCode = "400", description = "Invalid information", content = @Content)})
    @PostMapping("test")
    public ResponseEntity<?> tesMail(
            @Parameter(description="Provided information") @RequestBody TestEmailRequest request)
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

    @PostMapping("/test-template")
    public ResponseEntity<?> testEmailTemplate(Authentication authentication, @RequestBody EmailTemplateTestRequest request)
    {
        User user = usersService.getAuthUser((UserDetails) authentication.getPrincipal());
        if(user == null) return ResponseEntity.notFound().build();

        if(request.getHeader() == null || request.getHeader().isBlank())
        {
            return ResponseEntity.badRequest().body("Email's header cannot be empty");
        }

        boolean result = mailsService.sendEmail(user.getEmail(),
                user.getPassword(),
                request.getHeader(),
                request.getBody());

        if(result)
        {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().body("Failed to send email");
    }
}
