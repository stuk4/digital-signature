
import './App.css'
import { Signature } from './components/Signature'

function App() {

  return (
    <div className="container">
        <Signature 
            width={400}
            height={400}
            lineWidth={2.5}
        />
    </div>
  )
}

export default App
