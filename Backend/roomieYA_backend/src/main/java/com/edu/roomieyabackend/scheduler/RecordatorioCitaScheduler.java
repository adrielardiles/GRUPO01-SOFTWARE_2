package com.edu.roomieyabackend.scheduler;

import com.edu.roomieyabackend.model.entities.CitaVisita;
import com.edu.roomieyabackend.repository.CitaVisitaRepository;
import com.edu.roomieyabackend.service.EmailService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Component
public class RecordatorioCitaScheduler {

    private final CitaVisitaRepository citaVisitaRepository;
    private final EmailService emailService;

    public RecordatorioCitaScheduler(CitaVisitaRepository citaVisitaRepository, EmailService emailService) {
        this.citaVisitaRepository = citaVisitaRepository;
        this.emailService = emailService;
    }

    // Corre cada hora
    @Scheduled(cron = "0 0 * * * *")
    public void enviarRecordatorios() {
        LocalDateTime ahora = LocalDateTime.now();

        // 24 horas después y 48 horas después
        LocalDateTime dentro24h = ahora.plusHours(24);
        LocalDateTime dentro48h = ahora.plusHours(48);

        // Busca citas para dentro de 24h o 48h y que sigan PENDIENTES
        List<CitaVisita> citas = citaVisitaRepository.findAll().stream()
                .filter(c -> {
                    if (!"PENDIENTE".equals(c.getEstado())) return false;
                    LocalDateTime citaDateTime = LocalDateTime.of(c.getFecha(), c.getHora());
                    long horasRestantes = java.time.Duration.between(ahora, citaDateTime).toHours();
                    return horasRestantes == 24 || horasRestantes == 48;
                })
                .toList();

        for (CitaVisita cita : citas) {
            // Aquí podrías poner el correo real del usuario, ajusta según tu modelo.
            String to = "usuario@correo.com"; // Debe venir de la entidad, ajusta en producción
            String subject = "Recordatorio de cita";
            String text = String.format(
                    "Hola %s, tienes una cita agendada el %s a las %s en: %s.",
                    cita.getNombre(), cita.getFecha(), cita.getHora(), cita.getDireccion()
            );
            emailService.sendSimpleEmail(to, subject, text);
        }
    }
}
