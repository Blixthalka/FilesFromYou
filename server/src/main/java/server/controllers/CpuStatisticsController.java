package server.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import server.Application;

@Controller
public class CpuStatisticsController {

    @GetMapping("/")
    public String cpuStatistics(Model model) {
        model.addAttribute("current_cpu_loads", Application.current_loads);
        return "cpu_stat";
    }
}