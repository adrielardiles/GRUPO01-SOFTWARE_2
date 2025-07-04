package com.edu.roomieyabackend.service;

import com.edu.roomieyabackend.model.entities.BienComun;
import com.edu.roomieyabackend.model.entities.Usuario;
import com.edu.roomieyabackend.repository.BienComunRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

import java.util.Optional;

@Service
public class BienComunService {

    @Autowired
    private BienComunRepository bienComunRepository;

    // Método para registrar un bien
    public BienComun registrarBien(BienComun bienComun) {
        return bienComunRepository.save(bienComun); // Guardar el bien en la base de datos
    }

    // Método para obtener bienes por usuario
    public List<BienComun> obtenerBienesPorUsuario(Usuario usuario) {
        return bienComunRepository.findByUsuario(usuario); // Buscar bienes del usuario en la base de datos
    }

    // Método para actualizar un bien
    public BienComun updateBien(Long id, BienComun bienActualizado) {
        Optional<BienComun> bienExistenteOpt = bienComunRepository.findById(id);  // Buscar el bien por ID

        if (bienExistenteOpt.isPresent()) {
            BienComun bienExistente = bienExistenteOpt.get();
            bienExistente.setEstado(bienActualizado.getEstado());  // Actualizar el estado

            // Guardamos el bien actualizado en la base de datos
            return bienComunRepository.save(bienExistente);
        } else {
            // Si no se encuentra el bien, lanzamos una excepción o devolvemos un error
            throw new RuntimeException("Bien no encontrado con ID: " + id);
        }
    }
}
