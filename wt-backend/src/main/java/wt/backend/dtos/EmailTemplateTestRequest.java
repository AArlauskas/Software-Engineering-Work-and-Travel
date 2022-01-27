package wt.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
public class EmailTemplateTestRequest {
    @Getter
    @Setter
    private String header;

    @Getter
    @Setter
    private String body;
}
