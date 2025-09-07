# Notes API

A RESTful API for managing personal notes with user authentication. Built with Node.js, Express, and MongoDB.

## Features

- User registration and authentication
- Create, read, update, and delete notes
- Search notes by title
- Filter notes by tags
- Pagination for note listings
- Archive and pin notes
- Secure routes with authentication middleware

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd notes-api
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following:
   ```
   SECRET=your-secret-key
   PORT=3000
   ```

4. Start MongoDB locally or update the connection string in `index.js` if using a remote database.

5. Run the application:
   ```
   node index.js
   ```

The server will start on port 3000 (or the port specified in `.env`).

## Usage

The API provides endpoints for user authentication and note management. All note-related endpoints require authentication except registration and login.

### Authentication

- Register a new user with POST `/register`
- Login with POST `/login`
- Logout with POST `/logout`
- Get user profile with GET `/profile`

### Notes

- Create a note: POST `/notes`
- Get all notes: GET `/notes` (supports query parameters for search, tag, page, limit)
- Get a specific note: GET `/notes/:id`
- Update a note: PUT `/notes/:id`
- Delete a note: DELETE `/notes/:id`

## API Endpoints

### Authentication Routes

| Method | Endpoint     | Description              | Auth Required |
|--------|--------------|--------------------------|---------------|
| POST   | /register    | Register a new user      | No            |
| POST   | /login       | Login user               | No            |
| POST   | /logout      | Logout user              | Yes           |
| GET    | /profile     | Get user profile         | Yes           |

### Notes Routes

| Method | Endpoint     | Description              | Auth Required |
|--------|--------------|--------------------------|---------------|
| POST   | /notes       | Create a new note        | Yes           |
| GET    | /notes       | Get all user notes       | Yes           |
| GET    | /notes/:id   | Get a specific note      | Yes           |
| PUT    | /notes/:id   | Update a note            | Yes           |
| DELETE | /notes/:id   | Delete a note            | Yes           |

Query parameters for GET /notes:
- `q`: Search term for title (case-insensitive)
- `tag`: Filter by tag
- `page`: Page number for pagination (default 1)
- `limit`: Number of notes per page (default 10)

## Models

### User
- `email`: String (required, unique)
- `username`: String (handled by passport-local-mongoose)
- `password`: String (hashed by passport-local-mongoose)

### Note
- `title`: String (required, max 50 characters)
- `content`: String (required, min 3 characters)
- `tags`: Array of Strings (required)
- `user`: ObjectId (reference to User)
- `isArchived`: Boolean (default false)
- `isPinned`: Boolean (default false)
- `createdAt`: Date
- `updatedAt`: Date

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- Passport.js (with Local Strategy)
- Express Session

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the ISC License.
