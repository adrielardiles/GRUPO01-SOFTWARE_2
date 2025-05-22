package com.edu.roomieyabackend.model.entities.AnunciosTipos;

@Component
public class AnuncioStrategyRegistry {

    private final Map<TipoAnuncio, AnuncioTipoStrategy> estrategias = new HashMap<>();

    public AnuncioStrategyRegistry(List<AnuncioTipoStrategy> lista) {
        for (AnuncioTipoStrategy estrategia : lista) {
            String nombre = estrategia.getClass().getAnnotation(Component.class).value();
            estrategias.put(TipoAnuncio.valueOf(nombre), estrategia);
        }
    }

    public AnuncioTipoStrategy getStrategy(TipoAnuncio tipo) {
        return estrategias.get(tipo);
    }
}

