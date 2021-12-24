package wt.backend.models;

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
    private Long id;

    @Getter
    @Setter
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
    private double rating;

    @Getter
    @Setter
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
    private String workType;
}
