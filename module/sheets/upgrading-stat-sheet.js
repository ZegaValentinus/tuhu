import * as Tchat from "../tchat.js";

export class UpgradingStat extends FormApplication {

  /** @override */
  constructor(actor, actualUpgrade, upgradeText, upgradeTextStat, theStat) {
    super(actor, {
      closeOnSubmit: false,
      submitOnChange: true,
      submitOnClose: true,
      title: upgradeText
     });

    this.actor = actor;
    this.actualUpgrade = actualUpgrade;
    this.upgradeTextStat = upgradeTextStat;
    this.theStat = theStat;
  }

  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["touhouvq", "sheet", "character"],
      template: 'systems/touhouvq/templates/sheets/upgrade-stat-sheet.html',
      width: 260,
      height: 160
    });
  }

  /** @override */
  getData() {
    const sheetData = {};

    // The Actor's data
    const actorData = this.actor;
    sheetData.actor = actorData;
    sheetData.actualUpgrade = this.actualUpgrade;
    sheetData.upgradeTextStat = this.upgradeTextStat;
    sheetData.theStat = this.theStat;

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
    /*
    html.find('.knowledge-button-1').click(this._onKnowledge1Check.bind(this));
    html.find('.knowledge-button-2').click(this._onKnowledge2Check.bind(this));
    html.find('.knowledge-button-3').click(this._onKnowledge3Check.bind(this));
    */
  }
  /*
  _onKnowledge2Check(event) {
    event.preventDefault();
    let element = event.currentTarget;
    const actualStat = element.dataset.actionValue;
    const actualFatigue = element.dataset.fatigueValue;
    let actorData = this.actor;
    let knowledgeType = 2;
    let knowledgeLabel = game.i18n.localize("touhouvq.sheet.rollKnowledge2");

    var selectElem = document.getElementById('select-knowledge');
    const knowledgeText = selectElem.options[selectElem.selectedIndex].value;

    let knowledgeLabel1 = game.i18n.localize("touhouvq.knowledgeText."+knowledgeText);

    Tchat.knowledgeCheck({
      actionValue: actualStat,
      fatiguePoints: actualFatigue,
      actorData: actorData,
      knowledgeType: knowledgeType,
      knowledgeText: knowledgeText,
      knowledgeLabel: knowledgeLabel,
      knowledgeLabel1: knowledgeLabel1
    })
  }
  */
}