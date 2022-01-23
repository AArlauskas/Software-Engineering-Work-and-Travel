package wt.backend.controllers;

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
import wt.backend.enums.LogType;
import wt.backend.enums.UserRoles;
import wt.backend.models.User;
import wt.backend.services.LogsService;
import wt.backend.services.UsersService;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/users")
public class UsersController {
    @Autowired
    private UsersService usersService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenProvider jwtTokenUtil;

    @Autowired
    private LogsService logsService;

    @GetMapping()
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getAllUsers()
    {
        return ResponseEntity.ok(usersService.getAllUsers());
    }

    @GetMapping("personal")
    @PreAuthorize("hasAnyRole('ADMIN','BASIC','PRO')")
    public ResponseEntity<?> getPersonalInfo(Authentication authentication)
    {
        User user = usersService.getAuthUser((UserDetails) authentication.getPrincipal());
        if(user == null) return ResponseEntity.notFound().build();

        logsService.log(LogType.USER_DETAILS_GET, "Details about user with id  " + user.getId() + " are get");

        return ResponseEntity.ok(new UserDto(user));
    }

    @PostMapping("register")
    public ResponseEntity<?> register(@RequestBody UserDto userDto)
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

        logsService.log(LogType.REGISTER_USER, "User with first name " + userDto.getFirstname() + " lastname "
        + userDto.getLastname() + " email " + userDto.getEmail() + "was registered");

        return ResponseEntity.ok(new UserDto(usersService.createUser(userDto)));
    }

    @PostMapping("authenticate")
    public ResponseEntity<?> authenticate(@RequestBody LoginUser loginUser)
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
