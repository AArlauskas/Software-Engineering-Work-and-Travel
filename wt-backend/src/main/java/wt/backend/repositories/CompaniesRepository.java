package wt.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import wt.backend.models.Company;

@Repository
public interface CompaniesRepository extends JpaRepository<Company, Long> {
}
