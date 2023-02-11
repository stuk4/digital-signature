
import { useRef } from 'react';
import './App.css'
import SignaturePad from 'signature_pad';
import DigitalSignature from './components/DigitalSignature';

function App() {
  // Example how to use signaturePadRef
  const sigPadRef = useRef<SignaturePad>();

  const handleCLear = () =>{

    sigPadRef.current?.clear()
  }
  return (
    <div className="container">
        <button
          onClick={handleCLear}
        >Clear</button>
        <br />
        <br />
        <DigitalSignature 
          signaturePadRef={sigPadRef} 
          canvasProps={{
            style:{
              border:"1px dashed #000"
            }
          }}
        />
    </div>
  )
}

export default App
