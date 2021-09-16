export class RaceskillsSheet extends FormApplication {

  /** @override */
  constructor(actor, race, compname, compdesc, compname1, talentSkillType) {
    super(actor, {
      closeOnSubmit: false,
      submitOnChange: true,
      submitOnClose: true,
      title: game.i18n.localize("touhouvq.sheettext."+talentSkillType)
     });

    this.actor = actor;
    this.race = race;
    this.compname = compname;
    this.compdesc = compdesc;
    this.compname1 = compname1;
    this.talentSkillType = talentSkillType;
  }

  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["touhouvq", "sheet", "character"],
      template: 'systems/touhouvq/templates/sheets/talent-sheet.html',
      width: 600,
      height: 390
    });
  }

  /** @override */
  getData() {
    const sheetData = {};

    // The Actor's data
    const actorData = this.actor.data.toObject(false);
    sheetData.actor = actorData;
    sheetData.data = actorData.data;
    sheetData.race = this.race;
    sheetData.compname = this.compname;
    sheetData.compdesc = this.compdesc;
    sheetData.compname1 = this.compname1;
    sheetData.talentSkillType = this.talentSkillType;

    return sheetData;
  }

  /** @inheritdoc */
  async _updateObject(event, formData) {
    if ( !this.object.id ) return;
    return this.object.update(formData);
  }
}