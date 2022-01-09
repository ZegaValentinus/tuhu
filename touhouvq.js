import { touhouvq } from "./module/config.js";
import * as Tchat from "./module/tchat.js";
import * as Dice from "./module/dice.js";
import touhouvqItemSheet from "./module/sheets/touhouvqItemSheet.js";
import touhouvqItem from "./module/touhouvqItem.js";
import touhouvqActor from "./module/touhouvqActor.js";
import touhouvqCombat from "./module/combat.js";
import touhouvqCombatTracker from "./module/combatTracker.js";
import characterSheet from "./module/sheets/characterSheet.js";
import { registerSystemSettings } from "./module/settings.js";

async function preloadHandlebarsTemplates() {
  const templatePaths = [
    "systems/touhouvq/templates/partials/item-card.html",
    "systems/touhouvq/templates/partials/talent-skill-spellcard-card.html",
    "systems/touhouvq/templates/partials/weapon-card.html",
    "systems/touhouvq/templates/partials/tchat-card.html",
    "systems/touhouvq/templates/partials/weapon-chat.html",
    "systems/touhouvq/templates/partials/character-barFirst-block.html",
    "systems/touhouvq/templates/partials/character-barSecond-block.html",
    "systems/touhouvq/templates/partials/character-barMain1-block.html",
    "systems/touhouvq/templates/partials/character-barMain2-block.html",
    "templates/dice/roll.html"
  ];

  return loadTemplates(templatePaths);
}

Hooks.once("init", function() {
  console.log("touhouvq | Initialising Touhou:VenturesomeQuest! System");

  CONFIG.touhouvq = touhouvq;
  CONFIG.Combat.entityClass = touhouvqCombat;
  CONFIG.ui.combat = touhouvqCombatTracker;

  game.socket.on('system.touhouvq', Tchat.onSocketReceived);

  //Updating localist  for races that use casual list
  Object.entries(CONFIG.touhouvq.races).forEach(([key, entry]) => {
    if ( entry.locaList === 'useDefault' ) {
      entry.locaList = CONFIG.touhouvq.defaultLocaList;
    }
  });

  CONFIG.Item.documentClass = touhouvqItem;
  CONFIG.Actor.documentClass = touhouvqActor;

  CONFIG.ChatMessage.documentClass = tvqChatMessage;
  CONFIG.ChatMessage.template = "systems/touhouvq/templates/chat/chat-message.html";

  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("touhouvq", touhouvqItemSheet, { makeDefault: true });

  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("touhouvq", characterSheet, { makeDefault: true });

  registerHandlebarsHelpers();

  preloadHandlebarsTemplates();

  registerSystemSettings();

  registerInitiative();
});

Hooks.on("renderChatLog", (app, html, data) => {
  html.on("click",".tvq-usehuman",_onUseHuman);
  html.on("click",".tvq-chooseyoukai",_onChooseYoukai);
  html.on("click",".tvq-choosevampire",_onChooseVampire);
  html.on("click",".tvq-raceskilllunarrabbit",_onDeleteEffectLunarrabbit);
  html.on("click",".tvq-raceskillarahitogami",_onReinforcementArahitogami);
  html.on("click",".tvq-choosetsukumogami",_onChooseTsukumogami);
  html.on("click",".tvq-frolic-button",_onRaceskillFrolic);
  html.on("click",".tvq-choosemecanical",_onChooseMecanical);
});

