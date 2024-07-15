FROM nginx:alpine

# Укажите рабочий каталог
WORKDIR /usr/share/nginx/html

# Удалите существующие файлы, если они есть
RUN rm -rf ./*

# Скопируйте все файлы из текущего контекста в рабочий каталог
COPY . .

# Экспонируйте порт 80
EXPOSE 80

# Запустите Nginx
CMD ["nginx", "-g", "daemon off;"]