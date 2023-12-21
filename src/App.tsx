import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout/layout";
import HomePage from "./routes/home";
import LoginPage from "./routes/login";
import ArticlePage from "./routes/article";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/article/:slug" element={<ArticlePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
