

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