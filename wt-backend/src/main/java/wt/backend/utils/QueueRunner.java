package wt.backend.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import wt.backend.services.QueueService;

@Component
public class QueueRunner implements CommandLineRunner {
    @Autowired
    private QueueService queueService;

    @Override
    public void run(String... args) {
        try
        {
            queueService.receiveCompaniesFromQueue();
        }
        catch (Exception e)
        {
            System.out.println("Message queue failed to start.");
        }
    }
}
