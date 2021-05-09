/*
export default class touhouvqItemSheet extends ItemSheet {

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      template: `systems/touhouvq/templates/sheets/${this.item.data.type}-sheet.html`
    });
  }

  activateListeners() {
    super.activateListeners(); // important that you super here or the formApplication stuff will not work as expected

    // some custom listeners
  }

  get template() {
    return `systems/touhouvq/templates/sheets/${this.item.data.type}-sheet.html`
  }

  getData() {
    const data = super.getData();

    data.config = CONFIG.touhouvq;

    return data;
  }
}
*/


export default class touhouvqItemSheet extends ItemSheet {

  get template() {
    return `systems/touhouvq/templates/sheets/${this.item.data.type}-sheet.html`
  }

  getData() {
    const data = super.getData();

    data.config = CONFIG.touhouvq;

    return data;
  }
}
