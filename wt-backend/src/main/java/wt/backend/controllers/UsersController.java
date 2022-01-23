package wt.backend.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import wt.backend.auth.TokenProvider;
import wt.backend.dtos.AuthToken;
import wt.backend.dtos.LoginUser;
import wt.backend.dtos.UserDto;
import wt.backend.enums.UserRoles;
import wt.backend.models.Company;
import wt.backend.models.User;
import wt.backend.services.UsersService;

@Tag(name = "Users")
@RestController
@CrossOrigin
@RequestMapping("/api/users")
public class UsersController {
    @Autowired
    private UsersService usersService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenProvider jwtTokenUtil;

    @Operation(summary = "Get all users")
    @ApiResponse(responseCode = "200",description = "Success",
            content = { @Content(mediaType = "application/json",
                    schema = @Schema(implementation = UserDto.class)) })
    @GetMapping()
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getAllUsers()
    {
        return ResponseEntity.ok(usersService.getAllUsers());
    }

    @Operation(summary = "Get your profile information")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success",
                    content = { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = UserDto.class)) }),
            @ApiResponse(responseCode = "404", description = "User not found",content = @Content) })
    @GetMapping("personal")
    @PreAuthorize("hasAnyRole('ADMIN','BASIC','PRO')")
    public ResponseEntity<?> getPersonalInfo(
            @Parameter(description="User authentication") @RequestParam Authentication authentication)
    {
        User user = usersService.getAuthUser((UserDetails) authentication.getPrincipal());
        if(user == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(new UserDto(user));
    }

    @Operation(summary = "Signing up as a new user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success", content = @Content),
            @ApiResponse(responseCode = "400", description = "Blank filed", content = @Content) })
    @PostMapping("register")
    public ResponseEntity<?> register(
            @Parameter(description="User information") @RequestBody UserDto userDto)
    {
        if(userDto.getFirstname().isEmpty() || userDto.getLastname().isEmpty())
        {
            return ResponseEntity.badRequest().body("Firstname or lastname not provided");
        }
        if(userDto.getEmail().isEmpty() || userDto.getPassword().isEmpty())
        {
            return ResponseEntity.badRequest().body("Email or password not provided");
        }
        if(userDto.getPassword().length() != 16)
        {
            return ResponseEntity.badRequest().body("App password format is invalid");
        }
        if(!usersService.isEmailUnique(userDto.getEmail()))
        {
            return ResponseEntity.badRequest().body("Email already exists");
        }
        return ResponseEntity.ok(new UserDto(usersService.createUser(userDto)));
    }

    @Operation(summary = "Authenticating user credentials")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success", content = @Content),
            @ApiResponse(responseCode = "400", description = "Blank field", content = @Content) })
    @PostMapping("authenticate")
    public ResponseEntity<?> authenticate(
            @Parameter(description="Login information") @RequestBody LoginUser loginUser)
    {
        if(loginUser.getEmail().isEmpty() || loginUser.getPassword().isEmpty())
        {
            return ResponseEntity.badRequest().body("Email or password not provided");
        }

        try
        {
            final Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginUser.getEmail(),
                            loginUser.getPassword()
                    )
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
            final String token = jwtTokenUtil.generateToken(authentication);
            return ResponseEntity.ok(new AuthToken(token));
        }
        catch (AuthenticationException e)
        {
            System.out.println(e);
            return ResponseEntity.notFound().build();
        }
    }

}
