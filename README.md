
## 🚀 Сборка Docker-образа




```bash
docker build -t signature-gen .
```

- `-t signature-gen` — задаёт имя образа.
- `.` — текущая директория, в которой лежит `Dockerfile`.

---

## ▶️ Запуск контейнера

```bash
docker run -d -p 8080:80 --name signature-container --restart always signature-gen
```

- `-d` — запускаем в фоновом режиме (detached).
- `-p 8080:80` — пробрасываем порт 80 внутри контейнера на порт 8080 хоста.
- `--name signature-container` — имя контейнера.
- `--restart always` — контейнер будет перезапускаться при сбоях и перезагрузке хоста.
- `signature-gen` — имя ранее собранного образа.

---

## 🛑 Остановка контейнера

```bash
docker stop signature-container
```

## ❌ Удаление контейнера

```bash
docker rm signature-container
```
```

