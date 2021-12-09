package wt.backend.enums;

public enum UserRoles {
    BASIC("BASIC"),
    PRO("PRO"),
    ADMIN("ADMIN");

    private final String role;

    UserRoles(String role)
    {
        this.role = role;
    }

    @Override
    public String toString() {
        return role;
    }
}
