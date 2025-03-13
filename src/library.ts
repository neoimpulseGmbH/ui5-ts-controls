/*!
 * ${copyright}
 */

import Lib from "sap/ui/core/Lib";

// library dependencies must also be imported here
import "sap/ui/core/library";

/**
 * Initialization Code and shared classes of library de.neoimpulse.
 */

// delegate further initialization of this library to the Core
const thisLib: { [key: string]: unknown } = Lib.init({
    name: "de.neoimpulse",
    version: "${version}",
    dependencies: [
        // keep in sync with the ui5.yaml and .library files
        "sap.ui.core",
        "sap.m"
    ],
    types: ["de.neoimpulse.ExampleColor"],
    interfaces: [],
    controls: ["de.neoimpulse.NeoCamera", "de.neoimpulse.NeoSignature", "de.neoimpulse.NeoMultiComboBox"],
    elements: [],
    noLibraryCSS: false // if no CSS is provided, you can disable the library.css load here
}) as { [key: string]: unknown };

// export the library namespace
export default thisLib;
