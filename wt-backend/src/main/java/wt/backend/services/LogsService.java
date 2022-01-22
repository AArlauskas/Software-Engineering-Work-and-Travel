package wt.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import wt.backend.enums.LogType;
import wt.backend.models.Log;
import wt.backend.repositories.LogsRepository;

import java.util.List;

@Service
public class LogsService {
    @Autowired
    private LogsRepository logsRepository;

    public void log(LogType type, String message)
    {
        logsRepository.save(new Log(type.toString(), message));
    }

    public List<Log> getAllLogs()
    {
        return logsRepository.findAll();
    }
}
