package com.edu.roomieyabackend.repository;

import com.edu.roomieyabackend.dto.HistorialDTO;
import com.edu.roomieyabackend.model.entities.LecturaAnuncio;
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


    void deleteByAnuncioId(Long id);

    @Query("""
    SELECT CASE WHEN COUNT(l) > 0 THEN true ELSE false END
    FROM LecturaAnuncio l
    WHERE l.anuncio.id = :anuncioId
      AND l.usuario.id <> :usuarioId
      AND l.leido = true
""")
    boolean existsByAnuncioIdAndUsuarioIdNotAndLeidoTrue(
            @Param("anuncioId") Long anuncioId,
            @Param("usuarioId") Long usuarioId
    );

    @Query("""
SELECT new com.edu.roomieyabackend.dto.HistorialDTO(
  l.usuario.nombreCompleto,
  l.fechaLectura,
  l.leido,
  CASE
    WHEN l.anuncio.requiereConfirmacion = true THEN 
        CASE WHEN l.confirmacionLectura = true THEN 'Confirmado' ELSE 'No confirmado' END
    ELSE 'No aplicable'
  END
)
FROM LecturaAnuncio l
WHERE l.anuncio.id = :anuncioId
""")
    List<HistorialDTO> obtenerHistorialPorAnuncioId(@Param("anuncioId") Long anuncioId);



}