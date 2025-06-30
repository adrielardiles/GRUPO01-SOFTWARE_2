package com.edu.roomieyabackend.model.entities.AnunciosTipos;

import com.edu.roomieyabackend.dto.CrearAnuncioRequestDTO;
import com.edu.roomieyabackend.model.Enums.TipoAnuncio;
import com.edu.roomieyabackend.model.entities.Anuncio;
import com.edu.roomieyabackend.model.entities.Inmueble;
import com.edu.roomieyabackend.model.entities.Usuario;
import com.edu.roomieyabackend.repository.AnuncioRepository;
import com.edu.roomieyabackend.repository.InmuebleRepository;
import com.edu.roomieyabackend.repository.UsuarioRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class CrearAnuncioCommandTest {

    @Mock
    private UsuarioRepository usuarioRepository;

    @Mock
    private InmuebleRepository inmuebleRepository;

    @Mock
    private AnuncioRepository anuncioRepository;

    @Mock
    private AnuncioFacade anuncioFacade;

    @InjectMocks
    private CrearAnuncioCommand crearAnuncioCommand;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    // HappyPath

    @Test
    void testCrearAnuncio_HappyPath() {
        // Arrange
        CrearAnuncioRequestDTO dto = new CrearAnuncioRequestDTO();
        dto.setCreadorId(1L);
        dto.setInmuebleId(2L);
        dto.setTitulo("Título de prueba");
        dto.setDescripcion("Descripción de prueba");
        dto.setTipo(TipoAnuncio.INFORMATIVO);

        Usuario usuarioMock = new Usuario();
        usuarioMock.setId(1L);
        usuarioMock.setNombreCompleto("Usuario Mock");

        Inmueble inmuebleMock = new Inmueble();
        inmuebleMock.setId(2L);

        Anuncio anuncioMock = new Anuncio();
        anuncioMock.setId(10L);
        anuncioMock.setTitulo(dto.getTitulo());
        anuncioMock.setDescripcion(dto.getDescripcion());
        anuncioMock.setCreador(usuarioMock);
        anuncioMock.setInmueble(inmuebleMock);

        // Configuración de mocks
        when(usuarioRepository.findById(1L)).thenReturn(java.util.Optional.of(usuarioMock));
        when(inmuebleRepository.findById(2L)).thenReturn(java.util.Optional.of(inmuebleMock));
        when(anuncioFacade.crearDesdeDTO(dto, usuarioMock, inmuebleMock)).thenReturn(anuncioMock);
        when(anuncioRepository.save(anuncioMock)).thenReturn(anuncioMock);

        // Crear instancia con dto ya que usarás un constructor por prueba
        crearAnuncioCommand = new CrearAnuncioCommand(dto, usuarioRepository, inmuebleRepository, anuncioRepository, anuncioFacade);

        // Act
        Anuncio resultado = crearAnuncioCommand.ejecutar();

        // Assert
        assertNotNull(resultado);
        assertEquals(10L, resultado.getId());
        assertEquals("Título de prueba", resultado.getTitulo());
        assertEquals("Descripción de prueba", resultado.getDescripcion());
        assertEquals(usuarioMock, resultado.getCreador());
        assertEquals(inmuebleMock, resultado.getInmueble());

        // Verifica interacciones con los repositorios y facade
        verify(usuarioRepository).findById(1L);
        verify(inmuebleRepository).findById(2L);
        verify(anuncioFacade).crearDesdeDTO(dto, usuarioMock, inmuebleMock);
        verify(anuncioRepository).save(anuncioMock);
    }


    //BoundaryCase

    @Test
    void testCrearAnuncio_BoundaryCase() {
        // Arrange
        String tituloMaximo = "a".repeat(255); // 255 caracteres
        String descripcionMinima = "b"; // 1 carácter

        CrearAnuncioRequestDTO dto = new CrearAnuncioRequestDTO();
        dto.setCreadorId(1L);
        dto.setInmuebleId(2L);
        dto.setTitulo(tituloMaximo);
        dto.setDescripcion(descripcionMinima);
        dto.setTipo(TipoAnuncio.INFORMATIVO);

        Usuario usuarioMock = new Usuario();
        usuarioMock.setId(1L);
        usuarioMock.setNombreCompleto("Usuario Mock");

        Inmueble inmuebleMock = new Inmueble();
        inmuebleMock.setId(2L);

        Anuncio anuncioMock = new Anuncio();
        anuncioMock.setId(11L);
        anuncioMock.setTitulo(tituloMaximo);
        anuncioMock.setDescripcion(descripcionMinima);
        anuncioMock.setCreador(usuarioMock);
        anuncioMock.setInmueble(inmuebleMock);

        // Configuración de mocks
        when(usuarioRepository.findById(1L)).thenReturn(java.util.Optional.of(usuarioMock));
        when(inmuebleRepository.findById(2L)).thenReturn(java.util.Optional.of(inmuebleMock));
        when(anuncioFacade.crearDesdeDTO(dto, usuarioMock, inmuebleMock)).thenReturn(anuncioMock);
        when(anuncioRepository.save(anuncioMock)).thenReturn(anuncioMock);

        // Crear instancia de CrearAnuncioCommand con dto boundary
        crearAnuncioCommand = new CrearAnuncioCommand(dto, usuarioRepository, inmuebleRepository, anuncioRepository, anuncioFacade);

        // Act
        Anuncio resultado = crearAnuncioCommand.ejecutar();

        // Assert
        assertNotNull(resultado);
        assertEquals(11L, resultado.getId());
        assertEquals(tituloMaximo, resultado.getTitulo());
        assertEquals(descripcionMinima, resultado.getDescripcion());

        // Verifica interacciones con los repositorios y facade
        verify(usuarioRepository).findById(1L);
        verify(inmuebleRepository).findById(2L);
        verify(anuncioFacade).crearDesdeDTO(dto, usuarioMock, inmuebleMock);
        verify(anuncioRepository).save(anuncioMock);
    }


    //NEGATIVE CASE

    @Test
    void testCrearAnuncio_NegativeCase_UsuarioNoExistente() {
        // Arrange
        CrearAnuncioRequestDTO dto = new CrearAnuncioRequestDTO();
        dto.setCreadorId(999L); // ID inexistente
        dto.setInmuebleId(2L);
        dto.setTitulo("Título prueba");
        dto.setDescripcion("Descripción prueba");
        dto.setTipo(TipoAnuncio.INFORMATIVO);

        // Configuración de mocks: usuario no encontrado
        when(usuarioRepository.findById(999L)).thenReturn(java.util.Optional.empty());

        // Crear instancia de CrearAnuncioCommand con dto inválido
        crearAnuncioCommand = new CrearAnuncioCommand(dto, usuarioRepository, inmuebleRepository, anuncioRepository, anuncioFacade);

        // Act & Assert
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            crearAnuncioCommand.ejecutar();
        });

        assertEquals("Usuario no encontrado", exception.getMessage());

        // Verifica que NO se llamen métodos posteriores
        verify(usuarioRepository).findById(999L);
        verifyNoInteractions(inmuebleRepository);
        verifyNoInteractions(anuncioFacade);
        verifyNoInteractions(anuncioRepository);
    }


    @Test
    void testCrearAnuncio_SpecialAlternative_InmuebleNoExistente() {
        // Arrange
        CrearAnuncioRequestDTO dto = new CrearAnuncioRequestDTO();
        dto.setCreadorId(1L);
        dto.setInmuebleId(999L); // ID de inmueble inexistente
        dto.setTitulo("Título prueba");
        dto.setDescripcion("Descripción prueba");
        dto.setTipo(TipoAnuncio.INFORMATIVO);

        Usuario usuarioMock = new Usuario();
        usuarioMock.setId(1L);
        usuarioMock.setNombreCompleto("Usuario Mock");

        // Configuración de mocks:
        when(usuarioRepository.findById(1L)).thenReturn(java.util.Optional.of(usuarioMock));
        when(inmuebleRepository.findById(999L)).thenReturn(java.util.Optional.empty());

        // Crear instancia de CrearAnuncioCommand con dto inválido
        crearAnuncioCommand = new CrearAnuncioCommand(dto, usuarioRepository, inmuebleRepository, anuncioRepository, anuncioFacade);

        // Act & Assert
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            crearAnuncioCommand.ejecutar();
        });

        assertEquals("Inmueble no encontrado", exception.getMessage());

        // Verifica interacciones con repositorios
        verify(usuarioRepository).findById(1L);
        verify(inmuebleRepository).findById(999L);

        // Asegura que no se invoquen facade ni repository de anuncio al fallar
        verifyNoInteractions(anuncioFacade);
        verifyNoInteractions(anuncioRepository);
    }




}
