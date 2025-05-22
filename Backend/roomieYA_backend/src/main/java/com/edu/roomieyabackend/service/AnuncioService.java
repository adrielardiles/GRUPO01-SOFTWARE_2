//package com.edu.roomieyabackend.service;
//
//
//
//
//import com.edu.roomieyabackend.dto.CrearAnuncioRequestDTO;
//import com.edu.roomieyabackend.model.entities.Anuncio;
//import com.edu.roomieyabackend.model.entities.AnunciosTipos.AnuncioFactory;
//import com.edu.roomieyabackend.model.entities.AnunciosTipos.AnuncioObservableService;
//import com.edu.roomieyabackend.model.entities.AnunciosTipos.CrearAnuncioCommand;
//import com.edu.roomieyabackend.model.entities.AnunciosTipos.NotificacionObserver;
//import com.edu.roomieyabackend.repository.AnuncioRepository;
//import com.edu.roomieyabackend.repository.InmuebleRepository;
//import com.edu.roomieyabackend.repository.UsuarioRepository;
//import org.springframework.stereotype.Service;
//
//@Service
//public class AnuncioService {
//
//    private final UsuarioRepository usuarioRepository;
//    private final InmuebleRepository inmuebleRepository;
//    private final AnuncioRepository anuncioRepository;
//    private final AnuncioFactory anuncioFactory;
//    private final NotificacionService notificacionService;
//
//    public AnuncioService(
//            UsuarioRepository usuarioRepository,
//            InmuebleRepository inmuebleRepository,
//            AnuncioRepository anuncioRepository,
//            AnuncioFactory anuncioFactory,
//            NotificacionService notificacionService
//    ) {
//        this.usuarioRepository = usuarioRepository;
//        this.inmuebleRepository = inmuebleRepository;
//        this.anuncioRepository = anuncioRepository;
//        this.anuncioFactory = anuncioFactory;
//        this.notificacionService = notificacionService;
//    }
//
//    public Anuncio crearAnuncio(CrearAnuncioRequestDTO dto) {
//        // Ejecutar comando
//        CrearAnuncioCommand command = new CrearAnuncioCommand(
//                dto,
//                usuarioRepository,
//                inmuebleRepository,
//                anuncioRepository,
//                anuncioFactory
//        );
//
//        Anuncio anuncioCreado = command.ejecutar();
//
//        // Configurar y usar observer manual
//        AnuncioObservableService observable = new AnuncioObservableService();
//        observable.agregarObserver(new NotificacionObserver(notificacionService));
//        observable.notificarObservers(anuncioCreado);
//
//        return anuncioCreado;
//    }
//}
