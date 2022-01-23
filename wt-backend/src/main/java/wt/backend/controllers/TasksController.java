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
import wt.backend.models.Company;
import wt.backend.models.Task;
import wt.backend.models.User;
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
        return ResponseEntity.ok(new TaskDto(task));
    }
}
