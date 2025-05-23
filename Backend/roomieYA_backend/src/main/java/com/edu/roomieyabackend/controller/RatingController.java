package com.edu.roomieyabackend.controller;

import com.edu.roomieyabackend.dto.RatingDTO;
import com.edu.roomieyabackend.model.Rating;
import com.edu.roomieyabackend.service.RatingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ratings")
@CrossOrigin(origins = "http://localhost:3000") 
public class RatingController {

    private final RatingService ratingService;

    public RatingController(RatingService ratingService) {
        this.ratingService = ratingService;
    }

    @GetMapping("/{userId}")
    public List<RatingDTO> getRatings(@PathVariable Long userId) {
        return ratingService.getRatingsForUser(userId);
    }

    @PostMapping
    public Rating createRating(@RequestBody Rating rating) {
        return ratingService.saveRating(rating);
    }
}
