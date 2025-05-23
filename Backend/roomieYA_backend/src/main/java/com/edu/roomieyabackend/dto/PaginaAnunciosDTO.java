package com.edu.roomieyabackend.dto;

import java.util.List;

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

    public List<ResumenAnuncioDTO> getContenido() {
        return contenido;
    }

    public void setContenido(List<ResumenAnuncioDTO> contenido) {
        this.contenido = contenido;
    }

    public int getPaginaActual() {
        return paginaActual;
    }

    public void setPaginaActual(int paginaActual) {
        this.paginaActual = paginaActual;
    }

    public int getTotalPaginas() {
        return totalPaginas;
    }

    public void setTotalPaginas(int totalPaginas) {
        this.totalPaginas = totalPaginas;
    }

    public int getTotalElementos() {
        return totalElementos;
    }

    public void setTotalElementos(int totalElementos) {
        this.totalElementos = totalElementos;
    }
}