package wt.backend.controllers;

import com.stripe.exception.StripeException;
import com.stripe.model.Event;
import com.stripe.model.EventDataObjectDeserializer;
import com.stripe.model.StripeObject;
import com.stripe.model.checkout.Session;
import com.stripe.net.ApiResource;
import com.stripe.param.checkout.SessionCreateParams;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import wt.backend.enums.UserRoles;
import wt.backend.models.Company;
import wt.backend.models.User;
import wt.backend.services.UsersService;
import wt.backend.utils.StripeClient;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.stream.Collectors;

@Tag(name = "Payments")
@RestController
@CrossOrigin("*")
@RequestMapping("/api/payments/")
public class PaymentsController {
    @Autowired
    private StripeClient stripeClient;

    @Autowired
    private UsersService usersService;

    @Operation(summary = "Generate a URL to open the payment page")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success",
                    content = { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Authentication.class)) }),
            @ApiResponse(responseCode = "404", description = "User not found", content = @Content),
            @ApiResponse(responseCode = "400", description = "Bad request", content = @Content)})
    @GetMapping("checkout")
    @PreAuthorize("hasRole('BASIC')")
    public ResponseEntity<?> checkout(
            @Parameter(description="User authentication") @RequestParam Authentication authentication)
    {
        try
        {
            User user = usersService.getAuthUser((UserDetails) authentication.getPrincipal());
            if(user == null) return ResponseEntity.notFound().build();
            if(!user.getRole().equals(UserRoles.BASIC.toString())) return ResponseEntity.badRequest().body("Only BASIC users can purchase");
            Session session = stripeClient.getPaymentSession(user.getId());
            return ResponseEntity.ok(session.getUrl());
        }
        catch (StripeException e)
        {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Upgrade to pro user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success", content = @Content),
            @ApiResponse(responseCode = "400", description = "Bad request", content = @Content)})
    @PostMapping("webhook")
    public ResponseEntity<?> webhook(
            @Parameter(description="Provided information") @RequestParam HttpServletRequest request)
    {
        try
        {
            String payload = request.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
            Event event = ApiResource.GSON.fromJson(payload, Event.class);

            EventDataObjectDeserializer dataObjectDeserializer = event.getDataObjectDeserializer();
            StripeObject stripeObject = null;
            if(dataObjectDeserializer.getObject().isEmpty())
            {
                return ResponseEntity.badRequest().body("Failed to deserialize");
            }
            stripeObject = dataObjectDeserializer.getObject().get();

            if(event.getType().equals("checkout.session.completed"))
            {
                Session session = (Session)stripeObject;
                Long userId = Long.parseLong(session.getMetadata().get("userId"));
                usersService.upgradeUser(userId);
                System.out.println("Upgraded user with id of " + userId);
            }

            return ResponseEntity.ok().build();
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
