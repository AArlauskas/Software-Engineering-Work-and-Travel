package wt.backend.dtos;

import lombok.Getter;
import lombok.Setter;

public class LoginUser {

    @Getter
    @Setter
    private String email;

    @Getter
    @Setter
    private String password;
}
