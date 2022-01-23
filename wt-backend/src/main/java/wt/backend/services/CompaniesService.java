package wt.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import wt.backend.enums.LogType;
import wt.backend.models.Company;
import wt.backend.models.User;
import wt.backend.repositories.CompaniesRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class CompaniesService {
    @Autowired
    private CompaniesRepository companiesRepository;

    @Autowired
    private LogsService logsService;

    public List<Company> getAllCompanies()
    {
        return companiesRepository.findAll();
    }

    public Company getCompanyById(Long id)
    {
        return companiesRepository.getById(id);
    }

    public void saveOrUpdateCompany(Company company)
    {
        if(company.getMail() == null || company.getMail().isBlank())
        {
            return;
        }
        if(companiesRepository.existsById(company.getId()))
        {
            logsService.log(LogType.COMPANY_UPDATED, "Company: id" +
                    company.getId() +
                    "name" +
                    company.getName() +
                    "updated");
        }
        logsService.log(LogType.COMPANY_RECEIVED, "Company: id" +
                company.getId() +
                "name" +
                company.getName() +
                "received");
        companiesRepository.save(company);
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
