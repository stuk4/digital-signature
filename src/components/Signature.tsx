import React, { useEffect, useRef, useState } from 'react'

interface CanvasProps{
    width?:number;
    height?:number;
    lineWidth?:number;
    strokeColor?:string
}
interface Point{
    x:number,
    y:number,
}
export const Signature = ({width=200,height=100,strokeColor="#00-",lineWidth=2}:CanvasProps) => {

    const refCanvas = useRef<HTMLCanvasElement>(null);
    const [drawing, setDrawing] = useState(false);
    const [lastX, setLastX] = useState<number>()
    const [lastY, setLastY] = useState<number>()
    const [points, setPoints] = useState<Point[]>([])
    const [signature,setSignature] = useState<string | null>(null);

    const startDrawing = (e:React.MouseEvent<HTMLCanvasElement>) =>{
        if(!refCanvas.current) return;
        const elementCanvas = refCanvas.current
        setDrawing(true)

        setLastX(e.clientX - elementCanvas.offsetLeft)
        setLastY(e.clientY - elementCanvas.offsetTop)
        setPoints([...points,{
            x:lastX!,
            y:lastY!
        }])
    }
    const draw = (e:React.MouseEvent<HTMLCanvasElement>) =>{
        if(!refCanvas.current) return;
        if(!drawing) return;
        const elementCanvas = refCanvas.current
        const context2d = elementCanvas.getContext("2d")

        context2d?.clearRect(0,0,elementCanvas.width,elementCanvas.height)

        if (signature) {
            const img = new Image();
            img.src = signature
            context2d?.drawImage(img,0,0)
        }
        const x = e.clientX - elementCanvas.offsetLeft;
        const y = e.clientY - elementCanvas.offsetTop;
        setPoints([...points,{x,y}])
        context2d?.beginPath();
        context2d?.moveTo(points[0].x,points[0].y);
        for (let i = 1; i < points.length - 2; i++) {
            const xc = (points[i].x + points[i + 1].x) / 2;
            const yc = (points[i].y + points[i + 1].y) / 2;
            context2d?.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
        }
        context2d?.stroke();

    }
    const stopDrawing = () =>{
        setDrawing(false)
        if(!refCanvas.current) return;
        const elementCanvas = refCanvas.current
        setSignature(elementCanvas.toDataURL())
        setPoints([])
        setLastX(undefined)
        setLastY(undefined)
    }
    useEffect(()=>{
        const initializeCanvas = () =>{
            if(!refCanvas.current) return;
            const elementCanvas = refCanvas.current
            const context2d = elementCanvas.getContext("2d")
            context2d!.lineWidth = lineWidth
            context2d!.strokeStyle = strokeColor
        }
        initializeCanvas()
    },[])
  return (
    <canvas 
        ref={refCanvas} 
        width={width}
        height={height}
        style={{
            background:"white"
        }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}

    />
  )
}
