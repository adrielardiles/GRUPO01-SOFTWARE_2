package com.edu.roomieyabackend.service;

import com.edu.roomieyabackend.dto.CrearVotacionRequest;
import com.edu.roomieyabackend.dto.ResultadoDTO;
import com.edu.roomieyabackend.dto.VotoRequest;
import com.edu.roomieyabackend.model.OpcionVotoEntity;
import com.edu.roomieyabackend.model.VotacionEntity;
import com.edu.roomieyabackend.model.VotoEntity;
import com.edu.roomieyabackend.repository.OpcionVotoRepository;
import com.edu.roomieyabackend.repository.VotacionRepository;
import com.edu.roomieyabackend.repository.VotoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.edu.roomieyabackend.service.VotacionService;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class VotacionService {
    private final VotacionRepository votRepo;
    private final OpcionVotoRepository opRepo;
    private final VotoRepository vRepo;

    public VotacionService(VotacionRepository votRepo, OpcionVotoRepository opRepo, VotoRepository vRepo) {
        this.votRepo = votRepo;
        this.opRepo = opRepo;
        this.vRepo = vRepo;
    }

    @Transactional
    public void crearVotacion(CrearVotacionRequest req) {
        VotacionEntity vot = new VotacionEntity();
        vot.setPregunta(req.getPregunta());
        vot.setFechaInicio(req.getFechaInicio());
        vot.setFechaFin(req.getFechaFin());
        vot.setEstado("activa");
        List<OpcionVotoEntity> opts = req.getOpciones().stream().map(dto -> {
            OpcionVotoEntity op = new OpcionVotoEntity();
            op.setDescripcion(dto.getDescripcion());
            op.setVotacion(vot);
            return op;
        }).collect(Collectors.toList());
        vot.setOpciones(opts);
        votRepo.save(vot);
    }

    @Transactional
    public void votar(VotoRequest req, Long votacionId) {
        VotacionEntity votacion = votRepo.findById(votacionId)
            .orElseThrow(() -> new RuntimeException("Votación no encontrada"));
        OpcionVotoEntity opcion = opRepo.findById(req.getOpcionId())
            .orElseThrow(() -> new RuntimeException("Opción no encontrada"));
        if (!opcion.getVotacion().getId().equals(votacionId)) {
            throw new RuntimeException("La opción no pertenece a esta votación");
        }
        if (vRepo.existsByUsuarioIdAndVotacionId(req.getUsuarioId(), votacionId)) {
            throw new RuntimeException("Ya has votado en esta votación");
        }
        VotoEntity voto = new VotoEntity();
        voto.setUsuarioId(req.getUsuarioId());
        voto.setVotacion(votacion);
        voto.setOpcion(opcion);
        voto.setFechaVoto(LocalDateTime.now());
        vRepo.save(voto);
        opcion.setCantidadVotos(opcion.getCantidadVotos() + 1);
        opRepo.save(opcion);
    }

    @Transactional(readOnly = true)
    public List<ResultadoDTO> obtenerResultados(Long votacionId) {
        VotacionEntity votacion = votRepo.findById(votacionId)
            .orElseThrow(() -> new RuntimeException("Votación no encontrada"));
        int total = votacion.getOpciones().stream()
            .mapToInt(OpcionVotoEntity::getCantidadVotos)
            .sum();
        return votacion.getOpciones().stream().map(op -> {
            ResultadoDTO dto = new ResultadoDTO();
            dto.setDescripcion(op.getDescripcion());
            dto.setCantidadVotos(op.getCantidadVotos());
            dto.setPorcentaje(total == 0 ? 0 : (op.getCantidadVotos() * 100.0 / total));
            return dto;
        }).collect(Collectors.toList());
    }

    public boolean hasVoted(Long usuarioId, Long votacionId) {
    return vRepo.existsByUsuarioIdAndVotacionId(usuarioId, votacionId);
    }
}