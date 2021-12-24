package wt.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import wt.backend.models.Task;

@Repository
public interface TasksRepository extends JpaRepository<Task, Long> {
}
