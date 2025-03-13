import Event from "sap/ui/base/Event";
import { PropertyBindingInfo } from "sap/ui/base/ManagedObject";
import { $ControlSettings } from "sap/ui/core/Control";

declare module "./NeoSignature" {

    /**
     * Interface defining the settings object used in constructor calls
     */
    interface $NeoSignatureSettings extends $ControlSettings {
        width?: string | PropertyBindingInfo;
        height?: string | PropertyBindingInfo;
        capturedSignature?: (event: NeoSignature$CapturedSignatureEvent) => void;
        captureSignature?: (event: NeoSignature$CaptureSignatureEvent) => void;
        clearSignature?: (event: NeoSignature$ClearSignatureEvent) => void;
        stoppedSigning?: (event: NeoSignature$StoppedSigningEvent) => void;
    }

    export default interface NeoSignature {

        // property: width
        getWidth(): string;
        setWidth(width: string): this;

        // property: height
        getHeight(): string;
        setHeight(height: string): this;

        // event: capturedSignature
        attachCapturedSignature(fn: (event: NeoSignature$CapturedSignatureEvent) => void, listener?: object): this;
        attachCapturedSignature<CustomDataType extends object>(data: CustomDataType, fn: (event: NeoSignature$CapturedSignatureEvent, data: CustomDataType) => void, listener?: object): this;
        detachCapturedSignature(fn: (event: NeoSignature$CapturedSignatureEvent) => void, listener?: object): this;
        fireCapturedSignature(parameters?: NeoSignature$CapturedSignatureEventParameters): this;

        // event: captureSignature
        attachCaptureSignature(fn: (event: NeoSignature$CaptureSignatureEvent) => void, listener?: object): this;
        attachCaptureSignature<CustomDataType extends object>(data: CustomDataType, fn: (event: NeoSignature$CaptureSignatureEvent, data: CustomDataType) => void, listener?: object): this;
        detachCaptureSignature(fn: (event: NeoSignature$CaptureSignatureEvent) => void, listener?: object): this;
        fireCaptureSignature(parameters?: NeoSignature$CaptureSignatureEventParameters): this;

        // event: clearSignature
        attachClearSignature(fn: (event: NeoSignature$ClearSignatureEvent) => void, listener?: object): this;
        attachClearSignature<CustomDataType extends object>(data: CustomDataType, fn: (event: NeoSignature$ClearSignatureEvent, data: CustomDataType) => void, listener?: object): this;
        detachClearSignature(fn: (event: NeoSignature$ClearSignatureEvent) => void, listener?: object): this;
        fireClearSignature(parameters?: NeoSignature$ClearSignatureEventParameters): this;

        // event: stoppedSigning
        attachStoppedSigning(fn: (event: NeoSignature$StoppedSigningEvent) => void, listener?: object): this;
        attachStoppedSigning<CustomDataType extends object>(data: CustomDataType, fn: (event: NeoSignature$StoppedSigningEvent, data: CustomDataType) => void, listener?: object): this;
        detachStoppedSigning(fn: (event: NeoSignature$StoppedSigningEvent) => void, listener?: object): this;
        fireStoppedSigning(parameters?: NeoSignature$StoppedSigningEventParameters): this;
    }

    /**
     * Interface describing the parameters of NeoSignature's 'capturedSignature' event.
     */
    export interface NeoSignature$CapturedSignatureEventParameters {
        signature?: string;
    }

    /**
     * Interface describing the parameters of NeoSignature's 'captureSignature' event.
     */
    // eslint-disable-next-line
    export interface NeoSignature$CaptureSignatureEventParameters {
    }

    /**
     * Interface describing the parameters of NeoSignature's 'clearSignature' event.
     */
    // eslint-disable-next-line
    export interface NeoSignature$ClearSignatureEventParameters {
    }

    /**
     * Interface describing the parameters of NeoSignature's 'stoppedSigning' event.
     */
    // eslint-disable-next-line
    export interface NeoSignature$StoppedSigningEventParameters {
    }

    /**
     * Type describing the NeoSignature's 'capturedSignature' event.
     */
    export type NeoSignature$CapturedSignatureEvent = Event<NeoSignature$CapturedSignatureEventParameters>;

    /**
     * Type describing the NeoSignature's 'captureSignature' event.
     */
    export type NeoSignature$CaptureSignatureEvent = Event<NeoSignature$CaptureSignatureEventParameters>;

    /**
     * Type describing the NeoSignature's 'clearSignature' event.
     */
    export type NeoSignature$ClearSignatureEvent = Event<NeoSignature$ClearSignatureEventParameters>;

    /**
     * Type describing the NeoSignature's 'stoppedSigning' event.
     */
    export type NeoSignature$StoppedSigningEvent = Event<NeoSignature$StoppedSigningEventParameters>;
}
