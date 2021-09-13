import * as Dice from "../dice.js";

export default class touhouvqItemSheet extends ItemSheet {

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      width: 600,
      height: 400,
      classes: ["touhouvq", "sheet", "item"]
    })
  }

  signContextMenu = [
    {
      name: game.i18n.localize("touhouvq.spellcardsText.sign1"),
      icon: '',
      callback: element => {},
      condition: element => {
        return element[0].classList.contains("spell-sign-0");
      }
    },
    {
      name: game.i18n.localize("touhouvq.spellcardsText.sign2"),
      icon: '',
      callback: element => {},
      condition: element => {
        return element[0].classList.contains("spell-sign-1");
      }
    },
    {
      name: game.i18n.localize("touhouvq.spellcardsText.sign3"),
      icon: '',
      callback: element => {},
      condition: element => {
        return element[0].classList.contains("spell-sign-2");
      }
    },
    {
      name: game.i18n.localize("touhouvq.spellcardsText.sign4"),
      icon: '',
      callback: element => {},
      condition: element => {
        return element[0].classList.contains("spell-sign-3");
      }
    },
    {
      name: game.i18n.localize("touhouvq.spellcardsText.sign5"),
      icon: '',
      callback: element => {},
      condition: element => {
        return element[0].classList.contains("spell-sign-4");
      }
    }
  ]
  unsealingContextMenu = [
    {
      name: game.i18n.localize("touhouvq.spellcardTextUnsealing.unsealing2"),
      icon: '',
      callback: element => {},
      condition: element => {
        return element[0].classList.contains("tvq-unsealingText");
      }
    }
  ]
  thoughtContextMenu = [
    {
      name: game.i18n.localize("touhouvq.spellcardTextThought.thought1"),
      icon: '',
      callback: element => {},
      condition: element => {
        return element[0].classList.contains("tvq-thoughtText-1");
      }
    },
    {
      name: game.i18n.localize("touhouvq.spellcardTextThought.thought2"),
      icon: '',
      callback: element => {},
      condition: element => {
        return element[0].classList.contains("tvq-thoughtText-2");
      }
    },
    {
      name: game.i18n.localize("touhouvq.spellcardTextThought.thought3"),
      icon: '',
      callback: element => {},
      condition: element => {
        return element[0].classList.contains("tvq-thoughtText-3");
      }
    },
    {
      name: game.i18n.localize("touhouvq.spellcardTextThought.thought4"),
      icon: '',
      callback: element => {},
      condition: element => {
        return element[0].classList.contains("tvq-thoughtText-4");
      }
    }
  ]
  unleashContextMenu = [
    {
      name: game.i18n.localize("touhouvq.spellcardsText.unleash1"),
      icon: '',
      callback: element => {},
      condition: element => {
        return element[0].classList.contains("spell-unleash-0");
      }
    },
    {
      name: game.i18n.localize("touhouvq.spellcardsText.unleash2"),
      icon: '',
      callback: element => {},
      condition: element => {
        return element[0].classList.contains("spell-unleash-1");
      }
    },
    {
      name: game.i18n.localize("touhouvq.spellcardsText.unleash3"),
      icon: '',
      callback: element => {},
      condition: element => {
        return element[0].classList.contains("spell-unleash-2");
      }
    },
    {
      name: game.i18n.localize("touhouvq.spellcardsText.unleash4"),
      icon: '',
      callback: element => {},
      condition: element => {
        return element[0].classList.contains("spell-unleash-3");
      }
    }
  ]
  soulrattleContextMenu = [
    {
      name: game.i18n.localize("touhouvq.spellcardTextSoulrattle.soulrattle2"),
      icon: '',
      callback: element => {},
      condition: element => {
        return element[0].classList.contains("tvq-soulrattleText");
      }
    }
  ]
  dreamsighContextMenu = [
    {
      name: game.i18n.localize("touhouvq.spellcardTextDreamsigh.dreamsigh1"),
      icon: '',
      callback: element => {},
      condition: element => {
        return element[0].classList.contains("tvq-dreamsighText-1");
      }
    },
    {
      name: game.i18n.localize("touhouvq.spellcardTextDreamsigh.dreamsigh2"),
      icon: '',
      callback: element => {},
      condition: element => {
        return element[0].classList.contains("tvq-dreamsighText-2");
      }
    },
    {
      name: game.i18n.localize("touhouvq.spellcardTextDreamsigh.dreamsigh3"),
      icon: '',
      callback: element => {},
      condition: element => {
        return element[0].classList.contains("tvq-dreamsighText-3");
      }
    },
    {
      name: game.i18n.localize("touhouvq.spellcardTextDreamsigh.dreamsigh4"),
      icon: '',
      callback: element => {},
      condition: element => {
        return element[0].classList.contains("tvq-dreamsighText-4");
      }
    }
  ]

  //Override
  activateListeners(html) {
    super.activateListeners(html);

    //spellcards
    new ContextMenu(html, ".tvq-spelleffect", this.signContextMenu);
    new ContextMenu(html, ".tvq-unsealingText", this.unsealingContextMenu);
    new ContextMenu(html, ".tvq-spelleffect-4", this.thoughtContextMenu);

    //spellcards: lastwords
    new ContextMenu(html, ".tvq-spelleffect-10", this.unleashContextMenu);
    new ContextMenu(html, ".tvq-spelleffect-1", this.soulrattleContextMenu);
    new ContextMenu(html, ".tvq-spelleffect-11", this.dreamsighContextMenu);

    //spellcard attack button
    html.find('.tvq-spellcard-attack').click(this._onSheetSpellcardAttack.bind(this));
  }

  get template() {
    return `systems/touhouvq/templates/sheets/${this.item.data.type}-sheet.html`;
  }

  //Override
  getData() {
    const data = super.getData();

    data.config = CONFIG.touhouvq;
    data.isGM = game.user.isGM;

    return data;
  }

  _onSheetSpellcardAttack(event) {
    event.preventDefault();

    let element = event.currentTarget;
    
    const itemID = element.dataset.itemId;

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
  }
}
