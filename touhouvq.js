import { touhouvq } from "./module/config.js";
 import * as Tchat from "./module/tchat.js";
import touhouvqItemSheet from "./module/sheets/touhouvqItemSheet.js";
import touhouvqItem from "./module/touhouvqItem.js";
import characterSheet from "./module/sheets/characterSheet.js";

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
  CONFIG.Item.entityClass = touhouvqItem;

  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("touhouvq", touhouvqItemSheet, { makeDefault: true });

  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("touhouvq", characterSheet, { makeDefault: true });

  preloadHandlebarsTemplates();

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
    console.log(dice);
    return returnString;
  });

});

Hooks.on("renderChatLog", (app, html, data) => {
  html.on("click",".tvq-usehuman",_onUseHuman);
  html.on("click",".tvq-choosevampire",_onChooseVampire);
  html.on("click",".tvq-raceskilllunarrabbit",_onDeleteEffectLunarrabbit);
  html.on("click",".tvq-choosetsukumogami",_onChooseTsukumogami);
  html.on("click",".tvq-frolic-button",_onRaceskillFrolic);
});

Hooks.on("renderChatMessage", (app, html, data) => {
  if(!app._roll){return;}
  if(!app._roll.options.isRaceSkill) {return;}
  const actor = game.actors.get(app._roll.options.actorId);

  if(!actor.isOwner) {
    //Hide human race skill button for non sheet owners
    const myButton = html.find('.tvq-usehuman')[0];
    console.log(myButton);
    if(myButton) {
      myButton.classList.add("tvq-hide");
    }

    //Hide earth rabbit race skill buttons for non sheet owners
    const myButton1 = html.find('.tvq-frolic-buttons')[0];
    console.log(myButton1);
    if(myButton1) {
      myButton1.classList.add("tvq-hide");
    }
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
        icon: "systems/touhouvq/assets/img/talentsandskills/human/Débrouillardise.webp"
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

  let compname = game.i18n.localize("touhouvq.raceskill.vampire");
  let compdesc = game.i18n.localize("touhouvq.raceskillDesc.vampire");

  const regen = 1;
  
  let data = {
    race: race,
    compname: compname,
    compdesc, compdesc,
    regen: regen
  };

  Tchat.raceRoll({
    actor: actor,
    data: data
  });
}

async function _onDeleteEffectLunarrabbit(event) {
  const actorID = event.currentTarget.dataset.actorId;
  const actor = game.actors.get(actorID);
  let firingline = actor.effects.filter(effect => effect.data.label === game.i18n.localize("touhouvq.namesRaceSkill.firingline"))[0];
  actor.deleteEmbeddedDocuments('ActiveEffect', [firingline.id]);
  if(race == "lunarrabbit") {
    document.querySelector(".tvq-button-traitroll li.context-item:nth-child(5n)").classList.add("boosted");
  }
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

  let compname = game.i18n.localize("touhouvq.raceskill.tsukumogami");
  let compdesc = game.i18n.localize("touhouvq.raceskillDesc.tsukumogami");
  
  let data = {
    race: race,
    compname: compname,
    compdesc, compdesc,
    choice: choice
  };

  Tchat.raceRoll({
    actor: actor,
    data: data
  });
}

async function _onRaceskillFrolic(event) {
  let actorID = event.currentTarget.dataset;
  const actor = game.actors.get(actorID);
  const faces = event.currentTarget.dataset.faces;
  const result = event.currentTarget.dataset.result;
  console.log(actorID);
  console.log(faces);
  console.log(result);
  //let firingline = actor.effects.filter(effect => effect.data.label === game.i18n.localize("touhouvq.namesRaceSkill.firingline"))[0];
  //actor.deleteEmbeddedDocuments('ActiveEffect', [firingline.id]);
  /*
  if(race == "lunarrabbit") {
    document.querySelector(".tvq-button-traitroll li.context-item:nth-child(5n)").classList.add("boosted");
  }
  */
}