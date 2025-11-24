const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Notes API",
      version: "1.0.0",
      description: "API documentation for the Notes API"
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local server"
      }
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "connect.sid",
          description: "Session authentication via cookie"
        }
      },
      schemas: {
        Note: {
          type: "object",
          required: ["title", "body"],
          properties: {
            _id: {
              type: "string",
              example: "64a7e6f8b7a3b12c345d6789"
            },
            title: {
              type: "string",
              example: "Sample Note Title"
            },
            body: {
              type: "string",
              example: "This is the body of the note."
            },
            tags: {
              type: "array",
              items: {
                type: "string"
              },
              example: ["personal", "work"]
            },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2023-07-06T17:19:20.000Z"
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              example: "2023-07-07T12:00:00.000Z"
            }
          }
        },
        Error: {
          type: "object",
          properties: {
            error: {
              type: "string",
              example: "Error message describing what went wrong"
            }
          }
        },
        User: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "64a7e6f8b7a3b12c345d6789"
            },
            email: {
              type: "string",
              example: "user@example.com"
            },
            username: {
              type: "string",
              example: "user123"
            }
          }
        },
        RegisterRequest: {
          type: "object",
          required: ["email", "password", "username"],
          properties: {
            email: {
              type: "string",
              example: "user@example.com"
            },
            username: {
              type: "string",
              example: "user123"
            },
            password: {
              type: "string",
              example: "password123"
            }
          }
        },
        LoginRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              example: "user@example.com"
            },
            password: {
              type: "string",
              example: "password123"
            }
          }
        },
        SuccessMessage: {
          type: "object",
          properties: {
            msg: {
              type: "string",
              example: "Operation successful"
            }
          }
        }
      }
    },
    security: [
      {
        cookieAuth: []
      }
    ],
    paths: {
      "/notes": {
        get: {
          tags: ["Notes"],
          summary: "Get all notes for logged in user with optional search, tag filter, pagination",
          security: [{ cookieAuth: [] }],
          parameters: [
            {
              name: "q",
              in: "query",
              description: "Search term to filter notes by title",
              required: false,
              schema: {
                type: "string"
              }
            },
            {
              name: "tag",
              in: "query",
              description: "Filter notes by tag",
              required: false,
              schema: {
                type: "string"
              }
            },
            {
              name: "page",
              in: "query",
              description: "Page number for pagination",
              required: false,
              schema: {
                type: "integer",
                default: 1
              }
            },
            {
              name: "limit",
              in: "query",
              description: "Number of notes per page",
              required: false,
              schema: {
                type: "integer",
                default: 10
              }
            }
          ],
          responses: {
            200: {
              description: "A list of notes",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      count: { type: "integer", example: 2 },
                      page: { type: "integer", example: 1 },
                      totalPages: { type: "integer", example: 3 },
                      toatlNotes: { type: "integer", example: 25 },
                      data: {
                        type: "array",
                        items: { $ref: "#/components/schemas/Note" }
                      }
                    }
                  }
                }
              }
            },
            404: {
              description: "No notes found",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" }
                }
              }
            }
          }
        },
        post: {
          tags: ["Notes"],
          summary: "Create a new note",
          security: [{ cookieAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["title", "body"],
                  properties: {
                    title: { type: "string", example: "New Note Title" },
                    body: { type: "string", example: "Content of the note" },
                    tags: {
                      type: "array",
                      items: { type: "string" },
                      example: ["tag1", "tag2"]
                    }
                  }
                }
              }
            }
          },
          responses: {
            201: {
              description: "Note created successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      msg: { type: "string", example: "Note Created successfully" },
                      note: { $ref: "#/components/schemas/Note" }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/notes/{id}": {
        get: {
          tags: ["Notes"],
          summary: "Get a single note by ID",
          security: [{ cookieAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              description: "ID of the note to retrieve",
              schema: { type: "string" }
            }
          ],
          responses: {
            200: {
              description: "A note object",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Note" }
                }
              }
            },
            404: {
              description: "Note not found",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" }
                }
              }
            }
          }
        },
        put: {
          tags: ["Notes"],
          summary: "Update a note by ID",
          security: [{ cookieAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              description: "ID of the note to update",
              schema: { type: "string" }
            }
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    title: { type: "string", example: "Updated title" },
                    body: { type: "string", example: "Updated body content" },
                    tags: {
                      type: "array",
                      items: { type: "string" },
                      example: ["updatedTag1", "updatedTag2"]
                    }
                  }
                }
              }
            }
          },
          responses: {
            200: {
              description: "Note updated successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      msg: { type: "string", example: "Edited Changes Was Saved" },
                      note: { $ref: "#/components/schemas/Note" }
                    }
                  }
                }
              }
            },
            404: {
              description: "Note not found",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" }
                }
              }
            }
          }
        },
        delete: {
          tags: ["Notes"],
          summary: "Delete a note by ID",
          security: [{ cookieAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              description: "ID of the note to delete",
              schema: { type: "string" }
            }
          ],
          responses: {
            200: {
              description: "Note deleted successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      msg: {
                        type: "string",
                        example: "Sample Note Title deleted successfully"
                      }
                    }
                  }
                }
              }
            },
            404: {
              description: "Note not found",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" }
                }
              }
            }
          }
        }
      },
      "/register": {
        post: {
          tags: ["Auth"],
          summary: "Register a new user",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/RegisterRequest" }
              }
            }
          },
          responses: {
            201: {
              description: "User registered successfully",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/SuccessMessage" }
                }
              }
            },
            400: {
              description: "Invalid input or user already exists",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" }
                }
              }
            }
          }
        }
      },
      "/login": {
        post: {
          tags: ["Auth"],
          summary: "Log in a user",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/LoginRequest" }
              }
            }
          },
          responses: {
            200: {
              description: "Logged in successfully",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/SuccessMessage" }
                }
              }
            },
            401: {
              description: "Invalid email or password",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" }
                }
              }
            }
          }
        }
      },
      "/logout": {
        post: {
          tags: ["Auth"],
          summary: "Log out the currently authenticated user",
          security: [{ cookieAuth: [] }],
          responses: {
            201: {
              description: "Logged out successfully",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/SuccessMessage" }
                }
              }
            },
            401: {
              description: "User not authenticated",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" }
                }
              }
            }
          }
        }
      },
      "/profile": {
        get: {
          tags: ["Auth"],
          summary: "Get profile of the currently authenticated user",
          security: [{ cookieAuth: [] }],
          responses: {
            200: {
              description: "User profile",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/User" }
                }
              }
            },
            404: {
              description: "User not found",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" }
                }
              }
            },
            401: {
              description: "User not authenticated",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" }
                }
              }
            }
          }
        }
      }
    }
  },
  apis: []
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
