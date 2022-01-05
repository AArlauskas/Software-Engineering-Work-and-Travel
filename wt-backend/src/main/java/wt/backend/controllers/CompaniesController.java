package wt.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
}
