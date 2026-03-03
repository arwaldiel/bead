# Asset Management Application – User Guide

## 1. Indítás Dockerrel

```bash
docker compose up --build

2. Funkciók
Asset lista
Pagination
Keresés serial alapján
Törlés
Új eszköz
SerialNumber (kötelező)
Site (kötelező)
Type (kötelező)
Manufacturer (opcionális)
Note (opcionális)

Szerkesztés
Lista → Szerkesztés → Mentés

3. Backend API

Swagger:
http://localhost:8080/swagger

CRUD:
GET /api/assets
POST /api/assets
PUT /api/assets/{id}
DELETE /api/assets/{id}