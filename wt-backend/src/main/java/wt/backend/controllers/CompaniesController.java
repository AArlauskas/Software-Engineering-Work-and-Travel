package wt.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import wt.backend.models.Company;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import wt.backend.services.CompaniesService;

@RestController
@CrossOrigin
@RequestMapping("/api/companies")
public class CompaniesController {
    @Autowired
    private CompaniesService companiesService;

    @GetMapping()
    @PreAuthorize("hasAnyRole('ADMIN','PRO')")
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
        if (company.getWorkType().isBlank()) return ResponseEntity.badRequest().body("Work type is blank");

        companiesService.saveOrUpdateCompany(company);
        return ResponseEntity.ok().build();
    }
}
