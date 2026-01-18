package com.example.quiz.controller;

import com.example.quiz.model.Question;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/questions")
@CrossOrigin(origins = "http://localhost:3000")
public class QuestionController {

    @GetMapping
    public List<Question> getQuestions() {
        return Arrays.asList(
            new Question(
                UUID.randomUUID().toString(),
                "Which service is used for serverless computing in AWS?",
                Arrays.asList("EC2", "Lambda", "S3", "RDS"),
                "Lambda",
                "AWS Lambda is a serverless compute service that lets you run code without provisioning or managing servers."
            ),
            new Question(
                UUID.randomUUID().toString(),
                "What is the primary storage service in Google Cloud?",
                Arrays.asList("Cloud SQL", "BigQuery", "Cloud Storage", "Compute Engine"),
                "Cloud Storage",
                "Google Cloud Storage is a RESTful online file storage web service for storing and accessing data on Google Cloud Platform infrastructure."
            ),
             new Question(
                UUID.randomUUID().toString(),
                "Which Azure service provides a platform for building, deploying, and scaling web apps?",
                Arrays.asList("Azure Virtual Machines", "Azure App Service", "Azure Blob Storage", "Azure Functions"),
                "Azure App Service",
                "Azure App Service is an HTTP-based service for hosting web applications, REST APIs, and mobile back ends."
            )
        );
    }
}
