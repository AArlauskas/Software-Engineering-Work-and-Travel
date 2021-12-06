package wt.backend.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import wt.backend.models.User;

@Repository
public interface UsersRepository extends CrudRepository<User, Long> {
}
