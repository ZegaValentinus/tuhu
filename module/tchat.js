export async function BodyLoc(bodyData) {
    const messageTemplate = "systems/touhouvq/templates/partials/tchat-card.html";

    let raceName;

    let humanValue = 0;
    let youkaiValue = 0;
    let ghostValue = 0;
    let vampireValue = 0;
    let fairyValue = 0;
    let crowtenguValue = 0;
    let whitewolftenguValue = 0;
    let greattenguValue = 0;
    let lunarrabbitValue = 0;
    let oniValue = 0;
    let amanojakuValue = 0;
    let inchlingValue = 0;
    let kappaValue = 0;
    let halfyoukaiValue = 0;
    let celestialValue = 0;
    let hermitValue = 0;
    let shinigamiValue = 0;
    let arahitogamiValue = 0;
    let tsukumogamiValue = 0;
    let earthrabbitValue = 0;
    let yamabikoValue = 0;
    
    if (bodyData.raceNum == "human") {
        raceName = "Humain";
        humanValue = 1;
    }
    if (bodyData.raceNum == "youkai") {
        raceName = "Youkai";
        youkaiValue = 1;
    }
    if (bodyData.raceNum == "ghost") {
        raceName = "Fantôme";
        ghostValue = 1;
    }
    if (bodyData.raceNum == "vampire") {
        raceName = "Vampire";
        vampireValue = 1;
    }
    if (bodyData.raceNum == "fairy") {
        raceName = "Fée";
        fairyValue = 1;
    }
    if (bodyData.raceNum == "crowtengu") {
        raceName = "Tengu Corbeau";
        crowtenguValue = 1;
    }
    if (bodyData.raceNum == "whitewolftengu") {
        raceName = "Tengu Loup Blanc";
        whitewolftenguValue = 1;
    }
    if (bodyData.raceNum == "greattengu") {
        raceName = "Grand Tengu";
        greattenguValue = 1;
    }
    if (bodyData.raceNum == "lunarrabbit") {
        raceName = "Lapin Lunaire";
        lunarrabbitValue = 1;
    }
    if (bodyData.raceNum == "oni") {
        raceName = "Oni";
        oniValue = 1;
    }
    if (bodyData.raceNum == "amanojaku") {
        raceName = "Amanojaku";
        amanojakuValue = 1;
    }
    if (bodyData.raceNum == "inchling") {
        raceName = "Kobito";
        inchlingValue = 1;
    }
    if (bodyData.raceNum == "kappa") {
        raceName = "Kappa";
        kappaValue = 1;
    }
    if (bodyData.raceNum == "halfyoukai") {
        raceName = "Demi-Youkai";
        halfyoukaiValue = 1;
    }
    if (bodyData.raceNum == "celestial") {
        raceName = "Céleste";
        celestialValue = 1;
    }
    if (bodyData.raceNum == "hermit") {
        raceName = "Ermite";
        hermitValue = 1;
    }
    if (bodyData.raceNum == "shinigami") {
        raceName = "Shinigami";
        shinigamiValue = 1;
    }
    if (bodyData.raceNum == "arahitogami") {
        raceName = "Arahitogami";
        arahitogamiValue = 1;
    }
    if (bodyData.raceNum == "tsukumogami") {
        raceName = "Tsukumogami";
        tsukumogamiValue = 1;
    }
    if (bodyData.raceNum == "earthrabbit") {
        raceName = "Lapin de la Terre";
        earthrabbitValue = 1;
    }
    if (bodyData.raceNum == "yamabiko") {
        raceName = "Yamabiko";
        yamabikoValue = 1;
    }

    let data = {
        raceName: raceName,
        raceNum: bodyData.raceNum,
        humanValue: humanValue,
        youkaiValue: youkaiValue,
        ghostValue: ghostValue,
        vampireValue: vampireValue,
        fairyValue: fairyValue,
        crowtenguValue: crowtenguValue,
        whitewolftenguValue: whitewolftenguValue,
        greattenguValue: greattenguValue,
        lunarrabbitValue: lunarrabbitValue,
        oniValue: oniValue,
        amanojakuValue: amanojakuValue,
        inchlingValue: inchlingValue,
        kappaValue: kappaValue,
        halfyoukaiValue: halfyoukaiValue,
        celestialValue: celestialValue,
        hermitValue: hermitValue,
        shinigamiValue: shinigamiValue,
        arahitogamiValue: arahitogamiValue,
        tsukumogamiValue: tsukumogamiValue,
        earthrabbitValue: earthrabbitValue,
        yamabikoValue: yamabikoValue
    }

    const html = await renderTemplate(messageTemplate, data);

    const actorActual = bodyData.actorData;

    /* hasPlayerOwner */

    const messageData = {
        speaker: ChatMessage.getSpeaker(),
        content: html,
        user: game.user.id,
        whisper: [game.user.id]
    }

    const messageClass = getDocumentClass("ChatMessage");

    messageClass.create(messageData);
}

