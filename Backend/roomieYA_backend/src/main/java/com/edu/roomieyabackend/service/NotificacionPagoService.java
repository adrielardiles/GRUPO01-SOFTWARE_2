package com.edu.roomieyabackend.service;

import com.edu.roomieyabackend.model.NotificacionPago;
import com.edu.roomieyabackend.repository.NotificacionPagoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class NotificacionPagoService {

    @Autowired
    private NotificacionPagoRepository repo;

    public List<NotificacionPago> listar() {
        return repo.findAll();
    }

    public NotificacionPago guardar(NotificacionPago noti) {
        return repo.save(noti);
    }

    public void eliminar(Long id) {
        repo.deleteById(id);
    }

    public NotificacionPago marcarComoLeida(Long id) {
        NotificacionPago n = repo.findById(id).orElseThrow();
        n.setLeida(true);
        return repo.save(n);
    }

    // ✅ NUEVO: Método para guardar desde un gasto compartido
    public void guardarDesdeGasto(String nombre, Double monto, String categoria, String fecha) {
        String mensaje = nombre + " pagó S/ " + monto + " por " + categoria;
        NotificacionPago noti = new NotificacionPago(mensaje, fecha != null ? fecha : LocalDate.now().toString());
        repo.save(noti);
    }
}
