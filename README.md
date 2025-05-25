# COMO ABRIR FRONTEND
1. Open Project
2. Abrir la carpeta frontend
3. cd roomieya en la terminal
4. npm install
5. npm start



# COMO ABRIR BACKEND
1. Open project 
2. Abrir la carpeta de roomieya_backend
3. Esperar a que compile el codigo
4. Ejecutar con el boton de correr del ide o usando un comando de gradlew bootRun  
















# GRUPO 01-SOFTWARE_2

## 🧭 Convenciones de Commits del Equipo

Este repositorio sigue una convención estricta de mensajes de commit para asegurar claridad, trazabilidad y colaboración eficiente entre los miembros del equipo. Cada mensaje debe incluir dos componentes clave:

1. **Nivel de intención**: Define la visibilidad o necesidad de revisión del cambio.
2. **Tipo de cambio**: Describe la naturaleza del cambio aplicado al código o al proyecto.

---

### 📌 Niveles de intención

- **Ship**: Cambios menores y seguros que no requieren revisión ni discusión previa.
- **Show**: Cambios relevantes que deben ser visibles para el equipo, pero que no necesitan aprobación formal.
- **Ask**: Cambios complejos o críticos que requieren discusión y aprobación antes de fusionarse.

---

### 🔀 Tipos de cambio

- `feat`: Nueva funcionalidad o característica.
- `fix`: Corrección de errores o bugs.
- `docs`: Cambios en la documentación (README, guías, comentarios).
- `style`: Cambios puramente estéticos o de formato (indentación, punto y coma, etc.).
- `refactor`: Reestructuración del código sin cambio de funcionalidad.
- `test`: Añadir o modificar pruebas automatizadas.
- `chore`: Tareas menores que no afectan directamente el código de producción (actualización de dependencias, configuración, etc.).

---

### 🧱 Estructura del mensaje

```bash
<nivel>: <tipo>(<módulo>): <descripción clara y concisa>
```

### ✅ Ejemplos de uso

#### 🔹 Ship – Cambios menores y seguros

```bash
Ship: fix(ui): corregir desalineación en botones del menú
Ship: docs: actualizar README con instrucciones de instalación
Ship: style(login): corregir indentación y comillas simples
Ship: chore(linter): actualizar reglas de eslint
Ship: test(api): añadir pruebas unitarias a la validación de tokens
```

#### 🔸 Show – Cambios relevantes listos para integrar

```bash
Show: refactor(api): optimizar consultas a la base de datos
Show: fix(cart): solucionar cálculo incorrecto del total
Show: style(global): aplicar nuevo sistema de tipografía
Show: docs: agregar guía de despliegue en producción
Show: test(auth): reorganizar pruebas por módulo
```


#### ⚠️ Ask – Cambios críticos que requieren revisión formal

```bash
Ask: feat(auth): implementar inicio de sesión con Google
Ask: refactor(core): migrar a arquitectura basada en servicios
Ask: chore(ci): cambiar proveedor de integración continua a GitHub Actions
Ask: docs: reorganizar documentación en múltiples archivos
Ask: feat(payment): implementar lógica de reintento automático en fallos
```

# 📦 Instalación y ejecución del frontend

A continuación se detallan las instrucciones para clonar el repositorio, instalar las dependencias y ejecutar el proyecto localmente.

---

## 🚀 Pasos para la instalación

### 1. Clonar el repositorio

Abre una terminal y ejecuta el siguiente comando:

```bash
git clone https://github.com/adrielardiles/GRUPO01-SOFTWARE_2/edit/main/README.md
```

### 2. Acceder a la carpeta, abrirla en visual studio code y instalar dependencias

```bash
npm install
```


### 3. Ejecutar el proyecto en modo desarrollo

```bash
npm start
```


# 🚀 Instalación y ejecución del Backend (Spring Boot)

Este proyecto backend ha sido desarrollado utilizando **Spring Boot**.  
A continuación, se detallan los pasos necesarios para clonar el repositorio, configurar e iniciar la aplicación de forma local.

---

## 📥 Instrucciones de instalación

### 1. Clonar el repositorio

Abre una terminal y ejecuta:

```bash
git clone https://github.com/tu-usuario/tu-repositorio-backend.git
```

### 2. Importar el proyecto en su IDE de preferencia

Abre tu IDE e importar el proyecto de Spring Boot

### 3. Configurar la conexión a la base de datos

En application.properties, copiar y pegar este codigo:

```bash
spring.datasource.url=jdbc:postgresql://localhost:5432/nombre_de_tu_base
spring.datasource.username=tu_usuario
spring.datasource.password=tu_contraseña
spring.jpa.hibernate.ddl-auto=update
```

### 4. Instalar dependencias y construir el proyecto

```bash
./gradlew build
```


# Conectarse a la base de datos

Username: postgres
Password: software2

