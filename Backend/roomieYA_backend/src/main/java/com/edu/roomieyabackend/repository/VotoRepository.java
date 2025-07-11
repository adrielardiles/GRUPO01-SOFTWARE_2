package com.edu.roomieyabackend.repository;

import com.edu.roomieyabackend.model.VotoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;  // ✅ Este import es obligatorio

@Repository
public interface VotoRepository extends JpaRepository<VotoEntity, Long> {
    boolean existsByUsuarioIdAndVotacionId(Long usuarioId, Long votacionId);
}
