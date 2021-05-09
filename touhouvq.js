import { touhouvq } from "./module/config.js";
import touhouvqItemSheet from "./module/sheets/touhouvqItemSheet.js";

Hooks.once("init", function() {
  console.log("touhouvq | Initialising Touhou:VenturesomeQuest! System");

  CONFIG.touhouvq = touhouvq;

  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("touhouvq", touhouvqItemSheet, { makeDefault: true });
});
