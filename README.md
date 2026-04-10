# AI Thumbnail Generator 🎨✨

A powerful, full-stack application that leverages advanced AI models to generate stunning, high-quality thumbnails for your content. Built with a modern tech stack featuring React 19, Vite, Express, and MongoDB.

# Live Demo - http://72.61.125.129:5173/

## 🚀 Features

- **AI-Powered Image Generation:** Integrates with OpenAI and Google GenAI platforms for state-of-the-art image creation.
- **Secure Authentication:** Robust user authentication using `bcrypt` and `express-session` backed by `connect-mongo`.
- **Cloud Storage Integration:** Seamlessly uploads and manages generated thumbnails using Cloudinary.
- **Beautiful, Responsive UI:** Built with React 19, TailwindCSS v4, and enriched with `lucide-react` icons.
- **Smooth Animations & Interactions:** Features smooth scrolling with `lenis` and fluid animations using `motion` and `react-fast-marquee`.
- **Type-Safe:** End-to-end type safety with TypeScript on both the client and server.

## 💻 Tech Stack

### Frontend (Client)

- **Framework:** React 19 + TypeScript + Vite
- **Styling:** TailwindCSS v4
- **Routing:** React Router v7
- **Data Fetching:** Axios
- **Animations:** Motion, Lenis (Smooth Scrolling), React Fast Marquee
- **UI Components:** Lucide React (Icons), React Hot Toast (Notifications)

### Backend (Server)

- **Core:** Node.js, Express (v5)
- **Database:** MongoDB, Mongoose
- **Authentication:** express-session, bcrypt, connect-mongo
- **AI Integrations:** OpenAI API, Google GenAI
- **Storage:** Cloudinary
- **Development Tooling:** TypeScript, tsx, nodemon

## 🛠️ Prerequisites

Make sure you have the following installed on your machine:

- Node.js (v18 or higher recommended)
- Yarn package manager
- MongoDB instance (local or Atlas)
- Accounts/API Keys for OpenAI / Google GenAI and Cloudinary

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Mahesh0426/AI_Thumbnail_Generator.git
cd AI_thumbnail_generator
```

### 2. Backend Setup

```bash
cd server
yarn install
```

Create a `.env` file in the `server` directory and configure your environment variables. You'll likely need:

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
OPENAI_API_KEY=your_openai_api_key
GOOGLE_GENAI_API_KEY=your_google_genai_api_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Start the development server:

```bash
yarn dev
```

### 3. Frontend Setup

Open a new terminal window for the client setup:

```bash
cd client
yarn install
```

Create a `.env` file in the `client` directory (if you have frontend-specific environment variables):

```env
VITE_API_BASE_URL=http://localhost:8000
```

Start the frontend development server:

```bash
yarn dev
```

## 📜 Scripts

**Client**

- `yarn dev`: Starts the Vite development server.
- `yarn build`: Builds the React app for production.
- `yarn lint`: Runs ESLint to check for code quality.
- `yarn preview`: Previews the production build locally.

**Server**

- `yarn dev`: Starts the backend server with `nodemon` and `tsx` for hot-reloading.
- `yarn build`: Compiles TypeScript files to JavaScript in the `dist` directory.
- `yarn start`: Runs the compiled server (`node dist/server.js`).

## 📄 License

This project is open-source and available under the MIT License.
