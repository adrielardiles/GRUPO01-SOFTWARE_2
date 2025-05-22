package com.edu.roomieyabackend.model.entities.AnunciosTipos;

import com.edu.roomieyabackend.model.entities.Anuncio;
import com.edu.roomieyabackend.model.interfaces.ObservableAnuncio;
import com.edu.roomieyabackend.model.interfaces.ObserverAnuncio;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class AnuncioObservable implements ObservableAnuncio {

    private final List<ObserverAnuncio> observers = new ArrayList<>();

    @Override
    public void agregarObserver(ObserverAnuncio observer) {
        observers.add(observer);
    }

    @Override
    public void eliminarObserver(ObserverAnuncio observer) {
        observers.remove(observer);
    }

    @Override
    public void notificarObservers(Anuncio anuncio) {
        for (ObserverAnuncio observer : observers) {
            observer.actualizar(anuncio);
        }
    }
}
