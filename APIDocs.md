# Food App API Documentation

## Base URL
```
http://localhost:3000/api/v1
```

## Authentication
### Register
```http
POST /auth/register
```
**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "phone": "string",
  "address": "string"
}
```

### Login
```http
POST /auth/login
```
**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```
**Response:**
```json
{
  "success": true,
  "token": "JWT_TOKEN",
  "user": {
    "id": "string",
    "name": "string",
    "email": "string",
    "role": "string"
  }
}
```

## Restaurant Management
### Create Restaurant
```http
POST /resturant/create
```
**Headers:**
```
Authorization: Bearer JWT_TOKEN
```
**Request Body:**
```json
{
  "name": "string",
  "description": "string",
  "address": "string",
  "phone": "string",
  "timing": "string"
}
```

### Get All Restaurants
```http
GET /resturant/getAll
```

### Get Single Restaurant
```http
GET /resturant/get/:id
```

### Update Restaurant
```http
PUT /resturant/update/:id
```
**Headers:**
```
Authorization: Bearer JWT_TOKEN
```

### Delete Restaurant
```http
DELETE /resturant/delete/:id
```
**Headers:**
```
Authorization: Bearer JWT_TOKEN
```

## Food Management
### Create Food Item
```http
POST /food/create
```
**Headers:**
```
Authorization: Bearer JWT_TOKEN
```
**Request Body:**
```json
{
  "title": "string",
  "description": "string",
  "price": "number",
  "category": "string",
  "restaurant": "string",
  "image": "string"
}
```

### Get All Foods
```http
GET /food/getAll
```

### Get Single Food
```http
GET /food/get/:id
```

### Get Foods by Restaurant
```http
GET /food/getByResturant/:id
```

### Update Food
```http
PUT /food/update/:id
```
**Headers:**
```
Authorization: Bearer JWT_TOKEN
```

### Delete Food
```http
DELETE /food/delete/:id
```
**Headers:**
```
Authorization: Bearer JWT_TOKEN
```

### Place Order
```http
POST /food/placeorder
```
**Headers:**
```
Authorization: Bearer JWT_TOKEN
```
**Request Body:**
```json
{
  "items": [
    {
      "food": "string (food_id)",
      "quantity": "number"
    }
  ],
  "payment_method": "string",
  "delivery_address": "string"
}
```

### Update Order Status
```http
POST /food/orderStatus/:id
```
**Headers:**
```
Authorization: Bearer JWT_TOKEN
Admin-Role Required
```
**Request Body:**
```json
{
  "status": "string (pending/confirmed/preparing/on_the_way/delivered)"
}
```

## Category Management
### Create Category
```http
POST /category/create
```
**Headers:**
```
Authorization: Bearer JWT_TOKEN
```
**Request Body:**
```json
{
  "title": "string",
  "description": "string"
}
```

### Get All Categories
```http
GET /category/getAll
```

### Get Single Category
```http
GET /category/get/:id
```

### Update Category
```http
PUT /category/update/:id
```
**Headers:**
```
Authorization: Bearer JWT_TOKEN
```

### Delete Category
```http
DELETE /category/delete/:id
```
**Headers:**
```
Authorization: Bearer JWT_TOKEN
```

## User Management
### Get User Profile
```http
GET /user/profile
```
**Headers:**
```
Authorization: Bearer JWT_TOKEN
```

### Update User Profile
```http
PUT /user/update
```
**Headers:**
```
Authorization: Bearer JWT_TOKEN
```
**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "address": "string"
}
```

## Error Responses
```json
{
  "success": false,
  "message": "Error message"
}
```

## Authentication Errors
```json
{
  "success": false,
  "message": "Unauthorized Access"
}
```

## Notes
- All protected routes require JWT token in Authorization header
- Admin routes require additional admin role verification
- All dates are in ISO format
- All IDs are MongoDB ObjectIds
- Pagination is available for list endpoints with query parameters: ?page=1&limit=10 