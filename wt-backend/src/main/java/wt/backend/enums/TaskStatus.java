package wt.backend.enums;

public enum TaskStatus {
    CREATED("CREATED"),
    PROGRESS("PROGRESS"),
    HALTED("HALTED"),
    ERROR("ERROR"),
    ENDED("ENDED");

    private final String value;

    TaskStatus(String value)
    {
        this.value = value;
    }

    @Override
    public String toString()
    {
        return value;
    }
}
