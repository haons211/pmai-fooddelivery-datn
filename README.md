# Hướng dẫn sử dụng Swagger cho Food Delivery API

Tài liệu này cung cấp hướng dẫn chi tiết về cách sử dụng Swagger UI để kiểm thử các API trong dự án Food Delivery. Swagger UI cung cấp giao diện trực quan để bạn có thể tìm hiểu và kiểm thử các API mà không cần sử dụng các công cụ bên ngoài như Postman.

## Mục lục

1. [Giới thiệu](#1-giới-thiệu)
2. [Truy cập Swagger UI](#2-truy-cập-swagger-ui)
3. [Cấu trúc Swagger UI](#3-cấu-trúc-swagger-ui)
4. [Xác thực (Authentication)](#4-xác-thực-authentication)
5. [Chi tiết API](#5-chi-tiết-api)
6. [Flow kiểm thử đầy đủ](#6-flow-kiểm-thử-đầy-đủ)
7. [Các lỗi thường gặp](#7-các-lỗi-thường-gặp)
8. [Mẹo và công cụ bổ sung](#8-mẹo-và-công-cụ-bổ-sung)

## 1. Giới thiệu

Dự án Food Delivery API được phát triển với các endpoints sau:
- **Auth API**: Đăng ký, đăng nhập và xác thực người dùng
- **User API**: Quản lý thông tin người dùng
- **Restaurant API**: Quản lý nhà hàng
- **Category API**: Quản lý danh mục thực phẩm
- **Food API**: Quản lý danh sách món ăn
- **Order API**: Quản lý đơn đặt hàng

Swagger UI giúp bạn tương tác với các API này một cách trực quan và dễ dàng.

## 2. Truy cập Swagger UI

### Khởi động server

1. Mở terminal tại thư mục gốc của dự án
2. Chạy lệnh sau để cài đặt các gói phụ thuộc (nếu chưa cài đặt):
   ```
   npm install
   ```
3. Khởi động server:
   ```
   npm start
   ```
   hoặc với chế độ phát triển:
   ```
   npm run dev
   ```
4. Server sẽ khởi chạy tại cổng 3000 (hoặc cổng được cấu hình trong file .env)

### Truy cập Swagger UI

- Mở trình duyệt và truy cập địa chỉ: `http://localhost:3000/api-docs`
- Swagger UI sẽ hiển thị tài liệu API đầy đủ của dự án

## 3. Cấu trúc Swagger UI

Swagger UI được tổ chức thành các phần:

- **Tags**: API được nhóm thành các danh mục (Users, Restaurants, Foods, Categories, Orders)
- **Endpoints**: Danh sách các endpoint và phương thức HTTP (GET, POST, PUT, DELETE)
- **Schemas**: Cấu trúc dữ liệu của các đối tượng (User, Restaurant, Food, Category, Order)
- **Responses**: Định dạng phản hồi từ API bao gồm các trạng thái thành công và lỗi

## 4. Xác thực (Authentication)

Nhiều API trong dự án yêu cầu xác thực người dùng. Dưới đây là cách xác thực qua Swagger UI:

1. **Đăng ký tài khoản mới**:
   - Mở endpoint `POST /auth/register`
   - Nhập thông tin đăng ký trong Request Body:
     ```json
     {
       "userName": "testuser",
       "email": "testuser@example.com",
       "password": "password123",
       "phone": "1234567890",
       "address": "123 Test Street",
       "answer": "Test answer"
     }
     ```
   - Bấm "Execute" để tạo tài khoản

2. **Đăng nhập và lấy token**:
   - Mở endpoint `POST /auth/login`
   - Nhập thông tin đăng nhập:
     ```json
     {
       "email": "testuser@example.com",
       "password": "password123"
     }
     ```
   - Bấm "Execute" để đăng nhập
   - Sao chép token JWT từ phản hồi (trường `data.token`)

3. **Sử dụng token để xác thực**:
   - Bấm vào nút "Authorize" ở đầu trang
   - Trong hộp thoại, nhập token theo định dạng: `Bearer YOUR_TOKEN`
   - Bấm "Authorize" và đóng hộp thoại
   - Bây giờ bạn đã được xác thực để sử dụng các API cần quyền truy cập

## 5. Chi tiết API

### Auth API

- **POST /auth/register**: Đăng ký tài khoản mới
- **POST /auth/login**: Đăng nhập và nhận token JWT

### User API

- **GET /user/profile**: Xem thông tin cá nhân
- **PUT /user/profile**: Cập nhật thông tin cá nhân
- **PUT /user/password**: Cập nhật mật khẩu
- **POST /user/forgot-password**: Yêu cầu đặt lại mật khẩu
- **DELETE /user/delete**: Xóa tài khoản

### Restaurant API

- **POST /restaurant/create**: Tạo nhà hàng mới (yêu cầu xác thực)
- **GET /restaurant/get-all**: Lấy danh sách tất cả nhà hàng
- **GET /restaurant/get/{id}**: Lấy thông tin chi tiết nhà hàng theo ID
- **DELETE /restaurant/delete/{id}**: Xóa nhà hàng (yêu cầu xác thực)

### Category API

- **POST /category/create**: Tạo danh mục mới (yêu cầu xác thực)
- **GET /category/getAll**: Lấy tất cả danh mục
- **PUT /category/update/{id}**: Cập nhật danh mục (yêu cầu xác thực)
- **DELETE /category/delete/{id}**: Xóa danh mục (yêu cầu xác thực)

### Food API

- **POST /food/create**: Tạo món ăn mới (yêu cầu xác thực)
- **GET /food/get-all**: Lấy tất cả món ăn
- **GET /food/get/{id}**: Lấy thông tin chi tiết món ăn theo ID
- **GET /food/get-by-restaurant/{id}**: Lấy các món ăn theo nhà hàng
- **PUT /food/update/{id}**: Cập nhật món ăn (yêu cầu xác thực)
- **DELETE /food/delete/{id}**: Xóa món ăn (yêu cầu xác thực)

### Order API

- **POST /food/place-order**: Đặt đơn hàng mới (yêu cầu xác thực)
- **PUT /food/order-status/{orderId}**: Cập nhật trạng thái đơn hàng (yêu cầu xác thực)

## 6. Flow kiểm thử đầy đủ

Dưới đây là quy trình kiểm thử đầy đủ từ đăng ký tài khoản đến hoàn tất đơn hàng:

### Bước 1: Đăng ký & Đăng nhập

1. **Đăng ký tài khoản**:
   - Sử dụng endpoint `POST /auth/register`
   - Nhập thông tin hợp lệ
   - Lưu email và mật khẩu để đăng nhập

2. **Đăng nhập**:
   - Sử dụng endpoint `POST /auth/login`
   - Nhập email và mật khẩu đã đăng ký
   - Sao chép token JWT từ phản hồi
   - Xác thực bằng cách nhấp vào nút "Authorize" và nhập token theo định dạng `Bearer YOUR_TOKEN`

### Bước 2: Quản lý nhà hàng

3. **Tạo nhà hàng mới**:
   - Sử dụng endpoint `POST /restaurant/create`
   - Nhập thông tin nhà hàng:
     ```json
     {
       "title": "Italian Restaurant",
       "imageUrl": "https://example.com/images/italian.jpg",
       "time": "9:00 AM - 10:00 PM",
       "coords": {
         "latitude": 37.7749,
         "longitude": -122.4194,
         "address": "123 Main St",
         "title": "Italian Restaurant Location"
       }
     }
     ```
   - Lưu ID nhà hàng từ phản hồi (`data.restaurant._id`)

4. **Xem danh sách nhà hàng**:
   - Sử dụng endpoint `GET /restaurant/get-all`
   - Xác nhận nhà hàng của bạn xuất hiện trong danh sách

### Bước 3: Quản lý danh mục

5. **Tạo danh mục**:
   - Sử dụng endpoint `POST /category/create`
   - Nhập thông tin danh mục:
     ```json
     {
       "title": "Italian Food",
       "imageUrl": "https://example.com/images/italian-category.jpg"
     }
     ```
   - Lưu ID danh mục từ phản hồi (`data.category._id`)

6. **Xem danh sách danh mục**:
   - Sử dụng endpoint `GET /category/getAll`
   - Xác nhận danh mục của bạn xuất hiện trong danh sách

### Bước 4: Quản lý món ăn

7. **Tạo món ăn mới**:
   - Sử dụng endpoint `POST /food/create`
   - Nhập thông tin món ăn (đảm bảo sử dụng ID nhà hàng và danh mục đã tạo trước đó):
     ```json
     {
       "title": "Margherita Pizza",
       "description": "Classic pizza with tomato sauce and mozzarella",
       "price": 9.99,
       "imageUrl": "https://example.com/images/pizza.jpg",
       "foodTags": "Italian, Pizza",
       "category": "YOUR_CATEGORY_ID",
       "code": "PIZZA-01",
       "restaurant": "YOUR_RESTAURANT_ID"
     }
     ```
   - Lưu ID món ăn từ phản hồi (`data.food._id`)

8. **Xem danh sách món ăn**:
   - Sử dụng endpoint `GET /food/get-all`
   - Xác nhận món ăn của bạn xuất hiện trong danh sách

9. **Xem món ăn theo nhà hàng**:
   - Sử dụng endpoint `GET /food/get-by-restaurant/{id}` với ID nhà hàng của bạn
   - Xác nhận món ăn của bạn xuất hiện trong danh sách

### Bước 5: Đặt hàng và theo dõi

10. **Đặt món ăn**:
    - Sử dụng endpoint `POST /food/place-order`
    - Nhập thông tin đơn hàng:
      ```json
      {
        "cart": [
          {
            "food": "YOUR_FOOD_ID",
            "price": 9.99
          }
        ],
        "id": "YOUR_USER_ID"  // ID người dùng của bạn từ token
      }
      ```
    - Lưu ID đơn hàng từ phản hồi (`data.order._id`)

11. **Cập nhật trạng thái đơn hàng** (giả sử bạn là quản trị viên hoặc nhà hàng):
    - Sử dụng endpoint `PUT /food/order-status/{orderId}` với ID đơn hàng của bạn
    - Cập nhật trạng thái:
      ```json
      {
        "status": "on the way"
      }
      ```
    - Xác nhận trạng thái đã cập nhật trong phản hồi

## 7. Các lỗi thường gặp

### Lỗi 401 Unauthorized
- **Nguyên nhân**: Token JWT không hợp lệ, hết hạn hoặc không được cung cấp
- **Giải pháp**: Đăng nhập lại để lấy token mới và đảm bảo đã xác thực đúng cách

### Lỗi 400 Bad Request
- **Nguyên nhân**: Thiếu trường bắt buộc hoặc định dạng dữ liệu không hợp lệ
- **Giải pháp**: Kiểm tra lại request body và đảm bảo các trường bắt buộc được cung cấp

### Lỗi 404 Not Found
- **Nguyên nhân**: Không tìm thấy tài nguyên (nhà hàng, món ăn, danh mục...)
- **Giải pháp**: Kiểm tra lại ID của tài nguyên

### Lỗi 500 Internal Server Error
- **Nguyên nhân**: Lỗi phía server
- **Giải pháp**: Kiểm tra logs server để có thêm thông tin chi tiết

## 8. Mẹo và công cụ bổ sung

### Gỡ lỗi trong Swagger UI
- Sử dụng tab "Curl" trong phản hồi để xem cú pháp cURL tương ứng
- Kiểm tra tab "Response Headers" để xem các header trong phản hồi
- Sử dụng tab "Response Body" để xem JSON đầy đủ

### Sử dụng Schemas
- Xem phần "Schemas" ở cuối trang để hiểu cấu trúc dữ liệu
- Schemas cung cấp thông tin chi tiết về các trường, kiểu dữ liệu và mô tả

### Mẹo tăng hiệu suất kiểm thử
- Luôn lưu lại ID của các tài nguyên đã tạo để sử dụng cho các bước tiếp theo
- Mở nhiều tab Swagger UI nếu cần để dễ dàng so sánh kết quả
- Sử dụng chế độ "Try it out" để kiểm thử API với dữ liệu thực

---

Hướng dẫn này cung cấp một flow đầy đủ để kiểm thử tất cả các chức năng của Food Delivery API. Nếu bạn gặp bất kỳ vấn đề nào, vui lòng tham khảo phần "Các lỗi thường gặp" hoặc liên hệ với team phát triển để được hỗ trợ. 