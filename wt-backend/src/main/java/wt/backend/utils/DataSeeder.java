package wt.backend.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import wt.backend.enums.UserRoles;
import wt.backend.models.User;
import wt.backend.repositories.CompaniesRepository;
import wt.backend.repositories.TasksRepository;
import wt.backend.repositories.UsersRepository;

import java.util.ArrayList;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {
    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private CompaniesRepository companiesRepository;

    @Autowired
    private TasksRepository tasksRepository;

    @Override
    public void run(String... args) throws Exception {
        loadUserData();
    }

    public void loadUserData()
    {
        if(usersRepository.count() > 0) return;
        List<User> users = new ArrayList<>();
        users.add(new User("Aurimas", "Arlauskas", "auruxxas.ar@gmail.com", "XXXX-XXXX-XXXX-XXXX", UserRoles.ADMIN));
        users.add(new User("Ana", "Atanasova", "ana@gmail.com", "XXXX-XXXX-XXXX-XXXX", UserRoles.PRO));
        users.add(new User("Tanja", "Milososka", "tanja@gmail.com", "XXXX-XXXX-XXXX-XXXX", UserRoles.BASIC));
        usersRepository.saveAll(users);
    }
}