export async function itemShow({
    itemData = null } = {}) {

    const messageTemplate = "systems/touhouvq/templates/partials/object-card.html";
    const html = await renderTemplate(messageTemplate, itemData);

    let messageData = {
        speaker: ChatMessage.getSpeaker(),
        content: html,
        rarity: itemData.rarity
    }

    const messageClass = getDocumentClass("ChatMessage");

    messageClass.create(messageData);
}

export async function charInfosShow({
    info = null,
    actor = null } = {}) {

    let data = {
        info: info,
        actor: actor
    }

    const messageTemplate = "systems/touhouvq/templates/chat/character-infos-card.html";
    const html = await renderTemplate(messageTemplate, data);

    let messageData = {
        speaker: ChatMessage.getSpeaker(),
        content: html
    }

    const messageClass = getDocumentClass("ChatMessage");

    messageClass.create(messageData);
}

export async function talentInfo({
    data = null,
    actor = null } = {}) {

    let data1 = {
        data: data,
        actor: actor
    }

    const messageTemplate = "systems/touhouvq/templates/partials/talent-card.html";
    const html = await renderTemplate(messageTemplate, data1);

    let messageData = {
        speaker: ChatMessage.getSpeaker(),
        content: html
    }

    const messageClass = getDocumentClass("ChatMessage");

    messageClass.create(messageData);
}

export async function raceRoll({
    data = null,
    actor = null } = {}) {

    if(data.race === "human") {

        const messageTemplate = "systems/touhouvq/templates/chat/raceskillroll-sheet.html";

        let d6 = "1d6";

        let d4result = Math.floor(Math.random() * 4)+1;

        let rollResult = new Roll(d6, actor, {isRaceSkill:true, actorId:actor.id}).roll();
        
        let messageData = {
            speaker: ChatMessage.getSpeaker(),
            rollResult: rollResult,
            data: data,
            actor: actor,
            d4result: d4result
        }
    
        let htmlContent = await renderTemplate(messageTemplate, messageData);
    
        //console.log(htmlContent);

        let messageData2 = {
            speaker: ChatMessage.getSpeaker(),
            content: htmlContent
        }
    
        rollResult.toMessage(messageData2);
    }

    if(data.race === "youkai") {
        console.log(data);
    }

    if(data.race === "ghost") {
        console.log(data);
    }

    if(data.race === "vampire") {
        console.log(data);
    }

    if(data.race === "fairy") {
        console.log(data);
    }

    if(data.race === "crowtengu") {
        console.log(data);
    }

    if(data.race === "whitewolftengu") {
        console.log(data);
    }

    if(data.race === "greattengu") {
        console.log(data);
    }

    if(data.race === "lunarrabbit") {
        console.log(data);
    }

    if(data.race === "oni") {
        console.log(data);
    }

    if(data.race === "amanojaku") {
        console.log(data);
    }

    if(data.race === "inchling") {
        console.log(data);
    }

    if(data.race === "kappa") {
        console.log(data);
    }

    if(data.race === "halfyoukai") {
        console.log(data);
    }

    if(data.race === "celestial") {
        console.log(data);
    }

    if(data.race === "hermit") {
        console.log(data);
    }

    if(data.race === "shinigami") {
        console.log(data);
    }

    if(data.race === "arahitogami") {
        console.log(data);
    }

    if(data.race === "tsukumogami") {
        console.log(data);
    }

    if(data.race === "earthrabbit") {
        console.log(data);
    }

    if(data.race === "yamabiko") {
        console.log(data);
    }
}

