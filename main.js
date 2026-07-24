import OBR from "https://esm.sh/@owlbear-rodeo/sdk";

OBR.onReady(async () => {
  // Register the button on the context menu of selected tokens/props
  await OBR.contextMenu.create({
    id: "com.layer-toggler/toggle",
    icons: [
      {
        icon: "https://fancy-raptor.github.io/Layer-Toggler/layers.svg",
        label: "Layer swap",
        filter: {
          roles: ["GM"], // Optional: restrict to GM if desired
        },
      },
    ],
    async onClick(context) {
      // Map item IDs to update their layer
      await OBR.scene.items.updateItems(context.items, (items) => {
        for (let item of items) {
          item.layer = item.layer === "PROP" ? "ATTACHMENT" : "PROP";
        }
      });
    },
  });
});
