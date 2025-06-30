package com.edu.roomieyabackend.dto;

import com.edu.roomieyabackend.model.Enums.TipoAnuncio;
import lombok.Data;

import java.time.LocalDateTime;

import jakarta.validation.constraints.*;

@Data
public class CrearAnuncioRequestDTO {

    @NotNull(message = "El id del creador es obligatorio")
    private Long creadorId;

    @NotNull(message = "El id del inmueble es obligatorio")
    private Long inmuebleId;

    @NotBlank(message = "El título es obligatorio")
    @Size(max = 255, message = "El título no puede superar 255 caracteres")
    private String titulo;

    @NotBlank(message = "La descripción es obligatoria")
    private String descripcion;

    @NotNull(message = "El tipo de anuncio es obligatorio")
    private TipoAnuncio tipo;

    @Future(message = "La fecha programada debe ser futura")
    private LocalDateTime fechaProgramada;
}
