export default class touhouvqItem extends Item {
    chatTemplate = {
        "weapon": "systems/touhouvq/templates/partials/weapon-card.html",
        "weaponChat": "systems/touhouvq/templates/partials/weapon-chat.html",
        "armor": "systems/touhouvq/templates/partials/armor-card.html",
        "perk": "systems/touhouvq/templates/partials/perk-card.html",
        "spellcard": "systems/touhouvq/templates/partials/spellcard-card.html"
    };

    async roll() {
        let chatData = {
            user: game.user._id,
            speaker: ChatMessage.getSpeaker()
        };

        let cardData = {
            ...this.data,
            owner: this.actor.id
        };

        chatData.content = await renderTemplate(this.chatTemplate[this.type], cardData);

        chatData.roll = true;

        return ChatMessage.create(chatData);
    }
}