Hooks.on("renderChatMessage", (app, html, data) => {

  if(!app._roll){return;}

  const actor = game.actors.get(app._roll.options.actorId);

  /* ARAHITOGAMI RACESKILL - BEGIN */

  //Hide human race skill button for non sheet owners
  const myButtonLawofthegods = html.find('.tvq-raceskillarahitogami')[0];
  if(myButtonLawofthegods && !actor.isOwner) {
    myButtonLawofthegods.classList.add("tvq-hide");
  }

  /* ARAHITOGAMI RACESKILL - END */

  /* EARTH RABBIT RACESKILL - BEGIN */

  //Hide earth rabbit race skill buttons for non sheet owners
  /* Carter side notes : Here, we want to hide : */
  /* The buttons of own rolls. We don't want earthrabbits to self-still their own dices. */
  /* The buttons for people that don't own earth rabbits. */
  const frolicDiv = html.find('.tvq-frolic-buttons')[0];

  //Check if GM have disabled buttons
  const activateButtonsGM = game.settings.get("touhouvq","disableFrolicButtonsGM");

  if ( !app.getFlag("touhouvq","diceStolen") ) {
    if ( frolicDiv ) {
      //If GM have disabled buttons, then disable them
      if(game.user.isGM && !activateButtonsGM) {
        return;
      }
      const rollingActor = frolicDiv.dataset.actor;
      game.actors.forEach( actor => {
        if ( actor.isOwner && actor.data.data.race === "earthrabbit" ) {
          //the user have an earth rabbit
          if ( actor.data._id !== rollingActor && actor.displayRaceskillButtons ) {
            //display buttons
            frolicDiv.classList.remove('tvq-hide');
          }
        }
      });
    }
  } else {
    html.find('.dice-result')[0].classList.add("obsolete");
  }

  /* EARTH RABBIT RACESKILL - END */

  if(!app._roll.options.isRaceSkill) {return;}

  if(!actor.isOwner) {

    /* HUMAN RACESKILL - BEGIN */

    //Hide human race skill button for non sheet owners
    const myButton = html.find('.tvq-usehuman')[0];
    if(myButton) {
      myButton.classList.add("tvq-hide");
    }

    /* HUMAN RACESKILL - END */

  }
});

Hooks.once('ready', async function () {

  //display welcome message if needed
  /*
  if (!game.user.getFlag("touhouvq", "welcomeMessageShown")) {
    Tchat.welcomeMessage();
  }
  */

});

async function _onUseHuman(event) {
  event.preventDefault();
  event.stopPropagation();
  const actorID = event.currentTarget.dataset.actorId;
  const actor = game.actors.get(actorID);
  const augment = event.currentTarget.dataset.augment;
  const stat = CONFIG.touhouvq.selfhelp[event.currentTarget.dataset.stat-1];

  if(actor.isOwner) {
    let selfhelp = actor.effects.filter(effect => effect.data.label === game.i18n.localize("touhouvq.namesRaceSkill.selfhelp"))[0];

    if(!selfhelp) {
      const effectData = {
        label:game.i18n.localize("touhouvq.namesRaceSkill.selfhelp"),
        icon: "systems/touhouvq/assets/img/talentsandskills/"+actor.data.data.race+"/selfhelp.webp"
      };
      selfhelp = await ActiveEffect.create(effectData, {parent: actor});
    }

    const changes = duplicate(selfhelp.data.changes);
    changes[0] = {
      key: `data.stats.${stat}`,
      mode: CONST.ACTIVE_EFFECT_MODES.ADD,
      value: parseInt(augment)
    };

    selfhelp.update({"changes":changes});
  }
}

async function _onChooseVampire(event) {
  event.preventDefault();
  event.stopPropagation();
  let race = "vampire";
  const actorID = event.currentTarget.dataset.actorId;
  const actor = game.actors.get(actorID);

  let compname = game.i18n.localize("touhouvq.namesRaceSkill.savagerecovery");
  let compdesc = game.i18n.localize("touhouvq.raceskillDesc.vampire");
  let compname1 = game.i18n.localize("touhouvq.raceskill1.vampire");

  const regen = 1;
  
  let data = {
    race: race,
    compname: compname,
    compdesc, compdesc,
    compname1: compname1,
    regen: regen
  };

  Tchat.raceRoll({
    actor: actor,
    data: data
  });
}

async function _onChooseYoukai(event) {
  event.preventDefault();
  event.stopPropagation();
  const actorID = event.currentTarget.dataset.actor;
  const actor = game.actors.get(actorID);
  const choice = event.currentTarget.dataset.choice;

  const messageID = event.currentTarget.closest(".chat-message").dataset.messageId;
  const message = game.messages.get(messageID);
  message.delete();
  
  Dice.StatCheck({
    actionValue: actor.data.data.stats,
    fatiguePoints: actor.data.data.fatigue.value,
    statType: choice,
    actorData: actor,
    compskillvalue: "powerunleash"
  });
}

async function _onChooseYoukaiAdd(event) {
  event.preventDefault();
  event.stopPropagation();

  const actorID = event.currentTarget.dataset.actor;
  const actor = game.actors.get(actorID);

  actor.data.data.magic.value++;

  ui.notifications.info(game.i18n.localize("touhouvq.notifications.magicPointGained"));
}

