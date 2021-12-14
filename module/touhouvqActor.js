export default class touhouvqActor extends Actor {
  constructor(data, context) {
    super(data, context);
    this.displayRaceskillButtons = true;
  }

  async _preCreate(data, options, user) {
    await super._preCreate(data, options, user);
    const actorData = this.data;
    actorData.token.update({
      actorLink: true,
      disposition: CONST.TOKEN_DISPOSITIONS['FRIENDLY'],
      displayName: CONST.TOKEN_DISPLAY_MODES['HOVER'],
      displayBars: CONST.TOKEN_DISPLAY_MODES['HOVER']
    });
  }

  prepareBaseData() {
    super.prepareBaseData();
    const actorData = this.data;

    const agilityBonus = Math.floor(parseInt(actorData.data.stats.agility)/10);
    const disciplineBonus = Math.floor(parseInt(actorData.data.stats.discipline)/10);
    const armorsOwned = actorData.items.filter(item => item.data.type === "armor");

    let armorBonus = 0;
    armorsOwned.forEach(armor => {
      armorBonus += parseInt(armor.data.data.value);
    });

    foundry.utils.setProperty(actorData.data,"defense.value",agilityBonus+disciplineBonus+armorBonus);
  }
}