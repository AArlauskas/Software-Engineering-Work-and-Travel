package wt.backend.services;

import com.google.gson.Gson;
import com.rabbitmq.client.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import wt.backend.models.Company;

import java.io.Console;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.TimeoutException;

@Service
public class QueueService {

    @Autowired
    private CompaniesService companiesService;

    public void receiveCompaniesFromQueue() throws IOException, TimeoutException {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("rabbitmq");
        Connection connection = factory.newConnection();

        Channel channel = connection.createChannel();
        channel.exchangeDeclare("logs", BuiltinExchangeType.FANOUT);
        channel.queueBind("companies","logs","");

        System.out.println(" [*] Waiting for messages. To exit press CTRL+C");

        DeliverCallback deliverCallback = (consumerTag, delivery) -> {

            String message = new String(delivery.getBody(), StandardCharsets.UTF_8);

            try {
                Gson g = new Gson();
                Company company=g.fromJson(message,Company.class);
                companiesService.saveOrUpdateCompany(company);
            }
            catch (Exception e)
            {
                Gson g = new Gson();
                Company company=g.fromJson(message,Company.class);
                System.out.println(company);
            }
        };

        channel.basicConsume("companies", true, deliverCallback, consumerTag -> {
        });
    }
}