async function _onDeleteEffectLunarrabbit(event) {
  const actorID = event.currentTarget.dataset.actorId;
  const actor = game.actors.get(actorID);
  let firingline = actor.effects.filter(effect => effect.data.label === game.i18n.localize("touhouvq.namesRaceSkill.firingline"))[0];
  actor.deleteEmbeddedDocuments('ActiveEffect', [firingline.id]);
}

async function _onReinforcementArahitogami(event) {
  event.preventDefault();
  event.stopPropagation();

  const actorID = event.currentTarget.dataset.actorId;
  const actor = game.actors.get(actorID);
  const reinforcement = event.currentTarget.dataset.reinforcement;

  const locaList = [
    {id: 'head', crit: true, range: [10]},
    {id: 'heart', crit: true, range: [9]},
    {id: 'torso', range: [6, 7, 8]},
    {id: 'object', range: [5]},
    {id: 'rArm', range: [4]},
    {id: 'lArm', range: [3]},
    {id: 'rLeg', range: [2]},
    {id: 'lLeg', range: [1]}
  ];

  let locaList2 = ['head','heart','torso','object','rArm','lArm','rLeg','lLeg'];

  let rollResult = null;
  let rollResult1 = null;
  let bodylocation = "";

  if(reinforcement >= 8) {
    locaList.filter(loca => loca.range.includes(1))[0].armor = true;
    locaList.filter(loca => loca.range.includes(2))[0].armor = true;
    locaList.filter(loca => loca.range.includes(3))[0].armor = true;
    locaList.filter(loca => loca.range.includes(4))[0].armor = true;
    locaList.filter(loca => loca.range.includes(5))[0].armor = true;
    locaList.filter(loca => loca.range.includes(6))[0].armor = true;
    locaList.filter(loca => loca.range.includes(9))[0].armor = true;
    locaList.filter(loca => loca.range.includes(10))[0].armor = true;
    ui.notifications.info(game.i18n.localize("touhouvq.notifications.allLawofthegods"));
  } else {
    for (let i = 8; i > 8-reinforcement; i--) {
      rollResult = Math.floor(Math.random() * i);

      if(i < 8) {
        bodylocation += ", ";
      }
  
      if(locaList2[rollResult] === "head") {
        rollResult1 = 10;
        bodylocation += game.i18n.localize("touhouvq.notifications.headLawofthegods");
      }
      if(locaList2[rollResult] === "heart") {
        rollResult1 = 9;
        bodylocation += game.i18n.localize("touhouvq.notifications.heartLawofthegods");
      }
      if(locaList2[rollResult] === "torso") {
        rollResult1 = 6;
        bodylocation += game.i18n.localize("touhouvq.notifications.torsoLawofthegods");
      }
      if(locaList2[rollResult] === "object") {
        rollResult1 = 5;
        bodylocation += game.i18n.localize("touhouvq.notifications.objectLawofthegods");
      }
      if(locaList2[rollResult] === "rArm") {
        rollResult1 = 4;
        bodylocation += game.i18n.localize("touhouvq.notifications.rArmLawofthegods");
      }
      if(locaList2[rollResult] === "lArm") {
        rollResult1 = 3;
        bodylocation += game.i18n.localize("touhouvq.notifications.lArmLawofthegods");
      }
      if(locaList2[rollResult] === "rLeg") {
        rollResult1 = 2;
        bodylocation += game.i18n.localize("touhouvq.notifications.rLegLawofthegods");
      }
      if(locaList2[rollResult] === "lLeg") {
        rollResult1 = 1;
        bodylocation += game.i18n.localize("touhouvq.notifications.lLegLawofthegods");
      }
  
      locaList.filter(loca => loca.range.includes(rollResult1))[0].armor = true;
  
      locaList2.splice(rollResult, 1);
    }
    ui.notifications.info(bodylocation+game.i18n.localize("touhouvq.notifications.reinforcedLawofthegods"));
  }

  const effectData = {
    label:game.i18n.localize("touhouvq.namesRaceSkill.lawofthegods"),
    icon: "systems/touhouvq/assets/img/talentsandskills/"+actor.data.data.race+"/lawofthegods.webp",
    flags: {
      touhouvq: {
        locaList: locaList
      }
    }
  };

  let lawOfTheGodsExists = actor.effects.filter(effect => effect.data.label.includes(game.i18n.localize("touhouvq.namesRaceSkill.lawofthegods")))[0];

  if(lawOfTheGodsExists) {
    actor.deleteEmbeddedDocuments('ActiveEffect', [lawOfTheGodsExists.id]);
  }

  const lawofthegods = await ActiveEffect.create(effectData, {parent: actor});

}

