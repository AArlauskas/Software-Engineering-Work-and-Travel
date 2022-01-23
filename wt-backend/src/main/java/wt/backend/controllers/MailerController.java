package wt.backend.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import wt.backend.dtos.TestEmailRequest;
import wt.backend.services.MailsService;

@Tag(name = "Mailer")
@RestController
@CrossOrigin
@RequestMapping("api/mailer")
public class MailerController {

    @Autowired
    private MailsService mailsService;

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
        return ResponseEntity.badRequest().body("Failed to send a test email. Check credentials");
    }
}
