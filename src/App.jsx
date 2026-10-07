import Hero from './components/Hero'
import ScrollStory from './components/ScrollStory'
import FieldNotes from './components/FieldNotes'
import Discovery from './components/Discovery'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <div className="grain" />
      <Hero />
      <ScrollStory />
      <FieldNotes/>
      <Discovery />
      <Footer />
    </>
  )
}