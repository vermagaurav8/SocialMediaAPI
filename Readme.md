# SocialApi

This project aims to build a backend API for a social media platform using Node.js and MongoDB. The API will allow users to create profiles, follow other users, upload posts, interact with posts (like, unlike, comment), and manage their content.

## API Link: http://socialapi-mp4j.onrender.com/api


<br><br>

# Prerequisites

To run the API successfully, please make sure your machine meets the following prerequisites:

1. Node.js: Ensure that you have Node.js installed on your machine, preferably version 16 or higher.

2. MongoDB: Install MongoDB Community Edition or create an account on MongoDB Atlas for cloud-based MongoDB hosting.

3. Docker Engine

By having Node.js and MongoDB set up correctly, you'll be ready to run the API smoothly.

<br>

# Getting Started

Here are the steps to set up and run the API on your local machine:

1. <b>Clone the Repository:</b> 
   Clone the project repository to your local machine using the following command:
   ```
   git clone git@github.com:vermagaurav8/SocialMediaAPI.git
   ```

2. <b>Configure Environment Variables:</b>
   Create a file named `.env` in the project root directory and configure the necessary environment variables. Modify the following variables to match your setup:
   ```
   PORT=3000
   MONGO_URI=connection-string
   JWT_SECRET=secret-key
   ```

5. <b>Run the API:</b>
   Start the API server by running the following command:
   ```
   $ docker build -t socialapi .
   $ docker run -p <your-port>:3000 socialapi
   ```

   The API will start running on `http://localhost:<your-port>`.

<br>

# Testing Api
Here is a summary of the API endpoints available in the SocialAPI:

- `POST /api/authenticate` performs user authentication and return a JWT token.
- `POST /api/follow/{id}` allows authenticated user to follow user with {id}
- `POST /api/unfollow/{id}` allows authenticated user to unfollow a user with {id}
- `GET /api/user` authenticate the request and return the respective user profile.
- `POST api/posts/` add a new post created by the authenticated user.
- `DELETE api/posts/{id}` delete post with {id} created by the authenticated user.
- `POST /api/like/{id}` like the post with {id} by the authenticated user.
- `POST /api/unlike/{id}` unlike the post with {id} by the authenticated user.
- `POST /api/comment/{id}` add comment for post with {id} by the authenticated user.
- `GET api/posts/{id}` returns a single post with {id} populated with its number of likes and comments
- `GET /api/all_posts` returns all posts created by authenticated user sorted by post time.

You can use tools like Postman to test these API endpoints by sending requests to the corresponding URLs with the required request body, parameters, and headers.