# Chat App

A real-time chat application built with Node.js, Express, Socket.IO, MongoDB, and Cloudinary for image uploads. This app allows users to sign up, log in, update their profiles, and chat with other users in real-time, including sending text messages and images.

## Features

- **User Authentication**: Sign up, log in, log out, and update profile pictures.
- **Real-Time Messaging**: Send and receive text messages and images instantly using Socket.IO.
- **Online Users**: See which users are currently online.
- **Secure**: JWT-based authentication with HTTP-only cookies.
- **Image Uploads**: Profile pictures and message images stored on Cloudinary.
- **Responsive**: CORS configured for frontend integration (e.g., Flutter app on localhost:3000).

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Real-Time Communication**: Socket.IO
- **Authentication**: JSON Web Tokens (JWT)
- **Image Handling**: Cloudinary
- **Password Hashing**: bcryptjs
- **Environment Management**: dotenv

## Project Structure

```
chat_app/
├── .env                    # Environment variables
├── package.json            # Dependencies and scripts
├── src/
│   └── index.js            # Main server entry point
├── controller/
│   ├── auth.controller.js  # Authentication logic (signup, login, etc.)
│   └── message.controller.js # Message handling logic
├── model/
│   ├── user.model.js       # User schema
│   └── message.model.js    # Message schema
├── routes/
│   ├── auth.routes.js      # Authentication routes
│   └── message.routes.js   # Message routes
├── middleware/
│   └── auth.middleware.js  # JWT authentication middleware
├── lib/
│   ├── db.js               # MongoDB connection
│   ├── cloudinary.js       # Cloudinary configuration
│   └── soket.js            # Socket.IO setup and utilities
└── utils/
    └── utils.js            # JWT token generation utility
```

## Installation

1. Clone the repository:

   ```
   git clone <repository-url>
   cd chat_app
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:

   ```
   PORT=5001
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   NODE_ENV=development
   ```

4. Start the development server:
   ```
   npm run dev
   ```

The server will run on `http://localhost:5001` (or the port specified in `.env`).

## API Endpoints

### Authentication

- **POST /api/auth/signup**

  - Body: `{ "fullName": "string", "email": "string", "password": "string" }`
  - Creates a new user account.

- **POST /api/auth/login**

  - Body: `{ "email": "string", "password": "string" }`
  - Logs in a user and returns user data.

- **POST /api/auth/logout**

  - Logs out the current user by clearing the token cookie.

- **PUT /api/auth/updateProfile** (Protected)

  - Body: `{ "profilePic": "base64_image_string" }`
  - Updates the user's profile picture.

- **GET /api/auth/checkAuth** (Protected)
  - Returns the authenticated user's data.

### Messages

- **GET /api/message/users** (Protected)

  - Returns a list of all users except the logged-in user for the sidebar.

- **GET /api/message/:id** (Protected)

  - Params: `id` (user ID to chat with)
  - Returns the message history between the logged-in user and the specified user.

- **POST /api/message/send/:id** (Protected)
  - Params: `id` (receiver's user ID)
  - Body: `{ "text": "string", "img": "base64_image_string" }` (optional img)
  - Sends a message (text or image) to the specified user.

## Socket.IO Events

- **Connection**: When a user connects, they are added to the online users map.
- **getOnlineUser**: Emitted to all clients with the list of online user IDs.
- **newMessage**: Emitted to the receiver when a new message is sent.
- **Disconnect**: When a user disconnects, they are removed from the online users map.

## Database Models

### User

- `email`: String (required, unique)
- `name`: String (required)
- `password`: String (required, hashed)
- `profile`: String (default: "")

### Message

- `senderId`: ObjectId (ref: User, required)
- `reciverId`: ObjectId (ref: User, required)
- `test`: String (likely "text" - message content)
- `image`: String (image URL)

## Known Issues and Notes

- There are some typos and logical errors in the code (e.g., "reciverId" instead of "receiverId", incorrect user existence checks in signup, undefined variables in controllers). These should be fixed for production use.
- The app assumes a frontend running on `http://localhost:3000` for CORS.
- Passwords are hashed with bcrypt, but ensure strong secrets in production.
- Images are uploaded to Cloudinary; ensure proper configuration.

## Contributing

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Test thoroughly.
5. Submit a pull request.

## License

This project is licensed under the ISC License.
