import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.edu.roomieyabackend.model.entities.BienComun;
import com.edu.roomieyabackend.model.entities.Usuario;
import com.edu.roomieyabackend.service.BienComunService;
import com.edu.roomieyabackend.service.UserService;
import com.edu.roomieyabackend.controller.BienComunController;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class BienComunControllerTest {

    private BienComunService bienComunService;
    private UserService userService;
    private BienComunController bienComunController;

    @BeforeEach
    void setUp() {
        bienComunService = mock(BienComunService.class);
        userService = mock(UserService.class);
        bienComunController = new BienComunController();
        bienComunController.bienComunService = bienComunService;
        bienComunController.userService = userService;
    }

    @Test
    void testObtenerMisBienesCajaNegra() {
        Long usuarioId = 1L;

        // Entrada 1: Usuario tiene bienes
        BienComun bien1 = new BienComun();
        bien1.setNombre("Bien 1");
        BienComun bien2 = new BienComun();
        bien2.setNombre("Bien 2");
        List<BienComun> bienes = Arrays.asList(bien1, bien2);

        when(userService.obtenerUsuarioPorId(usuarioId)).thenReturn(new Usuario());  // Simulamos un usuario válido
        when(bienComunService.obtenerBienesPorUsuario(any(Usuario.class))).thenReturn(bienes);  // El usuario tiene bienes

        ResponseEntity<List<BienComun>> response = bienComunController.obtenerMisBienes(usuarioId);

        // Comprobamos que la salida es correcta
        assertEquals(HttpStatus.OK, response.getStatusCode());  // Debe retornar 200 OK
        assertEquals(2, response.getBody().size());  // El usuario tiene dos bienes

        // Entrada 2: Usuario no tiene bienes
        bienes = Collections.emptyList();
        when(bienComunService.obtenerBienesPorUsuario(any(Usuario.class))).thenReturn(bienes);  // El usuario no tiene bienes

        response = bienComunController.obtenerMisBienes(usuarioId);

        // Comprobamos la salida
        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());  // Debe retornar 204 No Content
        assertTrue(response.getBody().isEmpty());  // La lista de bienes debe estar vacía

        // Entrada 3: Usuario no encontrado
        when(userService.obtenerUsuarioPorId(usuarioId)).thenReturn(null);  // Simulamos que no se encuentra el usuario

        response = bienComunController.obtenerMisBienes(usuarioId);

        // Comprobamos que la salida es la correcta cuando el usuario no existe
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());  // Debe retornar 404 Not Found

        // Entrada 4: Error en el servicio (ejemplo de un error interno)
        when(userService.obtenerUsuarioPorId(usuarioId)).thenReturn(new Usuario());
        when(bienComunService.obtenerBienesPorUsuario(any(Usuario.class))).thenThrow(new RuntimeException("Error interno"));

        response = bienComunController.obtenerMisBienes(usuarioId);

        // Comprobamos la salida cuando ocurre un error interno
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());  // Debe retornar 500 Internal Server Error
    }
}
