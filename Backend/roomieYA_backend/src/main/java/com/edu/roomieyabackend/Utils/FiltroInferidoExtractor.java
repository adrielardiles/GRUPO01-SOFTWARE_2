package com.edu.roomieyabackend.Utils;

import java.util.*;

public class FiltroInferidoExtractor {

    public static Optional<String> inferirTipo(String texto) {
        texto = texto.toLowerCase(Locale.ROOT);
        if (texto.contains("departamento")) return Optional.of("departamento");
        if (texto.contains("habitación") || texto.contains("cuarto")) return Optional.of("habitación");
        if (texto.contains("loft")) return Optional.of("loft");
        if (texto.contains("studio")) return Optional.of("studio");
        return Optional.empty();
    }

    public static Optional<String> inferirUbicacion(String texto) {
        texto = texto.toLowerCase(Locale.ROOT);
        String[] distritos = {"miraflores", "san miguel", "surco", "barranco", "san isidro", "jesús maría", "pueblo libre"};
        for (String d : distritos) {
            if (texto.contains(d)) return Optional.of(d);
        }
        return Optional.empty();
    }

    public static Optional<Double> inferirPrecioMaximo(String texto) {
        texto = texto.toLowerCase(Locale.ROOT);
        if (texto.contains("económico") || texto.contains("barato")) return Optional.of(1000.0);
        if (texto.contains("hasta 1200")) return Optional.of(1200.0);
        if (texto.contains("menos de 1500")) return Optional.of(1500.0);
        if (texto.contains("mil soles") || texto.contains("1000 soles")) return Optional.of(1000.0);
        return Optional.empty();
    }

    public static Set<String> inferirEtiquetas(String texto) {
        texto = texto.toLowerCase(Locale.ROOT);
        Set<String> etiquetas = new HashSet<>();

        if (texto.contains("wifi") || texto.contains("internet")) etiquetas.add("wifi");
        if (texto.contains("amoblado")) etiquetas.add("amoblado");
        if (texto.contains("cerca de la universidad") || texto.contains("universidad")) etiquetas.add("cerca_universidad");
        if (texto.contains("vista al mar") || texto.contains("frente al mar")) etiquetas.add("vista_mar");
        if (texto.contains("mascotas") || texto.contains("pet friendly")) etiquetas.add("pet_friendly");

        return etiquetas;
    }
}
