import Layout from "./Layout.jsx";
import Home from "./Home";
import Analyze from "./Analyze";
import FAQ from "./FAQ";
import WhatsNext from "./WhatsNext";
import Login from "@/components/auth/Login";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

const PAGES = {
    
    Home: Home,
    
    Analyze: Analyze,
    
    FAQ: FAQ,
    
    WhatsNext: WhatsNext,
    
}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);
    
    return (
        <Routes>            
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            
            {/* Protected routes */}
            <Route path="/" element={
                <ProtectedRoute>
                    <Layout currentPageName={currentPage}>
                        <Home />
                    </Layout>
                </ProtectedRoute>
            } />
            
            <Route path="/Home" element={
                <ProtectedRoute>
                    <Layout currentPageName={currentPage}>
                        <Home />
                    </Layout>
                </ProtectedRoute>
            } />
            
            <Route path="/Analyze" element={
                <ProtectedRoute>
                    <Layout currentPageName={currentPage}>
                        <Analyze />
                    </Layout>
                </ProtectedRoute>
            } />
            
            <Route path="/FAQ" element={
                <ProtectedRoute>
                    <Layout currentPageName={currentPage}>
                        <FAQ />
                    </Layout>
                </ProtectedRoute>
            } />
            
            <Route path="/WhatsNext" element={
                <ProtectedRoute>
                    <Layout currentPageName={currentPage}>
                        <WhatsNext />
                    </Layout>
                </ProtectedRoute>
            } />
        </Routes>
    );
}

export default function Pages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}