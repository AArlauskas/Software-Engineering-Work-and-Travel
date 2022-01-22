package wt.backend.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import wt.backend.dtos.TaskDto;
import wt.backend.enums.TaskStatus;

import javax.persistence.*;
import java.util.List;

@Entity
@AllArgsConstructor
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Getter
    @Setter
    private Long id;

    @Getter
    @Setter
    private String status = TaskStatus.CREATED.toString();

    @Getter
    @Setter
    private String header;

    @Getter
    @Setter
    private String body;

    @Getter
    @Setter
    private int sentEmailsCount;

    @Getter
    @Setter
    private boolean isStarted;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @Getter
    @Setter
    private User user;

    @ManyToMany(fetch = FetchType.EAGER,
            cascade = CascadeType.REMOVE)
    @Getter
    @Setter
    @JoinTable(name = "task_company",
    joinColumns = @JoinColumn(name = "task_id"),
    inverseJoinColumns = @JoinColumn(name = "company_id"))
    private List<Company> companies;

    public Task(TaskDto taskDto, User user, List<Company> companies)
    {
        this.header = taskDto.getHeader();
        this.body = taskDto.getBody();
        this.status = taskDto.getStatus();
        this.user = user;
        this.companies = companies;
        this.isStarted = false;
    }

    public Task()
    {
        sentEmailsCount = 0;
        isStarted = false;
    }
}
