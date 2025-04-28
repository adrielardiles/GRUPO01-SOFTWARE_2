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





