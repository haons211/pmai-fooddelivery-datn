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

# Ứng dụng Food Delivery API với phân quyền người dùng

Ứng dụng Food Delivery API là một backend hoàn chỉnh cho ứng dụng giao đồ ăn với đầy đủ các chức năng quản lý nhà hàng, món ăn, danh mục và đơn hàng. Hệ thống được xây dựng với Node.js, Express và MongoDB, có tích hợp hệ thống xác thực JWT và phân quyền người dùng chi tiết.

## Mục lục

1. [Tính năng chính](#tính-năng-chính)
2. [Cài đặt và chạy ứng dụng](#cài-đặt-và-chạy-ứng-dụng)
3. [Hệ thống phân quyền](#hệ-thống-phân-quyền)
4. [Tài liệu API](#tài-liệu-api)
5. [Quy trình kiểm thử toàn diện](#quy-trình-kiểm-thử-toàn-diện)
6. [Xử lý lỗi phổ biến](#xử-lý-lỗi-phổ-biến)
7. [Bảo mật](#bảo-mật)

## Tính năng chính

- **Quản lý người dùng**: Đăng ký, đăng nhập, quản lý hồ sơ
- **Quản lý nhà hàng**: Tạo, xem, cập nhật và xóa nhà hàng
- **Quản lý danh mục**: Tổ chức món ăn theo danh mục
- **Quản lý món ăn**: Thêm, sửa, xóa món ăn của nhà hàng
- **Đặt hàng**: Đặt món, thanh toán và theo dõi trạng thái
- **Phân quyền người dùng**: Hệ thống phân quyền chi tiết với 4 vai trò
- **Tài liệu API**: Tài liệu Swagger đầy đủ và dễ sử dụng

## Cài đặt và chạy ứng dụng

### Yêu cầu hệ thống
- Node.js v14 trở lên
- MongoDB
- npm hoặc yarn

### Các bước cài đặt

1. Clone repository:
   ```bash
   git clone https://github.com/your-username/nodejs-resturant-food-app.git
   cd nodejs-resturant-food-app
   ```

2. Cài đặt các dependencies:
   ```bash
   npm install
   ```

3. Cấu hình biến môi trường:
   - Tạo file `.env` từ file `.env.example`
   - Điền các thông tin cần thiết: MongoDB URI, JWT secret, v.v.

4. Chạy ứng dụng:
   ```bash
   # Chế độ phát triển
   npm run dev
   
   # Chế độ sản xuất
   npm start
   ```

5. Truy cập Swagger UI:
   - Mở trình duyệt và truy cập: `http://localhost:3000/api-docs`

## Hệ thống phân quyền

Ứng dụng có 4 vai trò người dùng với các quyền hạn khác nhau:

1. **client (khách hàng)**:
   - Xem nhà hàng và món ăn
   - Đặt đơn hàng
   - Theo dõi trạng thái đơn hàng
   - Chỉ có thể hủy đơn hàng của mình, không thể thay đổi trạng thái khác

2. **vendor (chủ nhà hàng)**:
   - Tất cả quyền của khách hàng
   - Quản lý nhà hàng của mình
   - Thêm/sửa/xóa món ăn trong nhà hàng của mình
   - Cập nhật trạng thái đơn hàng từ nhà hàng của mình

3. **driver (tài xế)**:
   - Xem đơn hàng được giao
   - Cập nhật trạng thái giao hàng

4. **admin (quản trị viên)**:
   - Tất cả quyền trong hệ thống
   - Quản lý tất cả nhà hàng
   - Quản lý tất cả người dùng
   - Quản lý danh mục
   - Cập nhật trạng thái tất cả đơn hàng

## Tài liệu API

Ứng dụng được tích hợp Swagger UI cho phép bạn khám phá và kiểm thử các API một cách trực quan:

- `http://localhost:3000/api-docs`

Các nhóm API chính:
- **Auth API**: Đăng ký, đăng nhập
- **User API**: Quản lý thông tin người dùng
- **Restaurant API**: Quản lý nhà hàng
- **Category API**: Quản lý danh mục món ăn
- **Food API**: Quản lý món ăn
- **Order API**: Đặt hàng và cập nhật trạng thái

## Quy trình kiểm thử toàn diện

### 1. Kiểm thử xác thực và quản lý người dùng

#### 1.1 Đăng ký các loại tài khoản

1. **Đăng ký tài khoản khách hàng (client)**:
   ```
   POST /auth/register
   Body:
   {
     "userName": "TestClient",
     "email": "client@example.com",
     "password": "password123",
     "phone": "1234567890",
     "usertype": "clinet",
     "address": ["123 Client Street"],
     "answer": "Client Answer"
   }
   ```

2. **Đăng ký tài khoản vendor**:
   ```
   POST /auth/register
   Body:
   {
     "userName": "TestVendor",
     "email": "vendor@example.com",
     "password": "password123",
     "phone": "2345678901",
     "usertype": "vendor",
     "address": ["456 Vendor Street"],
     "answer": "Vendor Answer"
   }
   ```

3. **Đăng ký tài khoản admin**:
   ```
   POST /auth/register
   Body:
   {
     "userName": "TestAdmin",
     "email": "admin@example.com",
     "password": "password123",
     "phone": "3456789012",
     "usertype": "admin",
     "address": ["789 Admin Street"],
     "answer": "Admin Answer"
   }
   ```

4. **Đăng ký tài khoản driver**:
   ```
   POST /auth/register
   Body:
   {
     "userName": "TestDriver",
     "email": "driver@example.com",
     "password": "password123",
     "phone": "4567890123",
     "usertype": "driver",
     "address": ["101 Driver Street"],
     "answer": "Driver Answer"
   }
   ```

#### 1.2 Đăng nhập và lấy token

1. **Đăng nhập dưới vai trò admin**:
   ```
   POST /auth/login
   Body:
   {
     "email": "admin@example.com",
     "password": "password123"
   }
   ```
   - Lưu token JWT từ phản hồi (data.token)
   - Xác thực Swagger: Authorize > Bearer {token}

2. Tương tự, đăng nhập dưới các vai trò khác (vendor, client, driver) ở các bước sau

#### 1.3 Kiểm tra phân quyền người dùng

1. **Kiểm tra thông tin người dùng hiện tại**:
   ```
   GET /user/getUser
   ```

2. **Cập nhật thông tin người dùng**:
   ```
   PUT /user/updateUser
   Body:
   {
     "userName": "UpdatedName",
     "phone": "9876543210",
     "address": ["Updated Address"]
   }
   ```

3. **Kiểm tra quyền xóa tài khoản** (kiểm tra với nhiều vai trò):
   ```
   DELETE /user/deleteUser/{id}
   ```
   - Với admin: Có thể xóa bất kỳ tài khoản nào
   - Với user thường: Chỉ có thể xóa tài khoản của mình

### 2. Kiểm thử quản lý nhà hàng và danh mục

#### 2.1 Kiểm thử phân quyền tạo nhà hàng

1. **Đăng nhập với tài khoản admin**
2. **Tạo nhà hàng với tài khoản admin**:
   ```
   POST /restaurant/create
   Body:
   {
     "title": "Admin's Restaurant",
     "imageUrl": "https://example.com/restaurant1.jpg",
     "time": "9:00 AM - 10:00 PM",
     "pickup": true,
     "delivery": true,
     "isOpen": true,
     "logoUrl": "https://example.com/logo1.jpg",
     "rating": 4.5,
     "ratingCount": 100,
     "code": "REST-001",
     "coords": {
       "latitude": 37.7749,
       "longitude": -122.4194
     }
   }
   ```
   - Lưu `restaurantId` từ phản hồi

3. **Đăng nhập với tài khoản client**
4. **Thử tạo nhà hàng với tài khoản client** (kỳ vọng thất bại - 401):
   ```
   POST /restaurant/create
   Body: (tương tự như trên)
   ```

#### 2.2 Kiểm thử quản lý danh mục

1. **Đăng nhập với tài khoản admin**
2. **Tạo danh mục mới**:
   ```
   POST /category/create
   Body:
   {
     "title": "Italian Cuisine",
     "imageUrl": "https://example.com/italian.jpg"
   }
   ```
   - Lưu `categoryId` từ phản hồi

3. **Lấy danh sách danh mục**:
   ```
   GET /category/getAll
   ```

4. **Cập nhật danh mục**:
   ```
   PUT /category/update/{categoryId}
   Body:
   {
     "title": "Updated Italian Cuisine",
     "imageUrl": "https://example.com/updated-italian.jpg"
   }
   ```

5. **Đăng nhập với tài khoản client**
6. **Thử cập nhật danh mục với tài khoản client** (kỳ vọng thất bại - 401):
   ```
   PUT /category/update/{categoryId}
   Body: (tương tự như trên)
   ```

### 3. Kiểm thử quản lý món ăn

#### 3.1 Kiểm thử phân quyền tạo món ăn

1. **Đăng nhập với tài khoản vendor**
2. **Tạo nhà hàng mới cho vendor** (thông qua tài khoản admin):
   ```
   POST /restaurant/create
   Body:
   {
     "title": "Vendor's Restaurant",
     "imageUrl": "https://example.com/restaurant2.jpg",
     "time": "8:00 AM - 9:00 PM",
     "pickup": true,
     "delivery": true,
     "isOpen": true,
     "logoUrl": "https://example.com/logo2.jpg",
     "rating": 4.2,
     "ratingCount": 80,
     "code": "REST-002",
     "coords": {
       "latitude": 37.7848,
       "longitude": -122.4294
     },
     "user": "{vendorUserId}"
   }
   ```
   - Lưu `vendorRestaurantId` từ phản hồi

3. **Tạo món ăn cho nhà hàng của vendor**:
   ```
   POST /food/create
   Body:
   {
     "title": "Margherita Pizza",
     "description": "Classic Italian pizza with tomato, mozzarella, and basil",
     "price": 12.99,
     "imageUrl": "https://example.com/pizza.jpg",
     "foodTags": "Italian, Pizza",
     "category": "{categoryId}",
     "code": "FOOD-001",
     "isAvailable": true,
     "restaurant": "{vendorRestaurantId}",
     "rating": 4.7
   }
   ```
   - Lưu `foodId` từ phản hồi

4. **Đăng nhập với tài khoản client**
5. **Thử tạo món ăn với tài khoản client** (kỳ vọng thất bại - 401):
   ```
   POST /food/create
   Body: (tương tự như trên)
   ```

#### 3.2 Kiểm thử quyền cập nhật và xóa món ăn

1. **Đăng nhập với tài khoản vendor**
2. **Cập nhật món ăn cho nhà hàng của vendor**:
   ```
   PUT /food/update/{foodId}
   Body:
   {
     "title": "Updated Margherita Pizza",
     "description": "Updated description",
     "price": 14.99,
     "imageUrl": "https://example.com/updated-pizza.jpg",
     "foodTags": "Italian, Pizza, Premium",
     "category": "{categoryId}",
     "code": "FOOD-001-UP",
     "isAvailable": true,
     "restaurant": "{vendorRestaurantId}",
     "rating": 4.8
   }
   ```

3. **Đăng nhập với tài khoản vendor khác** (nếu có)
4. **Thử cập nhật món ăn của vendor khác** (kỳ vọng thất bại - 403):
   ```
   PUT /food/update/{foodId}
   Body: (tương tự như trên)
   ```

### 4. Kiểm thử đặt hàng và quản lý trạng thái

#### 4.1 Đặt hàng

1. **Đăng nhập với tài khoản client**
2. **Đặt hàng mới**:
   ```
   POST /food/place-order
   Body:
   {
     "cart": [
       {
         "food": "{foodId}",
         "price": 14.99
       }
     ]
   }
   ```
   - Lưu `orderId` từ phản hồi

#### 4.2 Kiểm thử quyền cập nhật trạng thái đơn hàng

1. **Đăng nhập với tài khoản client**
2. **Thử cập nhật trạng thái đơn hàng thành "preparing"** (kỳ vọng thất bại - 403):
   ```
   PUT /food/order-status/{orderId}
   Body:
   {
     "status": "preparing"
   }
   ```

3. **Thử hủy đơn hàng của mình** (kỳ vọng thành công):
   ```
   PUT /food/order-status/{orderId}
   Body:
   {
     "status": "cancelled"
   }
   ```

4. **Đặt lại một đơn hàng mới** (tương tự bước 4.1)

5. **Đăng nhập với tài khoản vendor** (chủ nhà hàng)
6. **Cập nhật trạng thái đơn hàng** (kỳ vọng thành công):
   ```
   PUT /food/order-status/{orderId}
   Body:
   {
     "status": "preparing"
   }
   ```

7. **Đăng nhập với tài khoản admin**
8. **Cập nhật trạng thái đơn hàng** (kỳ vọng thành công):
   ```
   PUT /food/order-status/{orderId}
   Body:
   {
     "status": "ready"
   }
   ```

### 5. Kiểm thử xóa dữ liệu

#### 5.1 Kiểm thử quyền xóa nhà hàng

1. **Đăng nhập với tài khoản client**
2. **Thử xóa nhà hàng** (kỳ vọng thất bại - 403):
   ```
   DELETE /restaurant/delete/{restaurantId}
   ```

3. **Đăng nhập với tài khoản vendor** (chủ nhà hàng)
4. **Xóa nhà hàng của mình** (kỳ vọng thành công):
   ```
   DELETE /restaurant/delete/{vendorRestaurantId}
   ```

5. **Đăng nhập với tài khoản admin**
6. **Xóa nhà hàng khác** (kỳ vọng thành công):
   ```
   DELETE /restaurant/delete/{restaurantId}
   ```

#### 5.2 Kiểm thử quyền xóa danh mục

1. **Đăng nhập với tài khoản client**
2. **Thử xóa danh mục** (kỳ vọng thất bại - 401):
   ```
   DELETE /category/delete/{categoryId}
   ```

3. **Đăng nhập với tài khoản admin**
4. **Xóa danh mục** (kỳ vọng thành công):
   ```
   DELETE /category/delete/{categoryId}
   ```

## Xử lý lỗi phổ biến

| Mã lỗi | Lý do                           | Giải pháp                                          |
|--------|--------------------------------|---------------------------------------------------|
| 400    | Dữ liệu đầu vào không hợp lệ   | Kiểm tra và cung cấp đủ các trường bắt buộc        |
| 401    | Chưa đăng nhập                 | Kiểm tra token JWT, đăng nhập lại nếu cần          |
| 403    | Không có quyền truy cập        | Kiểm tra vai trò của người dùng hiện tại           |
| 404    | Không tìm thấy tài nguyên      | Kiểm tra lại ID hoặc đường dẫn                     |
| 500    | Lỗi server                     | Kiểm tra logs, liên hệ quản trị viên               |

## Bảo mật

Ứng dụng được triển khai với nhiều lớp bảo mật:

1. **Xác thực JWT**: Tất cả các request đến API cần quyền truy cập đều yêu cầu token JWT hợp lệ
2. **Mã hóa mật khẩu**: Mật khẩu được mã hóa bằng bcrypt trước khi lưu vào cơ sở dữ liệu
3. **Phân quyền**: Kiểm tra phân quyền chi tiết ở cả API route và controller
4. **Kiểm tra chủ sở hữu**: Đảm bảo người dùng chỉ có thể truy cập và chỉnh sửa dữ liệu của mình
5. **Validation**: Kiểm tra đầu vào cho tất cả các request để ngăn chặn các cuộc tấn công tiêm nhiễm

---

Đây là một quy trình kiểm thử toàn diện giúp xác minh tính năng phân quyền và bảo mật của ứng dụng Food Delivery API. Quy trình này kiểm tra tất cả các chức năng chính và đảm bảo rằng mỗi vai trò người dùng chỉ có thể thực hiện các hành động trong phạm vi quyền hạn của họ. 