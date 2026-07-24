import OBR from "https://esm.sh/@owlbear-rodeo/sdk";

OBR.onReady(async () => {
  // Register the button on the context menu
  await OBR.contextMenu.create({
    id: "com.layer-toggler/toggle",
    icons: [
      {
        icon: "https://fancy-raptor.github.io/Layer-Toggler/layers.svg",
        label: "Toggle Prop / Attachment Layer",
        filter: {
          // Explicitly target items on PROP or ATTACHMENT layers
          every: [
            {
              key: "layer",
              value: ["PROP", "ATTACHMENT"],
              operator: "in"
            }
          ]
        }
      }
    ],
    async onClick(context) {
      // Extract target IDs from context
      const targetIds = context.items.map((item) => item.id);

      if (targetIds.length === 0) return;

      // Execute update via callback function
      await OBR.scene.items.updateItems(targetIds, (items) => {
        for (let item of items) {
          // Normalize layer check (fallback to ATTACHMENT if layer is PROP, otherwise set to PROP)
          const currentLayer = String(item.layer).toUpperCase();
          item.layer = currentLayer === "PROP" ? "ATTACHMENT" : "PROP";
        }
      });
    }
  });
});
