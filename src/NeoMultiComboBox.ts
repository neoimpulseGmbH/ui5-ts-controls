import MultiComboBox from "sap/m/MultiComboBox";
import type { MetadataOptions } from "sap/ui/core/Element";
import { PropertyBindingInfo } from "sap/ui/base/ManagedObject";
import BindingMode from "sap/ui/model/BindingMode";
import ODataModel from "sap/ui/model/odata/v4/ODataModel";
import ODataListBinding from "sap/ui/model/odata/v4/ODataListBinding";
import Event from "sap/ui/base/Event";
import Context from "sap/ui/model/odata/v4/Context";

const MultiComboBoxRenderer: any = sap.ui.require("sap/m/MultiComboBoxRenderer");

/**
 * @namespace de.neoimpulse
 */
export default class NeoMultiComboBox extends MultiComboBox {
    constructor(idOrSettings?: string | $NeoMultiComboBoxSettings);
    constructor(idOrSettings?: string | $NeoMultiComboBoxSettings, settings?: $NeoMultiComboBoxSettings);
    constructor(idOrSettings?: string | $NeoMultiComboBoxSettings, settings?: $NeoMultiComboBoxSettings) {
        const options = (settings || idOrSettings) as $NeoMultiComboBoxSettings;
        if (options?.entriesPath && typeof !Array.isArray(options?.entriesPath)) {
            const selectedEntries = options?.entriesPath as PropertyBindingInfo;
            selectedEntries.mode = BindingMode.OneTime;
            selectedEntries.targetType = "any";
        }
        super(idOrSettings as string, options);
    }

    public hasChangeEvent = false;

    onAfterRendering(event: jQuery.Event): void | undefined {
        super.onAfterRendering(event);
        const entriesKeyPath = this.getProperty("entriesKeyPath") as string;
        if (entriesKeyPath && !this.hasChangeEvent) {
            this.hasChangeEvent = true;
            this.attachSelectionChange(this.handleSelectionChange.bind(this));
        }
    }

    static readonly metadata: MetadataOptions = {
        properties: {
            entriesKeyPath: {
                type: "string"
            },
            entriesPath: {
                type: "string",
                bindable: "bindable"
            }
        }
    };

    async setEntriesPath() {
        const bindingInfo = this.getBindingInfo("entriesPath") as any;
        const entriesPath = bindingInfo?.binding?.sPath;
        const context = this.getBindingContext() as any;
        const model = context?.getModel() as ODataModel;
        const selectedEntires = model?.bindList(context.getPath() + "/" + entriesPath);
        const centexts = await selectedEntires.requestContexts();
        const entriesKeyPath = this.getEntriesKeyPath();
        const selectedKeys: string[] = [];
        for (const context of centexts) {
            const key = await context.requestProperty(entriesKeyPath);
            selectedKeys.push(key);
        }
        this.setSelectedKeys(selectedKeys);
    }

    async handleSelectionChange(event: Event) {
        const source: NeoMultiComboBox = event.getSource();
        const parameters = event.getParameters() as any;
        const selected = parameters.selected;
        const model = source.getModel();
        const item = parameters.changedItem;
        const itemContext = item.getBindingContext();
        const itemData = itemContext.getObject();
        const bindingContext = source.getBindingContext() as Context;
        const bindingInfo = source.getBindingInfo("entriesPath") as any;
        const entriesPath = bindingInfo?.binding?.sPath;
        const entriesKeyPath = this.getEntriesKeyPath();
        const binding = model?.bindList(bindingContext.getPath() + "/" + entriesPath) as ODataListBinding;
        if (selected) {
            binding?.create({
                [entriesKeyPath]: itemData.code
            });
        } else {
            const contexts = await binding.requestContexts();
            for (const context of contexts) {
                const data = context.getObject();
                if (data[entriesKeyPath] === itemData.code) {
                    await context.delete();
                }
            }
        }
    }

    static readonly renderer = MultiComboBoxRenderer;
}
