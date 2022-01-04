package wt.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import wt.backend.models.Company;
import wt.backend.services.CompaniesService;

@RestController
@CrossOrigin
@RequestMapping("/api/companies")
public class CompaniesController {
    @Autowired
    private CompaniesService companiesService;

    @GetMapping()
    public ResponseEntity<?> getAllCompanies()
    {
        return ResponseEntity.ok(companiesService.getAllCompanies());
    }

    @PostMapping("/sign-up")
    public ResponseEntity<?> signUpCompany(@RequestBody Company company)
    {
        if (company.getName().isBlank()) return ResponseEntity.badRequest().body("Company name is blank");
        if (company.getAddress().isBlank()) return ResponseEntity.badRequest().body("Address is blank");
        if (company.getLocation().isBlank()) return ResponseEntity.badRequest().body("Location is blank");
        if (company.getMail().isBlank()) return ResponseEntity.badRequest().body("Email is blank");
        if (company.getState().isBlank()) return ResponseEntity.badRequest().body("State is blank");

        companiesService.saveOrUpdateCompany(company);
        return ResponseEntity.ok().build();
    }
}
