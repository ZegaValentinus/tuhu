import * as Tchat from "../tchat.js";

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
      width: 500,
      height: 472
    });
  }

  getDisplayBuffContextMenu() {
    return Object.keys(CONFIG.touhouvq.buffs).map( buff => (
      {
        name: game.i18n.localize(`touhouvq.statusEffectsBuffs.${buff}`),
        icon: '',
        callback: (element) => {
          Tchat.displayBuff(buff);
        }
      }
    ));
  }

  getDisplayDebuffContextMenu() {
    return Object.keys(CONFIG.touhouvq.debuffs).map( debuff => (
      {
        name: game.i18n.localize(`touhouvq.statusEffectsDebuffs.${debuff}`),
        icon: '',
        callback: (element) => {
          Tchat.displayDebuff(debuff);
        }
      }
    ));
  }

  getApplyBuffContextMenu() {
    let actor = this.actor;
    return Object.keys(CONFIG.touhouvq.buffs).map( buff => (
      {
        name: game.i18n.localize(`touhouvq.statusEffectsBuffs.${buff}`),
        icon: '',
        callback: (element) => {
          Tchat.applyBuff(buff, actor);
        }
      }
    ));
  }

  getApplyDebuffContextMenu() {
    let actor = this.actor;
    return Object.keys(CONFIG.touhouvq.debuffs).map( debuff => (
      {
        name: game.i18n.localize(`touhouvq.statusEffectsDebuffs.${debuff}`),
        icon: '',
        callback: (element) => {
          Tchat.applyDebuff(debuff, actor);
        }
      }
    ));
  }

  getApplyAlcoholContextMenu() {
    let actor = this.actor;
    return Object.keys(CONFIG.touhouvq.alcoholEffects).map( alcoholEffect => (
      {
        name: game.i18n.localize(`touhouvq.alcoholEffects.${alcoholEffect}`),
        icon: '',
        callback: (element) => {
          Tchat.applyAlcohol(alcoholEffect, actor);
        }
      }
    ));
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
    html.find('button').click(this._onDebuggChange.bind(this));

    new ContextMenu(html, ".tvq-displaybuff", this.getDisplayBuffContextMenu());
    new ContextMenu(html, ".tvq-displaydebuff", this.getDisplayDebuffContextMenu());

    new ContextMenu(html, ".tvq-applybuff", this.getApplyBuffContextMenu());
    new ContextMenu(html, ".tvq-applydebuff", this.getApplyDebuffContextMenu());
    new ContextMenu(html, ".tvq-applyalcohol", this.getApplyAlcoholContextMenu());

    super.activateListeners(html);
  }

  _onDebuggChange(event) {
    event.preventDefault();
    event.stopPropagation();
    const buttonElem = event.currentTarget;

    if(buttonElem.classList.contains("tvq-deleteeffect")) {
      const effectID = buttonElem.closest(".tvq-activeeffects-div").dataset.effectId;
      this.actor.deleteEmbeddedDocuments('ActiveEffect', [effectID]);
    } else {
      if(buttonElem.classList.contains("tvq-editeffect")) {
        const effectID = buttonElem.closest(".tvq-activeeffects-div").dataset.effectId;
        const effect = this.actor.effects.get(effectID);
        effect.sheet.render(true);
      } else {
        if(buttonElem.classList.contains("tvq-effect-unrealstrength")) {
          let unrealstrength = this.actor.effects.filter(effect => effect.data.label.includes(game.i18n.localize("touhouvq.unreal.strength")))[0];
          if(!unrealstrength) {
            const effectData = {
              label:game.i18n.localize("touhouvq.unreal.strength"),
              icon: "systems/touhouvq/assets/img/unreal.webp"
            };
            unrealstrength = ActiveEffect.create(effectData, {parent: this.actor});
          }
        }
        if(buttonElem.classList.contains("tvq-effect-unrealagility")) {
          let unrealagility = this.actor.effects.filter(effect => effect.data.label.includes(game.i18n.localize("touhouvq.unreal.agility")))[0];
          if(!unrealagility) {
            const effectData = {
              label:game.i18n.localize("touhouvq.unreal.agility"),
              icon: "systems/touhouvq/assets/img/unreal.webp"
            };
            unrealagility = ActiveEffect.create(effectData, {parent: this.actor});
          }
        }
        if(buttonElem.classList.contains("tvq-effect-unrealresilience")) {
          let unrealresilience = this.actor.effects.filter(effect => effect.data.label.includes(game.i18n.localize("touhouvq.unreal.resilience")))[0];
          if(!unrealresilience) {
            const effectData = {
              label:game.i18n.localize("touhouvq.unreal.resilience"),
              icon: "systems/touhouvq/assets/img/unreal.webp"
            };
            unrealresilience = ActiveEffect.create(effectData, {parent: this.actor});
          }
        }
        if(buttonElem.classList.contains("tvq-effect-unrealdiscipline")) {
          let unrealdiscipline = this.actor.effects.filter(effect => effect.data.label.includes(game.i18n.localize("touhouvq.unreal.discipline")))[0];
          if(!unrealdiscipline) {
            const effectData = {
              label:game.i18n.localize("touhouvq.unreal.discipline"),
              icon: "systems/touhouvq/assets/img/unreal.webp"
            };
            unrealdiscipline = ActiveEffect.create(effectData, {parent: this.actor});
          }
        }
        if(buttonElem.classList.contains("tvq-effect-unrealperception")) {
          let unrealperception = this.actor.effects.filter(effect => effect.data.label.includes(game.i18n.localize("touhouvq.unreal.perception")))[0];
          if(!unrealperception) {
            const effectData = {
              label:game.i18n.localize("touhouvq.unreal.perception"),
              icon: "systems/touhouvq/assets/img/unreal.webp"
            };
            unrealperception = ActiveEffect.create(effectData, {parent: this.actor});
          }
        }
        if(buttonElem.classList.contains("tvq-effect-unrealmagic")) {
          let unrealmagic = this.actor.effects.filter(effect => effect.data.label.includes(game.i18n.localize("touhouvq.unreal.magic")))[0];
          if(!unrealmagic) {
            const effectData = {
              label:game.i18n.localize("touhouvq.unreal.magic"),
              icon: "systems/touhouvq/assets/img/unreal.webp"
            };
            unrealmagic = ActiveEffect.create(effectData, {parent: this.actor});
          }
        }
        if(buttonElem.classList.contains("tvq-effect-unrealintelligence")) {
          let unrealintelligence = this.actor.effects.filter(effect => effect.data.label.includes(game.i18n.localize("touhouvq.unreal.intelligence")))[0];
          if(!unrealintelligence) {
            const effectData = {
              label:game.i18n.localize("touhouvq.unreal.intelligence"),
              icon: "systems/touhouvq/assets/img/unreal.webp"
            };
            unrealintelligence = ActiveEffect.create(effectData, {parent: this.actor});
          }
        }
      }
    }
  }

  /** @inheritdoc */
  async _updateObject(event, formData) {
    if ( !this.object.id ) return;
    return this.object.update(formData);
  }
}