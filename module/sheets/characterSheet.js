import * as Dice from "../dice.js";
import * as Tchat from "../tchat.js";
import {CharInfosSheet} from "./character-informations-sheet.js";
import {TalentsSheet} from "./character-talent-sheet.js";
import {RaceskillsSheet} from "./character-raceskill-sheet.js";
import {SecondSheet} from "./second-sheet.js";
import {ActiveEffectsDebugg} from "./debugg-sheet.js";
import {FunEffectsPanel} from "./fun-effects-panel.js";
import {KnowledgePicking} from "./knowledge-picking-sheet.js";
import {UpgradingStat} from "./upgrading-stat-sheet.js";
import {DestructionSave} from "./destruction-save-sheet.js";

export default class characterSheet extends ActorSheet {

  /** @override */
  constructor(...args) {
    super(...args);
  }

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      template: "systems/touhouvq/templates/sheets/character-sheet.html",
      classes: ["touhouvq", "sheet", "character"],
      width: 750,
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
      name: game.i18n.localize("touhouvq.deleteActiveEffect.manifestationofnature"),
      icon: '<i class="fas fa-seedling"></i>',
      callback: element => {
        let manifestationofnature = this.actor.effects.filter(effect => effect.data.label.includes(game.i18n.localize("touhouvq.namesRaceSkill.manifestationofnature")))[0];
        this.actor.deleteEmbeddedDocuments('ActiveEffect', [manifestationofnature.id]);
      },
      condition: element => {
        let manifestationofnature = this.actor.effects.filter(effect => effect.data.label.includes(game.i18n.localize("touhouvq.namesRaceSkill.manifestationofnature")))[0];
        return manifestationofnature;
      }
    },
    {
      name: game.i18n.localize("touhouvq.deleteActiveEffect.lawofthegods"),
      icon: '<i class="fas fa-times"></i>',
      callback: element => {
        let lawofthegods = this.actor.effects.filter(effect => effect.data.label.includes(game.i18n.localize("touhouvq.namesRaceSkill.lawofthegods")))[0];
        this.actor.deleteEmbeddedDocuments('ActiveEffect', [lawofthegods.id]);
      },
      condition: element => {
        let lawofthegods = this.actor.effects.filter(effect => effect.data.label.includes(game.i18n.localize("touhouvq.namesRaceSkill.lawofthegods")))[0];
        return lawofthegods;
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
    },
    {
      name: game.i18n.localize("touhouvq.flavorText.youkairoll1"),
      icon: '<i class="item-roll fas fa-dice-d20"></i>',
      callback: element => {
        const traitRollKey = "rollCharisma";
        const compskillvalue = "scourgebynature";
        Dice.TraitCheck(this.actor, traitRollKey, compskillvalue);
      },
      condition: element => {
        return this.actor.data.data.talentStarter === "youkai";
      }
    },
    {
      name: game.i18n.localize("touhouvq.flavorText.youkairoll2"),
      icon: '<i class="item-roll fas fa-dice-d20"></i>',
      callback: element => {
        const traitRollKey = "rollIntimidation";
        const compskillvalue = "scourgebynature";
        Dice.TraitCheck(this.actor, traitRollKey, compskillvalue);
      },
      condition: element => {
        return this.actor.data.data.talentStarter === "youkai";
      }
    },
    {
      name: game.i18n.localize("touhouvq.debugg.unrealStrength0"),
      icon: '<i class="fas fa-times"></i>',
      callback: element => {
        let unreal = this.actor.effects.filter(effect => effect.data.label.includes(game.i18n.localize("touhouvq.unreal.strength")))[0];
        this.actor.deleteEmbeddedDocuments('ActiveEffect', [unreal.id]);
      },
      condition: element => {
        let unreal = this.actor.effects.filter(effect => effect.data.label.includes(game.i18n.localize("touhouvq.unreal.strength")))[0];
        return unreal;
      }
    },
    {
      name: game.i18n.localize("touhouvq.debugg.unrealAgility0"),
      icon: '<i class="fas fa-times"></i>',
      callback: element => {
        let unreal = this.actor.effects.filter(effect => effect.data.label.includes(game.i18n.localize("touhouvq.unreal.agility")))[0];
        this.actor.deleteEmbeddedDocuments('ActiveEffect', [unreal.id]);
      },
      condition: element => {
        let unreal = this.actor.effects.filter(effect => effect.data.label.includes(game.i18n.localize("touhouvq.unreal.agility")))[0];
        return unreal;
      }
    },
    {
      name: game.i18n.localize("touhouvq.debugg.unrealResilience0"),
      icon: '<i class="fas fa-times"></i>',
      callback: element => {
        let unreal = this.actor.effects.filter(effect => effect.data.label.includes(game.i18n.localize("touhouvq.unreal.resilience")))[0];
        this.actor.deleteEmbeddedDocuments('ActiveEffect', [unreal.id]);
      },
      condition: element => {
        let unreal = this.actor.effects.filter(effect => effect.data.label.includes(game.i18n.localize("touhouvq.unreal.resilience")))[0];
        return unreal;
      }
    },
    {
      name: game.i18n.localize("touhouvq.debugg.unrealDiscipline0"),
      icon: '<i class="fas fa-times"></i>',
      callback: element => {
        let unreal = this.actor.effects.filter(effect => effect.data.label.includes(game.i18n.localize("touhouvq.unreal.discipline")))[0];
        this.actor.deleteEmbeddedDocuments('ActiveEffect', [unreal.id]);
      },
      condition: element => {
        let unreal = this.actor.effects.filter(effect => effect.data.label.includes(game.i18n.localize("touhouvq.unreal.discipline")))[0];
        return unreal;
      }
    },
    {
      name: game.i18n.localize("touhouvq.debugg.unrealPerception0"),
      icon: '<i class="fas fa-times"></i>',
      callback: element => {
        let unreal = this.actor.effects.filter(effect => effect.data.label.includes(game.i18n.localize("touhouvq.unreal.perception")))[0];
        this.actor.deleteEmbeddedDocuments('ActiveEffect', [unreal.id]);
      },
      condition: element => {
        let unreal = this.actor.effects.filter(effect => effect.data.label.includes(game.i18n.localize("touhouvq.unreal.perception")))[0];
        return unreal;
      }
    },
    {
      name: game.i18n.localize("touhouvq.debugg.unrealMagic0"),
      icon: '<i class="fas fa-times"></i>',
      callback: element => {
        let unreal = this.actor.effects.filter(effect => effect.data.label.includes(game.i18n.localize("touhouvq.unreal.magic")))[0];
        this.actor.deleteEmbeddedDocuments('ActiveEffect', [unreal.id]);
      },
      condition: element => {
        let unreal = this.actor.effects.filter(effect => effect.data.label.includes(game.i18n.localize("touhouvq.unreal.magic")))[0];
        return unreal;
      }
    },
    {
      name: game.i18n.localize("touhouvq.debugg.unrealIntelligence0"),
      icon: '<i class="fas fa-times"></i>',
      callback: element => {
        let unreal = this.actor.effects.filter(effect => effect.data.label.includes(game.i18n.localize("touhouvq.unreal.intelligence")))[0];
        this.actor.deleteEmbeddedDocuments('ActiveEffect', [unreal.id]);
      },
      condition: element => {
        let unreal = this.actor.effects.filter(effect => effect.data.label.includes(game.i18n.localize("touhouvq.unreal.intelligence")))[0];
        return unreal;
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
      name: game.i18n.localize("touhouvq.rollTalent.search"),
      icon: '<i class="fas fa-search"></i>',
      callback: element => {
        const actualStat = element.data("action-value");
        const actualFatigue = element.data("fatigue-value");
        const statType = "5";
        const talentvalue = "search";
        let actorData = this.actor;

        Dice.StatCheck({
          actionValue: actualStat,
          fatiguePoints: actualFatigue,
          statType: statType,
          actorData: actorData,
          talentvalue: talentvalue
        })
      },
      condition: element => {
        return this.actor.items.some(item => (item.data.type === 'talent' && item.data.data.idname === 'search'));
      }
    },
    {
      name: game.i18n.localize("touhouvq.rollTalent.orientation"),
      icon: '<i class="fas fa-search"></i>',
      callback: element => {
        const actualStat = element.data("action-value");
        const actualFatigue = element.data("fatigue-value");
        const statType = "5";
        const talentvalue = "orientation";
        let actorData = this.actor;

        Dice.StatCheck({
          actionValue: actualStat,
          fatiguePoints: actualFatigue,
          statType: statType,
          actorData: actorData,
          talentvalue: talentvalue
        })
      },
      condition: element => {
        return this.actor.items.some(item => (item.data.type === 'talent' && item.data.data.idname === 'orientation'));
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
    ));
  }

  itemContextMenu = [
    {
      name: game.i18n.localize("touhouvq.sheet.edit"),
      icon: '<i class="fas fa-pen"></i>',
      callback: element => {
        const item = this.actor.items.get(element.data("item-id"));
        item.sheet.render(true);
      }
    },
    {
      name: game.i18n.localize("touhouvq.sheet.delete"),
      icon: '<i class="fas fa-trash"></i>',
      callback: element => {
        this.actor.deleteEmbeddedDocuments("Item",[element.data("item-id")]);
      }
    },
    {
      name: game.i18n.localize("touhouvq.sheet.show"),
      icon: '<i class="item-roll fas fa-eye"></i>',
      callback: element => {
        const itemID = element.data("itemId");
        const item = this.actor.items.get(itemID);
        let actorID = this.actor.id;

        if(item.data.type === "weapon") {
          item.roll();
        } else {
          Tchat.itemShow({
            itemData: item,
            actorID: actorID
          });
        }
      }
    },
    {
      name: game.i18n.localize("touhouvq.sheet.show+"),
      icon: '<i class="item-roll far fa-eye"></i>',
      callback: element => {
        const itemID = element.data("itemId");
        const item = this.actor.items.get(itemID);
        let actorID = this.actor.id;

        Tchat.itemShowMore({
          itemData: item,
          actorID: actorID
        });
      },
      condition: element => {
        const itemID = element.data("itemId");
        const item = this.actor.items.get(itemID);
        let isObject = false;
        if(item.data.type === "object") {
          isObject = true;
        }
        return isObject;
      }
    },
    {
      name: game.i18n.localize("touhouvq.sheet.show+"),
      icon: '<i class="item-roll far fa-eye"></i>',
      callback: element => {
        const itemID = element.data("itemId");
        const item = this.actor.items.get(itemID);
        let actorID = this.actor.id;

        Tchat.itemShowMore({
          itemData: item,
          actorID: actorID
        });
      },
      condition: element => {
        const itemID = element.data("itemId");
        const item = this.actor.items.get(itemID);
        let isArmor = false;
        if(item.data.type === "armor") {
          isArmor = true;
        }
        return isArmor;
      }
    },
    {
      name: game.i18n.localize("touhouvq.sheet.show+"),
      icon: '<i class="item-roll far fa-eye"></i>',
      callback: element => {
        const itemID = element.data("itemId");
        const item = this.actor.items.get(itemID);
        let actorID = this.actor.id;

        Tchat.itemShowMore({
          itemData: item,
          actorID: actorID
        });
      },
      condition: element => {
        const itemID = element.data("itemId");
        const item = this.actor.items.get(itemID);
        let isWeapon = false;
        if(item.data.type === "weapon") {
          isWeapon = true;
        }
        return isWeapon;
      }
    },
    {
      name: game.i18n.localize("touhouvq.sheet.destructionSave"),
      icon: '<i class="item-roll fas fa-bolt"></i>',
      callback: element => {
        const itemID = element.data("itemId");
        const item = this.actor.items.get(itemID);

        let actorID = this.actor.id;
        let destrSaveText = game.i18n.localize("touhouvq.sheet.destructionSaveText");

        const destrSave = new DestructionSave(itemID, actorID, destrSaveText);
    
        destrSave.render(true);
      },
      condition: element => {
        const itemID = element.data("itemId");
        const item = this.actor.items.get(itemID);
        let isWeaponOrObject = false;
        if(item.data.type === "weapon" || item.data.type === "object") {
          isWeaponOrObject = true;
        }
        return isWeaponOrObject;
      }
    },
    {
      name: game.i18n.localize("touhouvq.sheet.destructionSave"),
      icon: '<i class="item-roll fas fa-bolt"></i>',
      callback: element => {
        const itemID = element.data("itemId");
        const item = this.actor.items.get(itemID);

        let actorID = this.actor.id;
        let destrSaveText = game.i18n.localize("touhouvq.sheet.destructionSaveText");

        const destrSave = new DestructionSave(itemID, actorID, destrSaveText);
    
        destrSave.render(true);

        /*
        //old
        Tchat.armorBreakCheck({
          itemData: item,
          actorData: this.actor
        });
        */
      },
      condition: element => {
        const itemID = element.data("itemId");
        const item = this.actor.items.get(itemID);
        let isArmor = false;
        if(item.data.type === "armor") {
          isArmor = true;
        }
        return isArmor;
      }
    },
    {
      name: game.i18n.localize("touhouvq.sheet.attack"),
      icon: '<i class="item-roll fas fa-dice-d20"></i>',
      callback: element => {
        const itemID = element.data("itemId");
        const item = this.actor.items.get(itemID);
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
        const item = this.actor.items.get(element.data("item-id"));
        item.sheet.render(true);
      }
    },
    {
      name: game.i18n.localize("touhouvq.sheet.delete"),
      icon: '<i class="fas fa-trash"></i>',
      callback: element => {
        this.actor.deleteEmbeddedDocuments("Item",[element.data("item-id")]);
      }
    },
    {
      name: game.i18n.localize("touhouvq.sheet.show"),
      icon: '<i class="item-roll fas fa-eye"></i>',
      callback: element => {
        const itemID = element.data("itemId");
        const item = this.actor.items.get(itemID);

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
        const item = this.actor.items.get(itemID);
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

    data.raceListing = this.actor.type === "personnage" ? CONFIG.touhouvq.raceListing : {...CONFIG.touhouvq.raceListing, ...CONFIG.touhouvq.raceListingPnj};

    data.equipables = data.items.filter(item => [ "weapon", "armor", "object" ].includes(item.type) );
    data.perks = data.items.filter(item => [ "talent", "spellcard" ].includes(item.type) );

    data.unrealStats = this.getUnrealStats();

    data.isGM = game.user.isGM;

    return data;
  }

  activateListeners(html) {
    if (this.isEditable) {
      html.find(".item-edit").click(this._onItemEdit.bind(this));
      html.find(".item-delete").click(this._onItemDelete.bind(this));
      html.find(".tvq-button-bodyloc").click(this._onBodyLoc.bind(this));
      html.find(".tvq-deathcheck-roll").click(this._onDeathCheck.bind(this));

      html.find(".tvq-input-race").change(this._onRaceChange.bind(this));

      html.find('.mini-button').click(this._onMiniButtonClick.bind(this));
      html.find('.sheet2-button').click(this._onSheet2ButtonClick.bind(this));

      html.find('.mini-button-infosShow').click(this._onButtonInfosShowClick.bind(this));

      html.find('.open-debugg').click(this._onButtonDebugg.bind(this));
      html.find('.open-funeffects').click(this._onButtonFunEffects.bind(this));
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
      if (this.actor.isOwner) {
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
    const item = this.actor.items.get(itemID);

    item.roll();
  }

  _onItemEdit(event) {
    event.preventDefault();
    let element = event.currentTarget;
    let itemId = element.closest(".weapon-card").dataset.itemId;
    let item = this.actor.items.get(itemId);

    item.sheet.render(true);
  }

  _onItemDelete(event) {
    event.preventDefault();
    let element = event.currentTarget;
    let itemId = element.closest(".weapon-card").dataset.itemId;
    return this.actor.deleteEmbeddedDocuments("Item",[itemId]);
  }

  async _onDropItem(event, data) {
    event.preventDefault();

    let objectsHeld = this.actor.data.items.filter(item => [ "weapon", "armor", "object" ].includes(item.type) );
    
    if(objectsHeld.length >= 14) {
      ui.notifications.warn(game.i18n.localize("touhouvq.notifications.tooMuchItems"));
        return false;
    } else {
      return super._onDropItem(event, data);
    }
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

    if(race.includes("mecanical")) {
      race = "mecanical";
    }
    
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

    if(race.includes("mecanical")) {
      race = "mecanical";
      compdesc = game.i18n.localize("touhouvq.raceskillDesc.mecanical");
    }
    
    const raceskillSheet = new RaceskillsSheet(actor, race, compname, compdesc, compname1, talentSkillType);

    raceskillSheet.render(true);
  }

_onRaceskillRoll(event) {
    event.preventDefault();
    let element = event.currentTarget;
    let race = element.dataset.race;
    const actor = this.actor;
    let actualStat = element.dataset.action;
    let actualFatigue = element.dataset.fatigue;
    let compname = game.i18n.localize("touhouvq.raceskill."+race);
    let compdesc = game.i18n.localize("touhouvq.raceskillDesc."+race);
    let compname1 = game.i18n.localize("touhouvq.raceskill1."+race);

    if(race == "youkai") {
      //Directly go to Tchat.raceRoll({})
    }

    if(race == "ghost") {
      //Message : perte de 1d4 point de blessures critiques + les faire perdre (min : 0)
      //+ : choix : jet de maitrise ou passepasse ?
      //puis, lorsque jet fait, show 1+degrés de réu.
    }

    if(race == "vampire") {
      actualStat = actor.data.data.stats.strength;
      actualFatigue = actor.data.data.fatigue.value;
      //Directly go to Tchat.raceRoll({})
    }

    if(race == "fairy") {

      let buffingInfo = [];

      let targetherself = actor.items.some(item => (item.data.type === 'talent' && item.data.data.idname === 'insolent_macrocosm'));

      //Checking if at least an actor is targeted
      if(game.user.targets.size == 1) {

        //Check if the selected actor is himself.
        let foreachvalue = 0;
        game.user.targets.forEach( async function(target) {
          //If the fairy have the talent, then she can target herself
          if(actor.data._id !== target.actor.id) {

              if(game.user.isGM) {
                const effectData = {
                  label:game.i18n.localize("touhouvq.namesRaceSkill.manifestationofnature"),
                  icon: "systems/touhouvq/assets/img/talentsandskills/fairy/manifestationofnature.webp"
                };
                const manifestationofnature = await ActiveEffect.create(effectData, {parent: target.actor});
              } else {
                game.socket.emit('system.touhouvq', {
                  action: "manifestationofnature",
                  actorId: target.actor.id
                });
              }

              buffingInfo = target.actor.data.name;

              Dice.StatCheck({
                actionValue: actor.data.data.stats.magic,
                fatiguePoints: actor.data.data.fatigue.value,
                statType: 6,
                actorData: actor,
                compskillvalue: "manifestationofnature",
                talentvalue: buffingInfo
              });
            
          } else {
            if(targetherself == true) {
              //the fairy have the insolent_macrocosm talent, so she can target herself !
              if(game.user.isGM) {
                const effectData = {
                  label:game.i18n.localize("touhouvq.namesRaceSkill.manifestationofnature"),
                  icon: "systems/touhouvq/assets/img/talentsandskills/fairy/manifestationofnature.webp"
                };
                const manifestationofnature = await ActiveEffect.create(effectData, {parent: target.actor});
              } else {
                game.socket.emit('system.touhouvq', {
                  action: "manifestationofnature",
                  actorId: target.actor.id
                });
              }

              buffingInfo = target.actor.data.name;

              Dice.StatCheck({
                actionValue: actor.data.data.stats.magic,
                fatiguePoints: actor.data.data.fatigue.value,
                statType: 6,
                actorData: actor,
                compskillvalue: "manifestationofnature",
                talentvalue: buffingInfo
              });
            } else {
              return ui.notifications.warn(game.i18n.localize("touhouvq.notifications.cantTargetSelf"));
            }
          }
          foreachvalue++;
        });
      } else {
        return ui.notifications.warn(game.i18n.localize("touhouvq.notifications.anOnlyActor"));
      }

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
      //Directly go to Tchat.raceRoll({})
    }

    if(race == "arahitogami") {
      Dice.TraitCheck(actor, "rollFaith", "lawofthegods");
    }

    if(race == "tsukumogami") {
      //Directly go to Tchat.raceRoll({})
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

    if(race.includes("mecanical")) {
      actualStat = actor.data.data.stats.strength;
      actualFatigue = actor.data.data.fatigue.value;
      race = "mecanical";
    }

    if(race == "sentientgrimoire") {
      let actualStat = actor.data.data.stats.intelligence;
      let actualFatigue = actor.data.data.fatigue.value;
      let knowledgeText = game.i18n.localize("touhouvq.sheet.rollKnowledge");
      const pickingKnowledge = new KnowledgePicking(actor, actualStat, actualFatigue, knowledgeText);
      pickingKnowledge.render(true);
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

  _onButtonFunEffects(event) {
    event.preventDefault();
    const leFunEffects = new FunEffectsPanel(this.actor);

    leFunEffects.render(true);
  }

  _onToggleFrolic(event) {
    event.preventDefault();
    let elements = document.getElementsByClassName("tvq-frolic-buttons");

    this.actor.displayRaceskillButtons = !this.actor.displayRaceskillButtons;

    for(let elem of elements) {
      console.log(elem);
      if(this.actor.displayRaceskillButtons && this.actor.id !== elem.dataset.actor) {
        elem.classList.remove('tvq-hide');
      } else {
        elem.classList.add('tvq-hide');
      }
    }

    const button = event.currentTarget;
    button.dataset.activated = this.actor.displayRaceskillButtons;
  }

  _onRaceChange(event) {
    event.preventDefault();
    event.stopPropagation();

    const selectElem = event.currentTarget;
    const race = selectElem.options[selectElem.selectedIndex].value;

    const updateObj = {};

    updateObj['data.race'] = race;
    updateObj['data.talentStarter'] = race;
    updateObj['data.raceSkill'] = race;

    return this.actor.update(updateObj);


    /*
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
    */
  }

  getUnrealStats() {
    return Object.keys(CONFIG.touhouvq.stats).reduce( (acc,cur) => {
      const unreal = this.actor.data.effects.filter(effect => effect.data.label.includes(game.i18n.localize(`touhouvq.unreal.${cur}`)))[0];
      return unreal ? {...acc,[cur]:"unrealclass"} : acc;
    },{});
  }
}
