export class FunEffectsPanel extends DocumentSheet {

  /** @override */
  constructor(actor) {
    super(actor, {
      closeOnSubmit: false,
      submitOnChange: true,
      submitOnClose: true,
      title: "FunEffects Panel"
     });

    this.actor = actor;
  }

  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["touhouvq", "sheet", "character"],
      template: 'systems/touhouvq/templates/sheets/fun-effects-sheet.html',
      width: 280,
      height: 400
    });
  }

  /** @override */
  getData() {
    const sheetData = {};

    // The Actor's data
    const actorData = this.actor.data.toObject(false);
    sheetData.actor = actorData;

    return sheetData;
  }

  activateListeners(html) {
    html.find('.tvq-funeffect1').click(this._onFunEffect.bind(this));

    super.activateListeners(html);
  }

  async _onFunEffect(event) {
    event.preventDefault();
    event.stopPropagation();

    const messageTemplate = "systems/touhouvq/templates/chat/glitch.html";

    const html = await renderTemplate(messageTemplate, "");

    let messageData = {
        speaker: ChatMessage.getSpeaker({
            actor: "a"
        }),
        content: html
    }

    const messageClass = getDocumentClass("ChatMessage");

    messageClass.create(messageData);
  }

  /** @inheritdoc */
  async _updateObject(event, formData) {
    if ( !this.object.id ) return;
    return this.object.update(formData);
  }
}