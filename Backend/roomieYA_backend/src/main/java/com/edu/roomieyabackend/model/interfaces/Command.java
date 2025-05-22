package com.edu.roomieyabackend.model.interfaces;

public interface Command<T> {
    T ejecutar();
}
