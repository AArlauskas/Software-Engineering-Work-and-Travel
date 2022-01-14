package wt.backend.services;

import org.springframework.stereotype.Service;
import wt.backend.dtos.MessageParameters;

import javax.mail.*;
import javax.mail.internet.*;
import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Properties;

@Service
public class MailsService {
    private final Properties properties;

    public MailsService()
    {
        properties = System.getProperties();
        properties.put("mail.smtp.host", "smtp.gmail.com");
        properties.put("mail.smtp.port", "465");
        properties.put("mail.smtp.ssl.enable", "true");
        properties.put("mail.smtp.auth", "true");
    }

    public boolean isMailValid(String email, String password)
    {
        var session = getMailSession(email, password);
        var messageParameters = new MessageParameters();
        messageParameters.setFrom(email);
        messageParameters.setTo(email);
        messageParameters.setHeader("Test email for validating provided credentials");
        messageParameters.setBody("<h1>Testing email sender</h1>");
        try
        {
            var message = getMailMessage(session, messageParameters);
            sendMail(message);
            return true;
        }
        catch (MessagingException e)
        {
            System.out.println("Messaging error occurred.");
            System.out.println(e.getMessage());
            return false;
        }
        catch (IOException e)
        {
            System.out.println("File handling exception occured");
            System.out.println(e.getMessage());
            return false;
        }
    }

    private Session getMailSession(String email, String password)
    {
        Session session = Session.getInstance(properties, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(email, password);
            }
        });
        session.setDebug(true);
        return session;
    }

    private MimeMessage getMailMessage(Session session, MessageParameters messageParameters) throws MessagingException, IOException {
        MimeMessage message = new MimeMessage(session);
        message.setFrom(new InternetAddress(messageParameters.getFrom()));
        message.setRecipient(Message.RecipientType.TO, new InternetAddress(messageParameters.getTo()));
        message.setSubject(messageParameters.getHeader());
        message.setContent(getMessageContent(messageParameters.getBody(), messageParameters.getAttachments()));
        return message;
    }

    private MimeMultipart getMessageContent(String body, List<String> paths) throws MessagingException, IOException {
        MimeMultipart content = new MimeMultipart();

        MimeBodyPart contentText = new MimeBodyPart();
        contentText.setContent(body, "text/html");
        content.addBodyPart(contentText);

        if(paths.size() == 0) return content;
        for (var path : paths)
        {
            File file = new File(path);
            MimeBodyPart contentAttachments = new MimeBodyPart();
            contentAttachments.attachFile(file);
            content.addBodyPart(contentAttachments);
        }

        return content;
    }

    private void sendMail(MimeMessage message) throws MessagingException {
        Transport.send(message);
    }
}
