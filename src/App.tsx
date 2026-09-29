import { Routes, Route, useLocation } from "react-router-dom";
import TranslateBtn from "./component/translateBtn";
import Footer from "./component/footer";
import HomePage from "./pages/HomePage";
import KidsPage from "./pages/KidsPage";
import DatenschutzPage from "./pages/DatenschutzPage";
import SpeakersPage from "./pages/SpeakersPage";

function App() {
  // Only the Kids Labs page still uses the old layout; the rest bring their own header and footer.
  const isLegacy = useLocation().pathname === "/labs";
  return (
    <div className="">
      <main className="flex-1">
        {isLegacy && (
          <nav className="fixed top-4 z-50 px-2 py-2 sm:px-4 right-4 sm:right-8 md:right-12 lg:right-16 xl:right-1/2 xl:translate-x-[560px]">
            <TranslateBtn />
          </nav>
        )}

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/labs" element={<KidsPage />} />
          <Route path="/labs/datenschutz" element={<DatenschutzPage />} />
          <Route path="/speakers" element={<SpeakersPage />} />
        </Routes>
      </main>
      {isLegacy && <Footer />}
    </div>
  );
}

export default App;
