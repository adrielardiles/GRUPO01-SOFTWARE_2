//package com.edu.roomieyabackend.service;
//
//
//import com.edu.roomieyabackend.model.entities.Inmueble;
//import com.edu.roomieyabackend.repository.InmuebleRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import java.util.List;
//
//
//@Service
//public class CitaVisitaService {
//
//    @Autowired
//    private CitaVisitaRepository citaVisitaRepository;
//
//    @Autowired
//    private InmuebleRepository inmuebleRepository;
//
//    public CitaVisita agendarCita(AgendarCitaRequestDTO dto) {
//        Inmueble inmueble = inmuebleRepository.findById(dto.getInmuebleId())
//                .orElseThrow(() -> new RuntimeException("Inmueble no encontrado"));
//
//        CitaVisita cita = new CitaVisita();
//        cita.setInmueble(inmueble);
//        cita.setFecha(dto.getFecha());
//        cita.setHora(dto.getHora());
//        return citaVisitaRepository.save(cita);
//    }
//    public void cancelarCita(Long citaId) {
//        if (!citaVisitaRepository.existsById(citaId)) {
//            throw new RuntimeException("Cita no encontrada");
//        }
//        citaVisitaRepository.deleteById(citaId);
//    }
//    public List<CitaVisita> listarCitasPorUsuario(Long usuarioId) {
//        return citaVisitaRepository.findByUsuarioId(usuarioId);
//    }
//    private void notificarCancelacion(CitaVisita cita) {
//        System.out.println("Notificación: La cita #" + cita.getId() + " ha sido CANCELADA.");
//
//}
//}
