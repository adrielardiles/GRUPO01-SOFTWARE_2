package com.edu.roomieyabackend.service;

import com.edu.roomieyabackend.model.entities.CitaVisita;
import com.edu.roomieyabackend.repository.CitaVisitaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class CitaVisitaService {

    @Autowired
    private CitaVisitaRepository citaVisitaRepository;

    @Autowired
    private NotificacionCorreoService notificacionService;

    // 1. Listar todas las citas
    public List<CitaVisita> getAllCitas() {
        return citaVisitaRepository.findAll();
    }

    // 2. Buscar cita por id
    public Optional<CitaVisita> getCitaById(Long id) {
        return citaVisitaRepository.findById(id);
    }

    // 3. Crear una cita
    public CitaVisita crearCita(CitaVisita citaVisita) {
        return citaVisitaRepository.save(citaVisita);
    }

    // 4. Cancelar cita y notificar por correo
    public Optional<CitaVisita> cancelarCita(Long id) {
        Optional<CitaVisita> optionalCita = citaVisitaRepository.findById(id);
        if (optionalCita.isPresent()) {
            CitaVisita cita = optionalCita.get();
            cita.setEstado("CANCELADO");
            citaVisitaRepository.save(cita);

            if (cita.getEmail() != null && !cita.getEmail().isEmpty()) {
                notificacionService.enviarCorreoCancelacion(
                        cita.getEmail(),
                        cita.getNombre(),
                        cita.getFecha().toString(),
                        cita.getHora().toString()
                );
            }
            return Optional.of(cita);
        }
        return Optional.empty();
    }

    // 5. Marcar recordatorio 24h
    public void marcarRecordatorio24h(Long id) {
        citaVisitaRepository.findById(id).ifPresent(cita -> {
            if (!cita.getRecordatorioEnviado24h()) {
                cita.setRecordatorioEnviado24h(true);
                citaVisitaRepository.save(cita);
                if (cita.getEmail() != null && !cita.getEmail().isEmpty()) {
                    notificacionService.enviarCorreoRecordatorio(
                            cita.getEmail(),
                            cita.getNombre(),
                            cita.getFecha().toString(),
                            cita.getHora().toString()
                    );
                }
            }
        });
    }

    // 6. Marcar recordatorio 48h
    public void marcarRecordatorio48h(Long id) {
        citaVisitaRepository.findById(id).ifPresent(cita -> {
            if (!cita.getRecordatorioEnviado48h()) {
                cita.setRecordatorioEnviado48h(true);
                citaVisitaRepository.save(cita);
                if (cita.getEmail() != null && !cita.getEmail().isEmpty()) {
                    notificacionService.enviarCorreoRecordatorio(
                            cita.getEmail(),
                            cita.getNombre(),
                            cita.getFecha().toString(),
                            cita.getHora().toString()
                    );
                }
            }
        });
    }
public List<CitaVisita> getCitasByPublicacionAndUsuario(Long publicacionId, Long usuarioId) {
    return citaVisitaRepository.findByPublicacionIdAndUsuarioId(publicacionId, usuarioId);
}
    // 7. Consultar citas para recordatorio 24h
    public List<CitaVisita> citasParaRecordatorio24h(LocalDate fecha) {
        return citaVisitaRepository.findByRecordatorioEnviado24hFalseAndFecha(fecha);
    }

    // 8. Consultar citas para recordatorio 48h
    public List<CitaVisita> citasParaRecordatorio48h(LocalDate fecha) {
        return citaVisitaRepository.findByRecordatorioEnviado48hFalseAndFecha(fecha);
    }
    public List<CitaVisita> getCitasByPublicacionId(Long publicacionId) {
    return citaVisitaRepository.findByPublicacionId(publicacionId);
}
}