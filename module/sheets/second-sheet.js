export class SecondSheet extends FormApplication {

  /** @override */
  constructor(actor) {
    super(actor, {
      closeOnSubmit: false,
      submitOnChange: true,
      submitOnClose: true,
      title: actor.name
     });

    this.actor = actor;
  }

  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["touhouvq", "sheet", "character", "second-sheet"],
      template: 'systems/touhouvq/templates/sheets/character-second-sheet.html',
      width: 638,
      height: 771
    });
  }

  /** @override */
  getData() {
    const sheetData = {};

    // The Actor's data
    const actorData = this.actor.data.toObject(false);
    sheetData.actor = actorData;
    sheetData.data = actorData.data;

    return sheetData;
  }

  /** @inheritdoc */
  async _updateObject(event, formData) {
    if ( !this.object.id ) return;
    return this.object.update(formData);
  }
}