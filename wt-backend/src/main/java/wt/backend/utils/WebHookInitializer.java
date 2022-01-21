package wt.backend.utils;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.WebhookEndpoint;
import com.stripe.param.WebhookEndpointCreateParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class WebHookInitializer {
    @Autowired
    WebHookInitializer() {
        Stripe.apiKey = "sk_test_51IGqrgLWKlSQ5z9ePt64Q4HrHwbK58SHUIGQtKkd3a5quLGBoxMjDwFjy1BGdVLepFoTALsDauXS2gKtB06OgaDv00dKAB44m1";
    }
        public WebhookEndpoint WebHookInitializers() throws StripeException {
            WebhookEndpointCreateParams params =
                    WebhookEndpointCreateParams.builder()
                            .setUrl("http:deti-engsoft-09:8080")
                            .addAllEnabledEvent(Arrays.asList(
                                    WebhookEndpointCreateParams.EnabledEvent.CHARGE__FAILED,
                                    WebhookEndpointCreateParams.EnabledEvent.CHARGE__SUCCEEDED))
                            .build();

            WebhookEndpoint endpoint = WebhookEndpoint.create(params);
            return endpoint;
        }
    }

