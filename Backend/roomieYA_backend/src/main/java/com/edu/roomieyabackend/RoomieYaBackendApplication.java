package com.edu.roomieyabackend;

import com.edu.roomieyabackend.model.EjemploEntity;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import com.edu.roomieyabackend.repository.EjemploRepository;
import org.springframework.scheduling.annotation.EnableScheduling;


@SpringBootApplication
@EnableScheduling
public class RoomieYaBackendApplication {



	@Bean
	public CommandLineRunner probarConexion(EjemploRepository ejemploRepository) {
		return args -> {
			// Crear entidad de prueba
			EjemploEntity registro = new EjemploEntity(
					"Conexión OK",
					"Esto verifica que JPA puede insertar datos correctamente.",
					true
			);

			// Guardar en base de datos
			ejemploRepository.save(registro);

			// Mostrar todos los registros
			ejemploRepository.findAll().forEach(System.out::println);
		};
	}
	public static void main(String[] args) {
		SpringApplication.run(RoomieYaBackendApplication.class, args);
	}

}
