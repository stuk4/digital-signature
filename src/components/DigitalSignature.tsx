import React, { useCallback, useEffect, useRef } from 'react'
import  SignaturePad,{ Options } from 'signature_pad';


export interface DigitalSignatureProps extends Options {
    canvasProps?: React.CanvasHTMLAttributes<HTMLCanvasElement>
    borderStyle?:string;
    signaturePadRef?: React.MutableRefObject<SignaturePad | undefined>;
}

const DigitalSignature = (props: DigitalSignatureProps) => {
    const refCanvas = useRef<HTMLCanvasElement>(null);
    const refSignaturePad = useRef<SignaturePad>()
    const { signaturePadRef, 
            canvasProps,
            ...propsSignPad} = props

    const getCanvasElement = (): HTMLCanvasElement => {
        if (!refCanvas.current) throw new Error("Reference not found (Don't worry probably is currently Mounting or Unmnounting)");
        return refCanvas.current
    }
    const getSignPad = (): SignaturePad => {
        if (!refSignaturePad.current) throw new Error("Reference not found (Don't worry probably is currently Mounting or Unmnounting)");
        if (!(refSignaturePad.current instanceof SignaturePad)) throw new Error("Object is not an instance of SignaturePad");
        return refSignaturePad.current
    }

    const clearCanvas = () => {
        return getSignPad().clear()
    }

    const initPad = () => {
        resizeCanvas()
        return getSignPad().on()
    }

    const stopPad = () => {
        window.removeEventListener('resize', resizeCanvas)
        clearCanvas()
        return getSignPad().off()
    }

    const resizeCanvas = useCallback(() => {
        const canvas = getCanvasElement();
        const ratio =  Math.max(window.devicePixelRatio || 1, 1);
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = canvas.offsetHeight * ratio;
        canvas.getContext("2d")?.scale(ratio, ratio);
        clearCanvas()
    },[refCanvas.current])

    useEffect(() => {

        const initializeCanvas = () => {
            const canvas = getCanvasElement()
            if(!canvas)return;

            const signaturePad = new SignaturePad(canvas,propsSignPad)
            refSignaturePad.current = signaturePad
            if (signaturePadRef) {
                signaturePadRef.current = signaturePad;
            }
            initPad()
           
        }
        initializeCanvas()
        window.addEventListener('resize', resizeCanvas)
        return () =>  stopPad()

    }, [])

    return (
        <canvas
            ref={refCanvas}
            data-testid="digital-signature"
            {...canvasProps}
        />
    )
}
export default DigitalSignature;