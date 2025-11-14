// FULL REACT PROJECT STRUCTURE
// All files concatenated in one document. Copy into your local folder structure.

//------------------------------------------
// package.json
//------------------------------------------
{
  "name": "teaching-expo",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "framer-motion": "^11.0.0",
    "lucide-react": "^0.424.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.34",
    "@types/react-dom": "^18.2.14",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.31",
    "tailwindcss": "^3.4.3",
    "vite": "^5.0.0"
  }
}

//------------------------------------------
// vite.config.js
//------------------------------------------
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [react()],
  base: "/teaching-expo/"
});

//------------------------------------------
// tailwind.config.js
//------------------------------------------
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: { extend: {} },
  plugins: []
};

//------------------------------------------
// postcss.config.js
//------------------------------------------
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  }
};

//------------------------------------------
// index.html
//------------------------------------------
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Teaching Materials Expo</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>

//------------------------------------------
// src/main.jsx
//------------------------------------------
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
ReactDOM.createRoot(document.getElementById("root")).render(<App />);

//------------------------------------------
// src/index.css
//------------------------------------------
@tailwind base;
@tailwind components;
@tailwind utilities;

//------------------------------------------
// src/App.jsx
//------------------------------------------
import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Courses from "./components/Courses";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      <Courses />
      <Footer />
    </div>
  );
}

//------------------------------------------
// src/components/Navbar.jsx
//------------------------------------------
import React from "react";
import { BookOpen } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="w-full flex justify-between items-center px-8 py-4 bg-white shadow">
      <div className="flex items-center gap-2 text-xl font-bold">
        <BookOpen /> Teaching Expo
      </div>
      <div className="flex gap-6 text-gray-700 font-medium">
        <a href="#courses">Courses</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  );
}

//------------------------------------------
// src/components/Hero.jsx
//------------------------------------------
import React from "react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="px-12 py-24 bg-gradient-to-br from-blue-100 to-purple-100 text-center">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-bold mb-4"
      >
        Teaching Materials Exhibition
      </motion.h1>

      <p className="text-gray-700 text-lg max-w-2xl mx-auto">
        A modern platform to showcase your teaching materials, courses, and academic resources.
      </p>
    </section>
  );
}

//------------------------------------------
// src/components/Courses.jsx
//------------------------------------------
import React from "react";
import { motion } from "framer-motion";
import { Folder } from "lucide-react";

const sampleCourses = [
  { title: "Machine Learning", desc: "Slides, labs, and exams." },
  { title: "Data Structures", desc: "Full course materials & exercises." },
  { title: "ICT for English Students", desc: "Practical introduction to ICT." }
];

export default function Courses() {
  return (
    <section id="courses" className="px-10 py-20 bg-white">
      <h2 className="text-3xl font-bold mb-8 text-center">Courses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {sampleCourses.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.2 }}
            className="p-6 bg-gray-100 rounded-2xl shadow"
          >
            <Folder className="mb-3" />
            <h3 className="text-xl font-semibold">{c.title}</h3>
            <p className="text-gray-700">{c.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

//------------------------------------------
// src/components/Footer.jsx
//------------------------------------------
import React from "react";

export default function Footer() {
  return (
    <footer className="text-center py-6 bg-gray-200 mt-20 text-gray-700">
      © 2025 Teaching Expo – All rights reserved.
    </footer>
  );
}

//------------------------------------------
// .github/workflows/deploy.yml
//------------------------------------------
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install dependencies
        run: npm install

      - name: Build project
        run: npm run build

      - name: Upload production-ready files
        uses: actions/upload-pages-artifact@v2
        with:
          path: dist

  deploy:
    needs: build
    permissions:
      pages: write
      id-token: write
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}

    steps:
      - name: Deploy
        id: deployment
        uses: actions/deploy-pages@v2

