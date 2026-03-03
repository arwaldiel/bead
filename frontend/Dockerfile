FROM node:20 AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM nginx:alpine
# 1) másoljuk a browser buildet
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html
# 2) CSR index átnevezése index.html-re (különben nginx nem találja)
RUN if [ -f /usr/share/nginx/html/index.csr.html ]; then mv /usr/share/nginx/html/index.csr.html /usr/share/nginx/html/index.html; fi
# 3) nginx config (api proxy + SPA fallback)
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80