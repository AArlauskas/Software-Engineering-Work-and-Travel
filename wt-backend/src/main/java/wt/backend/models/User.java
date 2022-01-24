package wt.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import wt.backend.dtos.UserDto;
import wt.backend.enums.UserRoles;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
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
    @Column(unique = true)
    private String email;

    @Getter
    @Setter
    @JsonIgnore
    private String password;

    @Getter
    @Setter
    private String role = UserRoles.BASIC.toString();

    @OneToMany(mappedBy = "user")
    @Getter
    @Setter
    private List<Task> tasks;

    public User(UserDto dto)
    {
        firstname = dto.getFirstname();
        lastname = dto.getLastname();
        email = dto.getEmail();
        password = dto.getPassword();
        role = dto.getRole();
        tasks = new ArrayList<>();
    }

    public User(String firstname, String lastname, String email, String password, UserRoles role)
    {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.role = UserRoles.BASIC.toString();
        this.role = role.toString();
    }
}
