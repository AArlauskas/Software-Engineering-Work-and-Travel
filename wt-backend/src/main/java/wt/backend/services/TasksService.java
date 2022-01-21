package wt.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import wt.backend.dtos.TaskDto;
import wt.backend.enums.TaskStatus;
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
        if(taskDto.getId() != null)
        {
            Task task = tasksRepository.findById(taskDto.getId()).get();
            task.setHeader(taskDto.getHeader());
            task.setBody(taskDto.getBody());
            task.setCompanies(companies);
            return tasksRepository.save(task);
        }
        return tasksRepository.save(new Task(taskDto, user, companies));
    }

    public Task getTaskById(Long id)
    {
        var task = tasksRepository.findById(id);
        return task.orElse(null);
    }

    public boolean deleteTask(Long id)
    {
        var task = tasksRepository.findById(id);
        if(task.isEmpty()) return false;
        if(!task.get().getStatus().equals(TaskStatus.CREATED.toString())) return false;
        tasksRepository.deleteById(id);
        return true;
    }
}
