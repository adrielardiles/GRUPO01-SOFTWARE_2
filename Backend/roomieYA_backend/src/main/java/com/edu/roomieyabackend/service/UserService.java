package com.edu.roomieyabackend.service;

import com.edu.roomieyabackend.model.entities.Usuario;
import com.edu.roomieyabackend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario registrarUsuario(String correo, String contrasena, String nombreCompleto, String telefono) {
        if (usuarioRepository.findByCorreo(correo).isPresent()) {
            throw new RuntimeException("El correo ya está registrado");
        }

        Usuario usuario = new Usuario();
        usuario.setCorreo(correo);
        usuario.setContrasena(contrasena);
        usuario.setNombreCompleto(nombreCompleto);
        usuario.setTelefono(telefono);
        usuario.setActivo(true);

        return usuarioRepository.save(usuario);
    }

    public Optional<Usuario> login(String correo, String contrasena) {
        return usuarioRepository.findByCorreoAndContrasena(correo, contrasena);
    }

    public boolean verificarCorreoExistente(String correo) {
        return usuarioRepository.findByCorreo(correo).isPresent();
    }

    public Optional<Usuario> findByCorreo(String correo) {
    return usuarioRepository.findByCorreo(correo);
    }

    public Usuario save(Usuario usuario) {
    return usuarioRepository.save(usuario);
    }
    public Usuario obtenerUsuarioPorId(Long id) {
        return usuarioRepository.findById(id).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }

    public boolean esContrasenaValida(String contrasena) {
        return contrasena != null && contrasena.length() >= 6;
    }


}
