package com.edu.roomieyabackend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

import com.edu.roomieyabackend.dto.RatingDTO;
import com.edu.roomieyabackend.model.Rating;
import com.edu.roomieyabackend.repository.RatingRepository;

@Service
public class RatingService {

    @Autowired
    private RatingRepository ratingRepository;

    public RatingDTO saveRating(RatingDTO ratingDTO) {
        Rating rating = new Rating();
        rating.setReviewerName(ratingDTO.getReviewerName());
        rating.setComment(ratingDTO.getComment());
        rating.setScore(ratingDTO.getScore());
        rating.setUserId(ratingDTO.getUserId());

        ratingRepository.save(rating);

        return ratingDTO;
    }

    public List<RatingDTO> getRatingsForUser(Long userId) {
        return ratingRepository.findByUserId(userId).stream()
                .map(r -> new RatingDTO(r.getReviewerName(), r.getComment(), r.getScore(), r.getUserId()))
                .collect(Collectors.toList());
    }
    public List<RatingDTO> getAllRatings() {
    return ratingRepository.findAll().stream()
        .map(r -> new RatingDTO(r.getReviewerName(), r.getComment(), r.getScore(), r.getUserId()))
        .collect(Collectors.toList());
    }


}


