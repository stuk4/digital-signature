import React, { useCallback, useEffect, useRef } from 'react'
import SignaturePad, { Options } from 'signature_pad';

interface MySignaturePadProps extends Options {
    canvasProps?: React.CanvasHTMLAttributes<HTMLCanvasElement>
    borderStyle?:string;
    signaturePadRef?: React.MutableRefObject<SignaturePad | undefined>;
}

export const MySignaturePad = (props: MySignaturePadProps) => {
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
        canvas.width = canvas.clientWidth
        canvas.height = canvas.clientHeight
      
        clearCanvas()
    },[refCanvas.current])

    useEffect(() => {

        const initializeCanvas = () => {
            const canvas = getCanvasElement()
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
            {...canvasProps}
      
        />
    )
}
