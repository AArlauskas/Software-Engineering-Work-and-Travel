package wt.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import wt.backend.models.Company;
import wt.backend.models.User;
import wt.backend.repositories.CompaniesRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class CompaniesService {
    @Autowired
    private CompaniesRepository companiesRepository;

    public List<Company> getAllCompanies()
    {
        return companiesRepository.findAll();
    }

    public Company getCompanyById(Long id)
    {
        return companiesRepository.getById(id);
    }

    public Company saveOrUpdateCompany(Company company)
    {
        return companiesRepository.save(company);
    }

    public List<Company> findCompaniesById(List<Long> companyIds)
    {
        return companiesRepository.findAllById(companyIds);
    }

    public List<Company> findUserCompanies(User user)
    {
        List<Company> companies = new ArrayList<>();
        user.getTasks().forEach(task -> {
            companies.addAll(task.getCompanies());
        });
        return companies;
    }
}
