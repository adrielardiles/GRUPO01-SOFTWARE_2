package com.edu.roomieyabackend.dto.Searching;

import lombok.Data;

import java.util.List;

// Esto usaremos para recibir el vector semantico
@Data
public class EmbeddingResponse {
    private List<Double> embedding;
}
