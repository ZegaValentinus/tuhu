export default class touhouvqItemSheet extends ItemSheet {

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      width: 600,
      height: 340,
      classes: ["touhouvq", "sheet", "item"]
    })
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
