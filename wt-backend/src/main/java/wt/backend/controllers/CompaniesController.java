package wt.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import wt.backend.dtos.BasicCompanyDto;
import wt.backend.enums.LogType;
import wt.backend.enums.UserRoles;
import wt.backend.models.Company;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import wt.backend.models.User;
import wt.backend.services.CompaniesService;
import wt.backend.services.LogsService;
import wt.backend.services.UsersService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
@RequestMapping("/api/companies")
public class CompaniesController {
    @Autowired
    private CompaniesService companiesService;

    @Autowired
    private UsersService usersService;

    @Autowired
    private LogsService logsService;

    @GetMapping()
    @PreAuthorize("hasAnyRole('BASIC','ADMIN','PRO')")
    public ResponseEntity<?> getAllCompanies(Authentication authentication)
    {
        User user = usersService.getAuthUser((UserDetails) authentication.getPrincipal());
        if(user == null) return ResponseEntity.notFound().build();

        if(user.getRole().equals(UserRoles.BASIC.toString()))
        {
            var response = companiesService.getAllCompanies().stream()
                    .map(BasicCompanyDto::new)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(response);
        }

        logsService.log(LogType.DATA_GET, "User with id of " + user.getId() + "fetched the full company list");

        return ResponseEntity.ok(companiesService.getAllCompanies());
    }

    @GetMapping("used")
    @PreAuthorize("hasAnyRole('BASIC','ADMIN','PRO')")
    public ResponseEntity<?> getUsedCompanies(Authentication authentication)
    {
        User user = usersService.getAuthUser((UserDetails) authentication.getPrincipal());
        if(user == null) return ResponseEntity.notFound().build();

        List<BasicCompanyDto> result = companiesService.findUserCompanies(user)
                .stream().map(BasicCompanyDto::new).collect(Collectors.toList());

        logsService.log(LogType.DATA_GET, "user with id of " + user.getId() + "fetched the used companies");

        return ResponseEntity.ok(result);
    }

    @PostMapping("/sign-up")
    public ResponseEntity<?> signUpCompany(@RequestBody Company company)
    {
        if (company.getName().isBlank()) return ResponseEntity.badRequest().body("Company name is blank");
        if (company.getAddress().isBlank()) return ResponseEntity.badRequest().body("Address is blank");
        if (company.getLocation().isBlank()) return ResponseEntity.badRequest().body("Location is blank");
        if (company.getMail().isBlank()) return ResponseEntity.badRequest().body("Email is blank");
        if (company.getState().isBlank()) return ResponseEntity.badRequest().body("State is blank");
        if (company.getWorkType().isBlank()) return ResponseEntity.badRequest().body("Work type is blank");

        companiesService.saveOrUpdateCompany(company);

        logsService.log(LogType.COMPANY_SIGNING_UP, "Company with name " + company.getName() + ", location "
        + company.getLocation() + " Email " + company.getMail() + "signed up");

        return ResponseEntity.ok().build();
    }

}