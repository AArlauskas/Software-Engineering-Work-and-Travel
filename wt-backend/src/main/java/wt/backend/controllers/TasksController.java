package wt.backend.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import wt.backend.dtos.TaskDto;
import wt.backend.enums.LogType;
import wt.backend.models.Company;
import wt.backend.models.Task;
import wt.backend.models.User;
import wt.backend.services.LogsService;
import wt.backend.services.TasksService;
import wt.backend.services.UsersService;

import java.util.List;
import java.util.stream.Collectors;

@Tag(name = "Tasks")
@RestController
@CrossOrigin
@RequestMapping("/api/tasks")
public class TasksController {
    @Autowired
    private TasksService tasksService;

    @Autowired
    private UsersService usersService;

    @Autowired
    private LogsService logsService;

    @Operation(summary = "Get your created tasks")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success",
                    content = { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = TaskDto.class)) }),
            @ApiResponse(responseCode = "404", description = "user not found",content = @Content) })
    @GetMapping("personal")
    @PreAuthorize("hasAnyRole('ADMIN','BASIC','PRO')")
    public ResponseEntity<?> getPersonalTasks(
            @Parameter(description="User authentication") @RequestParam Authentication authentication)
    {
        User user = usersService.getAuthUser((UserDetails) authentication.getPrincipal());
        if(user == null) return ResponseEntity.notFound().build();

        var tasks = user.getTasks();
        List<TaskDto> response = tasks.stream().map(TaskDto::new).collect(Collectors.toList());

        logsService.log(LogType.PERSONAL_TASKS, "User with id " + user.getId() + " see his created tasks");

        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Create a new task")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success", content = @Content),
            @ApiResponse(responseCode = "404", description = "User not found", content = @Content) })
    @PostMapping()
    @PreAuthorize("hasAnyRole('ADMIN','BASIC','PRO')")
    public ResponseEntity<?> createTask(
            @Parameter(description="User authentication") @RequestParam Authentication authentication,
            @Parameter(description="Task information") @RequestBody TaskDto taskDto)
    {
        User user = usersService.getAuthUser((UserDetails) authentication.getPrincipal());
        if(user == null) return ResponseEntity.notFound().build();

        var createdTask = tasksService.createTask(taskDto, user);

        logsService.log(LogType.CREATE_TASK, "User with id " + user.getId() + " created new task");

        return ResponseEntity.ok(new TaskDto(createdTask));
    }

    @Operation(summary = "Get tasks by id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success",
                    content = { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = TaskDto.class)) }),
            @ApiResponse(responseCode = "404", description = "Task not found",content = @Content) })
    @GetMapping()
    @PreAuthorize("hasAnyRole('ADMIN','BASIC','PRO')")
    public ResponseEntity<?> getTaskById(
            @Parameter(description="Task id") @RequestParam() Long id)
    {
        Task task = tasksService.getTaskById(id);
        if(task == null) return ResponseEntity.notFound().build();

        logsService.log(LogType.TASK_GET, "Task with id  " + task.getId() + " was selected");

        return ResponseEntity.ok(new TaskDto(task));
    }

    @GetMapping("current")
    @PreAuthorize("hasAnyRole('ADMIN','BASIC','PRO')")
    public ResponseEntity<?> getCurrentRunningTask(Authentication authentication)
    {
        User user = usersService.getAuthUser((UserDetails) authentication.getPrincipal());
        if(user == null) return ResponseEntity.notFound().build();

        Task task = tasksService.findRunningTask(user);
        if(task == null)
        {
            return ResponseEntity.ok(null);
        }
        return ResponseEntity.ok(new TaskDto(task));
    }

    @PostMapping("start")
    @PreAuthorize("hasAnyRole('ADMIN','BASIC','PRO')")
    public ResponseEntity<?> startEmailSending(Authentication authentication, @RequestParam() Long id)
    {
        User user = usersService.getAuthUser((UserDetails) authentication.getPrincipal());
        if(user == null) return ResponseEntity.notFound().build();
        if(tasksService.startTask(id, user))
        {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().body("Task failed to start");
    }

    @DeleteMapping()
    @PreAuthorize("hasAnyRole('ADMIN','BASIC','PRO')")
    public ResponseEntity<?> deleteTask(@RequestParam() Long id)
    {
        if(tasksService.deleteTask(id))
        {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().build();
    }
}
