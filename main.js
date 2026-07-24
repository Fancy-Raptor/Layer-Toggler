import OBR from "https://esm.sh/@owlbear-rodeo/sdk";

// Reusable toggle logic for selected items
async function toggleSelectedItemsLayer(targetIds) {
  if (!targetIds || targetIds.length === 0) return;

  await OBR.scene.items.updateItems(targetIds, (items) => {
    for (let item of items) {
      // Toggle only items that are on PROP or ATTACHMENT layers
      const currentLayer = String(item.layer).toUpperCase();
      if (currentLayer === "PROP") {
        item.layer = "ATTACHMENT";
      } else if (currentLayer === "ATTACHMENT") {
        item.layer = "PROP";
      }
    }
  });
}

OBR.onReady(async () => {
  // 1. Context Menu Button Action (No filter blocking the menu item)
  await OBR.contextMenu.create({
    id: "com.layer-toggler/toggle",
    icons: [
      {
        icon: "https://fancy-raptor.github.io/Layer-Toggler/layers.svg",
        label: "Toggle Prop / Attachment Layer",
      },
    ],
    async onClick(context) {
      const targetIds = context.items.map((item) => item.id);
      await toggleSelectedItemsLayer(targetIds);
    },
  });

  // 2. Keyboard Listener for Shift + Z
  window.addEventListener("keydown", async (e) => {
    // Don't trigger if user is typing in a text field
    const activeElement = document.activeElement;
    const isTyping = activeElement && ["INPUT", "TEXTAREA"].includes(activeElement.tagName);
    if (isTyping) return;

    if (e.shiftKey && e.key.toLowerCase() === "z") {
      e.preventDefault();
      const selection = await OBR.player.getSelection();
      await toggleSelectedItemsLayer(selection);
    }
  });
});
