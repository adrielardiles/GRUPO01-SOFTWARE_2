import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.edu.roomieyabackend.model.entities.BienComun;
import com.edu.roomieyabackend.model.Enums.EstadoBien;
import com.edu.roomieyabackend.model.entities.Usuario;
import com.edu.roomieyabackend.repository.BienComunRepository;
import com.edu.roomieyabackend.service.BienComunService;
import com.edu.roomieyabackend.service.UserService;
import com.edu.roomieyabackend.controller.BienComunController;

import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

public class BienComunControllerTest {

    private BienComunService bienComunService = mock(BienComunService.class);
    private UserService userService = mock(UserService.class);
    private BienComunRepository bienComunRepository = mock(BienComunRepository.class);
    private BienComunController bienComunController = new BienComunController();

    @Test
    void testEditarEstadoBien() {
        Long bienId = 1L;
        Map<String, String> estado = new HashMap<>();
        estado.put("estado", "ACTIVO"); // Estado válido

        // Caso 1: El bien existe y se actualiza correctamente
        BienComun bien = new BienComun();
        bien.setId(bienId);
        bien.setEstado(EstadoBien.INACTIVO);

        when(bienComunRepository.findById(bienId)).thenReturn(Optional.of(bien));  // Simulamos la existencia del bien

        ResponseEntity<BienComun> response = bienComunController.editarEstadoBien(bienId, estado);

        assertEquals(HttpStatus.OK, response.getStatusCode());  // Estado actualizado correctamente
        assertEquals(EstadoBien.ACTIVO, bien.getEstado());  // Verificar que el estado se actualizó a "ACTIVO"

        // Caso 2: El bien no existe
        when(bienComunRepository.findById(bienId)).thenReturn(Optional.empty());  // Simulamos que no existe el bien

        response = bienComunController.editarEstadoBien(bienId, estado);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());  // El bien no existe

        // Caso 3: El estado es inválido (manejamos IllegalArgumentException)
        estado.put("estado", "INEXISTENTE");  // Estado inválido

        response = bienComunController.editarEstadoBien(bienId, estado);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());  // Estado inválido
    }
}
