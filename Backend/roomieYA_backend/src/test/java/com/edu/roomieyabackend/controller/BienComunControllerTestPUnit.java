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
    void testSubirBien() {
        Long usuarioId = 1L;
        BienComun bienComun = new BienComun();
        bienComun.setNombre("Bien 1");
        bienComun.setDescripcion("Descripción del bien");
        bienComun.setValor(100.0);
        bienComun.setEstado(EstadoBien.ACTIVO);

        // Simulamos un usuario válido
        Usuario usuario = new Usuario();
        usuario.setId(usuarioId);

        // Simulamos que el servicio de usuario devuelve el usuario correcto
        when(userService.obtenerUsuarioPorId(usuarioId)).thenReturn(usuario);
        // Simulamos que el servicio de BienComun guarda correctamente el bien
        when(bienComunService.registrarBien(any(BienComun.class))).thenReturn(bienComun);

        // Llamamos al método a probar
        ResponseEntity<BienComun> response = bienComunController.subirBien(bienComun, usuarioId);

        // Verificamos que la respuesta sea la esperada
        assertEquals(HttpStatus.OK, response.getStatusCode());  // Esperamos que sea OK
        assertNotNull(response.getBody());  // El cuerpo de la respuesta no debe ser null
        assertEquals("Bien 1", response.getBody().getNombre());  // Verificamos que el nombre del bien sea el correcto
    }
}
