import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Perks from "./components/Perks/Perks.tsx";
import Layout from "./components/Layout.tsx";
import Builds from "./components/Builds/Builds.tsx";
import NewBuild from "./components/Builds/NewBuild.tsx";
import RandomBuild from "./components/Builds/RandomBuild.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Perks />} />
          <Route path="/perks" element={<Perks />} />

          <Route path="/builds" element={<Builds />} />
          <Route path="/builds/new" element={<NewBuild />} />
          <Route path="/builds/random" element={<RandomBuild />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </StrictMode>
);
