package com.edu.roomieyabackend.repository;

import com.edu.roomieyabackend.model.PublicacionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PublicacionRepository extends JpaRepository<PublicacionEntity, Long> {
}
