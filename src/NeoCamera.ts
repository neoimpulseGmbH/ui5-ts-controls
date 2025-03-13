import Control from "sap/ui/core/Control";
import NeoCameraRenderer from "./NeoCameraRenderer";

/**
 * @namespace de.neoimpulse
 */
export default class NeoCamera extends Control {
    console: Console;

    static metadata = {
        properties: {
            width: { type: "string", defaultValue: "100" },
            height: { type: "string", defaultValue: "100" },
            videoWidth: { type: "string", defaultValue: "2160" },
            videoHeight: { type: "string", defaultValue: "3840" }
        },
        events: {
            tookPicture: {
                parameters: {
                    image: { type: "string" }
                }
            },
            takePicture: {}
        }
    };

    static renderer = NeoCameraRenderer;

    constructor(idOrSettings?: string | $NeoCameraSettings);
    constructor(id?: string, settings?: $NeoCameraSettings);
    constructor(id?: string, settings?: $NeoCameraSettings) {
        super(id, settings);
        this.attachEvent("takePicture", () => {
            this._triggerVideoEffect();
            const image = this._takePicture();
            if (image) {
                this.fireEvent("tookPicture", {
                    image: image
                });
            }
        });
    }

    public getMediaDevices(): MediaDevices {
        return navigator.mediaDevices;
    }

    public onAfterRendering(event: jQuery.Event): void {
        super.onAfterRendering(event);
        const canvas = this._getCanvasElement();
        const video = this._getVideoElement();
        if (video && canvas) {
            const mediaDevices = this.getMediaDevices();
            mediaDevices
                .getUserMedia({ video: { facingMode: "environment" }, audio: false })
                .then((stream) => {
                    video.srcObject = stream;
                    video.onloadedmetadata = () => {
                        canvas.width = video.videoWidth;
                        canvas.height = video.videoHeight;
                    };
                    void video.play();
                })
                .catch((err) => {
                    this.console.error("Error accessing the camera:", err);
                });
        }
    }

    private _takePicture(): string | null {
        const canvas = this._getCanvasElement();
        const video = this._getVideoElement();
        if (canvas && video) {
            const context = canvas.getContext("2d");
            if (context) {
                const videoWidth = video.videoWidth;
                const videoHeight = video.videoHeight;
                const canvasWidth = canvas.width;
                const canvasHeight = canvas.height;

                const videoAspect = videoWidth / videoHeight;
                const canvasAspect = canvasWidth / canvasHeight;

                let sx = 0,
                    sy = 0,
                    sWidth = videoWidth,
                    sHeight = videoHeight;

                if (videoAspect > canvasAspect) {
                    sWidth = videoHeight * canvasAspect;
                    sx = (videoWidth - sWidth) / 2;
                } else {
                    sHeight = videoWidth / canvasAspect;
                    sy = (videoHeight - sHeight) / 2;
                }

                context.drawImage(video, sx, sy, sWidth, sHeight, 0, 0, canvasWidth, canvasHeight);

                return canvas.toDataURL("image/png");
            }
        }
        return null;
    }

    private _triggerVideoEffect(): void {
        const video = this._getVideoElement();
        if (video) {
            video.classList.add("camera-flash");
            setTimeout(() => {
                video.classList.remove("camera-flash");
            }, 1000);
        }
    }

    private _getCanvasElement(): HTMLCanvasElement | null {
        return this.getDomRef()?.querySelector("canvas") as HTMLCanvasElement;
    }

    private _getVideoElement(): HTMLVideoElement | null {
        return this.getDomRef()?.querySelector("video") as HTMLVideoElement;
    }

    public stopCamera(): void {}
}
