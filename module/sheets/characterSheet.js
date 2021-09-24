import * as Dice from "../dice.js";
import * as Tchat from "../tchat.js";
import {CharInfosSheet} from "./character-informations-sheet.js";
import {TalentsSheet} from "./character-talent-sheet.js";
import {RaceskillsSheet} from "./character-raceskill-sheet.js";
import {SecondSheet} from "./second-sheet.js";
import {ActiveEffectsDebugg} from "./debugg-sheet.js";
import {KnowledgePicking} from "./knowledge-picking-sheet.js";
import {UpgradingStat} from "./upgrading-stat-sheet.js";

export default class characterSheet extends ActorSheet {

  /** @override */
  constructor(...args) {
    super(...args);
  }

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      template: "systems/touhouvq/templates/sheets/character-sheet.html",
      classes: ["touhouvq", "sheet", "character"],
      width: 778,
      height: 720
    });
  }

  damageLocContextMenu = [
    {
      name: game.i18n.localize("touhouvq.sheet.damageLocalisation"),
      icon: '<i class="item-roll fas fa-dice-d20"></i>',
      callback: element => {
        const raceNum = this.actor.data.data.race;
        const actorData = this.actor;
    
        Dice.LocCheck({
          raceNum: raceNum,
          actorData: actorData
        })
      }
    },
    {
      name: game.i18n.localize("touhouvq.sheet.initiativeRoll2"),
      icon: '<i class="item-roll fas fa-dice-d20"></i>',
      callback: element => {
        const agilityValue = this.actor.data.data.stats.agility;
        const perceptionValue = this.actor.data.data.stats.perception;
        const raceNum = this.actor.data.data.race;
        const actorData = this.actor;
    
        Dice.initiativeCheck({
          raceNum: raceNum,
          agilityValue: agilityValue,
          perceptionValue: perceptionValue,
          actorData: actorData
        })
      }
    },
    {
      name: game.i18n.localize("touhouvq.deleteActiveEffect.frolic"),
      icon: '<i class="fas fa-times"></i>',
      callback: element => {
        let frolic = this.actor.effects.filter(effect => effect.data.label.includes(game.i18n.localize("touhouvq.namesRaceSkill.frolic")))[0];
        this.actor.deleteEmbeddedDocuments('ActiveEffect', [frolic.id]);
      },
      condition: element => {
        let frolic = this.actor.effects.filter(effect => effect.data.label.includes(game.i18n.localize("touhouvq.namesRaceSkill.frolic")))[0];
        return frolic;
      }
    }
  ]

  statStrengthContextMenu = [
    {
      name: game.i18n.localize("touhouvq.sheet.rollStrength"),
      icon: '<i class="item-roll fas fa-dice-d20"></i>',
      callback: element => {
        const actualStat = element.data("action-value");
        const actualFatigue = element.data("fatigue-value");
        const statType = "1";
        let actorData = this.actor;

        Dice.StatCheck({
          actionValue: actualStat,
          fatiguePoints: actualFatigue,
          statType: statType,
          actorData: actorData
        })
      }
    },
    {
      name: game.i18n.localize("touhouvq.sheet.upgradeStat"),
      icon: '<i class="item-roll fas fa-arrow-circle-up"></i>',
      callback: element => {
        const actualUpgrade = element.data("upgrade-value");
        const actualStat = element.data("action-value");
        let actorData = this.actor;
        let upgradeText = game.i18n.localize("touhouvq.sheet.upgradeText");
        let upgradeTextStat = game.i18n.localize("touhouvq.sheet.theStrength");
        const theStat = 1;

        const upgradingStat = new UpgradingStat(actorData, actualUpgrade, upgradeText, upgradeTextStat, theStat);
    
        upgradingStat.render(true);
      }
    },
    {
      name: game.i18n.localize("touhouvq.deleteActiveEffect.selfhelp"),
      icon: '<i class="fas fa-times"></i>',
      callback: element => {
        let selfhelp = this.actor.effects.filter(effect => effect.data.label === game.i18n.localize("touhouvq.namesRaceSkill.selfhelp"))[0];
        this.actor.deleteEmbeddedDocuments('ActiveEffect', [selfhelp.id]);
      },
      condition: element => {
        const stat = CONFIG.touhouvq.selfhelp[0];
        return foundry.utils.hasProperty(this.actor.overrides,`data.stats.${stat}`);
      }
    }
  ]

  statAgilityContextMenu = [
    {
      name: game.i18n.localize("touhouvq.sheet.rollAgility"),
      icon: '<i class="item-roll fas fa-dice-d20"></i>',
      callback: element => {
        const actualStat = element.data("action-value");
        const actualFatigue = element.data("fatigue-value");
        const statType = "2";
        let actorData = this.actor;

        Dice.StatCheck({
          actionValue: actualStat,
          fatiguePoints: actualFatigue,
          statType: statType,
          actorData: actorData
        })
      }
    },
    {
      name: game.i18n.localize("touhouvq.sheet.upgradeStat"),
      icon: '<i class="item-roll fas fa-arrow-circle-up"></i>',
      callback: element => {
        const actualUpgrade = element.data("upgrade-value");
        const actualStat = element.data("action-value");
        let actorData = this.actor;
        let upgradeText = game.i18n.localize("touhouvq.sheet.upgradeText");
        let upgradeTextStat = game.i18n.localize("touhouvq.sheet.theAgility");
        const theStat = 2;

        const upgradingStat = new UpgradingStat(actorData, actualUpgrade, upgradeText, upgradeTextStat, theStat);
    
        upgradingStat.render(true);
      }
    },
    {
      name: game.i18n.localize("touhouvq.deleteActiveEffect.selfhelp"),
      icon: '<i class="fas fa-times"></i>',
      callback: element => {
        let selfhelp = this.actor.effects.filter(effect => effect.data.label === game.i18n.localize("touhouvq.namesRaceSkill.selfhelp"))[0];
        this.actor.deleteEmbeddedDocuments('ActiveEffect', [selfhelp.id]);
      },
      condition: element => {
        const stat = CONFIG.touhouvq.selfhelp[1];
        return foundry.utils.hasProperty(this.actor.overrides,`data.stats.${stat}`);
      }
    }
  ]

  statResilienceContextMenu = [
    {
      name: game.i18n.localize("touhouvq.sheet.rollResilience"),
      icon: '<i class="item-roll fas fa-dice-d20"></i>',
      callback: element => {
        const actualStat = element.data("action-value");
        const actualFatigue = element.data("fatigue-value");
        const statType = "3";
        let actorData = this.actor;

        Dice.StatCheck({
          actionValue: actualStat,
          fatiguePoints: actualFatigue,
          statType: statType,
          actorData: actorData
        })
      }
    },
    {
      name: game.i18n.localize("touhouvq.sheet.upgradeStat"),
      icon: '<i class="item-roll fas fa-arrow-circle-up"></i>',
      callback: element => {
        const actualUpgrade = element.data("upgrade-value");
        const actualStat = element.data("action-value");
        let actorData = this.actor;
        let upgradeText = game.i18n.localize("touhouvq.sheet.upgradeText");
        let upgradeTextStat = game.i18n.localize("touhouvq.sheet.theResilience");
        const theStat = 3;

        const upgradingStat = new UpgradingStat(actorData, actualUpgrade, upgradeText, upgradeTextStat, theStat);
    
        upgradingStat.render(true);
      }
    },
    {
      name: game.i18n.localize("touhouvq.deleteActiveEffect.selfhelp"),
      icon: '<i class="fas fa-times"></i>',
      callback: element => {
        let selfhelp = this.actor.effects.filter(effect => effect.data.label === game.i18n.localize("touhouvq.namesRaceSkill.selfhelp"))[0];
        this.actor.deleteEmbeddedDocuments('ActiveEffect', [selfhelp.id]);
      },
      condition: element => {
        const stat = CONFIG.touhouvq.selfhelp[2];
        return foundry.utils.hasProperty(this.actor.overrides,`data.stats.${stat}`);
      }
    }
  ]

  statDisciplineContextMenu = [
    {
      name: game.i18n.localize("touhouvq.sheet.rollDiscipline"),
      icon: '<i class="item-roll fas fa-dice-d20"></i>',
      callback: element => {
        const actualStat = element.data("action-value");
        const actualFatigue = element.data("fatigue-value");
        const statType = "4";
        let actorData = this.actor;

        Dice.StatCheck({
          actionValue: actualStat,
          fatiguePoints: actualFatigue,
          statType: statType,
          actorData: actorData
        })
      }
    },
    {
      name: game.i18n.localize("touhouvq.sheet.upgradeStat"),
      icon: '<i class="item-roll fas fa-arrow-circle-up"></i>',
      callback: element => {
        const actualUpgrade = element.data("upgrade-value");
        const actualStat = element.data("action-value");
        let actorData = this.actor;
        let upgradeText = game.i18n.localize("touhouvq.sheet.upgradeText");
        let upgradeTextStat = game.i18n.localize("touhouvq.sheet.theDiscipline");
        const theStat = 4;

        const upgradingStat = new UpgradingStat(actorData, actualUpgrade, upgradeText, upgradeTextStat, theStat);
    
        upgradingStat.render(true);
      }
    },
    {
      name: game.i18n.localize("touhouvq.deleteActiveEffect.selfhelp"),
      icon: '<i class="fas fa-times"></i>',
      callback: element => {
        let selfhelp = this.actor.effects.filter(effect => effect.data.label === game.i18n.localize("touhouvq.namesRaceSkill.selfhelp"))[0];
        this.actor.deleteEmbeddedDocuments('ActiveEffect', [selfhelp.id]);
      },
      condition: element => {
        const stat = CONFIG.touhouvq.selfhelp[3];
        return foundry.utils.hasProperty(this.actor.overrides,`data.stats.${stat}`);
      }
    }
  ]

  statPerceptionContextMenu = [
    {
      name: game.i18n.localize("touhouvq.sheet.rollPerception"),
      icon: '<i class="item-roll fas fa-dice-d20"></i>',
      callback: element => {
        const actualStat = element.data("action-value");
        const actualFatigue = element.data("fatigue-value");
        const statType = "5";
        let actorData = this.actor;

        Dice.StatCheck({
          actionValue: actualStat,
          fatiguePoints: actualFatigue,
          statType: statType,
          actorData: actorData
        })
      }
    },
    {
      name: game.i18n.localize("touhouvq.sheet.upgradeStat"),
      icon: '<i class="item-roll fas fa-arrow-circle-up"></i>',
      callback: element => {
        const actualUpgrade = element.data("upgrade-value");
        const actualStat = element.data("action-value");
        let actorData = this.actor;
        let upgradeText = game.i18n.localize("touhouvq.sheet.upgradeText");
        let upgradeTextStat = game.i18n.localize("touhouvq.sheet.thePerception");
        const theStat = 5;

        const upgradingStat = new UpgradingStat(actorData, actualUpgrade, upgradeText, upgradeTextStat, theStat);
    
        upgradingStat.render(true);
      }
    },
    {
      name: game.i18n.localize("touhouvq.deleteActiveEffect.selfhelp"),
      icon: '<i class="fas fa-times"></i>',
      callback: element => {
        let selfhelp = this.actor.effects.filter(effect => effect.data.label === game.i18n.localize("touhouvq.namesRaceSkill.selfhelp"))[0];
        this.actor.deleteEmbeddedDocuments('ActiveEffect', [selfhelp.id]);
      },
      condition: element => {
        const stat = CONFIG.touhouvq.selfhelp[4];
        return foundry.utils.hasProperty(this.actor.overrides,`data.stats.${stat}`);
      }
    }
  ]

  statMagicContextMenu = [
    {
      name: game.i18n.localize("touhouvq.sheet.rollMagic"),
      icon: '<i class="item-roll fas fa-dice-d20"></i>',
      callback: element => {
        const actualStat = element.data("action-value");
        const actualFatigue = element.data("fatigue-value");
        const statType = "6";
        let actorData = this.actor;

        Dice.StatCheck({
          actionValue: actualStat,
          fatiguePoints: actualFatigue,
          statType: statType,
          actorData: actorData
        })
      }
    },
    {
      name: game.i18n.localize("touhouvq.sheet.upgradeStat"),
      icon: '<i class="item-roll fas fa-arrow-circle-up"></i>',
      callback: element => {
        const actualUpgrade = element.data("upgrade-value");
        const actualStat = element.data("action-value");
        let actorData = this.actor;
        let upgradeText = game.i18n.localize("touhouvq.sheet.upgradeText");
        let upgradeTextStat = game.i18n.localize("touhouvq.sheet.theMagic");
        const theStat = 6;

        const upgradingStat = new UpgradingStat(actorData, actualUpgrade, upgradeText, upgradeTextStat, theStat);
    
        upgradingStat.render(true);
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
        const statType = "7";
        let actorData = this.actor;

        Dice.StatCheck({
          actionValue: actualStat,
          fatiguePoints: actualFatigue,
          statType: statType,
          actorData: actorData
        })
      }
    },
    {
      name: game.i18n.localize("touhouvq.sheet.upgradeStat"),
      icon: '<i class="item-roll fas fa-arrow-circle-up"></i>',
      callback: element => {
        const actualUpgrade = element.data("upgrade-value");
        const actualStat = element.data("action-value");
        let actorData = this.actor;
        let upgradeText = game.i18n.localize("touhouvq.sheet.upgradeText");
        let upgradeTextStat = game.i18n.localize("touhouvq.sheet.theIntelligence");
        const theStat = 7;

        const upgradingStat = new UpgradingStat(actorData, actualUpgrade, upgradeText, upgradeTextStat, theStat);
    
        upgradingStat.render(true);
      }
    },
    {
      name: game.i18n.localize("touhouvq.sheet.rollKnowledge"),
      icon: '<i class="item-roll fas fa-book-open"></i>',
      callback: element => {
        const actualStat = element.data("action-value");
        const actualFatigue = element.data("fatigue-value");
        let actorData = this.actor;
        let knowledgeText = game.i18n.localize("touhouvq.sheet.rollKnowledge");

        const pickingKnowledge = new KnowledgePicking(actorData, actualStat, actualFatigue, knowledgeText);
    
        pickingKnowledge.render(true);
      }
    },
    {
      name: game.i18n.localize("touhouvq.deleteActiveEffect.selfhelp"),
      icon: '<i class="fas fa-times"></i>',
      callback: element => {
        let selfhelp = this.actor.effects.filter(effect => effect.data.label === game.i18n.localize("touhouvq.namesRaceSkill.selfhelp"))[0];
        this.actor.deleteEmbeddedDocuments('ActiveEffect', [selfhelp.id]);
      },
      condition: element => {
        const stat = CONFIG.touhouvq.selfhelp[5];
        return foundry.utils.hasProperty(this.actor.overrides,`data.stats.${stat}`);
      }
    }
  ]

  getTraitRollsContextMenu() {
    return Object.keys(CONFIG.touhouvq.traitRolls).map( traitRollKey => (
      {
        name: game.i18n.localize(`touhouvq.sheet.${traitRollKey}`),
        icon: '<i class="item-roll fas fa-dice-d20"></i>',
        callback: (element) => {
          Dice.TraitCheck(this.actor, traitRollKey);
        }
      }
    ))
  }

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

        if(item.data.type === "weapon") {
          item.roll();
        } else {
          Tchat.itemShow({
            itemData: item
          });
        }
      }
    },
    {
      name: game.i18n.localize("touhouvq.sheet.attack"),
      icon: '<i class="item-roll fas fa-dice-d20"></i>',
      callback: element => {
        const itemID = element.data("itemId");
        const item = this.actor.getOwnedItem(itemID);
        let actorData = this.actor;
        let rollData = {
          damageValue: item.data.data.damage,
          rarityValue: item.data.data.rarity,
          rangeValue: item.data.data.range,
          rangeThrowingValue: item.data.data.rangeThrowing,
          weaponTypeValue: item.data.data.weaponType,
          descValue: item.data.data.description,
          perkValue: item.data.data.perk,
          itemName: item.data.name,
          itemImg: item.data.img
        };

        Dice.weaponAttack({
          rollData: rollData,
          actorData: actorData
        });

        /* Dice.TaskCheck({
          actionValue: item.data.data.damage
        }) */

        /* C'est bon pour les weapon roll et tout, mais pour les compétences, spellcards etc ça va être plus chaud
        Pour se faire : utilise les data-attributes
        https://www.youtube.com/watch?v=RwbzucCs4Dw&ab_channel=C%C3%A9dricHauteville
        9:43 */
      },
      condition: element => {
        return element.data("itemType") === "weapon";
      }
    }
  ];

  spellcardsContextMenu = [
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

        if(item.data.type === "weapon") {
          item.roll();
        } else {
          Tchat.itemShow({
            itemData: item
          });
        }
      }
    },
    {
      name: game.i18n.localize("touhouvq.sheet.attack"),
      icon: '<i class="item-roll fas fa-dice-d20"></i>',
      callback: element => {
        const itemID = element.data("itemId");
        const item = this.actor.getOwnedItem(itemID);
        let actorData = this.actor;
        let rollData = {
          damageValue: item,
          itemName: item.data.name,
          itemImg: item.data.img
        };

        Dice.spellcardAttack({
          rollData: rollData,
          actorData: actorData
        });
      },
      condition: element => {
        return element.data("itemType") === "spellcard";
      }
    }
  ];

  getData() {
    const data = super.getData();
    data.config = CONFIG.touhouvq;

    data.equipables = data.items.filter(item => [ "weapon", "armor", "object" ].includes(item.type) );
    data.perks = data.items.filter(item => [ "talent", "spellcard" ].includes(item.type) );

    data.isGM = game.user.isGM;

    return data;
  }

  activateListeners(html) {
    if (this.isEditable) {
      html.find(".item-edit").click(this._onItemEdit.bind(this));
      html.find(".item-delete").click(this._onItemDelete.bind(this));
      html.find(".tvq-button-bodyloc").click(this._onBodyLoc.bind(this));
      html.find(".tvq-deathcheck-roll").click(this._onDeathCheck.bind(this));

      html.find('.mini-button').click(this._onMiniButtonClick.bind(this));
      html.find('.sheet2-button').click(this._onSheet2ButtonClick.bind(this));

      html.find('.mini-button-infosShow').click(this._onButtonInfosShowClick.bind(this));

      html.find('.open-debugg').click(this._onButtonDebugg.bind(this));
      html.find('.toggle-frolic-buttons').click(this._onToggleFrolic.bind(this));

      html.find('.info-starter').click(this._onTalentInfo.bind(this));
      html.find('.edit-starter').click(this._onTalentEdit.bind(this));
      html.find('.edit-raceskill').click(this._onRaceskillEdit.bind(this));
      html.find('.roll-raceskill').click(this._onRaceskillRoll.bind(this));
      html.find('.show-raceskill').click(this._onRaceskillInfo.bind(this));
  
      new ContextMenu(html, ".item-card", this.itemContextMenu);
      new ContextMenu(html, ".perk-card", this.spellcardsContextMenu);

      new ContextMenu(html, ".tvq-char-stat-bloc-strength", this.statStrengthContextMenu);
      new ContextMenu(html, ".tvq-char-stat-bloc-agility", this.statAgilityContextMenu);
      new ContextMenu(html, ".tvq-char-stat-bloc-resilience", this.statResilienceContextMenu);
      new ContextMenu(html, ".tvq-char-stat-bloc-discipline", this.statDisciplineContextMenu);
      new ContextMenu(html, ".tvq-char-stat-bloc-perception", this.statPerceptionContextMenu);
      new ContextMenu(html, ".tvq-char-stat-bloc-magic", this.statMagicContextMenu);
      new ContextMenu(html, ".tvq-char-stat-bloc-intelligence", this.statIntelligenceContextMenu);

      new ContextMenu(html, ".tvq-button-traitroll", this.getTraitRollsContextMenu());

      new ContextMenu(html, ".tvq-button-bodyloc", this.damageLocContextMenu);

      //Owner-only listeners
      if (this.actor.owner) {
        /*html.find(".task-check").click(this._onTaskCheck.bind(this));*/
      }
    }
    super.activateListeners(html);
  }

  _onDeathCheck(event) {
    event.preventDefault();
    let actorData = this.actor;

    Dice.DeathCheck({
      actorData: actorData
    })
  }

  _onBodyLoc(event) {
    event.preventDefault();
    let actorData = this.actor;

    Tchat.BodyLoc({
      raceNum: this.actor.data.data.race,
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

  async _onDropItem(event, data) {
    event.preventDefault();
    if(this.actor.items.size >= 14) {
      ui.notifications.warn(game.i18n.localize("touhouvq.notifications.tooMuchItems"));
      return false;
    }
    return super._onDropItem(event, data);
  }

  _onMiniButtonClick(event) {
    event.preventDefault();
    let element = event.currentTarget;
    const charInfo = element.dataset.charInfos;
    const charInfoSheet = new CharInfosSheet(this.actor, charInfo);

    charInfoSheet.render(true);
  }

  _onSheet2ButtonClick(event) {
    event.preventDefault();
    const laSecondSheet = new SecondSheet(this.actor);

    laSecondSheet.render(true);
  }

  _onButtonInfosShowClick(event) {
    event.preventDefault();
    let element = event.currentTarget;
    const story = element.dataset.charInfos;

    Tchat.charInfosShow({
      info: story,
      actor: this.actor
    });
  }

  _onTalentInfo(event) {
    event.preventDefault();
    let element = event.currentTarget;
    let race = element.dataset.race;
    let compname = game.i18n.localize("touhouvq.startertalent."+race);
    let compname1 = game.i18n.localize("touhouvq.startertalent1."+race);
    let compdesc = game.i18n.localize("touhouvq.startertalentDesc."+race);
    const talentSkillType = "startertalent";
    const actor = this.actor;
    
    let data = {
      race: race,
      compdesc: compdesc,
      compname: compname,
      compname1: compname1
    };

    Tchat.talentInfo({
      actor: actor,
      data: data,
      talentSkillType: talentSkillType
    });
  }

  _onTalentEdit(event) {
    event.preventDefault();
    let element = event.currentTarget;
    let race = element.dataset.race;
    let compname = game.i18n.localize("touhouvq.startertalent."+race);
    let compdesc = game.i18n.localize("touhouvq.startertalentDesc."+race);
    let compname1 = game.i18n.localize("touhouvq.startertalent1."+race);
    const actor = this.actor;
    const talentSkillType = "startertalent";
    
    const talentSheet = new TalentsSheet(actor, race, compname, compdesc, compname1, talentSkillType);

    talentSheet.render(true);
  }

  _onRaceskillEdit(event) {
    event.preventDefault();
    let element = event.currentTarget;
    let race = element.dataset.race;
    let compname = game.i18n.localize("touhouvq.raceskill."+race);
    let compdesc = game.i18n.localize("touhouvq.raceskillDesc."+race);
    let compname1 = game.i18n.localize("touhouvq.raceskill1."+race);
    const actor = this.actor;
    const talentSkillType = "raceskill";
    
    const raceskillSheet = new RaceskillsSheet(actor, race, compname, compdesc, compname1, talentSkillType);

    raceskillSheet.render(true);
  }

  _onRaceskillRoll(event) {
    event.preventDefault();
    let element = event.currentTarget;
    let race = element.dataset.race;
    const actor = this.actor;
    const actualStat = element.dataset.action;
    const actualFatigue = element.dataset.fatigue;
    let compname = game.i18n.localize("touhouvq.raceskill."+race);
    let compdesc = game.i18n.localize("touhouvq.raceskillDesc."+race);
    let compname1 = game.i18n.localize("touhouvq.raceskill1."+race);

    if(race == "youkai") {
      //Message de choix : Soigner ou récupérer de la magie ?
      //Si soigner : retire 6 PV (check avant si ça tue le perso, dans ce cas impossible (notif) et redonne 1 point de magie)
      //Si Magie : choix : jet de force, de discipline, ou d'intel ?
      //Faire le jet en question : si réussi : message de réussite, et point de magie en plus.
    }

    if(race == "ghost") {
      //Message : perte de 1d4 point de blessures critiques + les faire perdre (min : 0)
      //+ : choix : jet de maitrise ou passepasse ?
      //puis, lorsque jet fait, show 1+degrés de réu.
    }

    if(race == "fairy") {
      //jet de magie
      //display si réussite ou non via jet card + 1d4 rollé pour les actions + 2d4 roll pour les bonus sur jet de carac

      /*
      const actors = game.users
        .filter(user => user.active)
        .map(user => user.character)
        .filter(actor => !!actor);
      */
    }

    if(race == "crowtengu" || race == "whitewolftengu" || race == "greattengu") {
      Dice.StatCheck({
        actionValue: actor.data.data.stats.agility,
        fatiguePoints: actor.data.data.fatigue.value,
        statType: 2,
        actorData: actor,
        compskillvalue: "unrealdodge"
      });
    }

    if(race == "lunarrabbit") {
      //document.querySelector(".tvq-button-traitroll > #context-menu > li.context-item:nth-child(5n)").classList.add("boosted");
    }

    if(race == "arahitogami") {
      Dice.TraitCheck(actor, "rollFaith", "lawofthegods");

      //récupérer degrés de réussite+1 (on appelera ce nombre X) : tirer X dé(s), dont les résultats pointeront chacun vers une parties du corps du perso transformée en renforcée


      //Dans le même temps, récupérer stat de magie divisé par 10 pour display la durée en action du buff

    }

    if(race == "earthrabbit") {
      //vérifier si frolic
      let frolic = actor.effects.filter(effect => effect.data.label.includes(game.i18n.localize("touhouvq.namesRaceSkill.frolic")))[0];

      if(!frolic) {
        ui.notifications.warn(game.i18n.localize("touhouvq.notifications.noDieStolen"));
        return;
      }

      //if the user has clicked on the race skill use button, then we put the flag on the activeeffect isusable at true.
      if(frolic.getFlag("touhouvq","isUsable") === false) {
        frolic.setFlag("touhouvq","isUsable",true);
        ui.notifications.info(game.i18n.localize("touhouvq.notifications.dieReady"));
      } else {
        frolic.setFlag("touhouvq","isUsable",false);
        ui.notifications.info(game.i18n.localize("touhouvq.notifications.dieNotReady"));
      }
    }
    
    let data = {
      race: race,
      compname: compname,
      compdesc, compdesc,
      compname1: compname1,
      actualStat: actualStat,
      actualFatigue: actualFatigue
    };

    Tchat.raceRoll({
      actor: actor,
      data: data
    });
  }

  _onRaceskillInfo(event) {
    event.preventDefault();
    let element = event.currentTarget;
    let race = element.dataset.race;
    let compname = game.i18n.localize("touhouvq.raceskill."+race);
    let compdesc = game.i18n.localize("touhouvq.raceskillDesc."+race);
    let compname1 = game.i18n.localize("touhouvq.raceskill1."+race);
    const talentSkillType = "raceskill";
    const actor = this.actor;
    
    let data = {
      race: race,
      compdesc: compdesc,
      compname: compname,
      compname1: compname1
    };

    Tchat.raceInfo({
      actor: actor,
      data: data,
      talentSkillType: talentSkillType
    });
  }

  _onButtonDebugg(event) {
    event.preventDefault();
    const leDebugg = new ActiveEffectsDebugg(this.actor);

    leDebugg.render(true);
  }

  _onToggleFrolic(event) {
    event.preventDefault();
    var elements = document.getElementsByClassName("tvq-frolic-buttons");

    console.log(elements);

    for(let elem of elements) {
      elem.classList.toggle('no-display');
    }

    const toggle = this.actor.noDisplayFrolicButtons === true;
    this.actor.noDisplayFrolicButtons = !toggle;
  }
}
