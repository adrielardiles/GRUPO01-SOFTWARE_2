package com.edu.roomieyabackend.controller;

import com.edu.roomieyabackend.model.entities.BienComun;
import com.edu.roomieyabackend.model.entities.Usuario;
import com.edu.roomieyabackend.service.BienComunService;
import com.edu.roomieyabackend.service.UserService;
import com.edu.roomieyabackend.repository.BienComunRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class BienComunControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Mock
    private BienComunService bienComunService;

    @Mock
    private UserService userService;

    @Mock
    private BienComunRepository bienComunRepository;

    @InjectMocks
    private BienComunController bienComunController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    // Test para subir un bien cuando el usuario no existe
    @Test
    void testSubirBien_UsuarioNoExistente() throws Exception {
        String requestBody = """
            {
                "nombre": "Bien de prueba",
                "descripcion": "Descripción del bien"
            }
        """;

        // Simulación de que el usuario no existe
        when(userService.obtenerUsuarioPorId(999L)).thenReturn(null);

        mockMvc.perform(post("/api/bienes/subir?usuarioId=999")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(status().isBadRequest())  // Esperamos un error por usuario no encontrado
                .andExpect(jsonPath("$.error").value("Usuario no encontrado"));
    }

    // Test para obtener los bienes de un usuario cuando el usuario no existe
    @Test
    void testObtenerMisBienes_UsuarioNoExistente() throws Exception {
        when(userService.obtenerUsuarioPorId(999L)).thenReturn(null);  // Usuario no encontrado

        mockMvc.perform(get("/api/bienes/mis-bienes?usuarioId=999"))
                .andExpect(status().isNotFound())  // Esperamos un 404 si el usuario no se encuentra
                .andExpect(jsonPath("$.error").value("Usuario no encontrado"));
    }

    // Test para editar el estado de un bien cuando el bien no existe
    @Test
    void testEditarEstadoBien_BienNoExistente() throws Exception {
        when(bienComunRepository.findById(999L)).thenReturn(java.util.Optional.empty());

        mockMvc.perform(put("/api/bienes/999")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"estado\":\"EN_USO\"}"))
                .andExpect(status().isNotFound())  // Esperamos un 404 si el bien no existe
                .andExpect(jsonPath("$.error").value("Bien no encontrado"));
    }

    // Test para editar el estado de un bien exitosamente
    @Test
    void testEditarEstadoBien() throws Exception {
        BienComun bienComun = new BienComun();
        bienComun.setId(1L);
        bienComun.setEstado(com.edu.roomieyabackend.model.Enums.EstadoBien.DISPONIBLE);

        when(bienComunRepository.findById(1L)).thenReturn(java.util.Optional.of(bienComun));

        mockMvc.perform(put("/api/bienes/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"estado\":\"EN_USO\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.estado").value("EN_USO"));
    }

    // Test para eliminar un bien cuando el bien no existe
    @Test
    void testEliminarBien_BienNoExistente() throws Exception {
        when(bienComunRepository.findById(999L)).thenReturn(java.util.Optional.empty());

        mockMvc.perform(delete("/api/bienes/999"))
                .andExpect(status().isNotFound())  // Esperamos un 404 si el bien no existe
                .andExpect(jsonPath("$.error").value("Bien no encontrado"));
    }

    // Test para eliminar un bien exitosamente
    @Test
    void testEliminarBien() throws Exception {
        BienComun bienComun = new BienComun();
        bienComun.setId(1L);
        bienComun.setNombre("Bien de prueba");

        when(bienComunRepository.findById(1L)).thenReturn(java.util.Optional.of(bienComun));

        mockMvc.perform(delete("/api/bienes/1"))
                .andExpect(status().isOk());
    }
}
