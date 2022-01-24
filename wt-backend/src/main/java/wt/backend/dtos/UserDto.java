package wt.backend.dtos;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import wt.backend.enums.UserRoles;
import wt.backend.models.User;

import javax.validation.constraints.Size;

@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    @Getter
    @Setter
    @Schema(description = "Unique identifier for the user",
            example = "1")
    private Long id;

    @Getter
    @Setter
    @Schema(required = true)
    private String firstname;

    @Getter
    @Setter
    @Schema(required = true)
    private String lastname;

    @Getter
    @Setter
    @Schema(required = true)
    private String email;

    @Getter
    @Setter
    @Schema(nullable = false, required = true)
    @Size(max = 16,min = 16)
    private String password;

    @Getter
    @Setter
    @Schema(nullable = false)
    private String role = UserRoles.BASIC.toString();

    public UserDto(User user)
    {
        id = user.getId();
        firstname = user.getFirstname();
        lastname = user.getLastname();
        email = user.getEmail();
        password = user.getPassword();
        role = user.getRole();
    }
}
