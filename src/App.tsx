
import { useRef } from 'react';
import './App.css'
import { MySignaturePad } from './components/MySignaturePad';
import SignaturePad from 'signature_pad';

function App() {
  // Example how to use signaturePadRef
  const sigPadRef = useRef<SignaturePad>();
  const handleCLear = () =>{
    console.log(sigPadRef.current?.toDataURL())
    sigPadRef.current?.clear()
  }
  return (
    <div className="container">
        <button
          onClick={handleCLear}
        >Clear</button>
        <br />
        <br />
        <MySignaturePad 
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
