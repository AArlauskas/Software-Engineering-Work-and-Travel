package wt.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import wt.backend.enums.UserRoles;
import wt.backend.models.User;

@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    @Getter
    @Setter
    private Long id;

    @Getter
    @Setter
    private String firstname;

    @Getter
    @Setter
    private String lastname;

    @Getter
    @Setter
    private String email;

    @Getter
    @Setter
    private String password;

    @Getter
    @Setter
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
