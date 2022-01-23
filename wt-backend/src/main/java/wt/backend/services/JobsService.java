package wt.backend.services;

import org.jobrunr.jobs.annotations.Job;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import wt.backend.enums.TaskStatus;
import wt.backend.models.Company;
import wt.backend.models.Task;
import wt.backend.models.User;
import wt.backend.repositories.TasksRepository;
import wt.backend.repositories.UsersRepository;

import java.util.stream.Collectors;

@Service
public class JobsService {

    @Autowired
    private TasksRepository tasksRepository;

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private  MailsService mailsService;

    @Job(name = "Emailing job")
    public void taskRunner(Long userId, Long taskId) {
        User user = usersRepository.findById(userId).get();
        Task task = tasksRepository.findById(taskId).get();
        try
        {
            task.setStatus(TaskStatus.PROGRESS.toString());
            task = tasksRepository.save(task);
            int failedCount = 0;
            var companies = task.getCompanies()
                    .stream()
                    .map(Company::getMail).collect(Collectors.toList());

            for(String to : companies)
            {
                var recipients = to.split("\\|");
                for(String recipient : recipients)
                {
                    boolean didSend = mailsService.sendEmail(user.getEmail(),
                            user.getPassword(),
                            task.getHeader(),
                            task.getBody(),
                            to);
                    if(didSend)
                    {
                        task.setSentEmailsCount(task.getSentEmailsCount() + 1);
                        failedCount = 0;
                    }
                    else
                    {
                        failedCount++;
                        if(failedCount == 3)
                        {
                            task.setStatus(TaskStatus.HALTED.toString());
                            task = tasksRepository.save(task);
                            Thread.sleep(1000 * 60 * 60);
                            failedCount = 0;
                        }
                    }
                    task.setStatus(TaskStatus.PROGRESS.toString());
                    task = tasksRepository.save(task);
                    Thread.sleep(1000);
                }
            }

            task.setStatus(TaskStatus.ENDED.toString());
            tasksRepository.save(task);
        }
        catch(Exception e)
        {
            System.out.println(e.getMessage());
            task.setStatus(TaskStatus.ERROR.toString());
            tasksRepository.save(task);
        }
    }
}
