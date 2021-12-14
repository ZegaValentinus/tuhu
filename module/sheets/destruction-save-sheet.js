import * as Tchat from "../tchat.js";

export class DestructionSave extends FormApplication {

  /** @override */
  constructor(item, actor, text) {
    super(actor, {
      closeOnSubmit: false,
      submitOnChange: true,
      submitOnClose: true,
      title: text
     });

    this.actor = actor;
    this.item = item;
  }

  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["touhouvq", "sheet", "character"],
      template: 'systems/touhouvq/templates/sheets/destruction-save-sheet.html',
      width: 338,
      height: 170
    });
  }

  /** @override */
  getData() {
    const sheetData = {};

    // The Actor's data
    const actorData = this.actor;
    sheetData.actor = actorData;
    sheetData.item = this.item;

    return sheetData;
  }

  /** @inheritdoc */
  async _updateObject(event, formData) {
    if ( !this.object.id ) return;
    return this.object.update(formData);
  }

  //Override
  activateListeners(html) {
    super.activateListeners(html);

    html.find('.destrsave-button-1').click(this._onDestr1Check.bind(this));
    html.find('.destrsave-button-2').click(this._onDestr2Check.bind(this));
  }

  _onDestr1Check(event) {
    event.preventDefault();
    let element = event.currentTarget;
    const item = element.dataset.item;
    const actor = element.dataset.actor;

    let difficulty = 1;
    let sauvDestrLabel = game.i18n.localize("touhouvq.sheet.destructionSaveDifficulty1");

    Tchat.armorBreakCheck({
      actorID: actor,
      itemID: item,
      difficulty: difficulty,
      sauvDestrLabel: sauvDestrLabel
    });
  }

  _onDestr2Check(event) {
    event.preventDefault();
    let element = event.currentTarget;
    const item = element.dataset.item;
    const actor = element.dataset.actor;

    let difficulty = 2;
    let sauvDestrLabel = game.i18n.localize("touhouvq.sheet.destructionSaveDifficulty2");

    Tchat.armorBreakCheck({
      actorID: actor,
      itemID: item,
      difficulty: difficulty,
      sauvDestrLabel: sauvDestrLabel
    });
  }
}