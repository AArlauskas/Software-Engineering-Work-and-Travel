package wt.backend.models;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Getter
    @Setter
    @Schema(description = "Unique identifier for the company",
            example = "1")
    private Long id;

    @Getter
    @Setter
    @Schema(required = true)
    private String mail;

    @Getter
    @Setter
    private String name;

    @Getter
    @Setter
    private String location;

    @Getter
    @Setter
    private String zip;

    @Getter
    @Setter
    private String website;

    @Getter
    @Setter
    @Schema(nullable = true)
    private double rating;

    @Getter
    @Setter
    @Schema(nullable = true)
    private int pricing;

    @Getter
    @Setter
    private String phone;
    
    @Getter
    @Setter
    private String address;

    @Getter
    @Setter
    private String state;

    @Getter
    @Setter
    @Schema(nullable = true)
    private String workType;
}