export async function knowledgeCheck({
    actionValue = null,
    fatiguePoints = null,
    actorData = null,
    knowledgeType = null,
    knowledgeText = null,
    knowledgeLabel = null,
    knowledgeLabel1 = null } = {}) {

    let d10 = "d10";
    let d8 = "d8";
    let d6 = "d6";
    let d4 = "d4";
    let d20 = "d20";

    let theKnowledge1 = knowledgeText.toLowerCase() + "1";
    let theKnowledge2 = knowledgeText.toLowerCase() + "2";
    let theKnowledge3 = knowledgeText.toLowerCase() + "3";

    let knowledge1 = actorData.data.data.knowledge[theKnowledge1];
    let knowledge2 = actorData.data.data.knowledge[theKnowledge2];
    let knowledge3 = actorData.data.data.knowledge[theKnowledge3];

    let numDivision = Math.floor(actionValue / 5);
    
    let rollVar = Math.floor(numDivision / 2);

    const messageTemplate = "systems/touhouvq/templates/chat/stat-check-knowledge.html";

    let rollResult = null;
    let rollResult1 = null;

    if (numDivision % 2 == 0) {
        rollResult = d20 + ` + ` + rollVar + d8;
    } else {
        rollResult = d20 + ` + ` + rollVar + d8 + ` + ` + d4;
    }

    if (numDivision % 2 == 0) {
        if (fatiguePoints != 0) {

            if(knowledgeType == 1) {
                if(knowledge3 === true) {
                    rollResult1 = d20 + ` + ` + rollVar + d8 + ` + 3` + d10 + ` - ` + fatiguePoints + d4;
                } else {
                    if(knowledge2 === true) {
                        rollResult1 = d20 + ` + ` + rollVar + d8 + ` + 2` + d10 + ` - ` + fatiguePoints + d4;
                    } else {
                        if(knowledge1 === true) {
                            rollResult1 = d20 + ` + ` + rollVar + d8 + ` + 1` + d10 + ` - ` + fatiguePoints + d4;
                        } else {
                            rollResult1 = d20 + ` + ` + rollVar + d8 + ` - 1` + d10 + ` - ` + fatiguePoints + d4;
                        }
                    }
                }
            }
            if(knowledgeType == 2) {
                if(knowledge3 === true) {
                    rollResult1 = d20 + ` + ` + rollVar + d8 + ` + 2` + d10 + ` - ` + fatiguePoints + d4;
                } else {
                    if(knowledge2 === true) {
                        rollResult1 = d20 + ` + ` + rollVar + d8 + ` + 1` + d10 + ` - ` + fatiguePoints + d4;
                    } else {
                        if(knowledge1 === true) {
                            rollResult1 = d20 + ` + ` + rollVar + d8 + ` - ` + fatiguePoints + d4;
                        } else {
                            rollResult1 = d20 + ` + ` + rollVar + d8 + ` - 2` + d10 + ` - ` + fatiguePoints + d4;
                        }
                    }
                }
            }
            if(knowledgeType == 3) {
                if(knowledge3 === true) {
                    rollResult1 = d20 + ` + ` + rollVar + d8 + ` + 2` + d6 + ` - ` + fatiguePoints + d4;
                } else {
                    if(knowledge2 === true) {
                        rollResult1 = d20 + ` + ` + rollVar + d8 + ` - ` + fatiguePoints + d4;
                    } else {
                        if(knowledge1 === true) {
                            rollResult1 = d20 + ` + ` + rollVar + d8 + ` - 2` + d6 + ` - ` + fatiguePoints + d4;
                        } else {
                            rollResult1 = d20 + ` + ` + rollVar + d8 + ` - 4` + d8 + ` - ` + fatiguePoints + d4;
                        }
                    }
                }
            }

            let rollResult = new Roll(rollResult1, actorData).roll();

            let rolls = [d20];

            for (let a = 0; a < rollVar; a++) {
                rolls.push(d8);
            }

            rolls.push(d6);

            let messageData = {
                speaker: ChatMessage.getSpeaker(),
                rollResult: rollResult,
                actionValue: actionValue,
                fatiguePoints: fatiguePoints,
                rolls: rolls,
                knowledgeLabel: knowledgeLabel,
                knowledgeLabel1: knowledgeLabel1,
                knowledgeType: knowledgeType,
                knowledgeText: knowledgeText
            }
        
            let htmlContent = await renderTemplate(messageTemplate, messageData);
        
            let messageData2 = {
                speaker: ChatMessage.getSpeaker(),
                content: htmlContent
            }
        
            rollResult.toMessage(messageData2);

        } else {

            if(knowledgeType == 1) {
                if(knowledge3 === true) {
                    rollResult1 = d20 + ` + ` + rollVar + d8 + ` + 3` + d10;
                } else {
                    if(knowledge2 === true) {
                        rollResult1 = d20 + ` + ` + rollVar + d8 + ` + 2` + d10;
                    } else {
                        if(knowledge1 === true) {
                            rollResult1 = d20 + ` + ` + rollVar + d8 + ` + 1` + d10;
                        } else {
                            rollResult1 = d20 + ` + ` + rollVar + d8 + ` - 1` + d10;
                        }
                    }
                }
            }
            if(knowledgeType == 2) {
                if(knowledge3 === true) {
                    rollResult1 = d20 + ` + ` + rollVar + d8 + ` + 2` + d10;
                } else {
                    if(knowledge2 === true) {
                        rollResult1 = d20 + ` + ` + rollVar + d8 + ` + 1` + d10;
                    } else {
                        if(knowledge1 === true) {
                            rollResult1 = d20 + ` + ` + rollVar + d8;
                        } else {
                            rollResult1 = d20 + ` + ` + rollVar + d8 + ` - 2` + d10;
                        }
                    }
                }
            }
            if(knowledgeType == 3) {
                if(knowledge3 === true) {
                    rollResult1 = d20 + ` + ` + rollVar + d8 + ` + 2` + d6;
                } else {
                    if(knowledge2 === true) {
                        rollResult1 = d20 + ` + ` + rollVar + d8;
                    } else {
                        if(knowledge1 === true) {
                            rollResult1 = d20 + ` + ` + rollVar + d8 + ` - 2` + d6;
                        } else {
                            rollResult1 = d20 + ` + ` + rollVar + d8 + ` - 4` + d8;
                        }
                    }
                }
            }

            let rollResult = new Roll(rollResult1, actorData).roll();

            let rolls = [d20];

            for (let a = 0; a < rollVar; a++) {
                rolls.push(d8);
            }

            let messageData = {
                speaker: ChatMessage.getSpeaker(),
                rollResult: rollResult,
                actionValue: actionValue,
                fatiguePoints: fatiguePoints,
                rolls: rolls,
                knowledgeLabel: knowledgeLabel,
                knowledgeLabel1: knowledgeLabel1,
                knowledgeType: knowledgeType,
                knowledgeText: knowledgeText
            }
        
            let htmlContent = await renderTemplate(messageTemplate, messageData);
        
            let messageData2 = {
                speaker: ChatMessage.getSpeaker(),
                content: htmlContent
            }
        
            rollResult.toMessage(messageData2);

        }
    } else {
        if (fatiguePoints != 0) {

            if(knowledgeType == 1) {
                if(knowledge3 === true) {
                    rollResult1 = d20 + ` + ` + rollVar + d8 + ` + ` + d4 + ` + 3` + d10 + ` - ` + fatiguePoints + d4;
                } else {
                    if(knowledge2 === true) {
                        rollResult1 = d20 + ` + ` + rollVar + d8 + ` + ` + d4 + ` + 2` + d10 + ` - ` + fatiguePoints + d4;
                    } else {
                        if(knowledge1 === true) {
                            rollResult1 = d20 + ` + ` + rollVar + d8 + ` + ` + d4 + ` + 1` + d10 + ` - ` + fatiguePoints + d4;
                        } else {
                            rollResult1 = d20 + ` + ` + rollVar + d8 + ` + ` + d4 + ` - 1` + d10 + ` - ` + fatiguePoints + d4;
                        }
                    }
                }
            }
            if(knowledgeType == 2) {
                if(knowledge3 === true) {
                    rollResult1 = d20 + ` + ` + rollVar + d8 + ` + ` + d4 + ` + 2` + d10 + ` - ` + fatiguePoints + d4;
                } else {
                    if(knowledge2 === true) {
                        rollResult1 = d20 + ` + ` + rollVar + d8 + ` + ` + d4 + ` + 1` + d10 + ` - ` + fatiguePoints + d4;
                    } else {
                        if(knowledge1 === true) {
                            rollResult1 = d20 + ` + ` + rollVar + d8 + ` + ` + d4 + ` - ` + fatiguePoints + d4;
                        } else {
                            rollResult1 = d20 + ` + ` + rollVar + d8 + ` + ` + d4 + ` - 2` + d10 + ` - ` + fatiguePoints + d4;
                        }
                    }
                }
            }
            if(knowledgeType == 3) {
                if(knowledge3 === true) {
                    rollResult1 = d20 + ` + ` + rollVar + d8 + ` + ` + d4 + ` + 2` + d6 + ` - ` + fatiguePoints + d4;
                } else {
                    if(knowledge2 === true) {
                        rollResult1 = d20 + ` + ` + rollVar + d8 + ` + ` + d4 ` - ` + fatiguePoints + d4;
                    } else {
                        if(knowledge1 === true) {
                            rollResult1 = d20 + ` + ` + rollVar + d8 + ` + ` + d4 + ` - 2` + d6 + ` - ` + fatiguePoints + d4;
                        } else {
                            rollResult1 = d20 + ` + ` + rollVar + d8 + ` + ` + d4 + ` - 4` + d8 + ` - ` + fatiguePoints + d4;
                        }
                    }
                }
            }
            let rollResult = new Roll(rollResult1, actorData).roll();

            let rolls = [d20];

            for (let a = 0; a < rollVar; a++) {
                rolls.push(d8);
            }

            rolls.push(d4);

            rolls.push(d6);

            let messageData = {
                speaker: ChatMessage.getSpeaker(),
                rollResult: rollResult,
                actionValue: actionValue,
                fatiguePoints: fatiguePoints,
                rolls: rolls,
                knowledgeLabel: knowledgeLabel,
                knowledgeLabel1: knowledgeLabel1,
                knowledgeType: knowledgeType,
                knowledgeText: knowledgeText
            }
        
            let htmlContent = await renderTemplate(messageTemplate, messageData);
        
            let messageData2 = {
                speaker: ChatMessage.getSpeaker(),
                content: htmlContent
            }
        
            rollResult.toMessage(messageData2);

        } else {

            if(knowledgeType == 1) {
                if(knowledge3 === true) {
                    rollResult1 = d20 + ` + ` + rollVar + d8 + ` + ` + d4 + ` + 3` + d10;
                } else {
                    if(knowledge2 === true) {
                        rollResult1 = d20 + ` + ` + rollVar + d8 + ` + ` + d4 + ` + 2` + d10;
                    } else {
                        if(knowledge1 === true) {
                            rollResult1 = d20 + ` + ` + rollVar + d8 + ` + ` + d4 + ` + 1` + d10;
                        } else {
                            rollResult1 = d20 + ` + ` + rollVar + d8 + ` + ` + d4 + ` - 1` + d10;
                        }
                    }
                }
            }
            if(knowledgeType == 2) {
                if(knowledge3 === true) {
                    rollResult1 = d20 + ` + ` + rollVar + d8 + ` + ` + d4 + ` + 2` + d10;
                } else {
                    if(knowledge2 === true) {
                        rollResult1 = d20 + ` + ` + rollVar + d8 + ` + ` + d4 + ` + 1` + d10;
                    } else {
                        if(knowledge1 === true) {
                            rollResult1 = d20 + ` + ` + rollVar + d8 + ` + ` + d4;
                        } else {
                            rollResult1 = d20 + ` + ` + rollVar + d8 + ` + ` + d4 + ` - 2` + d10;
                        }
                    }
                }
            }
            if(knowledgeType == 3) {
                if(knowledge3 === true) {
                    rollResult1 = d20 + ` + ` + rollVar + d8 + ` + ` + d4 + ` + 2` + d6;
                } else {
                    if(knowledge2 === true) {
                        rollResult1 = d20 + ` + ` + rollVar + d8 + ` + ` + d4;
                    } else {
                        if(knowledge1 === true) {
                            rollResult1 = d20 + ` + ` + rollVar + d8 + ` + ` + d4 + ` - 2` + d6;
                        } else {
                            rollResult1 = d20 + ` + ` + rollVar + d8 + ` + ` + d4 + ` - 4` + d8;
                        }
                    }
                }
            }

            let rollResult = new Roll(rollResult1, actorData).roll();

            let rolls = [d20];

            for (let a = 0; a < rollVar; a++) {
                rolls.push(d8);
            }

            rolls.push(d4);

            let messageData = {
                speaker: ChatMessage.getSpeaker(),
                rollResult: rollResult,
                actionValue: actionValue,
                fatiguePoints: fatiguePoints,
                rolls: rolls,
                knowledgeLabel: knowledgeLabel,
                knowledgeLabel1: knowledgeLabel1,
                knowledgeType: knowledgeType,
                knowledgeText: knowledgeText
            }
        
            let htmlContent = await renderTemplate(messageTemplate, messageData);
        
            let messageData2 = {
                speaker: ChatMessage.getSpeaker(),
                content: htmlContent
            }
        
            rollResult.toMessage(messageData2);

        }
    }
}

/**
 * Creates and send a welcome chatMessage
 * flags the user so the message is displayed only once
 */
/*
 export async function welcomeMessage() {
    const msgTemplate = "systems/touhouvq/templates/chat/welcome-message.html";
    //prepare the template Data
    const templateData = game.i18n.localize('M20E.welcomeMessage');
    templateData.isGM = game.user.isGM;
    const module = game.modules.get(game.settings.get("touhouvq", "compendiumScope"));
    templateData.packModuleActivated = module && module.active;
  
    const htmlContent = await renderTemplate(msgTemplate, templateData);
    //send message
    ChatMessage.create({
      type: CONST.CHAT_MESSAGE_TYPES.OTHER,
      content: htmlContent,
      flavor: templateData.welcome,
      speaker: { alias: "Carter_DC" },
      whisper: [game.user.id]
    });
    //flag the user
    game.user.setFlag("touhouvq", "welcomeMessageShown", true);
  }
  */