# Базовый образ с Nginx
FROM nginx:alpine

# Копируем все файлы проекта в папку Nginx
COPY . /usr/share/nginx/html

# Копируем пользовательскую конфигурацию Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Открываем порт 80
EXPOSE 80
