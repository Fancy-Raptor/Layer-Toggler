import OBR from "https://esm.sh/@owlbear-rodeo/sdk";

OBR.onReady(() => {
  OBR.contextMenu.create({
    id: "com.layer-toggler/toggle",
    icons: [
      {
        icon: "/layers.svg",
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
});
