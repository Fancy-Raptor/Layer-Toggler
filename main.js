import OBR from "https://esm.sh/@owlbear-rodeo/sdk";

OBR.onReady(async () => {
  // Register the button on the floating selection context menu
  await OBR.contextMenu.create({
    id: "com.layer-toggler/toggle",
    icons: [
      {
        icon: "https://fancy-raptor.github.io/Layer-Toggler/layers.svg",
        label: "Layer swap",
        filter: {
          layers: ["PROP", "ATTACHMENT"], // Ensures it only appears on Prop and Attachment items
        },
      },
    ],
    async onClick(context) {
      // Toggle layer between PROP and ATTACHMENT for selected items
      await OBR.scene.items.updateItems(context.items, (items) => {
        for (let item of items) {
          item.layer = item.layer === "PROP" ? "ATTACHMENT" : "PROP";
        }
      });
    },
  });
});