async function _onChooseTsukumogami(event) {
  event.preventDefault();
  event.stopPropagation();
  let race = "tsukumogami";
  const actorID = event.currentTarget.dataset.actorId;
  const actor = game.actors.get(actorID);
  const choice = event.currentTarget.dataset.choice;

  const messageID = event.currentTarget.closest(".chat-message").dataset.messageId;
  const message = game.messages.get(messageID);
  message.delete();

  let compname = game.i18n.localize("touhouvq.namesRaceSkill.tsukumogamirecon");
  let compdesc = game.i18n.localize("touhouvq.raceskillDesc.tsukumogami");
  let compname1 = game.i18n.localize("touhouvq.raceskill1.tsukumogami");
  
  let data = {
    race: race,
    compname: compname,
    compdesc, compdesc,
    compname1: compname1,
    choice: choice
  };

  Tchat.raceRoll({
    actor: actor,
    data: data
  });
}

async function _onRaceskillFrolic(event) {
  event.preventDefault();
  event.stopPropagation();

  //Get the actor, the one that is stealing the dice
  const actor = game.actors.get(game.user.data.character);

  if(!actor) {
    ui.notifications.warn(game.i18n.localize("touhouvq.notifications.noActor"));
    return;
  }

  //Get the message
  const messageID = event.currentTarget.closest(".chat-message").dataset.messageId;
  const message = game.messages.get(messageID);

  //Get all the data from the button div : from the dataset attached to it
  const dataset = event.currentTarget.closest(".tvq-frolic-buttons").dataset;

  //Get the targeted die faces, and it's result
  const faces = event.currentTarget.dataset.faces;
  const result = event.currentTarget.dataset.result;

  if(actor.isOwner) {
    let frolic = actor.effects.filter(effect => effect.data.label.includes(game.i18n.localize("touhouvq.namesRaceSkill.frolic")))[0];

    if(!frolic) {
      //If actor don't have frolic, then he obtains frolic effect.
      const effectData = {
        label:game.i18n.localize("touhouvq.namesRaceSkill.frolic")+" [d"+faces+"]",
        icon: "systems/touhouvq/assets/img/talentsandskills/"+actor.data.data.race+"/frolic.webp",
        flags: {
          touhouvq: {
            nbFaces: faces,
            isUsable: false
          }
        }
      };
      frolic = await ActiveEffect.create(effectData, {parent: actor});
    } else {
      //If actor already have frolic effect, then we delete the old one and update it.
      frolic.update({
        label:game.i18n.localize("touhouvq.namesRaceSkill.frolic")+" [d"+faces+"]",
        flags: {
          touhouvq: {
            nbFaces: faces,
            isUsable: false
          }
        }
      });
    }

    if(game.user.isGM) {
      message.setFlag("touhouvq","diceStolen",true);
    } else {
      game.socket.emit('system.touhouvq', {
        action: "diceStolen",
        messageID: messageID
      });
    }

    const frolicdivelement = event.currentTarget.closest(".tvq-frolic-buttons");
    frolicdivelement.remove();

    Dice.diceStolen({
      dataset: dataset,
      message: message,
      faces: faces,
      result: result,
      actor: actor
    });
  }
}

async function _onChooseMecanical(event) {
  event.preventDefault();
  event.stopPropagation();
  let race = "mecanical";
  const actorID = event.currentTarget.dataset.actorId;
  const actor = game.actors.get(actorID);

  let compname = game.i18n.localize("touhouvq.namesRaceSkill.crush");
  let compdesc = game.i18n.localize("touhouvq.raceskillDesc.mecanical1");
  let compname1 = game.i18n.localize("touhouvq.raceskill1.mecanical1");

  const crush = 1;
  
  let data = {
    race: race,
    compname: compname,
    compdesc, compdesc,
    compname1: compname1,
    crush: crush
  };

  Tchat.raceRoll({
    actor: actor,
    data: data
  });
}

