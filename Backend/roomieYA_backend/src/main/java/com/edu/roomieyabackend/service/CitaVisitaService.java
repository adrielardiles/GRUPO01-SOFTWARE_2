package com.edu.roomieyabackend.service;

import com.edu.roomieyabackend.model.Enums.EstadoCita;
import com.edu.roomieyabackend.model.entities.CitaVisita;
import com.edu.roomieyabackend.repository.CitaVisitaRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CitaVisitaService {

    private final CitaVisitaRepository repository;

    public CitaVisitaService(CitaVisitaRepository repository) {
        this.repository = repository;
    }

    public List<CitaVisita> getAllCitas() {
        return repository.findAll();
    }

    public CitaVisita createCita(CitaVisita cita) {
        return repository.save(cita);
    }

    public Optional<CitaVisita> getCitaById(Long id) {
        return repository.findById(id);
    }

    public CitaVisita cancelarCita(Long id) {
        Optional<CitaVisita> optionalCita = repository.findById(id);
        if (optionalCita.isPresent()) {
            CitaVisita cita = optionalCita.get();
            cita.setEstado(EstadoCita.CANCELADA);  // Usa el Enum, no un String
            return repository.save(cita);
        }
        return null;
    }

    public void deleteCita(Long id) {
        repository.deleteById(id);
    }

    // Tarea programada para enviar recordatorios
    @Scheduled(fixedRate = 60 * 60 * 1000) // Cada hora
    public void enviarRecordatoriosCitas() {
        LocalDateTime ahora = LocalDateTime.now();
        List<CitaVisita> citas = repository.findByEstado(EstadoCita.PENDIENTE);

        for (CitaVisita cita : citas) {
            LocalDateTime fechaCita = LocalDateTime.of(cita.getFecha(), cita.getHora());

            // Recordatorio 48h antes
            if (!Boolean.TRUE.equals(cita.getRecordatorioEnviado48h())) {
                if (estaEntreHoras(ahora, fechaCita, 48)) {
                    enviarNotificacion(cita, 48);
                    cita.setRecordatorioEnviado48h(true);
                    repository.save(cita);
                }
            }
            // Recordatorio 24h antes
            if (!Boolean.TRUE.equals(cita.getRecordatorioEnviado24h())) {
                if (estaEntreHoras(ahora, fechaCita, 24)) {
                    enviarNotificacion(cita, 24);
                    cita.setRecordatorioEnviado24h(true);
                    repository.save(cita);
                }
            }
        }
    }

    // Verifica si estamos justo en la franja horaria para el recordatorio (tolerancia 1h)
    private boolean estaEntreHoras(LocalDateTime ahora, LocalDateTime fechaCita, int horasAntes) {
        LocalDateTime inicio = fechaCita.minusHours(horasAntes);
        LocalDateTime fin = inicio.plusHours(1);
        return ahora.isAfter(inicio) && ahora.isBefore(fin);
    }

    // Simulación de notificación (puedes cambiar por email real)
    private void enviarNotificacion(CitaVisita cita, int horasAntes) {
        System.out.println("Recordatorio: Su cita #" + cita.getId() +
                " es en " + horasAntes + " horas. (Usuario: " +
                (cita.getUsuario() != null ? cita.getUsuario().getEmail() : "N/A") + ")");
    }
}
