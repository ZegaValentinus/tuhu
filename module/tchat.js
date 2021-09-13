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
    actor = null,
    talentSkillType = null } = {}) {

    let data1 = {
        data: data,
        actor: actor,
        talentSkillType: talentSkillType
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

export async function raceInfo({
    data = null,
    actor = null,
    talentSkillType = null } = {}) {

    let data1 = {
        data: data,
        actor: actor,
        talentSkillType: talentSkillType
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

    const messageTemplate = "systems/touhouvq/templates/chat/raceskillroll-sheet.html";
    let d4 = "1d4";
    let d6 = "1d6";
    let d8 = "1d8";
    let d10 = "1d10";
    let d12 = "1d12";
    let d20 = "1d20";

    if(data.race === "human") {
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

        let messageData2 = {
            speaker: ChatMessage.getSpeaker(),
            content: htmlContent
        }
    
        rollResult.toMessage(messageData2);
    }
    if (data.race == "youkai") {

    }
    if (data.race == "ghost") {

    }
    if (data.race == "vampire") {

        let d8 = "d8";
        let d6 = "d6";
        let d4 = "d4";
        let d20 = "d20";

        let actionValue = data.actualStat;
        
        let numDivision = Math.floor(actionValue / 5);
        
        let rollVar = Math.floor(numDivision / 2);
    
        let rollResult;

        let fatiguePoints = data.actualFatigue;

        if(data.regen === 1) {
            let toRoll = `2` + d6;
            
            let rollResult = new Roll(toRoll, actor).roll();
            
            let messageData = {
                speaker: ChatMessage.getSpeaker(),
                rollResult: rollResult,
                data: data
            }
            
            let htmlContent = await renderTemplate(messageTemplate, messageData);
            
            let messageData2 = {
                speaker: ChatMessage.getSpeaker(),
                content: htmlContent
            }
            
            rollResult.toMessage(messageData2);
        } else {
            if (numDivision % 2 == 0) {
                rollResult = d20 + ` + ` + rollVar + d8;
            } else {
                rollResult = d20 + ` + ` + rollVar + d8 + ` + ` + d4;
            }
        
            if (numDivision % 2 == 0) {
                if (fatiguePoints != 0) {
        
                    const rollResult1 = d20 + ` + ` + rollVar + d8 + ` - ` + fatiguePoints + d4;
                    let rollResult = new Roll(rollResult1, actor).roll();
        
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
                        race: data.race,
                        rolls: rolls
                    }
                
                    const messageTemplate = "systems/touhouvq/templates/partials/tchat-skillcard.html";
                
                    let htmlContent = await renderTemplate(messageTemplate, messageData);
                
                    let messageData2 = {
                        speaker: ChatMessage.getSpeaker(),
                        content: htmlContent
                    }
                
                    rollResult.toMessage(messageData2);
        
                } else {
        
                    const rollResult1 = d20 + ` + ` + rollVar + d8;
                    let rollResult = new Roll(rollResult1, actor).roll();
        
                    let rolls = [d20];
        
                    for (let a = 0; a < rollVar; a++) {
                        rolls.push(d8);
                    }
        
                    let messageData = {
                        speaker: ChatMessage.getSpeaker(),
                        rollResult: rollResult,
                        actionValue: actionValue,
                        fatiguePoints: fatiguePoints,
                        race: data.race,
                        rolls: rolls
                    }
                
                    const messageTemplate = "systems/touhouvq/templates/partials/tchat-skillcard.html";
                
                    let htmlContent = await renderTemplate(messageTemplate, messageData);
                
                    let messageData2 = {
                        speaker: ChatMessage.getSpeaker(),
                        content: htmlContent
                    }
                
                    rollResult.toMessage(messageData2);
        
                }
            } else {
                if (fatiguePoints != 0) {
        
                    const rollResult1 = d20 + ` + ` + rollVar + d8 + ` + ` + d4 + ` - ` + fatiguePoints + d4;
                    let rollResult = new Roll(rollResult1, actor).roll();
        
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
                        race: data.race,
                        rolls: rolls
                    }
                
                    const messageTemplate = "systems/touhouvq/templates/partials/tchat-skillcard.html";
                
                    let htmlContent = await renderTemplate(messageTemplate, messageData);
                
                    let messageData2 = {
                        speaker: ChatMessage.getSpeaker(),
                        content: htmlContent
                    }
                
                    rollResult.toMessage(messageData2);
        
                } else {
        
                    const rollResult1 = d20 + ` + ` + rollVar + d8 + ` + ` + d4;
                    let rollResult = new Roll(rollResult1, actor).roll();
        
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
                        race: data.race,
                        rolls: rolls
                    }
    
                    const messageTemplate = "systems/touhouvq/templates/partials/tchat-skillcard.html";
                
                    let htmlContent = await renderTemplate(messageTemplate, messageData);
                
                    let messageData2 = {
                        speaker: ChatMessage.getSpeaker(),
                        content: htmlContent
                    }
                
                    rollResult.toMessage(messageData2);
                }
            }
        }

    }
    if (data.race == "fairy") {

    }
    if (data.race == "crowtengu") {

    }
    if (data.race == "whitewolftengu") {

    }
    if (data.race == "greattengu") {

    }
    if (data.race == "lunarrabbit") {
        const messageTemplateLR = "systems/touhouvq/templates/partials/tchat-skillcard.html";

        let actualStat = Math.floor(actor.data.data.stats.discipline / 10);

        let actualDamage = actualStat-1;

        const html = await renderTemplate(messageTemplateLR, {...data, actualStat: actualStat, actor: actor, actualDamage: actualDamage});

        if(actor.isOwner) {
            let firingline = actor.effects.filter(effect => effect.data.label === game.i18n.localize("touhouvq.namesRaceSkill.firingline"))[0];
        
            if(!firingline) {
              const effectData = {
                label:game.i18n.localize("touhouvq.namesRaceSkill.firingline"),
                icon: "systems/touhouvq/assets/img/talentsandskills/lunarrabbit/Peloton Entraîné.webp"
              };
              firingline = await ActiveEffect.create(effectData, {parent: actor});
            }
        }

        const messageDataLR = {
            speaker: ChatMessage.getSpeaker(),
            content: html,
            user: game.user.id
        }

        const messageClassLR = getDocumentClass("ChatMessage");
    
        messageClassLR.create(messageDataLR);
    }
    if (data.race == "oni") {

    }
    if (data.race == "amanojaku") {

    }
    if (data.race == "inchling") {

    }
    if (data.race == "kappa") {

    }
    if (data.race == "halfyoukai") {

    }
    if (data.race == "celestial") {

    }
    if (data.race == "hermit") {

    }
    if (data.race == "shinigami") {

    }
    if (data.race == "arahitogami") {

    }
    if (data.race == "tsukumogami") {
        if (data.choice === "1") {
            let rollResult = new Roll(d4, actor).roll();
        
            let messageData = {
                speaker: ChatMessage.getSpeaker(),
                rollResult: rollResult,
                data: data,
                choice: data.choice
            }
        
            let htmlContent = await renderTemplate(messageTemplate, messageData);
    
            let messageData2 = {
                speaker: ChatMessage.getSpeaker(),
                content: htmlContent
            }
        
            rollResult.toMessage(messageData2);
        } else {
            if (data.choice === "2") {
                let toRoll = d4 + ` + 1`;
                
                let rollResult = new Roll(toRoll, actor).roll();
        
                let messageData = {
                    speaker: ChatMessage.getSpeaker(),
                    rollResult: rollResult,
                    data: data,
                    choice: data.choice
                }
            
                let htmlContent = await renderTemplate(messageTemplate, messageData);
        
                let messageData2 = {
                    speaker: ChatMessage.getSpeaker(),
                    content: htmlContent
                }
            
                rollResult.toMessage(messageData2);
            } else {
                const messageTemplate = "systems/touhouvq/templates/partials/tchat-skillcard.html";
                const html = await renderTemplate(messageTemplate, data);
        
                const messageData = {
                    speaker: ChatMessage.getSpeaker(),
                    content: html,
                    data: data,
                    actor: actor,
                    user: game.user.id,
                    whisper: [game.user.id]
                }
        
                const messageClass = getDocumentClass("ChatMessage");
            
                messageClass.create(messageData);
            }
        }
    }
    if (data.race == "earthrabbit") {
        
        /* Sur la card des roll trait comme stat, check si earthrabbit, si oui : */
        /* Affiche autant de bouton qu'il y a de dés sur la card, hors d20, qui contienne en data attribute leur score et leur faces */
        /* Lorsque bouton appuyé : les boutons disparaîssent, et à leur place, il sera marqué "DX volé !" (et ça, pour tout le monde !), puis les valeurs se mettront à jour, */
        /* en modifiant le score, ajoutant un activeeffect au personnage qui a volé le dé, qui s'appelle "Gambader: DX volé", et quand le joueur appuie sur le */
        /* bouton de compétence de race, ça mettra sur le tchat : "utilisation du DX", et au prochain jet de stat ou trait, ça utlisera, en plus, ce dé. */
    }
    if (data.race == "yamabiko") {

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