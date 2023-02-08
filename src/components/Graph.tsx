import {Attempt} from "../models/model";
import React, {useEffect, useRef} from "react";
import {sendNewAttempt} from "../services/attempts_requests";

const canvasSize = 300;
const rScale = 25;
const areasColor = '#bda0ff';
const graphColor = '#000'

interface GraphProps {
    attempts: Attempt[]
    r: number
    addAttempt: (newAttempt: Attempt) => void
    setAxiosError: any
}

export default function Graph({ attempts, r, addAttempt, setAxiosError }: GraphProps) {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    function handleClick(event: React.MouseEvent) {
        if (r > 0) {
            const x = (event.nativeEvent.offsetX - canvasSize / 2) / rScale;
            const y = -(event.nativeEvent.offsetY - canvasSize / 2) / rScale;
            const newAttempt: Attempt = {x: x, y: y, r: r};
            sendNewAttempt(newAttempt).then(res => addAttempt(res), err => setAxiosError(err.message));
        }
    }

    useEffect(() => {
        if (canvasRef.current !== null) {
            const ctx = canvasRef.current.getContext('2d');
            if (ctx !== null) renderGraph(ctx, attempts, r);
        }
    }, [attempts, r]);

    return(
        <canvas
            ref={canvasRef}
            width={canvasSize}
            height={canvasSize}
            onClick={handleClick}
        />
    )
}

function renderGraph(ctx:CanvasRenderingContext2D, attempts:Attempt[], r: number) {

    if (r <= 0) return;
    const canvasR = r * rScale;

    ctx.clearRect(0, 0, canvasSize, canvasSize);
    ctx.fillStyle = areasColor;
    drawAreas(ctx, canvasR);
    ctx.strokeStyle = graphColor;
    ctx.fillStyle = graphColor;
    drawAbscissaAxis(ctx);
    drawOrdinateAxis(ctx);
    drawLabels(ctx, canvasR);

    attempts.forEach(attempt => {
        const x = attempt.x * rScale + canvasSize / 2;
        const y = -attempt.y * rScale + canvasSize / 2;

        ctx.fillStyle = (attempt.hit ? 'green' : 'red');
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
    });
}

function drawAbscissaAxis(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.moveTo(0, canvasSize/2);
    ctx.lineTo(canvasSize, canvasSize/2);
    ctx.lineTo(canvasSize-10, canvasSize/2-10);
    ctx.moveTo(canvasSize, canvasSize/2);
    ctx.lineTo(canvasSize-10,canvasSize/2+10);
    ctx.stroke();
}

function drawOrdinateAxis(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.moveTo(canvasSize/2, canvasSize);
    ctx.lineTo(canvasSize/2, 0);
    ctx.lineTo(canvasSize/2-10, 10);
    ctx.moveTo(canvasSize/2, 0);
    ctx.lineTo(canvasSize/2+10, 10);
    ctx.stroke();
}

function drawLabels(ctx: CanvasRenderingContext2D, r: number ) {
    const labels = ['-R', '-R/2', '', 'R/2', 'R'];

    const firstStep = canvasSize/2 - r;
    const nextStep = r/2;

    for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(firstStep + i * nextStep, canvasSize/2 - 5);
        ctx.lineTo(firstStep + i * nextStep, canvasSize/2 + 5);
        ctx.moveTo(canvasSize/2 - 5, firstStep + i * nextStep);
        ctx.lineTo(canvasSize/2 + 5, firstStep + i * nextStep);
        ctx.stroke();

        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillText(labels[i], firstStep + i * nextStep, canvasSize/2 - 7);

        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(labels[4 - i], canvasSize/2 + 7, firstStep + i * nextStep);
    }
}

function drawRectangle(ctx: CanvasRenderingContext2D, r: number) {
    ctx.fillRect(canvasSize/2, canvasSize/2 - r, r, r)
}

function drawTriangle(ctx: CanvasRenderingContext2D, r: number) {
    ctx.beginPath();
    ctx.moveTo(canvasSize / 2, canvasSize / 2);
    ctx.lineTo(canvasSize / 2 + r, canvasSize / 2);
    ctx.lineTo(canvasSize / 2, canvasSize / 2 + r/2);
    ctx.fill();
}

function drawSector(ctx: CanvasRenderingContext2D, r: number) {
    ctx.beginPath();
    ctx.arc(
        canvasSize / 2,
        canvasSize / 2,
        r/2,
        Math.PI / 2,
        - Math.PI,
        false
    );
    ctx.lineTo(canvasSize / 2, canvasSize / 2);
    ctx.fill();
}

function drawAreas(ctx: CanvasRenderingContext2D, r: number) {
    drawTriangle(ctx, r);
    drawSector(ctx, r);
    drawRectangle(ctx, r);
}



