# Используем официальный образ Nginx
FROM nginx:alpine

# Копируем все файлы проекта в директорию Nginx
COPY . /usr/share/nginx/html

# Указываем рабочую директорию
WORKDIR /usr/share/nginx/html

# Открываем порт 80
EXPOSE 80

# Команда для запуска Nginx в foreground режиме
CMD ["nginx", "-g", "daemon off;"]
