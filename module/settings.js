export const registerSystemSettings = function () {

  game.settings.register("touhouvq", "disableFrolicButtonsGM", {
    name: "SETTINGS.disableFrolicButtonsGM",
    hint: "SETTINGS.disableFrolicButtonsGMHint",
    scope: "world",
    config: true,
    default: true,
    type: Boolean
  });

}