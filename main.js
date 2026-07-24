import OBR from "https://esm.sh/@owlbear-rodeo/sdk";

// Reusable toggle logic so both Context Menu and Keybind use the exact same execution
async function toggleSelectedItemsLayer(targetIds) {
  if (!targetIds || targetIds.length === 0) return;

  await OBR.scene.items.updateItems(targetIds, (items) => {
    for (let item of items) {
      const currentLayer = String(item.layer).toUpperCase();
      item.layer = currentLayer === "PROP" ? "ATTACHMENT" : "PROP";
    }
  });
}

OBR.onReady(async () => {
  // 1. Context Menu Button Action
  await OBR.contextMenu.create({
    id: "com.layer-toggler/toggle",
    icons: [
      {
        icon: "https://fancy-raptor.github.io/Layer-Toggler/layers.svg",
        label: "Toggle Prop / Attachment Layer",
        filter: {
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
      const targetIds = context.items.map((item) => item.id);
      await toggleSelectedItemsLayer(targetIds);
    }
  });

  // 2. Global Keyboard Listener for Shift + Z
  window.addEventListener("keydown", async (e) => {
    // Check for Shift + Z (or Shift + z)
    if (e.shiftKey && e.key.toLowerCase() === "z") {
      // Prevent browser default actions if needed
      e.preventDefault();

      // Get the current player's selected item IDs
      const selection = await OBR.player.getSelection();

      // Run the toggle function on selected items
      await toggleSelectedItemsLayer(selection);
    }
  });
});
