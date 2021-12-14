import * as Tchat from "../tchat.js";

export class KnowledgePicking extends FormApplication {

  /** @override */
  constructor(actor, actualStat, actualFatigue, knowledgeText) {
    super(actor, {
      closeOnSubmit: false,
      submitOnChange: true,
      submitOnClose: true,
      title: knowledgeText
     });

    this.actor = actor;
    this.actualStat = actualStat;
    this.actualFatigue = actualFatigue;
  }

  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["touhouvq", "sheet", "character"],
      template: 'systems/touhouvq/templates/sheets/knowledge-sheet.html',
      width: 380,
      height: 238
    });
  }

  /** @override */
  getData() {
    const sheetData = {};

    // The Actor's data
    const actorData = this.actor;
    sheetData.actor = actorData;
    sheetData.actualStat = this.actualStat;
    sheetData.actualFatigue = this.actualFatigue;

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

    html.find('.knowledge-button-1').click(this._onKnowledge1Check.bind(this));
    html.find('.knowledge-button-2').click(this._onKnowledge2Check.bind(this));
    html.find('.knowledge-button-3').click(this._onKnowledge3Check.bind(this));
  }

  _onKnowledge1Check(event) {
    event.preventDefault();
    let element = event.currentTarget;
    const actualStat = element.dataset.actionValue;
    const actualFatigue = element.dataset.fatigueValue;
    let actorData = this.actor;
    let knowledgeType = 1;
    let knowledgeLabel = game.i18n.localize("touhouvq.sheet.rollKnowledge1");

    let selectElem = document.getElementById('select-knowledge');
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

  _onKnowledge2Check(event) {
    event.preventDefault();
    let element = event.currentTarget;
    const actualStat = element.dataset.actionValue;
    const actualFatigue = element.dataset.fatigueValue;
    let actorData = this.actor;
    let knowledgeType = 2;
    let knowledgeLabel = game.i18n.localize("touhouvq.sheet.rollKnowledge2");

    let selectElem = document.getElementById('select-knowledge');
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

  _onKnowledge3Check(event) {
    event.preventDefault();
    let element = event.currentTarget;
    const actualStat = element.dataset.actionValue;
    const actualFatigue = element.dataset.fatigueValue;
    let actorData = this.actor;
    let knowledgeType = 3;
    let knowledgeLabel = game.i18n.localize("touhouvq.sheet.rollKnowledge3");

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
}