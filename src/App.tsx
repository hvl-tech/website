import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import KidsLabs from './pages/KidsLabs';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/kids-labs" element={<KidsLabs />} />
            </Routes>
        </Router>
    );
}

export default App;
