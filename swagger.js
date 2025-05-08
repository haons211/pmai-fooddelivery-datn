const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Restaurant Food App API',
      version: '1.0.0',
      description: 'Complete API documentation for Restaurant Food Application. This API provides endpoints for managing restaurants, food items, categories, users, orders, and authentication.',
      contact: {
        name: 'API Support',
        email: 'support@example.com'
      },
      license: {
        name: 'ISC',
        url: 'https://opensource.org/licenses/ISC'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
        description: 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        User: {
          type: 'object',
          required: ['userName', 'email', 'password', 'phone', 'address', 'answer'],
          properties: {
            userName: {
              type: 'string',
              description: 'User full name'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address'
            },
            password: {
              type: 'string',
              format: 'password',
              description: 'User password (min 6 characters)'
            },
            phone: {
              type: 'string',
              description: 'User phone number'
            },
            address: {
              type: 'string',
              description: 'User address'
            },
            answer: {
              type: 'string',
              description: 'Security question answer'
            },
            role: {
              type: 'string',
              enum: ['user', 'admin'],
              default: 'user',
              description: 'User role'
            }
          }
        },
        LoginCredentials: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address'
            },
            password: {
              type: 'string',
              format: 'password',
              description: 'User password'
            }
          }
        },
        ApiResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              description: 'Indicates if the operation was successful'
            },
            message: {
              type: 'string',
              description: 'Response message'
            },
            error: {
              type: 'object',
              description: 'Error details if any'
            }
          }
        },
        Restaurant: {
          type: 'object',
          required: ['name', 'address', 'contact'],
          properties: {
            name: {
              type: 'string',
              description: 'Restaurant name'
            },
            address: {
              type: 'string',
              description: 'Restaurant address'
            },
            contact: {
              type: 'string',
              description: 'Restaurant contact number'
            },
            timing: {
              type: 'string',
              description: 'Restaurant operating hours'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Restaurant email address'
            },
            description: {
              type: 'string',
              description: 'Restaurant description'
            }
          }
        },
        Category: {
          type: 'object',
          required: ['name'],
          properties: {
            name: {
              type: 'string',
              description: 'Category name'
            },
            description: {
              type: 'string',
              description: 'Category description'
            }
          }
        },
        Food: {
          type: 'object',
          required: ['name', 'description', 'price', 'category', 'restaurant'],
          properties: {
            name: {
              type: 'string',
              description: 'Food item name'
            },
            description: {
              type: 'string',
              description: 'Food item description'
            },
            price: {
              type: 'number',
              description: 'Food item price'
            },
            category: {
              type: 'string',
              description: 'Category ID reference'
            },
            restaurant: {
              type: 'string',
              description: 'Restaurant ID reference'
            },
            image: {
              type: 'string',
              description: 'Food item image URL'
            },
            isAvailable: {
              type: 'boolean',
              default: true,
              description: 'Food availability status'
            }
          }
        },
        Order: {
          type: 'object',
          required: ['user', 'items', 'totalAmount'],
          properties: {
            user: {
              type: 'string',
              description: 'User ID reference'
            },
            items: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  food: {
                    type: 'string',
                    description: 'Food item ID'
                  },
                  quantity: {
                    type: 'number',
                    description: 'Quantity ordered'
                  }
                }
              }
            },
            totalAmount: {
              type: 'number',
              description: 'Total order amount'
            },
            status: {
              type: 'string',
              enum: ['pending', 'confirmed', 'preparing', 'delivered', 'cancelled'],
              default: 'pending',
              description: 'Order status'
            },
            paymentStatus: {
              type: 'string',
              enum: ['pending', 'completed', 'failed'],
              default: 'pending',
              description: 'Payment status'
            }
          }
        }
      },
      responses: {
        UnauthorizedError: {
          description: 'Access token is missing or invalid',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ApiResponse'
              }
            }
          }
        },
        NotFoundError: {
          description: 'The requested resource was not found',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ApiResponse'
              }
            }
          }
        },
        ValidationError: {
          description: 'Invalid input data',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ApiResponse'
              }
            }
          }
        }
      }
    },
    tags: [
      {
        name: 'Auth',
        description: 'Authentication endpoints'
      },
      {
        name: 'Users',
        description: 'User management endpoints'
      },
      {
        name: 'Restaurants',
        description: 'Restaurant management endpoints'
      },
      {
        name: 'Categories',
        description: 'Food category management endpoints'
      },
      {
        name: 'Foods',
        description: 'Food items management endpoints'
      },
      
    ]
  },
  apis: [
    './routes/*.js',
    './models/*.js'
  ]
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec; 