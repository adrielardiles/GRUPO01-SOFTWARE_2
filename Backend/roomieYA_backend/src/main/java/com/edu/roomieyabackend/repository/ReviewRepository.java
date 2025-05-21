package com.edu.roomieyabackend.repository;

import com.edu.roomieyabackend.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    // Método para obtener solo las reseñas reportadas
    List<Review> findByReportadoTrue();
}
