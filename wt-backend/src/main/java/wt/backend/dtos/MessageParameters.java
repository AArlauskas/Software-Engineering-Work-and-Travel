package wt.backend.dtos;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

public class MessageParameters {

    public MessageParameters()
    {
        attachments = new ArrayList<>();
    }
    @Getter
    @Setter
    private String from;

    @Getter
    @Setter
    private String to;

    @Getter
    @Setter
    private String header;

    @Getter
    @Setter
    private String body;

    @Getter
    @Setter
    private List<String> attachments;
}
