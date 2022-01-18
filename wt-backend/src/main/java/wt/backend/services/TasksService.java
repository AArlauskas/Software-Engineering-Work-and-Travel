package wt.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import wt.backend.dtos.TaskDto;
import wt.backend.models.Task;
import wt.backend.models.User;
import wt.backend.repositories.TasksRepository;

import java.util.List;

@Service
public class TasksService {
    @Autowired
    private TasksRepository tasksRepository;

    @Autowired
    private CompaniesService companiesService;

    public List<Task> getAllTasks()
    {
        return tasksRepository.findAll();
    }

    public Task createTask(TaskDto taskDto, User user)
    {
        var companies = companiesService.findCompaniesById(taskDto.getCompanies());
        return tasksRepository.save(new Task(taskDto, user, companies));
    }
}
