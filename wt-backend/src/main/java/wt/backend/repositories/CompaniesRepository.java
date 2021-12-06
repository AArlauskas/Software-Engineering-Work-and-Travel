package wt.backend.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import wt.backend.models.Company;

@Repository
public interface CompaniesRepository extends CrudRepository<Company, Long> {
}
