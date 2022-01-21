package wt.backend.utils;

import java.io.IOException;
import java.io.SyncFailedException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.UnknownHostException;

public class StripePayment {
    String host = "http://deti-engsoft-09";
    URL url;

    {
        try {
            url = new URL(host);
        } catch (MalformedURLException e) {
            System.out.println("Could not make a connection with the host");
        }
    }
    HttpURLConnection con;
    {
        try {
            con = (HttpURLConnection) url.openConnection();
        } catch (IOException e) {
            System.out.println("Could not make a connection with the host");
        }
    }
}
