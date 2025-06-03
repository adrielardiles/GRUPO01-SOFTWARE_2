package com.edu.roomieyabackend.dto.Searching;

import lombok.Data;


// Esto usaremos para enviar el texto al microservicio
@Data
public class EmbeddingRequest {
    private String texto;
}