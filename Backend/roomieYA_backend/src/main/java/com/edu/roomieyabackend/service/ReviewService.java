package com.edu.roomieyabackend.service;

import com.edu.roomieyabackend.model.Review;
import com.edu.roomieyabackend.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    // Obtener reseñas reportadas
    public List<Review> getReportedReviews() {
        return reviewRepository.findByReportadoTrue();
    }

    // Eliminar reseña por ID
    public void deleteReviewById(Long id) {
        reviewRepository.deleteById(id);
    }
}
