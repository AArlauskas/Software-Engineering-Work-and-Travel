package wt.backend.enums;

public enum LogType {
    DATA_GET("DATA GET"),
    COMPANY_SIGNING_UP("COMPANY IS SINGING UP"),
    EMAIL_SEND_SUCCESS("EMAIL SEND SUCCESS"),
    EMAIL_SEND_FAILURE("EMAIL SEND FAILURE"),
    EMAIL_SEND_STOPPED("EMAIL STOPPED UNEXPECTED"),
    PAYMENT_GET("PAYMENT FROM BASIC USER"),
    UPGRADE_PROFILE("PROFILE UPGRADED"),
    PERSONAL_TASKS("PERSONAL TASK GET"),
    CREATE_TASK("NEW TASKS IS CREATED"),
    TASK_GET("TASK GET"),
    USER_DETAILS_GET("USER DETAILS GET"),
    REGISTER_USER("USER REGISTRATING");

    private final String value;

    LogType(String value) {
        this.value = value;
    }

    @Override
    public String toString()
    {
        return value;
    }
}
