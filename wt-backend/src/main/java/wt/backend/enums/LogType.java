package wt.backend.enums;

public enum LogType {
    EMAIL_SEND_SUCCESS("EMAIL SEND SUCCESS"),
    EMAIL_SEND_FAILURE("EMAIL SEND FAILURE"),
    EMAIL_SEND_STOPPED("EMAIL STOPPED UNEXPECTED");

    private final String value;

    LogType(String value)
    {
        this.value = value;
    }

    @Override
    public String toString()
    {
        return value;
    }
}
