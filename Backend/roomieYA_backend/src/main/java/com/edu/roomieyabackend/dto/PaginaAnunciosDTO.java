package com.edu.roomieyabackend.dto;

import lombok.Data;

import java.util.List;

@Data
public class PaginaAnunciosDTO {

    private List<ResumenAnuncioDTO> contenido;
    private int paginaActual;
    private int totalPaginas;
    private int totalElementos;

    public PaginaAnunciosDTO(List<ResumenAnuncioDTO> contenido, int paginaActual, int totalPaginas, int totalElementos) {
        this.contenido = contenido;
        this.paginaActual = paginaActual;
        this.totalPaginas = totalPaginas;
        this.totalElementos = totalElementos;
    }


}