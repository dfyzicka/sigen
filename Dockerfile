FROM nginx:alpine

COPY . /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

# Устанавливаем права на файлы
RUN chmod -R 644 /usr/share/nginx/html/*

EXPOSE 80
