package com.edu.roomieyabackend.model.entities.AnunciosTipos;

import com.edu.roomieyabackend.model.Enums.TipoAnuncio;
import com.edu.roomieyabackend.model.interfaces.AnuncioTipoStrategy;
import com.edu.roomieyabackend.model.interfaces.RegistrableAnuncioStrategy;
import org.springframework.stereotype.Component;

import java.util.EnumMap;
import java.util.List;
import java.util.Map;

@Component
public class AnuncioStrategyRegistry {

    private final Map<TipoAnuncio, AnuncioTipoStrategy> estrategias = new EnumMap<>(TipoAnuncio.class);

    public AnuncioStrategyRegistry(List<AnuncioTipoStrategy> listaDeEstrategias) {
        for (AnuncioTipoStrategy estrategia : listaDeEstrategias) {
            if (estrategia instanceof RegistrableAnuncioStrategy registrable) {
                estrategias.put(registrable.tipo(), estrategia);
            } else {
                throw new IllegalArgumentException("Estrategia debe implementar RegistrableAnuncioStrategy");
            }
        }
    }

    public AnuncioTipoStrategy getStrategy(TipoAnuncio tipo) {
        return estrategias.getOrDefault(tipo, estrategias.get(TipoAnuncio.INFORMATIVO)); // default fallback
    }
}
