package com.edu.roomieyabackend.model.interfaces;

import com.edu.roomieyabackend.model.Enums.CanalNotificacion;

public interface RegistrableCanalStrategy extends CanalNotificacionStrategy {
    CanalNotificacion getCanal();
}
