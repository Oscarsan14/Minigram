# Minigram

Minigram es una aplicación web que simula una red social, desarrollada en diferentes fases para trabajar distintos tipos de arquitecturas.

## Fases del proyecto

- **Fase 1:** Arquitectura monolítica con Node.js, Express y SQLite.
- **Fase 2:** Arquitectura con Node.js, Express y PostgreSQL.
- **Fase 3:** Separación del frontend y el backend, utilizando Angular, Express y PostgreSQL.

## Funcionalidades

- Registro e inicio de sesión.
- Creación y eliminación de publicaciones.
- Visualización de publicaciones.
- Comentarios.
- Likes.

## Ejecución

Para ejecutar cualquiera de las fases, hay que clonar el repositorio, entrar en la carpeta correspondiente y ejecutar:

```bash
docker compose build
docker compose up -d
```

Cada fase dispone de su propio archivo `docker-compose.yml` para ejecutarse de forma independiente.

Para detener los contenedores:

```bash
docker compose down
```


docker compose down; docker compose build --no-cache; docker compose up -d