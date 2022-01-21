package wt.backend.utils;

import com.stripe.Stripe;
import com.stripe.model.Charge;
import com.stripe.model.Customer;
import com.stripe.model.WebhookEndpoint;
import com.stripe.model.checkout.Session;
import com.stripe.param.WebhookEndpointCreateParams;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@Component
public class StripeClient {
    @Autowired
    StripeClient() {
        Stripe.apiKey = "sk_test_51IGqrgLWKlSQ5z9ePt64Q4HrHwbK58SHUIGQtKkd3a5quLGBoxMjDwFjy1BGdVLepFoTALsDauXS2gKtB06OgaDv00dKAB44m1";
    }

    public Session getPaymentSession(Long userId) throws StripeException {
        SessionCreateParams sessionParams = SessionCreateParams.builder()
                .setSubmitType(SessionCreateParams.SubmitType.PAY)
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .putMetadata("userId", userId.toString())
                .addLineItem(SessionCreateParams.LineItem.builder()
                        .setName("Work and Travel Pro")
                        .setDescription("Work and Travel Pro")
                        .setQuantity(1L)
                        .setAmount(1500L)
                        .setCurrency("EUR")
                        .build())
                .setSuccessUrl("http://deti-engsoft-09/payment-success")
                .setCancelUrl("http://deti-engsoft-09/payment-fail")
                .build();
        return Session.create(sessionParams);
    }
}
