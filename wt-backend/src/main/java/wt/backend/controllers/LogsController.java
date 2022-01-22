package wt.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import wt.backend.models.Log;
import wt.backend.services.CompaniesService;
import wt.backend.services.LogsService;
import wt.backend.services.UsersService;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/logs")
public class LogsController {
    @Autowired
    private LogsService logsService;

    @GetMapping()
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getAllLogs()
    {
        List<Log> result = logsService.getAllLogs();
        if(result == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(logsService.getAllLogs());
    }
}
