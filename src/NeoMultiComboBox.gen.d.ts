import { PropertyBindingInfo } from "sap/ui/base/ManagedObject";
import { $MultiComboBoxSettings } from "sap/m/MultiComboBox";

declare module "./NeoMultiComboBox" {

    /**
     * Interface defining the settings object used in constructor calls
     */
    interface $NeoMultiComboBoxSettings extends $MultiComboBoxSettings {
        entriesKeyPath?: string | PropertyBindingInfo;
        entriesPath?: string | PropertyBindingInfo;
    }

    export default interface NeoMultiComboBox {

        // property: entriesKeyPath
        getEntriesKeyPath(): string;
        setEntriesKeyPath(entriesKeyPath: string): this;

        // property: entriesPath
        getEntriesPath(): string;
        setEntriesPath(entriesPath: string): this;
        bindEntriesPath(bindingInfo: PropertyBindingInfo): this;
        unbindEntriesPath(): this;
    }
}
