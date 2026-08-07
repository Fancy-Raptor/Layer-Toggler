import OBR from "https://esm.sh/@owlbear-rodeo/sdk";

// Define the rotation order
const NEXT_LAYER = {
  MOUNT: "CHARACTER",
  CHARACTER: "MOUNT",
};

// Human-readable labels for the notifications
const LAYER_LABELS = {
  MOUNT: "Mount layer",
  CHARACTER: "Character layer",
};

OBR.onReady(async () => {
  // Register the button on the context menu of selected tokens/props
  await OBR.contextMenu.create({
    id: "com.layer-toggler/toggle",
    icons: [
      {
        icon: "https://fancy-raptor.github.io/Layer-Toggler/layers.svg",
        label: "Layer swap",
      },
    ],
    async onClick(context) {
      let newLayerName = "";

      // Map item IDs to update their layer
      await OBR.scene.items.updateItems(context.items, (items) => {
        for (let item of items) {
          // Cycle to the next layer (fallback to MOUNT if current layer is unrecognized)
          item.layer = NEXT_LAYER[item.layer] || "MOUNT";
          
          // Capture the friendly name for the notification
          newLayerName = LAYER_LABELS[item.layer] || `${item.layer} layer`;
        }
      });

      // Show a temporary pop-up notification in Owlbear Rodeo
      if (newLayerName) {
        OBR.notification.show(`Moved to ${newLayerName}`);
      }
    },
  });
});
