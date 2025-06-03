package com.edu.roomieyabackend.Utils;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.List;

public class EmbeddingUtils {
    private static final ObjectMapper mapper = new ObjectMapper();

    public static List<Double> parseEmbedding(String json) {
        try {
            return mapper.readValue(json, new TypeReference<List<Double>>() {});
        } catch (Exception e) {
            System.out.println("❌ Error al parsear embedding_json: " + json);
            e.printStackTrace();
            return List.of();
        }
    }

    public static double cosineSimilarity(List<Double> vec1, List<Double> vec2) {
        if (vec1.size() != vec2.size()) return 0.0;
        double dot = 0.0, normA = 0.0, normB = 0.0;
        for (int i = 0; i < vec1.size(); i++) {
            double a = vec1.get(i);
            double b = vec2.get(i);
            dot += a * b;
            normA += a * a;
            normB += b * b;
        }
        return dot / (Math.sqrt(normA) * Math.sqrt(normB) + 1e-10);
    }
}
