package server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@SpringBootApplication
public class Application {

    public static HashMap<Integer, Double> current_loads;

    public static void main(String[] args) {
        current_loads = new HashMap<>();
        double load = 0;
        for(int id = 0; id < 11; id++) {
            current_loads.put(id, load);
            load += 10;
        }
        SpringApplication.run(Application.class, args);
    }
}
