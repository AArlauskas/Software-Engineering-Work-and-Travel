package wt.backend.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import wt.backend.enums.LogType;
import wt.backend.models.Company;
import wt.backend.models.Log;
import wt.backend.services.CompaniesService;
import wt.backend.services.LogsService;
import wt.backend.services.UsersService;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
@RequestMapping("/api/logs")
public class LogsController {
    @Autowired
    private LogsService logsService;

    @Operation(summary = "Get all logs")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success",
                    content = { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Log.class)) }),
            @ApiResponse(responseCode = "404", description = "Logs not found", content = @Content),
            @ApiResponse(responseCode = "401", description = "Not Admin", content = @Content)})
    @GetMapping()
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getAllLogs()
    {
        List<Log> result = logsService.getAllLogs();
        if(result == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(logsService.getAllLogs());
    }

    @Operation(summary = "Get log types")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success",
                    content = { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Log.class)) }),
            @ApiResponse(responseCode = "401", description = "Not Admin", content = @Content)})
    @GetMapping("types")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getLogTypes()
    {
        List<String> types = Arrays.stream(LogType.values())
                .map(LogType::toString)
                .collect(Collectors.toList());
        return ResponseEntity.ok(types);
    }
}
