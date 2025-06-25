package com.edu.roomieyabackend.repository;

import com.edu.roomieyabackend.model.OpcionVotoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OpcionVotoRepository extends JpaRepository<OpcionVotoEntity, Long> {
    List<OpcionVotoEntity> findByVotacionId(Long votacionId);
}