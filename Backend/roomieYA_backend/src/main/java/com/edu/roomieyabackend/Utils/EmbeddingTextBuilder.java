package com.edu.roomieyabackend.Utils;

import com.edu.roomieyabackend.model.entities.Inmueble;

public class EmbeddingTextBuilder {

    public static String construirTextoCompuesto(Inmueble inmueble) {
        StringBuilder sb = new StringBuilder();

        if (inmueble.getTipo() != null)
            sb.append(inmueble.getTipo()).append(" ");


        if (inmueble.getServicios() != null && !inmueble.getServicios().isBlank())
            sb.append("con servicios: ").append(inmueble.getServicios()).append(". ");

        if (inmueble.getDireccion() != null)
            sb.append("Ubicado en ").append(inmueble.getDireccion()).append(". ");

        if (inmueble.getDescripcion() != null)
            sb.append("Descripción: ").append(inmueble.getDescripcion());

        return sb.toString().trim();
    }
}
