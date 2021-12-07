package wt.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import wt.backend.services.TasksService;

@RestController
@RequestMapping("/api/tasks")
public class TasksController {
    @Autowired
    private TasksService tasksService;

    @GetMapping()
    public ResponseEntity<?> getAllTasks()
    {
        return ResponseEntity.ok(tasksService.getAllTasks());
    }
}