function registerHandlebarsHelpers() {
  Handlebars.registerHelper('ifSuperiorOrEquals', function(arg1, arg2, options) {
    return (arg1 >= arg2) ? options.fn(this) : options.inverse(this);
  });

  Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
  });

  Handlebars.registerHelper('ifNotEquals', function(arg1, arg2, options) {
    return (arg1 != arg2) ? options.fn(this) : options.inverse(this);
  });

  Handlebars.registerHelper('critString', function(dice) {
    let returnString = '';
    dice.forEach( die => {
      die.results.forEach( result => {
        if( 4 !== die.faces && result.result === die.faces ) {
          returnString = game.i18n.localize('touhouvq.critical.critdamage');
        }
      });
    });
    return returnString;
  });

  Handlebars.registerHelper('critTotal', function(dice) {
    let returnString = '';
    dice.forEach( die => {
      die.results.forEach( result => {
        if( 4 !== die.faces && result.result === die.faces ) {
          returnString = 'tvq-criticaltotal';
        }
      });
    });
    return returnString;
  });

  Handlebars.registerHelper('critRoll', function(dice) {
    let returnString = 'display: none';
    dice.forEach( die => {
      die.results.forEach( result => {
        if( 4 !== die.faces && result.result === die.faces ) {
          returnString = 'display: block';
        }
      });
    });
    return returnString;
  });

  Handlebars.registerHelper('whichCrit', function(dice) {
    let critFord6 = Math.floor(Math.random() * 4)+1;
    let critFord8 = Math.floor(Math.random() * 6)+1;
    let critFord10 = Math.floor(Math.random() * 8)+1;
    let returnString = '';
    let maxima = 6;
    dice.forEach( die => {
      die.results.forEach( result => {
        if( 4 !== die.faces && result.result === die.faces ) {

          if(maxima < die.faces) {
            maxima = die.faces;
          }
  
          if( maxima === 8 ) {
            //console.log("Launch a d6");
            returnString = critFord8;
          } else {
            if( maxima === 10 ) {
              //console.log("Launch a d8");
              returnString = critFord10;
            } else {
              //console.log("Launch a d4");
              returnString = critFord6;
            }
          }
        }
      });
    });
    return returnString;
  });

  Handlebars.registerHelper('whichCritDice', function(dice) {
    let returnString = "";
    let maxima = 6;
    dice.forEach( die => {
      die.results.forEach( result => {
        if( 4 !== die.faces && result.result === die.faces ) {

          /* result.result = valeur du dé qui a crit */

          if(maxima < die.faces) {
            maxima = die.faces;
          }
  
          if( maxima === 8 ) {
            returnString = "d6";
          } else {
            if( maxima === 10 ) {
              returnString = "d8";
            } else {
              returnString = "d4";
            }
          }
        }
      });
    });
    return returnString;
  });

  Handlebars.registerHelper('forLoop', function (nbIterr, loopInner) {
    return [...Array(nbIterr)].reduce((acc, cur, index) => (acc + loopInner.fn(index)), "");
  });

  //github.com/adg29/concat.js
  Handlebars.registerHelper('concat', function () {
    let outStr = '';
    for (const arg in arguments) {
      if (typeof arguments[arg] !== 'object') {
        outStr += arguments[arg];
      }
    }
    return outStr;
  });

  Handlebars.registerHelper('getTableName', function (flavor) {
    /*
    let table = "";
    for (let t of game.packs.filter(p => p.documentName === "RollTable")) {
      table = await t.getDocument(docId);
    };
    const tablename = table.data.name;
    */
    return flavor.substring(24, flavor.length - 7);
  });

  Handlebars.registerHelper('ifExists', function (elem) {
    const theElem = elem;
    let answer = false;

    if(theElem !== "undefined") {
      answer = true;
    }

    return answer;
  });

  Handlebars.registerHelper("includes", includes);

  function includes(string, searchString) {
    return string?.includes(searchString) ?? false;
  }

}

function registerInitiative() {
  Combatant.prototype._getInitiativeFormula = function () {

    const actorData = this.actor.data;

    let agiNum = Math.floor(actorData.data.stats.agility / 10);
    let perNum = Math.floor(actorData.data.stats.perception / 10)*2;

    const formula = `1d10 + ${agiNum} + ${perNum}`;
    return formula;
  }
}

class tvqChatMessage extends ChatMessage {
  async getHTML() {
    if(this.data.flags.core?.initiativeRoll) {
      if(this.isContentVisible) {
        return super.getHTML();
      }
      //console.log("Initiative roll !");
    } else {
      return super.getHTML();
      //console.log("NOT AN Initiative roll !");
    }
  }
}