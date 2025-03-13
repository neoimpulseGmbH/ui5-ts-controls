import Event from "sap/ui/base/Event";
import { PropertyBindingInfo } from "sap/ui/base/ManagedObject";
import { $ControlSettings } from "sap/ui/core/Control";

declare module "./NeoCamera" {

    /**
     * Interface defining the settings object used in constructor calls
     */
    interface $NeoCameraSettings extends $ControlSettings {
        width?: string | PropertyBindingInfo;
        height?: string | PropertyBindingInfo;
        videoWidth?: string | PropertyBindingInfo;
        videoHeight?: string | PropertyBindingInfo;
        tookPicture?: (event: NeoCamera$TookPictureEvent) => void;
        takePicture?: (event: NeoCamera$TakePictureEvent) => void;
    }

    export default interface NeoCamera {

        // property: width
        getWidth(): string;
        setWidth(width: string): this;

        // property: height
        getHeight(): string;
        setHeight(height: string): this;

        // property: videoWidth
        getVideoWidth(): string;
        setVideoWidth(videoWidth: string): this;

        // property: videoHeight
        getVideoHeight(): string;
        setVideoHeight(videoHeight: string): this;

        // event: tookPicture
        attachTookPicture(fn: (event: NeoCamera$TookPictureEvent) => void, listener?: object): this;
        attachTookPicture<CustomDataType extends object>(data: CustomDataType, fn: (event: NeoCamera$TookPictureEvent, data: CustomDataType) => void, listener?: object): this;
        detachTookPicture(fn: (event: NeoCamera$TookPictureEvent) => void, listener?: object): this;
        fireTookPicture(parameters?: NeoCamera$TookPictureEventParameters): this;

        // event: takePicture
        attachTakePicture(fn: (event: NeoCamera$TakePictureEvent) => void, listener?: object): this;
        attachTakePicture<CustomDataType extends object>(data: CustomDataType, fn: (event: NeoCamera$TakePictureEvent, data: CustomDataType) => void, listener?: object): this;
        detachTakePicture(fn: (event: NeoCamera$TakePictureEvent) => void, listener?: object): this;
        fireTakePicture(parameters?: NeoCamera$TakePictureEventParameters): this;
    }

    /**
     * Interface describing the parameters of NeoCamera's 'tookPicture' event.
     */
    export interface NeoCamera$TookPictureEventParameters {
        image?: string;
    }

    /**
     * Interface describing the parameters of NeoCamera's 'takePicture' event.
     */
    // eslint-disable-next-line
    export interface NeoCamera$TakePictureEventParameters {
    }

    /**
     * Type describing the NeoCamera's 'tookPicture' event.
     */
    export type NeoCamera$TookPictureEvent = Event<NeoCamera$TookPictureEventParameters>;

    /**
     * Type describing the NeoCamera's 'takePicture' event.
     */
    export type NeoCamera$TakePictureEvent = Event<NeoCamera$TakePictureEventParameters>;
}
