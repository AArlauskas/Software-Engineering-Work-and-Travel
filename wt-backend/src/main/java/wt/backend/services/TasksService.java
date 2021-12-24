package wt.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import wt.backend.models.Task;
import wt.backend.repositories.TasksRepository;

import java.util.List;

@Service
public class TasksService {
    @Autowired
    private TasksRepository tasksRepository;

    public List<Task> getAllTasks()
    {
        return tasksRepository.findAll();
    }
}
