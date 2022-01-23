package wt.backend.dtos;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.Size;

public class LoginUser {

    @Getter
    @Setter
    @Schema(required = true)
    private String email;

    @Getter
    @Setter
    @Schema(required = true)
    @Size(max = 16,min=16)
    private String password;
}
