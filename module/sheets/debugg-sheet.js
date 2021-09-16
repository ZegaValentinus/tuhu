export class ActiveEffectsDebugg extends DocumentSheet {

  /** @override */
  constructor(actor) {
    super(actor, {
      closeOnSubmit: false,
      submitOnChange: true,
      submitOnClose: true,
      title: "ActiveEffects Debugg"
     });

    this.actor = actor;
  }

  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["touhouvq", "sheet", "character"],
      template: 'systems/touhouvq/templates/sheets/debugg-sheet.html',
      width: 380,
      height: 580
    });
  }

  /** @override */
  getData() {
    const sheetData = {};

    // The Actor's data
    const actorData = this.actor.data.toObject(false);
    sheetData.actor = actorData;

    console.log(sheetData.actor.effects);

    return sheetData;
  }

  activateListeners(html) {
    html.find('button').click(this._onDebuggChange.bind(this));

    super.activateListeners(html);
  }

  _onDebuggChange(event) {
    event.preventDefault();
    const buttonElem = event.currentTarget;
    const effectID = buttonElem.closest(".tvq-activeeffects-div").dataset.effectId;

    if(buttonElem.classList.contains("tvq-deleteeffect")) {
      this.actor.deleteEmbeddedDocuments('ActiveEffect', [effectID]);
    } else {
      const effect = this.actor.effects.get(effectID);
      effect.sheet.render(true);
    }
  }

  /** @inheritdoc */
  async _updateObject(event, formData) {
    if ( !this.object.id ) return;
    return this.object.update(formData);
  }
}