package com.edu.roomieyabackend.service;

import com.edu.roomieyabackend.model.entities.BienComun;
import com.edu.roomieyabackend.model.entities.Usuario;
import com.edu.roomieyabackend.repository.BienComunRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BienComunService {

    @Autowired
    private BienComunRepository bienComunRepository;

    public BienComun registrarBien(BienComun bienComun) {
        return bienComunRepository.save(bienComun); // Guardar el bien
    }

    public List<BienComun> obtenerBienesPorUsuario(Usuario usuario) {
        return bienComunRepository.findByUsuario(usuario); // Obtener bienes del usuario
    }
}
