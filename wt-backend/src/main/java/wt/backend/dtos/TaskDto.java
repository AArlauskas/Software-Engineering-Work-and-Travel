package wt.backend.dtos;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import wt.backend.enums.TaskStatus;
import wt.backend.models.Company;
import wt.backend.models.Task;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
public class TaskDto {
    @Getter
    @Setter
    @Schema(description = "Unique identifier for the task",
            example = "1")
    private Long id;

    @Getter
    @Setter
    private String status;

    @Getter
    @Setter
    @Schema(description = "The subject for the mail",required = true)
    private String header;

    @Getter
    @Setter
    @Schema(description = "The body of the mail",required = true)
    private String body;

    @Getter
    @Setter
    private int emailCount;

    @Getter
    @Setter
    @Schema(description = "Company to which the mail will be sent to",required = true)
    private List<Long> companies;

    public TaskDto(Task task)
    {
        this.id = task.getId();
        this.header = task.getHeader();
        this.body = task.getBody();
        this.status = task.getStatus();
        this.companies = task.getCompanies().stream()
                .map(Company::getId)
                .collect(Collectors.toList());
        emailCount = 0;
    }

    public TaskDto()
    {
        status = TaskStatus.CREATED.toString();
        companies = new ArrayList<>();
        emailCount = 0;
    }
}
