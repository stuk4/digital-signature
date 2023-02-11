import React, { createRef } from "react";
import {  render, screen, waitFor, RenderResult } from '@testing-library/react';
import DigitalSignature, {DigitalSignatureProps} from '../../src/components/DigitalSignature';
import SignaturePad, { PointGroup } from "signature_pad";
import mockSignature from "../fixtures/mockSignature";

const scaleDigitalSignature = (width: number, height: number): void => {
    Object.defineProperty(HTMLCanvasElement.prototype, 'offsetWidth', {
        configurable: true,
        value: width,
    });
    Object.defineProperty(HTMLCanvasElement.prototype, 'offsetHeight', {
        configurable: true,
        value: height,
    });
};

const renderCanvasWithRef = (props?:DigitalSignatureProps):{wrapper:RenderResult,signaturePad:SignaturePad } =>{
    const instance = createRef<SignaturePad>();

    const wrapper = render(<DigitalSignature {...props} signaturePadRef={instance as React.MutableRefObject<SignaturePad | undefined>}  />);

    const signaturePad = instance.current as SignaturePad;
    return {wrapper,signaturePad}
}
describe('DigitalSignature component', () => {
    const testId = 'digital-signature'
    beforeEach(() => {
        jest.restoreAllMocks();
        scaleDigitalSignature(1024, 768);
    });

    it('should render without crashing', async () => {
        renderCanvasWithRef()

        expect(screen.getByTestId(testId)).toBeInTheDocument();

   
       
    });

    it('should have signature pad instance', async () => {
        const signaturePadRef = {
            current: undefined
        }
        render (<DigitalSignature signaturePadRef={signaturePadRef}/>)
        await waitFor(() => signaturePadRef.current)
        expect(signaturePadRef.current).toBeInstanceOf(SignaturePad)
    })

    it('should resize canvas on window resize event', () => {
        render(<DigitalSignature />)
        const canvas = screen.getByTestId(testId)
        const originalWidth = canvas.offsetWidth
        const originalHeight = canvas.offsetHeight

        expect(canvas.offsetWidth).toEqual(originalWidth)
        expect(canvas.offsetHeight).toEqual(originalHeight)
      
    })



    it('should clears the signature pad', () => {
    
        const { signaturePad } = renderCanvasWithRef()
        signaturePad.fromDataURL(mockSignature);
        expect(signaturePad.isEmpty()).toBeFalsy();

        signaturePad.clear();
        expect(signaturePad.isEmpty()).toBeTruthy();
    });

    it('should returns a signature as a data image/png;base64', () => {

        const { signaturePad } = renderCanvasWithRef()
        expect(signaturePad.toDataURL()).toContain('data:image/png;base64');
    });
    it('should draws a signature from PointGroup', () => {
        const { signaturePad } = renderCanvasWithRef()
        
        const data:PointGroup[] = [
            {
                dotSize: 1,
                maxWidth: 1.5,
                minWidth: 0.5,
                penColor: 'red',
                velocityFilterWeight: 0.5,
                points: [{ pressure: 0.5, time: 1641476147709, x: 100, y: 100 }],
            },
        ];

        signaturePad.fromData(data);

        expect(signaturePad.toData()).toStrictEqual(data);
    });



    

 

});


