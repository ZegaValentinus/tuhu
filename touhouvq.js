import { touhouvq } from "./module/config.js";
/* import * as Chat from "./module/chat.js"; */
import touhouvqItemSheet from "./module/sheets/touhouvqItemSheet.js";
import touhouvqItem from "./module/touhouvqItem.js";
import characterSheet from "./module/sheets/characterSheet.js";

async function preloadHandlebarsTemplates() {
  const templatePaths = [
    "systems/touhouvq/templates/partials/item-card.html",
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

  Handlebars.registerHelper('critString', function(dice) {
    let returnString = '';
    dice.forEach( die => {
      if( 4 !== die.faces && die.results[0].result === die.faces ) {
        returnString = game.i18n.localize('touhouvq.critical.critdamage');
      }
    });
    return returnString;
  });

  Handlebars.registerHelper('critTotal', function(dice) {
    let returnString = '';
    dice.forEach( die => {
      if( 4 !== die.faces && die.results[0].result === die.faces ) {
        returnString = 'tvq-criticaltotal';
      }
    });
    return returnString;
  });

  Handlebars.registerHelper('critRoll', function(dice) {
    let returnString = 'display: none';
    dice.forEach( die => {
      if( 4 !== die.faces && die.results[0].result === die.faces ) {
        returnString = 'display: block';
      }
    });
    return returnString;
  });

  Handlebars.registerHelper('whichCrit', function(dice) {
    let critFord6 = Math.floor(Math.random() * 4)+1;
    let critFord8 = Math.floor(Math.random() * 6)+1;
    let critFord10 = Math.floor(Math.random() * 8)+1;
    let returnString = critFord6;
    dice.forEach( die => {
      if( 4 !== die.faces && die.results[0].result === die.faces ) {
        if( die.faces === 8 ) {
          returnString = critFord8;
        } else {
          if( die.faces === 10 ) {
            returnString = critFord10;
          }
        }
      }
    });
    return returnString;
  });

  Handlebars.registerHelper('whichCritDice', function(dice) {
    let returnString = "d4";
    dice.forEach( die => {
      if( 4 !== die.faces && die.results[0].result === die.faces ) {
        if( die.faces === 8 ) {
          returnString = "d6";
        } else {
          if( die.faces === 10 ) {
            returnString = "d8";
          }
        }
      }
    });
    return returnString;
  });

});

/* Hooks.on("renderChatLog", (add, html, data) => CharacterData.addChatListeners(html)); */