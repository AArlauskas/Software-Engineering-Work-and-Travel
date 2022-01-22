package wt.backend.models;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.*;
import java.util.Date;

@Entity
@AllArgsConstructor
public class Log {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Getter
    @Setter
    private Long id;

    @Getter
    @Setter
    private String type;

    @Getter
    @Setter
    private String message;

    @Getter
    @Setter
    private Date timestamp;

    public Log()
    {
        timestamp = new Date();
    }

    public Log(String type, String message)
    {
        this.type = type;
        this.message = message;
        timestamp = new Date();
    }
}
