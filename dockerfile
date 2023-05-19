# Sử dụng base image Nginx
FROM nginx:1.21.0-alpine

# Sao chép file report vào thư mục root của Nginx
COPY mochawesome-report /usr/share/nginx/html

# Cấu hình Nginx để phục vụ file report
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose cổng mà bạn muốn chạy ứng dụng
EXPOSE 80

# Khởi động Nginx khi container được chạy
CMD ["nginx", "-g", "daemon off;"]