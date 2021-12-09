package wt.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import wt.backend.models.Company;
import wt.backend.repositories.CompaniesRepository;

import java.util.List;

@Service
public class CompaniesService {
    @Autowired
    private CompaniesRepository companiesRepository;

    public List<Company> getAllCompanies()
    {
        return companiesRepository.findAll();
    }
}
