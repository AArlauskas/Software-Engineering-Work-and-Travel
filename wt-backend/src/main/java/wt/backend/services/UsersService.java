package wt.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import wt.backend.models.User;
import wt.backend.repositories.UsersRepository;

import java.util.List;

@Service
public class UsersService {
    @Autowired
    private UsersRepository usersRepository;

    public List<User> getAllUsers()
    {
        return usersRepository.findAll();
    }
}
