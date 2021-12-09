package wt.backend.enums;

public enum WorkType {
    BAR("BAR"),
    RESTAURANT("RESTAURANT"),
    HOTEL("HOTEL"),
    TOURISM("TOURISM");
    
    private final String workType;
    
    WorkType(String workType)
    {
        this.workType = workType;
    }

    @Override
    public String toString() {
        return workType;
    }
}
