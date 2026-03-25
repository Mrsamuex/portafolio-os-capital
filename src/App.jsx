import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home_os'
import Contact from './pages/contact_os'
import Leads from './pages/leads'
import Servicios from './pages/servicios'
import Casos from './pages/casos'
import Blog from './pages/blog'
import Navbar from './components/navbar'
import Footer from './components/footer'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact_os" element={<Contact />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/casos" element={<Casos />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}