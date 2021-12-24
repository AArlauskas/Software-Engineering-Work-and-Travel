package wt.backend.enums;

import java.util.List;

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

    public boolean isRole(String value)
    {
        UserRoles[] roles = UserRoles.values();
        for (var role : roles)
        {
            if(role.role.equals(value)) return true;
        }
        return false;
    }
}
