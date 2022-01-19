package wt.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import wt.backend.models.Company;

@NoArgsConstructor
@AllArgsConstructor
public class BasicCompanyDto {

    @Getter
    @Setter
    private Long id;

    @Getter
    @Setter
    private String name;

    @Getter
    @Setter
    private String mail;

    public BasicCompanyDto(Company company)
    {
        this.id = company.getId();
        this.name = company.getName();
        this.mail = company.getMail();
    }
}
