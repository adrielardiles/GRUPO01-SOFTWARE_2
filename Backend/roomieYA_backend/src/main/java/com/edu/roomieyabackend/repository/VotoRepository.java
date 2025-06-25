package com.edu.roomieyabackend.repository;

import com.edu.roomieyabackend.model.VotoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VotoRepository extends JpaRepository<VotoEntity, Long> {
    boolean existsByUsuarioIdAndVotacionId(Long usuarioId, Long votacionId);
}