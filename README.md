# TrendTech_Titans
## Getting Started

Instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Installation

1. Clone the repo
   ```sh
   git@github.com:jakobsym/TrendTech_Titans.git
   ```
2. Install NPM packages (Make sure you are at root of the directory)
   ```sh
   npm install
   ```
3. Running the code
   ```sh
   npm run dev
   ```

### Project File Structure
* Ignore spaghetti below if you look at the README.md in your IDE it is actually readable there.

ttt_project/
  ├── node_modules/       # Dependencies (auto-generated)
  ├── public/             # Static assets (HTML, CSS, images, etc.)
  ├── src/                # Source code
  │   ├── server/         # Backend server code
  │   │   ├── models/     # Database models (using Mongoose)
  │   │   ├── routes/     # Express.js routes
  │   │   ├── app.js      # Express.js application setup
  │   │   └── config.js   # Configuration settings (e.g., database connection)
  │   ├── client/         # Frontend code
  │   │   ├── components/ # Reusable UI components (e.g., Header, ProductCard)
  │   │   ├── pages/      # Page-specific components (e.g., ProductPage, CartPage)
  │   │   ├── assets/     # Frontend assets (CSS, images, etc.)
  │   │   ├── main.js     # Entry point for frontend JavaScript
  │   │   └── index.html  # Main HTML template *NOTE: Unsure if index.html should be here
  ├── package.json        # Project dependencies and scripts
  ├── .gitignore          # Git ignore configuration
  ├── README.md           # Project documentation
 
