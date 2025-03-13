import Control from "sap/ui/core/Control";
import NeoSignatureRenderer from "./NeoSignatureRenderer";

/**
 * @namespace de.neoimpulse
 */
export default class NeoSignature extends Control {
    private canvas: HTMLCanvasElement | null = null;
    private ctx: CanvasRenderingContext2D | null = null;
    private isDrawing: boolean = false;

    static metadata = {
        properties: {
            width: { type: "string", defaultValue: "275" },
            height: { type: "string", defaultValue: "200" }
        },
        events: {
            capturedSignature: {
                parameters: {
                    signature: { type: "string" }
                }
            },
            captureSignature: {},
            clearSignature: {},
            stoppedSigning: {}
        }
    };

    static renderer = NeoSignatureRenderer;

    constructor(idOrSettings?: string | $NeoSignatureSettings);
    constructor(id?: string, settings?: $NeoSignatureSettings);
    constructor(id?: string, settings?: $NeoSignatureSettings) {
        super(id, settings);
    }

    init(): void {
        super.init();
    }

    onAfterRendering(): void {
        super.onAfterRendering();
        this.canvas = this._getCanvasElement();
        if (this.canvas) {
            this.ctx = this.canvas.getContext("2d");
            if (this.ctx) {
                this.ctx.fillStyle = "white";
                this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
                this.setupEventListeners();
            }
        }

        this.attachEvent("captureSignature", () => {
            this._captureSignature();
        });

        this.attachEvent("stoppedSigning", () => {
            this._captureSignature();
        });

        this.attachEvent("clearSignature", () => {
            this._clearSignature();
            this._captureSignature();
        });
    }

    setupEventListeners(): void {
        if (this.canvas) {
            this.canvas.addEventListener("mousedown", this._startDrawing.bind(this));
            this.canvas.addEventListener("mousemove", this._draw.bind(this));
            this.canvas.addEventListener("mouseup", this._stopDrawing.bind(this));
            this.canvas.addEventListener("mouseout", this._stopDrawing.bind(this));

            this.canvas.addEventListener("touchstart", this._touchStart.bind(this));
            this.canvas.addEventListener("touchmove", this._touchDraw.bind(this));
            this.canvas.addEventListener("touchend", this._stopDrawing.bind(this));
        }
    }

    _touchStart(event: TouchEvent): void {
        var touch = event.touches[0];
        var mouseEvent = new MouseEvent("mousedown", {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        this.canvas?.dispatchEvent(mouseEvent);
    }

    _touchDraw(event: TouchEvent): void {
        event.preventDefault();
        event.stopPropagation();
        var touch = event.touches[0];
        var mouseEvent = new MouseEvent("mousemove", {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        this.canvas?.dispatchEvent(mouseEvent);
    }

    _startDrawing(event: MouseEvent): void {
        if (this.ctx && this.canvas) {
            this.isDrawing = true;
            const rect = this.canvas.getBoundingClientRect();
            this.ctx.beginPath();
            this.ctx.moveTo(event.clientX - rect.left, event.clientY - rect.top);
        }
    }

    _draw(event: MouseEvent): void {
        if (this.isDrawing && this.ctx && this.canvas) {
            const rect = this.canvas.getBoundingClientRect();
            this.ctx.lineTo(event.clientX - rect.left, event.clientY - rect.top);
            this.ctx.stroke();
        }
    }

    _stopDrawing(): void {
        if (this.isDrawing) {
            this.isDrawing = false;
            if (this.ctx) {
                this.ctx.closePath();
            }
            this.fireEvent("stoppedSigning");
        }
    }

    _clearSignature(): void {
        if (this.ctx && this.canvas) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.fillStyle = "white";
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }

    _captureSignature(): void {
        if (this.canvas) {
            const signature = this.canvas.toDataURL("image/png");
            this.fireEvent("capturedSignature", { signature });
        }
    }

    private _getCanvasElement(): HTMLCanvasElement | null {
        return this.getDomRef()?.querySelector("canvas") as HTMLCanvasElement;
    }
}
