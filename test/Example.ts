import NeoCamera from "de/neoimpulse/NeoCamera";
import NeoMultiComboBox from "de/neoimpulse/NeoMultiComboBox";
import NeoSignature from "de/neoimpulse/NeoSignature";
import HBox from "sap/m/HBox";
import Label from "sap/m/Label";
import VBox from "sap/m/VBox";

// place it into the DOM element with the id "content"
new VBox({
    width: "400px",
    class: "sapUiContentPadding",
    items: [
        new Label({ text: "NeoCamera:" }),
        new NeoCamera({}),
        new HBox({
            height: "20px"
        }),
        new Label({ text: "NeoSignature:" }),
        new NeoSignature({}),
        new HBox({
            height: "20px"
        }),
        new Label({ text: "NeoMultiComboBox:" }),
        new NeoMultiComboBox({})
    ]
}).placeAt("content");
