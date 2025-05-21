package com.edu.roomieyabackend.service;

import com.edu.roomieyabackend.model.Review;

import java.util.List;

public interface IReviewService {
    List<Review> obtenerReportadas();
    void eliminar(Long id);
}
