package wt.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import wt.backend.models.Task;

@NoArgsConstructor
@AllArgsConstructor
public class TaskDto {
    @Getter
    @Setter
    private Long id;

    @Getter
    @Setter
    private String status;

    @Getter
    @Setter
    private String header;

    @Getter
    @Setter
    private String body;

    @Getter
    @Setter
    private int emailCount;

    public TaskDto(Task task)
    {
        this.id = task.getId();
        this.header = task.getHeader();
        this.body = task.getBody();
        this.status = task.getStatus();
        emailCount = 0;
    }
}
