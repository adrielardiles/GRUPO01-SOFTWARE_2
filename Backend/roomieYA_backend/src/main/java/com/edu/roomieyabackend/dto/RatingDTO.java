package com.edu.roomieyabackend.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RatingDTO {
    private String reviewerName;
    private String comment;
    private int score;
}
