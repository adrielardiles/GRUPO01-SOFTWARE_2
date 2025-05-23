package com.edu.roomieyabackend.model.entities.AnunciosTipos;

import com.edu.roomieyabackend.model.Enums.CanalNotificacion;
import com.edu.roomieyabackend.model.entities.Usuario;
import com.edu.roomieyabackend.model.interfaces.CanalNotificacionStrategy;
import com.edu.roomieyabackend.model.interfaces.NotificacionService;
import com.edu.roomieyabackend.model.interfaces.RegistrableCanalStrategy;
import org.springframework.stereotype.Service;

import java.util.EnumMap;
import java.util.List;
import java.util.Map;

@Service
public class DefaultNotificacionService implements NotificacionService {

    private final Map<CanalNotificacion, CanalNotificacionStrategy> estrategias;

    public DefaultNotificacionService(List<CanalNotificacionStrategy> estrategiasRegistradas) {
        this.estrategias = new EnumMap<>(CanalNotificacion.class);
        for (CanalNotificacionStrategy e : estrategiasRegistradas) {
            if (e instanceof RegistrableCanalStrategy registrable) {
                estrategias.put(registrable.getCanal(), e);
            }
        }
    }

    @Override
    public void enviar(Usuario destinatario, String mensaje) {
        estrategias.get(CanalNotificacion.EMAIL).enviar(destinatario, mensaje);
    }
}

