package com.edu.roomieyabackend.model.interfaces;

import com.edu.roomieyabackend.model.entities.Anuncio;

public interface ObservableAnuncio {
    void agregarObserver(ObserverAnuncio observer);
    void eliminarObserver(ObserverAnuncio observer);
    void notificarObservers(Anuncio anuncio);
}
