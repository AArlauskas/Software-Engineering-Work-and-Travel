package wt.backend.dtos;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
public class EmailTemplateTestRequest {
    @Getter
    @Setter
    @Schema(required = true)
    private String header;

    @Getter
    @Setter
    private String body;
}
