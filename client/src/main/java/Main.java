

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.web.ErrorProperties;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.util.xml.DomUtils;
import org.springframework.web.client.AsyncRestOperations;
import org.springframework.web.client.AsyncRestTemplate;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.io.*;
import java.lang.management.ManagementFactory;
import java.lang.management.OperatingSystemMXBean;
import java.util.Random;

@SpringBootApplication
public class Main {

    public static String ip;

    public static void main(String[] args) {
        OperatingSystemMXBean bean = ManagementFactory.getPlatformMXBean(OperatingSystemMXBean.class);

        Double load = bean.getSystemLoadAverage();
        if (load == -1.0) {
            System.err.println("CPU load measurement not supported.");
            System.exit(-1);
        }

        // ID's are assumed to already exist, but it is randomly generated now.
        Random rand = new Random(System.currentTimeMillis());
        ip = "http://localhost:8080/cpu/" + Math.abs(rand.nextInt());

        while (true) {

            try {
                Main.sendToServer(load);
            } catch (HttpClientErrorException e) {
                System.err.println("Error when contacting the server. Trying again later.");
            }

            try {
                Thread.sleep(5000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

            load = bean.getSystemLoadAverage();
        }

    }


    public static void sendToServer(double load) throws HttpClientErrorException {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("load", Double.toString(load));

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(ip, request, String.class);

        if (response.getStatusCode() != HttpStatus.OK) {
            throw new HttpClientErrorException(response.getStatusCode());
        }
    }
}