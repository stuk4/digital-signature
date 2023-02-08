
import './App.css'
import { Signature } from './components/Signature'
import { SignatureMobile } from './components/SignatureMobile'

function App() {

  return (
    <div className="container">
        {/* <Signature 
            width={400}
            height={400}
            lineWidth={2.5}
        /> */}
        <SignatureMobile 
            width={400}
            height={400}
            lineWidth={2.5}
        />
    </div>
  )
}

export default App
