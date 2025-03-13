import RenderManager from "sap/ui/core/RenderManager";
import Control from "sap/ui/core/Control";

/**
 * @namespace de.neoimpulse
 */
export default class NeoSignatureRenderer {
    public static render(renderManager: RenderManager, control: Control): void {
        renderManager.openStart("div", control);
        renderManager.style("display", "flex");
        renderManager.style("flexDirection", "column");
        renderManager.style("alignItems", "center");
        renderManager.style("justifyContent", "center");
        renderManager.style("border", "1px solid #ccc");
        renderManager.style("background", "#fff");
        renderManager.style("width", control.getWidth() + "px");
        renderManager.style("height", control.getHeight() + "px");
        renderManager.openEnd();

        renderManager.voidStart("canvas");
        renderManager.attr("width", control.getWidth());
        renderManager.attr("height", control.getHeight());
        renderManager.voidEnd();

        renderManager.close("div");
    }
}
