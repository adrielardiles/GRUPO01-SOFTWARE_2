package com.edu.roomieyabackend.controller;

import com.edu.roomieyabackend.model.Review;
import com.edu.roomieyabackend.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "http://localhost:3000") // Habilita conexión con React
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    // GET - Listar reseñas reportadas
    @GetMapping("/reported")
    public List<Review> getReportedReviews() {
        return reviewService.getReportedReviews();
    }

    // DELETE - Eliminar reseña por ID (se usará en TA028)
    @DeleteMapping("/{id}")
    public void deleteReview(@PathVariable Long id) {
        reviewService.deleteReviewById(id);
    }
}
