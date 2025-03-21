import './App.css'
import EquipmentForm from './components/EquipmentForm'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Carbon Footprint Analyzer</h1>
      </header>
      <main>
        <EquipmentForm />
      </main>
    </div>
  )
}

export default App