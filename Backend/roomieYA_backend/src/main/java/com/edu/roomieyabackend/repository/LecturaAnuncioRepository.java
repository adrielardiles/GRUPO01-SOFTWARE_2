package com.edu.roomieyabackend.repository;

import com.edu.roomieyabackend.model.entities.LecturaAnuncio;
import com.edu.roomieyabackend.model.entities.Usuario;
import jdk.jfr.Registered;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LecturaAnuncioRepository extends JpaRepository<LecturaAnuncio, Long> {
    boolean existsByAnuncioIdAndUsuarioId(Long anuncioId, Long usuarioId);
    boolean existsByAnuncioId(Long anuncioId);

    @Query("""
    SELECT l FROM LecturaAnuncio l
    JOIN FETCH l.anuncio
    JOIN FETCH l.usuario
    WHERE l.anuncio.id = :anuncioId AND l.usuario.id = :usuarioId
    """)
        Optional<LecturaAnuncio> findByAnuncioIdAndUsuarioId(@Param("anuncioId") Long anuncioId, @Param("usuarioId") Long usuarioId);


    @Query("""
    SELECT CASE WHEN COUNT(l) > 0 THEN true ELSE false END
    FROM LecturaAnuncio l
    WHERE l.anuncio.id = :anuncioId
      AND l.usuario.id = :usuarioId
      AND l.leido = false
""")
    boolean existsByAnuncioIdAndUsuarioIdAndNoLeido(
            @Param("anuncioId") Long anuncioId,
            @Param("usuarioId") Long usuarioId
    );




}