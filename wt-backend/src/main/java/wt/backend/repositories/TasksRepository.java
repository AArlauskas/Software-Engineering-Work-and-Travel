package wt.backend.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import wt.backend.models.Task;

@Repository
public interface TasksRepository extends CrudRepository<Task, Long> {
}
