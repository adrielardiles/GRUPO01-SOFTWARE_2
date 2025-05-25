package com.edu.roomieyabackend.controller;

import com.edu.roomieyabackend.model.Review;
import com.edu.roomieyabackend.service.IReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private IReviewService reviewService;

    @GetMapping("/reported")
    public List<Review> getReportedReviews() {
        return reviewService.getReportedReviews();
    }

    @DeleteMapping("/{id}")
    public void deleteReview(@PathVariable Long id) {
        reviewService.deleteReviewById(id);
    }
}
