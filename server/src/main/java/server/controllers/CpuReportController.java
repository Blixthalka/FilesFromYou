package server.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import server.Application;


@RestController
public class CpuReportController {

    @RequestMapping(value = "/cpu/{id}", method = RequestMethod.POST)
    public ResponseEntity<String> cpu(
            @PathVariable(value="id") int id,
            @RequestParam(value="load") double load) {

        load = Math.min(Math.max(load, 0.0), 1.0);
        load = Math.round(load * 100);

        Application.current_loads.put(id, load);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

}
