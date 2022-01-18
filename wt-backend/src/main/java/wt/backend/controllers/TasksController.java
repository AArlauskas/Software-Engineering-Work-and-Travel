package wt.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import wt.backend.dtos.TaskDto;
import wt.backend.models.User;
import wt.backend.services.TasksService;
import wt.backend.services.UsersService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
@RequestMapping("/api/tasks")
public class TasksController {
    @Autowired
    private TasksService tasksService;

    @Autowired
    private UsersService usersService;

    @GetMapping("personal")
    @PreAuthorize("hasAnyRole('ADMIN','BASIC','PRO')")
    public ResponseEntity<?> getPersonalTasks(Authentication authentication)
    {
        User user = usersService.getAuthUser((UserDetails) authentication.getPrincipal());
        if(user == null) return ResponseEntity.notFound().build();

        var tasks = user.getTasks();
        List<TaskDto> response = tasks.stream().map(TaskDto::new).collect(Collectors.toList());
        return ResponseEntity.ok(tasks);
    }
}
