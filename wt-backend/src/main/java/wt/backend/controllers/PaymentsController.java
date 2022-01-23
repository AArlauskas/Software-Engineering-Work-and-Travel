package wt.backend.controllers;

import com.stripe.exception.StripeException;
import com.stripe.model.Event;
import com.stripe.model.EventDataObjectDeserializer;
import com.stripe.model.StripeObject;
import com.stripe.model.checkout.Session;
import com.stripe.net.ApiResource;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import wt.backend.enums.LogType;
import wt.backend.enums.UserRoles;
import wt.backend.models.User;
import wt.backend.services.LogsService;
import wt.backend.services.UsersService;
import wt.backend.utils.StripeClient;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.stream.Collectors;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/payments/")
public class PaymentsController {
    @Autowired
    private StripeClient stripeClient;

    @Autowired
    private UsersService usersService;

    @Autowired
    private LogsService logsService;

    @GetMapping("checkout")
    @PreAuthorize("hasRole('BASIC')")
    public ResponseEntity<?> checkout(Authentication authentication) {
        try
        {
            User user = usersService.getAuthUser((UserDetails) authentication.getPrincipal());
            if(user == null) return ResponseEntity.notFound().build();
            if(!user.getRole().equals(UserRoles.BASIC.toString())) return ResponseEntity.badRequest().body("Only BASIC users can purchase");
            Session session = stripeClient.getPaymentSession(user.getId());

            logsService.log(LogType.PAYMENT_GET, "User with id " + user.getId() + "made a payment");

            return ResponseEntity.ok(session.getUrl());
        }
        catch (StripeException e)
        {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("webhook")
    public ResponseEntity<?> webhook(HttpServletRequest request) {
        try
        {
            System.out.println("Webhook has been called");
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

                logsService.log(LogType.UPGRADE_PROFILE, "User with id " + userId + "upgraded his profile");
                System.out.println("User has been elevated");
            }

            return ResponseEntity.ok().build();
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
