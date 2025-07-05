package com.edu.roomieyabackend.controller;

import com.edu.roomieyabackend.dto.RatingDTO;
import com.edu.roomieyabackend.model.Rating;
import com.edu.roomieyabackend.service.RatingService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.util.List;

@RestController
@RequestMapping("/api/ratings")
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
    public ResponseEntity<RatingDTO> createRating(@RequestBody RatingDTO ratingDTO) {
    RatingDTO savedRating = ratingService.saveRating(ratingDTO);
    return new ResponseEntity<>(savedRating, HttpStatus.CREATED);
    }
    @GetMapping
    public List<RatingDTO> getAllRatings() {
        return ratingService.getAllRatings();

}

}
