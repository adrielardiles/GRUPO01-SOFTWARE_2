//package com.edu.roomieyabackend.model.entities.AnunciosTipos;
//
//
//import com.edu.roomieyabackend.dto.CrearAnuncioRequestDTO;
//import com.edu.roomieyabackend.model.Enums.EstadoAnuncio;
//import com.edu.roomieyabackend.model.Inmueble;
//import com.edu.roomieyabackend.model.entities.Anuncio;
//import com.edu.roomieyabackend.model.entities.Usuario;
//import com.edu.roomieyabackend.model.interfaces.AnuncioTipoStrategy;
//import org.springframework.stereotype.Component;
//
//import java.time.LocalDateTime;
//
//@Component("INFORMATIVO")
//public class InformativoAnuncioStrategy implements AnuncioTipoStrategy {
//    public Anuncio inicializar(CrearAnuncioRequestDTO dto, Usuario creador, Inmueble inmueble) {
//        return base(dto, creador, inmueble, EstadoAnuncio.ACTIVO, false, LocalDateTime.now());
//    }
//}