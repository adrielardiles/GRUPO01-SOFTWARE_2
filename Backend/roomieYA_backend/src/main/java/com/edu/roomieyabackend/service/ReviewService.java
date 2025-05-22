package com.edu.roomieyabackend.service;

import com.edu.roomieyabackend.model.Review;
import com.edu.roomieyabackend.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService implements IReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Override
    public List<Review> getReportedReviews() {
        return reviewRepository.findByReportadoTrue();
    }

    @Override
    public void deleteReviewById(Long id) {
        reviewRepository.deleteById(id);


    }

    public List<Review> getReportedReviews() {
        // Lógica para obtener reviews reportados
        return reviewRepository.findByReportedTrue();
    }

    public void deleteReviewById(Long id) {
        reviewRepository.deleteById(id);
    }

}
