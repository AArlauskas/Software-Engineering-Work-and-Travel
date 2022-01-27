package wt.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import wt.backend.models.Log;

@Repository
public interface LogsRepository extends JpaRepository<Log, Long> {
}
