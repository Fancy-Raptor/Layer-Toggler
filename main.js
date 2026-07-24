import OBR from "https://esm.sh/@owlbear-rodeo/sdk";

OBR.onReady(async () => {
  // Register the button on the context menu of selected tokens/props
  await OBR.contextMenu.create({
    id: "com.layer-toggler/toggle",
    icons: [
      {
        icon: "https://fancy-raptor.github.io/Layer-Toggler/layers.svg",
        label: "Toggle Prop / Attachment Layer",
      }
    ],
    async onClick(context) {
      const updates = context.items.map((item) => ({
        id: item.id,
        layer: item.layer === "PROP" ? "ATTACHMENT" : "PROP",
      }));

      await OBR.scene.items.updateItems(updates);
    }
  });

  // Automatically close the action popover so no menu stays open
  OBR.action.close();
});
