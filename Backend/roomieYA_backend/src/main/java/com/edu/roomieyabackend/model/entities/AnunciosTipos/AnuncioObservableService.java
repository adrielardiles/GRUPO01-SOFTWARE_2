//package com.edu.roomieyabackend.model.entities.AnunciosTipos;
//
//public class AnuncioObservableService implements ObservableAnuncio {
//
//    private final List<ObserverAnuncio> observers = new ArrayList<>();
//
//    @Override
//    public void agregarObserver(ObserverAnuncio observer) {
//        observers.add(observer);
//    }
//
//    @Override
//    public void eliminarObserver(ObserverAnuncio observer) {
//        observers.remove(observer);
//    }
//
//    @Override
//    public void notificarObservers(Anuncio anuncio) {
//        for (ObserverAnuncio observer : observers) {
//            observer.actualizar(anuncio);
//        }
//    }
//}
