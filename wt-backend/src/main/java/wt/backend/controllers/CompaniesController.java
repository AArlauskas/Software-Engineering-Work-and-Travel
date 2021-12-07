package wt.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import wt.backend.services.CompaniesService;

@RestController
@RequestMapping("/api/companies")
public class CompaniesController {
    @Autowired
    private CompaniesService companiesService;

    @GetMapping()
    public ResponseEntity<?> getAllCompanies()
    {
        return ResponseEntity.ok(companiesService.getAllCompanies());
    }
}
