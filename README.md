# News Application

## Overview

This project is a news feed application built with React and Tailwind CSS. It uses the [gnews.io](https://gnews.io) API to fetch and display news articles. Users can search for news, filter by country and navigate through paginated results.

## Project Setup

### Frontend

1. Clone the repository:
   ```bash
   git clone https://github.com/ksb44/news-web-frontend.git
   cd news-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
    ```bash
     npm run dev
   ```

### Backend

1. ```bash
   cd news-app-backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```bash
   GNEWS_API_KEY=""
   ```
4. Start the development server:
    ```bash
     npm run dev
   ```

### Approach

Frontend: The frontend is built using React, Tailwind CSS, and Axios for API requests. Framer Motion is used for animations, making the UI more interactive and visually appealing.
Backend: For backend express js , axios, is used.
Pagination: Pagination allows users to navigate through different pages of news articles.
Filters: Users can filter articles by country.

### Challenges and Solutions

Challenge 1: Debouncing Search Input
Problem: Without debouncing, API requests would be sent on every keystroke, overwhelming the API.
Solution: I implemented debouncing using Lodash to ensure that API requests are sent only after the user has stopped typing for a certain period.


Challenge 2: Firebase and render Hosting 
Problem: Initially, I faced issues with deploying both the frontend and backend separately.
Solution: I separated the backend logic  deployed it independently on render , making the frontend fetch data from the render server.


Challenge 3: API Rate Limits
Problem: The gnews.io API has a rate limit, and I had to ensure that the app doesn't exceed the allowed number of requests.
Solution: I added debouncing and pagination, which help reduce unnecessary API calls.

