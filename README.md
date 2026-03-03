# Bead – Asset Management (Frontend + Backend + CI)

Egyszerű eszköz (Asset) nyilvántartó alkalmazás, két komponenssel:
- **Frontend:** Angular (Material UI)
- **Backend:** ASP.NET Web API + MongoDB
- **Konténerizálás:** Docker + Docker Compose
- **CI:** GitHub Actions → Docker image build + push **GHCR** (ghcr.io)

## Funkciók
- Asset lista megjelenítése **lapozással** (pagination)
- Keresés serial number alapján
- Új Asset létrehozása
- Asset szerkesztése
- Asset törlése
- Backend API Swagger UI

## Domain modell (Asset)
- `id`
- `serialNumber` (kötelező)
- `site` (kötelező)
- `type` (kötelező)
- `manufacturer` (opcionális)
- `note` (opcionális)
- `createdAt`, `updatedAt`

## Futtatás Dockerrel (ajánlott)
A repo gyökerében:

```bash
docker compose up --build
