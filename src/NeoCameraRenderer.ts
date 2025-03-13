import RenderManager from "sap/ui/core/RenderManager";
import Control from "sap/ui/core/Control";

/**
 * @namespace de.neoimpulse
 */
export default class NeoCameraRenderer {
    public static render(renderManager: RenderManager, control: Control): void {
        renderManager.openStart("div", control);
        renderManager.style("display", "flex");
        renderManager.style("flexDirection", "column");
        renderManager.style("alignItems", "center");
        renderManager.style("justifyContent", "center");
        renderManager.style("position", "relative");
        renderManager.style("width", `${control.getProperty("width")}%`);
        renderManager.style("height", `${control.getProperty("height")}%`);
        renderManager.style("overflow", "hidden");
        renderManager.openEnd();

        // Video Element
        renderManager.voidStart("video");
        renderManager.style("width", `${control.getProperty("width")}%`);
        renderManager.style("height", `${control.getProperty("height")}%`);
        renderManager.style("object-fit", "cover");
        renderManager.voidEnd();

        // Hidden Canvas for Capturing
        renderManager.voidStart("canvas");
        renderManager.attr("width", control.getProperty("videoWidth"));
        renderManager.attr("height", control.getProperty("videoHeight"));
        renderManager.style("display", "none");
        renderManager.voidEnd();

        renderManager.close("div");
    }
}
