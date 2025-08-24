# prueba-tecnica-DOUBLE-V-PARTNERS-NYX

## Requisitos

### Docker y Docker Compose instalados

### Node.js 22+ (solo si quieres reconstruir Angular fuera de Docker)

### Maven 3.8+ (solo si quieres reconstruir Spring Boot fuera de Docker)

## Estructura del proyecto

```bash

├── backend_2       # Proyecto Spring Boot
├── frontend_1      # Proyecto Angular
└── docker-compose.yml

```

## Ejecutar todo con Docker

1. Construir y levantar contenedores:
```bash
docker-compose up --build
```
2. Verificar contenedores activos:
```bash
docker ps
```
3. Acceso:
- **Frontend Angular:** [http://localhost:4200](http://localhost:4200)  
- **Backend Spring Boot / GraphQL:** [http://localhost:8080/graphql](http://localhost:8080/graphql)  
- **PostgreSQL:** puerto `5432`
4. Para detener todo:
docker-compose down

## Graphql

```graphql
query {
  getAllTickets(page: 0, size: 10) {
    id
    usuario
    fechaCreacion
    fechaActualizacion
    estatus
  }
}

query {
  getTicketById(id: 1) {
    id
    usuario
    fechaCreacion
    fechaActualizacion
    estatus
  }
}

mutation {
  createTicket(usuario: "Juan", estatus: ABIERTO) {
    id
    usuario
    fechaCreacion
    fechaActualizacion
    estatus
  }
}

mutation {
  updateTicket(id: 1, usuario: "Pedro", estatus: CERRADO) {
    id
    usuario
    fechaCreacion
    fechaActualizacion
    estatus
  }
}

mutation {
  deleteTicket(id: 1)
}

```