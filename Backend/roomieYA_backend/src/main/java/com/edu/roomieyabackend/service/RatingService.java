package com.edu.roomieyabackend.service;

import com.edu.roomieyabackend.dto.RatingDTO;
import com.edu.roomieyabackend.model.Rating;
import com.edu.roomieyabackend.repository.RatingRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RatingService {

    private final RatingRepository ratingRepository;

    public RatingService(RatingRepository RatingRepository) {
        this.ratingRepository = RatingRepository;
    }

    public List<RatingDTO> getRatingsForUser(Long userId) {
        return ratingRepository.findByUserId(userId).stream()
                .map(rating -> RatingDTO.builder()
                        .reviewerName(rating.getReviewerName())
                        .comment(rating.getComment())
                        .score(rating.getScore())
                        .build())
                .collect(Collectors.toList());
    }

    public Rating saveRating(Rating rating) {
        return ratingRepository.save(rating);
    }
}
