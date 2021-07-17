import * as Dice from "../dice.js";
import * as Tchat from "../tchat.js";

export default class characterSheet extends ActorSheet {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      template: "systems/touhouvq/templates/sheets/character-sheet.html",
      classes: ["touhouvq", "sheet", "character"]
    });
  }

  damageLocContextMenu = [
    {
      name: game.i18n.localize("touhouvq.sheet.damageLocalisation"),
      icon: '<i class="item-roll fas fa-dice-d20"></i>',
      callback: element => {
        const raceNum = event.currentTarget.closest(".tvq-button-bodyloc").dataset.raceValue;
        const actorData = this.actor;
    
        Dice.LocCheck({
          raceNum: raceNum,
          actorData: actorData
        })
      }
    }
  ]

  statStrengthContextMenu = [
    {
      name: game.i18n.localize("touhouvq.sheet.rollStrength"),
      icon: '<i class="item-roll fas fa-dice-d20"></i>',
      callback: element => {
        const actualStat = element.data("action-value");
        const isTrait = element.data("trait-value");
        const actualFatigue = element.data("fatigue-value");

        Dice.StatCheck({
          actionValue: actualStat,
          isTraitRoll: isTrait,
          fatiguePoints: actualFatigue
        })
      }
    }
  ]

  statAgilityContextMenu = [
    {
      name: game.i18n.localize("touhouvq.sheet.rollAgility"),
      icon: '<i class="item-roll fas fa-dice-d20"></i>',
      callback: element => {
        const actualStat = element.data("action-value");
        const isTrait = element.data("trait-value");
        const actualFatigue = element.data("fatigue-value");

        Dice.StatCheck({
          actionValue: actualStat,
          isTraitRoll: isTrait,
          fatiguePoints: actualFatigue
        })
      }
    }
  ]

  statResilienceContextMenu = [
    {
      name: game.i18n.localize("touhouvq.sheet.rollResilience"),
      icon: '<i class="item-roll fas fa-dice-d20"></i>',
      callback: element => {
        const actualStat = element.data("action-value");
        const isTrait = element.data("trait-value");
        const actualFatigue = element.data("fatigue-value");

        Dice.StatCheck({
          actionValue: actualStat,
          isTraitRoll: isTrait,
          fatiguePoints: actualFatigue
        })
      }
    }
  ]

  statDisciplineContextMenu = [
    {
      name: game.i18n.localize("touhouvq.sheet.rollDiscipline"),
      icon: '<i class="item-roll fas fa-dice-d20"></i>',
      callback: element => {
        const actualStat = element.data("action-value");
        const isTrait = element.data("trait-value");
        const actualFatigue = element.data("fatigue-value");

        Dice.StatCheck({
          actionValue: actualStat,
          isTraitRoll: isTrait,
          fatiguePoints: actualFatigue
        })
      }
    }
  ]

  statPerceptionContextMenu = [
    {
      name: game.i18n.localize("touhouvq.sheet.rollPerception"),
      icon: '<i class="item-roll fas fa-dice-d20"></i>',
      callback: element => {
        const actualStat = element.data("action-value");
        const isTrait = element.data("trait-value");
        const actualFatigue = element.data("fatigue-value");

        Dice.StatCheck({
          actionValue: actualStat,
          isTraitRoll: isTrait,
          fatiguePoints: actualFatigue
        })
      }
    }
  ]

  statMagicContextMenu = [
    {
      name: game.i18n.localize("touhouvq.sheet.rollMagic"),
      icon: '<i class="item-roll fas fa-dice-d20"></i>',
      callback: element => {
        const actualStat = element.data("action-value");
        const isTrait = element.data("trait-value");
        const actualFatigue = element.data("fatigue-value");

        Dice.StatCheck({
          actionValue: actualStat,
          isTraitRoll: isTrait,
          fatiguePoints: actualFatigue
        })
      }
    }
  ]

  statIntelligenceContextMenu = [
    {
      name: game.i18n.localize("touhouvq.sheet.rollIntelligence"),
      icon: '<i class="item-roll fas fa-dice-d20"></i>',
      callback: element => {
        const actualStat = element.data("action-value");
        const actualFatigue = element.data("fatigue-value");

        Dice.StatCheck({
          actionValue: actualStat,
          fatiguePoints: actualFatigue
        })
      }
    }
  ]

  traitRollsContextMenu = [
    {
      name: game.i18n.localize("touhouvq.sheet.rollResistance"),
      icon: '<i class="item-roll fas fa-dice-d20"></i>',
      callback: element => {
        const StrengthStats = element.data("strength-value");
        const AgilityStats = element.data("agility-value");
        const ResilienceStats = element.data("resilience-value");
        const DisciplineStats = element.data("discipline-value");
        const PerceptionStats = element.data("perception-value");
        const MagicStats = element.data("magic-value");
        const IntelligenceStats = element.data("intelligence-value");
        const actualFatigue = element.data("fatigue-value");
        const traitType = "1";

        Dice.TraitCheck({
          StrengthStats: StrengthStats,
          AgilityStats: AgilityStats,
          ResilienceStats: ResilienceStats,
          DisciplineStats: DisciplineStats,
          PerceptionStats: PerceptionStats,
          MagicStats: MagicStats,
          IntelligenceStats: IntelligenceStats,
          fatiguePoints: actualFatigue,
          traitType: traitType
        })
      }
    },
    {
      name: game.i18n.localize("touhouvq.sheet.rollMelee"),
      icon: '<i class="item-roll fas fa-dice-d20"></i>',
      callback: element => {
        const StrengthStats = element.data("strength-value");
        const AgilityStats = element.data("agility-value");
        const ResilienceStats = element.data("resilience-value");
        const DisciplineStats = element.data("discipline-value");
        const PerceptionStats = element.data("perception-value");
        const MagicStats = element.data("magic-value");
        const IntelligenceStats = element.data("intelligence-value");
        const actualFatigue = element.data("fatigue-value");
        const traitType = "2";

        Dice.TraitCheck({
          StrengthStats: StrengthStats,
          AgilityStats: AgilityStats,
          ResilienceStats: ResilienceStats,
          DisciplineStats: DisciplineStats,
          PerceptionStats: PerceptionStats,
          MagicStats: MagicStats,
          IntelligenceStats: IntelligenceStats,
          fatiguePoints: actualFatigue,
          traitType: traitType
        })
      }
    },
    {
      name: game.i18n.localize("touhouvq.sheet.rollIntimidation"),
      icon: '<i class="item-roll fas fa-dice-d20"></i>',
      callback: element => {
        const StrengthStats = element.data("strength-value");
        const AgilityStats = element.data("agility-value");
        const ResilienceStats = element.data("resilience-value");
        const DisciplineStats = element.data("discipline-value");
        const PerceptionStats = element.data("perception-value");
        const MagicStats = element.data("magic-value");
        const IntelligenceStats = element.data("intelligence-value");
        const actualFatigue = element.data("fatigue-value");
        const traitType = "3";

        Dice.TraitCheck({
          StrengthStats: StrengthStats,
          AgilityStats: AgilityStats,
          ResilienceStats: ResilienceStats,
          DisciplineStats: DisciplineStats,
          PerceptionStats: PerceptionStats,
          MagicStats: MagicStats,
          IntelligenceStats: IntelligenceStats,
          fatiguePoints: actualFatigue,
          traitType: traitType
        })
      }
    },
    {
      name: game.i18n.localize("touhouvq.sheet.rollThrow"),
      icon: '<i class="item-roll fas fa-dice-d20"></i>',
      callback: element => {
        const StrengthStats = element.data("strength-value");
        const AgilityStats = element.data("agility-value");
        const ResilienceStats = element.data("resilience-value");
        const DisciplineStats = element.data("discipline-value");
        const PerceptionStats = element.data("perception-value");
        const MagicStats = element.data("magic-value");
        const IntelligenceStats = element.data("intelligence-value");
        const actualFatigue = element.data("fatigue-value");
        const traitType = "4";

        Dice.TraitCheck({
          StrengthStats: StrengthStats,
          AgilityStats: AgilityStats,
          ResilienceStats: ResilienceStats,
          DisciplineStats: DisciplineStats,
          PerceptionStats: PerceptionStats,
          MagicStats: MagicStats,
          IntelligenceStats: IntelligenceStats,
          fatiguePoints: actualFatigue,
          traitType: traitType
        })
      }
    },
    {
      name: game.i18n.localize("touhouvq.sheet.rollStealth"),
      icon: '<i class="item-roll fas fa-dice-d20"></i>',
      callback: element => {
        const StrengthStats = element.data("strength-value");
        const AgilityStats = element.data("agility-value");
        const ResilienceStats = element.data("resilience-value");
        const DisciplineStats = element.data("discipline-value");
        const PerceptionStats = element.data("perception-value");
        const MagicStats = element.data("magic-value");
        const IntelligenceStats = element.data("intelligence-value");
        const actualFatigue = element.data("fatigue-value");
        const traitType = "5";

        Dice.TraitCheck({
          StrengthStats: StrengthStats,
          AgilityStats: AgilityStats,
          ResilienceStats: ResilienceStats,
          DisciplineStats: DisciplineStats,
          PerceptionStats: PerceptionStats,
          MagicStats: MagicStats,
          IntelligenceStats: IntelligenceStats,
          fatiguePoints: actualFatigue,
          traitType: traitType
        })
      }
    },
    {
      name: game.i18n.localize("touhouvq.sheet.rollPrecision"),
      icon: '<i class="item-roll fas fa-dice-d20"></i>',
      callback: element => {
        const StrengthStats = element.data("strength-value");
        const AgilityStats = element.data("agility-value");
        const ResilienceStats = element.data("resilience-value");
        const DisciplineStats = element.data("discipline-value");
        const PerceptionStats = element.data("perception-value");
        const MagicStats = element.data("magic-value");
        const IntelligenceStats = element.data("intelligence-value");
        const actualFatigue = element.data("fatigue-value");
        const traitType = "6";

        Dice.TraitCheck({
          StrengthStats: StrengthStats,
          AgilityStats: AgilityStats,
          ResilienceStats: ResilienceStats,
          DisciplineStats: DisciplineStats,
          PerceptionStats: PerceptionStats,
          MagicStats: MagicStats,
          IntelligenceStats: IntelligenceStats,
          fatiguePoints: actualFatigue,
          traitType: traitType
        })
      }
    },
    {
      name: game.i18n.localize("touhouvq.sheet.rollSleightHand"),
      icon: '<i class="item-roll fas fa-dice-d20"></i>',
      callback: element => {
        const StrengthStats = element.data("strength-value");
        const AgilityStats = element.data("agility-value");
        const ResilienceStats = element.data("resilience-value");
        const DisciplineStats = element.data("discipline-value");
        const PerceptionStats = element.data("perception-value");
        const MagicStats = element.data("magic-value");
        const IntelligenceStats = element.data("intelligence-value");
        const actualFatigue = element.data("fatigue-value");
        const traitType = "7";

        Dice.TraitCheck({
          StrengthStats: StrengthStats,
          AgilityStats: AgilityStats,
          ResilienceStats: ResilienceStats,
          DisciplineStats: DisciplineStats,
          PerceptionStats: PerceptionStats,
          MagicStats: MagicStats,
          IntelligenceStats: IntelligenceStats,
          fatiguePoints: actualFatigue,
          traitType: traitType
        })
      }
    },
    {
      name: game.i18n.localize("touhouvq.sheet.rollMental"),
      icon: '<i class="item-roll fas fa-dice-d20"></i>',
      callback: element => {
        const StrengthStats = element.data("strength-value");
        const AgilityStats = element.data("agility-value");
        const ResilienceStats = element.data("resilience-value");
        const DisciplineStats = element.data("discipline-value");
        const PerceptionStats = element.data("perception-value");
        const MagicStats = element.data("magic-value");
        const IntelligenceStats = element.data("intelligence-value");
        const actualFatigue = element.data("fatigue-value");
        const traitType = "8";

        Dice.TraitCheck({
          StrengthStats: StrengthStats,
          AgilityStats: AgilityStats,
          ResilienceStats: ResilienceStats,
          DisciplineStats: DisciplineStats,
          PerceptionStats: PerceptionStats,
          MagicStats: MagicStats,
          IntelligenceStats: IntelligenceStats,
          fatiguePoints: actualFatigue,
          traitType: traitType
        })
      }
    },
    {
      name: game.i18n.localize("touhouvq.sheet.rollMastery"),
      icon: '<i class="item-roll fas fa-dice-d20"></i>',
      callback: element => {
        const StrengthStats = element.data("strength-value");
        const AgilityStats = element.data("agility-value");
        const ResilienceStats = element.data("resilience-value");
        const DisciplineStats = element.data("discipline-value");
        const PerceptionStats = element.data("perception-value");
        const MagicStats = element.data("magic-value");
        const IntelligenceStats = element.data("intelligence-value");
        const actualFatigue = element.data("fatigue-value");
        const traitType = "9";

        Dice.TraitCheck({
          StrengthStats: StrengthStats,
          AgilityStats: AgilityStats,
          ResilienceStats: ResilienceStats,
          DisciplineStats: DisciplineStats,
          PerceptionStats: PerceptionStats,
          MagicStats: MagicStats,
          IntelligenceStats: IntelligenceStats,
          fatiguePoints: actualFatigue,
          traitType: traitType
        })
      }
    },
    {
      name: game.i18n.localize("touhouvq.sheet.rollInvestigation"),
      icon: '<i class="item-roll fas fa-dice-d20"></i>',
      callback: element => {
        const StrengthStats = element.data("strength-value");
        const AgilityStats = element.data("agility-value");
        const ResilienceStats = element.data("resilience-value");
        const DisciplineStats = element.data("discipline-value");
        const PerceptionStats = element.data("perception-value");
        const MagicStats = element.data("magic-value");
        const IntelligenceStats = element.data("intelligence-value");
        const actualFatigue = element.data("fatigue-value");
        const traitType = "10";

        Dice.TraitCheck({
          StrengthStats: StrengthStats,
          AgilityStats: AgilityStats,
          ResilienceStats: ResilienceStats,
          DisciplineStats: DisciplineStats,
          PerceptionStats: PerceptionStats,
          MagicStats: MagicStats,
          IntelligenceStats: IntelligenceStats,
          fatiguePoints: actualFatigue,
          traitType: traitType
        })
      }
    },
    {
      name: game.i18n.localize("touhouvq.sheet.rollFaith"),
      icon: '<i class="item-roll fas fa-dice-d20"></i>',
      callback: element => {
        const StrengthStats = element.data("strength-value");
        const AgilityStats = element.data("agility-value");
        const ResilienceStats = element.data("resilience-value");
        const DisciplineStats = element.data("discipline-value");
        const PerceptionStats = element.data("perception-value");
        const MagicStats = element.data("magic-value");
        const IntelligenceStats = element.data("intelligence-value");
        const actualFatigue = element.data("fatigue-value");
        const traitType = "11";

        Dice.TraitCheck({
          StrengthStats: StrengthStats,
          AgilityStats: AgilityStats,
          ResilienceStats: ResilienceStats,
          DisciplineStats: DisciplineStats,
          PerceptionStats: PerceptionStats,
          MagicStats: MagicStats,
          IntelligenceStats: IntelligenceStats,
          fatiguePoints: actualFatigue,
          traitType: traitType
        })
      }
    },
    {
      name: game.i18n.localize("touhouvq.sheet.rollTechnology"),
      icon: '<i class="item-roll fas fa-dice-d20"></i>',
      callback: element => {
        const StrengthStats = element.data("strength-value");
        const AgilityStats = element.data("agility-value");
        const ResilienceStats = element.data("resilience-value");
        const DisciplineStats = element.data("discipline-value");
        const PerceptionStats = element.data("perception-value");
        const MagicStats = element.data("magic-value");
        const IntelligenceStats = element.data("intelligence-value");
        const actualFatigue = element.data("fatigue-value");
        const traitType = "12";

        Dice.TraitCheck({
          StrengthStats: StrengthStats,
          AgilityStats: AgilityStats,
          ResilienceStats: ResilienceStats,
          DisciplineStats: DisciplineStats,
          PerceptionStats: PerceptionStats,
          MagicStats: MagicStats,
          IntelligenceStats: IntelligenceStats,
          fatiguePoints: actualFatigue,
          traitType: traitType
        })
      }
    },
    {
      name: game.i18n.localize("touhouvq.sheet.rollCharisma"),
      icon: '<i class="item-roll fas fa-dice-d20"></i>',
      callback: element => {
        const StrengthStats = element.data("strength-value");
        const AgilityStats = element.data("agility-value");
        const ResilienceStats = element.data("resilience-value");
        const DisciplineStats = element.data("discipline-value");
        const PerceptionStats = element.data("perception-value");
        const MagicStats = element.data("magic-value");
        const IntelligenceStats = element.data("intelligence-value");
        const actualFatigue = element.data("fatigue-value");
        const traitType = "13";

        Dice.TraitCheck({
          StrengthStats: StrengthStats,
          AgilityStats: AgilityStats,
          ResilienceStats: ResilienceStats,
          DisciplineStats: DisciplineStats,
          PerceptionStats: PerceptionStats,
          MagicStats: MagicStats,
          IntelligenceStats: IntelligenceStats,
          fatiguePoints: actualFatigue,
          traitType: traitType
        })
      }
    },
    {
      name: game.i18n.localize("touhouvq.sheet.rollDanmaku"),
      icon: '<i class="item-roll fas fa-dice-d20"></i>',
      callback: element => {
        const StrengthStats = element.data("strength-value");
        const AgilityStats = element.data("agility-value");
        const ResilienceStats = element.data("resilience-value");
        const DisciplineStats = element.data("discipline-value");
        const PerceptionStats = element.data("perception-value");
        const MagicStats = element.data("magic-value");
        const IntelligenceStats = element.data("intelligence-value");
        const actualFatigue = element.data("fatigue-value");
        const traitType = "14";

        Dice.TraitCheck({
          StrengthStats: StrengthStats,
          AgilityStats: AgilityStats,
          ResilienceStats: ResilienceStats,
          DisciplineStats: DisciplineStats,
          PerceptionStats: PerceptionStats,
          MagicStats: MagicStats,
          IntelligenceStats: IntelligenceStats,
          fatiguePoints: actualFatigue,
          traitType: traitType
        })
      }
    }
  ]

  itemContextMenu = [
    {
      name: game.i18n.localize("touhouvq.sheet.edit"),
      icon: '<i class="fas fa-pen"></i>',
      callback: element => {
        const item = this.actor.getOwnedItem(element.data("item-id"));
        item.sheet.render(true);
      }
    },
    {
      name: game.i18n.localize("touhouvq.sheet.delete"),
      icon: '<i class="fas fa-trash"></i>',
      callback: element => {
        this.actor.deleteOwnedItem(element.data("item-id"));
      }
    },
    {
      name: game.i18n.localize("touhouvq.sheet.show"),
      icon: '<i class="item-roll fas fa-eye"></i>',
      callback: element => {
        const itemID = element.data("itemId");
        const item = this.actor.getOwnedItem(itemID);
    
        item.roll();
      }
    },
    {
      name: game.i18n.localize("touhouvq.sheet.attack"),
      icon: '<i class="item-roll fas fa-dice-d20"></i>',
      callback: element => {
        const itemID = element.data("itemId");
        const item = this.actor.getOwnedItem(itemID);
        let rollFormula = "@damageValue";
        let rollData = {
          damageValue: item.data.data.damage
        };
    
        let messageData = {
          speaker: ChatMessage.getSpeaker()
        }
        new Roll(rollFormula, rollData).roll().toMessage(messageData);

        /* Dice.TaskCheck({
          actionValue: item.data.data.damage
        }) */

        /* C'est bon pour les weapon roll et tout, mais pour les compétences, spellcards etc ça va être plus chaud
        Pour se faire : utilise les data-attributes
        https://www.youtube.com/watch?v=RwbzucCs4Dw&ab_channel=C%C3%A9dricHauteville
        9:43 */
      }
    }
  ];

  getData() {
    const data = super.getData();
    data.config = CONFIG.touhouvq;
    data.weapons = data.items.filter(function (item) { return item.type == "weapon"});
    return data;
  }

  activateListeners(html) {
    if (this.isEditable) {
      html.find(".item-edit").click(this._onItemEdit.bind(this));
      html.find(".item-delete").click(this._onItemDelete.bind(this));
      html.find(".tvq-button-bodyloc").click(this._onBodyLoc.bind(this));
  
      new ContextMenu(html, ".weapon-card", this.itemContextMenu);

      new ContextMenu(html, ".tvq-char-stat-bloc-strength", this.statStrengthContextMenu);
      new ContextMenu(html, ".tvq-char-stat-bloc-agility", this.statAgilityContextMenu);
      new ContextMenu(html, ".tvq-char-stat-bloc-resilience", this.statResilienceContextMenu);
      new ContextMenu(html, ".tvq-char-stat-bloc-discipline", this.statDisciplineContextMenu);
      new ContextMenu(html, ".tvq-char-stat-bloc-perception", this.statPerceptionContextMenu);
      new ContextMenu(html, ".tvq-char-stat-bloc-magic", this.statMagicContextMenu);
      new ContextMenu(html, ".tvq-char-stat-bloc-intelligence", this.statIntelligenceContextMenu);

      new ContextMenu(html, ".tvq-button-traitroll", this.traitRollsContextMenu);

      new ContextMenu(html, ".tvq-upperside-person", this.damageLocContextMenu);

      //Owner-only listeners
      if (this.actor.owner) {
        /*html.find(".task-check").click(this._onTaskCheck.bind(this));*/
      }
  
      super.activateListeners(html);
    }
  }

  _onBodyLoc(event) {
    event.preventDefault();
    const raceNum = event.currentTarget.closest(".tvq-button-bodyloc").dataset.raceValue;
    let actorData = this.actor;

    Tchat.BodyLoc({
      raceNum: raceNum,
      actorData: actorData
    })
  }

  _onItemRoll(event) {
    const itemID = event.currentTarget.closest(".weapon-card").dataset.itemId;
    const item = this.actor.getOwnedItem(itemID);

    item.roll();
  }

  _onItemEdit(event) {
    event.preventDefault();
    let element = event.currentTarget;
    let itemId = element.closest(".weapon-card").dataset.itemId;
    let item = this.actor.getOwnedItem(itemId);

    item.sheet.render(true);
  }

  _onItemDelete(event) {
    event.preventDefault();
    let element = event.currentTarget;
    let itemId = element.closest(".weapon-card").dataset.itemId;
    return this.actor.deleteOwnedItem(itemId);
  }
}
