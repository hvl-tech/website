import { Routes, Route } from "react-router-dom";
import TranslateBtn from "./component/translateBtn";
import Footer from "./component/footer";
import HomePage from "./pages/HomePage";
import KidsPage from "./pages/KidsPage";


function App() {
    return (
        <div className="">
            <main className="flex-1">
                <nav
                    className="fixed top-4 z-50 px-2 py-2 sm:px-4 right-4sm:right-8 md:right-12 lg:right-16 xl:right-1/2 xl:translate-x-[560px]"
                >
                    <TranslateBtn />
                </nav>

                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/kids" element={<KidsPage />} />
                </Routes>
            </main>
            <Footer/>
        </div>
    )
}

export default App
