package com.itlize.group.may;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class MayApplication {

    public static void main(String[] args) {
        SpringApplication.run(MayApplication.class, args);
    }



}
