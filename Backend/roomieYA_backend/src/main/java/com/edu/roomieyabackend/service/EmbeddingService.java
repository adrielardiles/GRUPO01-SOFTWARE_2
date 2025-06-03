package com.edu.roomieyabackend.service;

import com.edu.roomieyabackend.dto.Searching.InmuebleSimilitudDTO;
import com.edu.roomieyabackend.model.entities.Inmueble;
import com.edu.roomieyabackend.repository.InmuebleRepository;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class EmbeddingService {

    private static final String SIMILITUD_URL = "http://localhost:8002/buscar";
    private final InmuebleRepository inmuebleRepository;

    public EmbeddingService(InmuebleRepository inmuebleRepository) {
        this.inmuebleRepository = inmuebleRepository;
    }

    public InmuebleSimilitudDTO buscarMejorMatch(String textoUsuario) {
        List<Inmueble> inmuebles = inmuebleRepository.findAll();

        List<Map<String, Object>> inmueblesSimple = inmuebles.stream()
                .map(this::convertirInmuebleCompleto)
                .collect(Collectors.toList());

        Map<String, Object> requestPayload = Map.of(
                "texto_usuario", textoUsuario,
                "inmuebles", inmueblesSimple
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestPayload, headers);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Map> response = restTemplate.exchange(SIMILITUD_URL + "/mejor", HttpMethod.POST, request, Map.class);
        Map<String, Object> body = response.getBody();

        if (body == null || !body.containsKey("id")) return null;

        Long id = ((Number) body.get("id")).longValue();
        Optional<Inmueble> opt = inmuebleRepository.findById(id);
        if (opt.isEmpty()) return null;

        Inmueble inmueble = opt.get();
        InmuebleSimilitudDTO dto = mapToDTO(inmueble);

        Map<String, Object> explicacion = (Map<String, Object>) body.get("explicacion");
        if (explicacion != null) {
            dto.setTipo((Boolean) explicacion.getOrDefault("tipo", false));
            dto.setPrecioE((Boolean) explicacion.getOrDefault("precio", false));
            dto.setUbicacionExacta((Boolean) explicacion.getOrDefault("ubicacion_exacta", false));
            dto.setUbicacionCercana((Boolean) explicacion.getOrDefault("ubicacion_cercana", false));

            List<String> serviciosCoincidentes = ((List<?>) explicacion.getOrDefault("servicios", List.of()))
                    .stream().map(Object::toString).collect(Collectors.toList());
            dto.setServiciosCoincidentes(serviciosCoincidentes);
        }

        return dto;
    }

    public List<InmuebleSimilitudDTO> buscarSimilaresAvanzado(String textoUsuario, int page, int size) {
        List<Inmueble> inmuebles = inmuebleRepository.findAll();

        List<Map<String, Object>> inmueblesSimple = inmuebles.stream()
                .map(this::convertirInmuebleCompleto)
                .collect(Collectors.toList());

        Map<String, Object> requestPayload = Map.of(
                "texto_usuario", textoUsuario,
                "inmuebles", inmueblesSimple
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestPayload, headers);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<List> response = restTemplate.exchange(SIMILITUD_URL, HttpMethod.POST, request, List.class);
        List<Map<String, Object>> body = response.getBody();

        if (body == null) return Collections.emptyList();

        List<InmuebleSimilitudDTO> resultado = new ArrayList<>();
        for (Map<String, Object> item : body) {
            Long id = ((Number) item.get("id")).longValue();
            Optional<Inmueble> opt = inmuebleRepository.findById(id);
            if (opt.isEmpty()) continue;

            Inmueble inmueble = opt.get();
            InmuebleSimilitudDTO dto = mapToDTO(inmueble);

            Map<String, Object> explicacion = (Map<String, Object>) item.get("explicacion");
            if (explicacion != null) {
                dto.setTipo((Boolean) explicacion.getOrDefault("tipo", false));
                dto.setPrecioE((Boolean) explicacion.getOrDefault("precio", false));
                dto.setUbicacionExacta((Boolean) explicacion.getOrDefault("ubicacion_exacta", false));
                dto.setUbicacionCercana((Boolean) explicacion.getOrDefault("ubicacion_cercana", false));

                List<String> serviciosCoincidentes = ((List<?>) explicacion.getOrDefault("servicios", List.of()))
                        .stream().map(Object::toString).collect(Collectors.toList());
                dto.setServiciosCoincidentes(serviciosCoincidentes);
            }

            resultado.add(dto);
        }

        // Ordenar por puntaje antes de paginar
        resultado.sort(Comparator.comparingInt(this::calcularPuntaje).reversed());

        int from = Math.min(page * size, resultado.size());
        int to = Math.min(from + size, resultado.size());
        return resultado.subList(from, to);
    }

    private int calcularPuntaje(InmuebleSimilitudDTO dto) {
        int score = 0;
        if (Boolean.TRUE.equals(dto.getTipo())) score += 2;
        if (Boolean.TRUE.equals(dto.getPrecioE())) score += 3;
        if (Boolean.TRUE.equals(dto.getUbicacionExacta())) score += 3;
        if (Boolean.TRUE.equals(dto.getUbicacionCercana())) score += 2;
        if (dto.getServiciosCoincidentes() != null) score += dto.getServiciosCoincidentes().size();
        return score;
    }

    private InmuebleSimilitudDTO mapToDTO(Inmueble inmueble) {
        InmuebleSimilitudDTO dto = new InmuebleSimilitudDTO();
        dto.setId(inmueble.getId());
        dto.setNombre(inmueble.getNombre());
        dto.setDireccion(inmueble.getDireccion());
        dto.setTipoInmueble(inmueble.getTipo());
        dto.setTamano(inmueble.getTamano());
        dto.setPrecio(inmueble.getPrecio());
        dto.setServicios(inmueble.getServicios());
        dto.setDescripcion(inmueble.getDescripcion());
        dto.setImagenUrl(inmueble.getImagenurl());
        dto.setLatitud(inmueble.getLatitud());
        dto.setLongitud(inmueble.getLongitud());
        return dto;
    }

    private Map<String, Object> convertirInmuebleCompleto(Inmueble inmueble) {
        Map<String, Object> m = new HashMap<>();
        m.put("id", inmueble.getId());
        m.put("nombre", inmueble.getNombre());
        m.put("direccion", inmueble.getDireccion());
        m.put("tipo", inmueble.getTipo());
        m.put("tamano", inmueble.getTamano());
        m.put("precio", inmueble.getPrecio());
        m.put("servicios", inmueble.getServicios());
        m.put("latitud", inmueble.getLatitud());
        m.put("longitud", inmueble.getLongitud());
        m.put("descripcion", inmueble.getDescripcion());
        m.put("fechaCreacion", inmueble.getFechaCreacion());
        m.put("embeddingJson", inmueble.getEmbeddingJson());
        m.put("imagenurl", inmueble.getImagenurl());
        return m;
    }
}
