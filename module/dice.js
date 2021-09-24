export function TaskCheck({
    actionValue = null,
    isTraitRoll = false,
    fatiguePoints = null } = {}) {
    let d4 = "1d4";
    let d8 = "1d8";
    /* Ici fait les calculs */
    let statRollFormula = "@damageValue";
    let traitRollFormula = "@damageValue";
    
    let rollFormula = isTraitRoll == "true" ? traitRollFormula : statRollFormula;
    if (isTraitRoll == "true") {
        rollFormula -= fatiguePoints*d8;
    } else {
        rollFormula -= fatiguePoints*d4;
    }
    let rollData = {
        actionValue: actionValue
    };

    let messageData = {
      speaker: ChatMessage.getSpeaker()
    }
    new Roll(rollFormula, rollData).roll().toMessage(messageData);
}

export async function StatCheck({
    actionValue = null,
    fatiguePoints = 0,
    statType = null,
    actorData = null,
    compskillvalue = null } = {}) {
    
    let d8 = "d8";
    let d6 = "d6";
    let d4 = "d4";
    let d20 = "d20";
    
    let numDivision = Math.floor(actionValue / 5);
    
    let rollVar = Math.floor(numDivision / 2);
    
    let rollResult;
    
    //Check if character have the frolic skill
    let frolicFaces = "";
    let frolicValue = 0;
    if(actorData.data.data.race === "earthrabbit") {
        if(actorData.isOwner) {
            frolicValue = 1;
            let frolic = actorData.effects.filter(effect => effect.data.label.includes(game.i18n.localize("touhouvq.namesRaceSkill.frolic")))[0];
            if(frolic) {
                if(frolic.getFlag("touhouvq","isUsable") === true) {
                    frolicFaces = "+ d"+frolic.getFlag("touhouvq","nbFaces");
                    actorData.deleteEmbeddedDocuments('ActiveEffect', [frolic.id]);
                }
            }
        }
    }

    const messageTemplate = "systems/touhouvq/templates/chat/stat-check-" + statType + ".html";

    if (numDivision % 2 == 0) {
        rollResult = d20 + ` + ` + rollVar + d8 + frolicFaces;
    } else {
        rollResult = d20 + ` + ` + rollVar + d8 + ` + ` + d4 + frolicFaces;
    }

    if (numDivision % 2 == 0) {
        if (fatiguePoints != 0) {

            const rollResult1 = d20 + ` + ` + rollVar + d8 + ` - ` + fatiguePoints + d4 + frolicFaces;
            let rollResult = new Roll(rollResult1, actorData, {actorId:actorData.id}).roll();

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
                actorID: actorData.data._id,
                race: actorData.data.data.race,
                frolicValue: frolicValue,
                compskillvalue: compskillvalue
            }
        
            let htmlContent = await renderTemplate(messageTemplate, messageData);
        
            let messageData2 = {
                speaker: ChatMessage.getSpeaker(),
                content: htmlContent
            }
        
            rollResult.toMessage(messageData2);

        } else {

            const rollResult1 = d20 + ` + ` + rollVar + d8 + frolicFaces;
            let rollResult = new Roll(rollResult1, actorData, {actorId:actorData.id}).roll();

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
                actorID: actorData.data._id,
                race: actorData.data.data.race,
                frolicValue: frolicValue,
                compskillvalue: compskillvalue
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

            const rollResult1 = d20 + ` + ` + rollVar + d8 + ` + ` + d4 + ` - ` + fatiguePoints + d4 + frolicFaces;
            let rollResult = new Roll(rollResult1, actorData, {actorId:actorData.id}).roll();

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
                actorID: actorData.data._id,
                race: actorData.data.data.race,
                frolicValue: frolicValue,
                compskillvalue: compskillvalue
            }
        
            let htmlContent = await renderTemplate(messageTemplate, messageData);
        
            let messageData2 = {
                speaker: ChatMessage.getSpeaker(),
                content: htmlContent
            }
        
            rollResult.toMessage(messageData2);

        } else {

            const rollResult1 = d20 + ` + ` + rollVar + d8 + ` + ` + d4 + frolicFaces;
            let rollResult = new Roll(rollResult1, actorData, {actorId:actorData.id}).roll();

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
                actorID: actorData.data._id,
                race: actorData.data.data.race,
                frolicValue: frolicValue,
                compskillvalue: compskillvalue
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
 * Returns a string of css classes given the loca and whether it's been hit or not.
 * @param  {Object} loca std object : can contain booleans 'crit' and/or 'armor' or none of them.
 * @param  {Boolean} isHit whether that loca has been it (default false).
 * 
 * @returns {String} list of css classes to be added to the <p> element (can be '').
 */
 function getLocaClasses(loca, isHit = false) {
    let cssClasses = '';
    if ( isHit ) {
      cssClasses = loca.crit === true ? 'crit bold' : 'bold';
    } else {
      cssClasses = loca.crit === true ? 'crit-no-bold' : '';
    }
    return loca.armor === true ? `${cssClasses} armor`: cssClasses;
}
  
export async function LocCheck(locData) {
    const race = CONFIG.touhouvq.races[locData.raceNum];
    const template = "systems/touhouvq/templates/partials/tchat-card.html";
  
    //roll the loca hit
    const locaRoll = await new Roll('1d10').evaluate({async: true});
    const rollResult = parseInt(locaRoll.result);
    //find out which loca has been hit : 
    const locaHit = race.locaList.filter( loca => loca.range.includes(rollResult))[0];
  
    //prepare the templateData
    const templateData = {
      rollResult: rollResult,
      bodyClass: getLocaClasses(locaHit, true),
      raceNum: locData.raceNum,
      raceName:  game.i18n.localize(`touhouvq.race.${locData.raceNum}`),
      localist: race.locaList.map( loca => {
        const isHit = loca.id === locaHit.id;
        return {
          cssClasses: getLocaClasses(loca, isHit),
          isHit: isHit,
          name: game.i18n.localize(`touhouvq.loca.${loca.id}`)
        }
      })
    }
  
    const html = await renderTemplate(template, templateData);
  
    ChatMessage.create({
      speaker: ChatMessage.getSpeaker(),
      type: CONST.CHAT_MESSAGE_TYPES.ROLL,
      sound: CONFIG.sounds.dice,
      roll: locaRoll,
      content: html,
      user: game.user.id
    });
}

export async function TraitCheck(actor, traitRollKey, compskillvalue) {
    if ( !actor ) {return; }
    const actorData = actor.data;
    const traitRoll = CONFIG.touhouvq.traitRolls[traitRollKey];

    const stat1 = foundry.utils.getProperty(actorData.data.stats, traitRoll.stats[0]);
    const stat2 = foundry.utils.getProperty(actorData.data.stats, traitRoll.stats[1]);

    const numDivision = Math.floor((stat1 + stat2) / 10);
    const fatiguePoints = actorData.data.fatigue.value;
    const traitType = traitRoll.traitType;

    let d4 = "d4";
    let d6 = "d6";
    let d20 = "d20";

    //Check if character have the frolic skill
    let frolicFaces = "";
    let frolicValue = 0;
    if(actor.data.data.race === "earthrabbit") {
        if(actor.isOwner) {
            frolicValue = 1;
            let frolic = actor.effects.filter(effect => effect.data.label.includes(game.i18n.localize("touhouvq.namesRaceSkill.frolic")))[0];
            if(frolic) {
                if(frolic.getFlag("touhouvq","isUsable") === true) {
                    frolicFaces = "+ d"+frolic.getFlag("touhouvq","nbFaces");
                    actor.deleteEmbeddedDocuments('ActiveEffect', [frolic.id]);
                }
            }
        }
    }
    
    /* active effects vars */

    //Lunar Rabbit's "firingline"
    let activeFiringline = false;
    let firinglinebuff = 0;

    //Check if lunar rabbit under firing line active effect
    let actualStatLunarRabbit = Math.floor(actorData.data.stats.discipline / 10);

    if ( actor.isOwner ) {
      
        const firinglineEffect = actorData.effects.filter(effect => effect.data.label === game.i18n.localize("touhouvq.namesRaceSkill.firingline"))[0];
        if ( traitRoll.firingLine && firinglineEffect ) {
            //Now, our character is a lunar rabbit, under the firing line active effect, and using a buffed check
            activeFiringline = true;
        }
    }

    const messageTemplate = "systems/touhouvq/templates/chat/task-check-" + traitType + ".html";

    if (fatiguePoints == null || fatiguePoints == 0) {

        let rollResult1 = 0;

        if(activeFiringline) {
            //Check if Lunar rabbit is under firing line buff and using buffed stats
            firinglinebuff = actualStatLunarRabbit + d4;
            rollResult1 = d20 + ` + ` + numDivision + d4 + ` + ` + firinglinebuff + frolicFaces;
        } else {
            //Normal trait check
            rollResult1 = d20 + ` + ` + numDivision + d4 + frolicFaces;
        }

        let rollResult = new Roll(rollResult1, actorData, {actorId:actor.id}).roll();

        let rolls = [d20];

        for (let a = 0; a < numDivision; a++) {
            rolls.push(d4);
        }

        let messageData = {
            speaker: ChatMessage.getSpeaker(),
            rollResult: rollResult,
            traitType: traitType,
            stat2: stat2,
            stat1: stat1,
            numDivision: numDivision,
            rolls: rolls,
            firinglinebuff: firinglinebuff,
            frolicValue: frolicValue,
            compskillvalue: compskillvalue
        }

        let htmlContent = await renderTemplate(messageTemplate, messageData);

        let messageData2 = {
            speaker: ChatMessage.getSpeaker(),
            content: htmlContent
        }

        rollResult.toMessage(messageData2);
    } else {

        let rollResult1 = 0;

        if(activeFiringline) {
            //Check is Lunar rabbit is under firing line buff and using buffed stats
            firinglinebuff = actualStatLunarRabbit + d4;
            rollResult1 = d20 + ` + ` + numDivision + d4 + ` + ` + firinglinebuff + d4 + ` - ` + fatiguePoints + d6 + frolicFaces;
        } else {
            //Normal trait check
            rollResult1 = d20 + ` + ` + numDivision + d4 + ` - ` + fatiguePoints + d6 + frolicFaces;
        }

        let rollResult = new Roll(rollResult1, actorData, {actorId:actor.id}).roll();

        let rolls = [d20];

        for (let a = 0; a < numDivision; a++) {
            rolls.push(d4);
        }

        rolls.push(d6);

        //Lunar rabbit's firing line buff
        let firinglinebuff = actualStatLunarRabbit + d4;
        rolls.push(firinglinebuff);

        let messageData = {
            speaker: ChatMessage.getSpeaker(),
            rollResult: rollResult,
            fatiguePoints: fatiguePoints,
            traitType: traitType,
            stat2: stat2,
            stat1: stat1,
            numDivision: numDivision,
            rolls: rolls,
            firinglinebuff: firinglinebuff,
            frolicValue: frolicValue,
            compskillvalue: compskillvalue
        }
        
        let htmlContent = await renderTemplate(messageTemplate, messageData);

        let messageData2 = {
            speaker: ChatMessage.getSpeaker(),
            content: htmlContent
        }

        rollResult.toMessage(messageData2);
    }
}

export async function DeathCheck(actorData) {
    const messageTemplate = "systems/touhouvq/templates/partials/death-check.html";
    const rollFormula = "d20";
    let rollResult = new Roll(rollFormula, actorData).roll();
    let renderedRoll = await rollResult.render({ template: messageTemplate });
    
    let messageData = {
        speaker: ChatMessage.getSpeaker(),
        content: renderedRoll
    }

    rollResult.toMessage(messageData);
}

export async function weaponAttack({
    rollData = null,
    actorData = null } = {}) {

    const messageTemplate = "systems/touhouvq/templates/partials/weapon-chat.html";

    const damage = rollData.damageValue;

    const rarityLabel = game.i18n.localize("touhouvq.generalRarity."+rollData.rarityValue);

    let rollResult = new Roll(damage, actorData).roll();

    let strengthDamage1 = actorData.data.data.stats.strength;

    let strengthDamage = Math.floor(strengthDamage1 / 10);

    let firinglinebuff = 0;

    //Checking if character is under the "firing line" effect
    if(actorData.isOwner) {
        let firingline = actorData.effects.filter(effect => effect.data.label === game.i18n.localize("touhouvq.namesRaceSkill.firingline"))[0];
        if(firingline) {
            firinglinebuff = Math.floor(actorData.data.data.stats.discipline / 10)-1;
        }
    }

    let messageData = {
        speaker: ChatMessage.getSpeaker(),
        rollData: rollData,
        rollResult: rollResult,
        strengthDamage: strengthDamage,
        rarityLabel: rarityLabel,
        firinglinebuff: firinglinebuff
    }

    let htmlContent = await renderTemplate(messageTemplate, messageData);

    let messageData2 = {
        speaker: ChatMessage.getSpeaker(),
        content: htmlContent
    }

    rollResult.toMessage(messageData2);
}

export async function spellcardAttack({
    rollData = null,
    actorData = null } = {}) {

    const messageTemplate = "systems/touhouvq/templates/chat/spellcard-attack.html";

    let chosenstat = rollData.damageValue.data.data.chosenStat;
    let name = rollData.damageValue.data.name;
    let type = rollData.damageValue.data.data.spellcardType;
    let img = rollData.damageValue.data.img;
    let actorImg = actorData.data.img;
    let actorStrength = actorData.data.data.stats.strength;
    let actorAgility = actorData.data.data.stats.agility;
    let actorResilience = actorData.data.data.stats.resilience;
    let actorDiscipline = actorData.data.data.stats.discipline;
    let actorPerception = actorData.data.data.stats.perception;
    let actorMagic = actorData.data.data.stats.magic;
    let actorIntelligence = actorData.data.data.stats.intelligence;
    let spellcardAttackRoll = null;
    let fatiguePoints = actorData.data.data.fatigue.value;
    let temp = null;
    let temp1 = null;
    let temp2 = null;
    let temp3 = null;
    let temp4 = null;
    let temp5 = null;
    let tempX = null;
    let tempY = null;
    let plusDanmaku = false;
    let plusSoulrattle = false;

    let maths = null;

    let CanItCrit = false;
    let toRetrieve = 0;

    let addiNum = parseInt(actorMagic) + parseInt(actorIntelligence);

    let d4 = "d4";
    let d6 = "d6";
    let d8 = "d8";
    let d10 = "d10";
    let d20 = "d20";

    if (type == "sign") {
        if(chosenstat == "strength") {
            toRetrieve = Math.trunc(actorStrength/10);
            spellcardAttackRoll = "d6" + ` + ` + toRetrieve;
            CanItCrit = true;
        }
        if(chosenstat == "agility") {
            toRetrieve = Math.trunc(actorAgility/10);
            spellcardAttackRoll = "d6" + ` + ` + toRetrieve;
            CanItCrit = true;
        }
        if(chosenstat == "resilience") {
            toRetrieve = Math.trunc(actorResilience/10);
            spellcardAttackRoll = "d6" + ` + ` + toRetrieve;
            CanItCrit = true;
        }
        if(chosenstat == "discipline") {
            toRetrieve = Math.trunc(actorDiscipline/10);
            spellcardAttackRoll = "d6" + ` + ` + toRetrieve;
            CanItCrit = true;
        }
        if(chosenstat == "perception") {
            toRetrieve = Math.trunc(actorPerception/10);
            spellcardAttackRoll = "d6" + ` + ` + toRetrieve;
            CanItCrit = true;
        }
        if(chosenstat == "magic") {
            toRetrieve = Math.trunc(actorMagic/10);
            spellcardAttackRoll = "d6" + ` + ` + toRetrieve;
            CanItCrit = true;
        }
        if(chosenstat == "intelligence") {
            toRetrieve = Math.trunc(actorIntelligence/10);
            spellcardAttackRoll = "d6" + ` + ` + toRetrieve;
            CanItCrit = true;
        }
    }
    if (type == "unsealing") {

        let numDivision = Math.floor(addiNum / 10);
    
        numDivision -= 1;
    
        if (fatiguePoints == 0) {

            temp1 = Math.floor(Math.random() * 20)+1;
            for (let z = 0; z < numDivision; z++) {
                temp2 += Math.floor(Math.random() * 4)+1;
            }

            temp = temp1 + temp2 - 18;

            if (temp > 0) {
                spellcardAttackRoll = "d4" + ` + ` + temp;
            } else {
                spellcardAttackRoll = "d4"  + ` + ` +  "0";
            }
 
        } else {

            temp1 = Math.floor(Math.random() * 20)+1;
            for (let z = 0; z < numDivision; z++) {
                temp2 += Math.floor(Math.random() * 4)+1;
            }

            for (let b = 0; b < fatiguePoints; b++) {
                temp3 += Math.floor(Math.random() * 4)+1;
            }

            temp = temp1 + temp2 - temp3 - 18;

            if (temp > 0) {
                spellcardAttackRoll = "d4" + ` + ` + temp;
            } else {
                spellcardAttackRoll = "d4"  + ` + ` +  "0";
            }

        }
    }
    if (type == "thought") {

        maths = Math.floor(Math.random() * 7)+1;
        
        if(maths === 1) {
            chosenstat = "strength";
        }
        if(maths === 2) {
            chosenstat = "agility";
        }
        if(maths === 3) {
            chosenstat = "resilience";
        }
        if(maths === 4) {
            chosenstat = "discipline";
        }
        if(maths === 5) {
            chosenstat = "perception";
        }
        if(maths === 6) {
            chosenstat = "magic";
        }
        if(maths === 7) {
            chosenstat = "intelligence";
        }

        if(chosenstat == "strength") {
            let actionValue = actorStrength;

            let numDivision = Math.floor(actionValue / 5);
            let rollVar = Math.floor(numDivision / 2);
            
            if (numDivision % 2 == 0) {
                if (fatiguePoints != 0) {

                    temp1 = Math.floor(Math.random() * 20)+1;

                    for (let i = 0; i < rollVar; i++) {
                        temp2 += Math.floor(Math.random() * 8)+1;
                    }

                    for (let u = 0; u < fatiguePoints; u++) {
                        temp4 += Math.floor(Math.random() * 4)+1;
                    }

                    temp = temp1 + temp2 - temp4 - 18;

                    if (temp > 0) {
                        spellcardAttackRoll = temp + ` + 1`;
                    } else {
                        spellcardAttackRoll = `1`;
                    }
                } else {

                    temp1 = Math.floor(Math.random() * 20)+1;

                    for (let i = 0; i < rollVar; i++) {
                        temp2 += Math.floor(Math.random() * 8)+1;
                    }

                    temp = temp1 + temp2 - 18;

                    if (temp > 0) {
                        spellcardAttackRoll = temp + ` + 1`;
                    } else {
                        spellcardAttackRoll = `1`;
                    }
                }
            } else {
                if (fatiguePoints != 0) {

                    temp1 = Math.floor(Math.random() * 20)+1;

                    for (let i = 0; i < rollVar; i++) {
                        temp2 += Math.floor(Math.random() * 8)+1;
                    }

                    temp3 = Math.floor(Math.random() * 4)+1;

                    for (let u = 0; u < fatiguePoints; u++) {
                        temp4 += Math.floor(Math.random() * 4)+1;
                    }
                    
                    temp = temp1 + temp2 + temp3 - temp4 - 18;
                    
                    if (temp > 0) {
                        spellcardAttackRoll = temp + ` + 1`;
                    } else {
                        spellcardAttackRoll = `1`;
                    }
                } else {

                    temp1 = Math.floor(Math.random() * 20)+1;

                    for (let i = 0; i < rollVar; i++) {
                        temp2 += Math.floor(Math.random() * 8)+1;
                    }

                    temp3 = Math.floor(Math.random() * 4)+1;

                    temp = temp1 + temp2 + temp3 - 18;

                    if (temp > 0) {
                        spellcardAttackRoll = temp + ` + 1`;
                    } else {
                        spellcardAttackRoll = `1`;
                    }
                }
            }
        }
        if(chosenstat == "agility") {
            let actionValue = actorAgility;

            let numDivision = Math.floor(actionValue / 5);
            let rollVar = Math.floor(numDivision / 2);
            
            if (numDivision % 2 == 0) {
                if (fatiguePoints != 0) {

                    temp1 = Math.floor(Math.random() * 20)+1;

                    for (let i = 0; i < rollVar; i++) {
                        temp2 += Math.floor(Math.random() * 8)+1;
                    }

                    for (let u = 0; u < fatiguePoints; u++) {
                        temp4 += Math.floor(Math.random() * 4)+1;
                    }

                    temp = temp1 + temp2 - temp4 - 18;

                    if (temp > 0) {
                        spellcardAttackRoll = temp + ` + 1`;
                    } else {
                        spellcardAttackRoll = `1`;
                    }
                } else {

                    temp1 = Math.floor(Math.random() * 20)+1;

                    for (let i = 0; i < rollVar; i++) {
                        temp2 += Math.floor(Math.random() * 8)+1;
                    }

                    temp = temp1 + temp2 - 18;

                    if (temp > 0) {
                        spellcardAttackRoll = temp + ` + 1`;
                    } else {
                        spellcardAttackRoll = `1`;
                    }
                }
            } else {
                if (fatiguePoints != 0) {

                    temp1 = Math.floor(Math.random() * 20)+1;

                    for (let i = 0; i < rollVar; i++) {
                        temp2 += Math.floor(Math.random() * 8)+1;
                    }

                    temp3 = Math.floor(Math.random() * 4)+1;

                    for (let u = 0; u < fatiguePoints; u++) {
                        temp4 += Math.floor(Math.random() * 4)+1;
                    }
                    
                    temp = temp1 + temp2 + temp3 - temp4 - 18;
                    
                    if (temp > 0) {
                        spellcardAttackRoll = temp + ` + 1`;
                    } else {
                        spellcardAttackRoll = `1`;
                    }
                } else {

                    temp1 = Math.floor(Math.random() * 20)+1;

                    for (let i = 0; i < rollVar; i++) {
                        temp2 += Math.floor(Math.random() * 8)+1;
                    }

                    temp3 = Math.floor(Math.random() * 4)+1;

                    temp = temp1 + temp2 + temp3 - 18;

                    if (temp > 0) {
                        spellcardAttackRoll = temp + ` + 1`;
                    } else {
                        spellcardAttackRoll = `1`;
                    }
                }
            }
        }
        if(chosenstat == "resilience") {
            let actionValue = actorResilience;

            let numDivision = Math.floor(actionValue / 5);
            let rollVar = Math.floor(numDivision / 2);
            
            if (numDivision % 2 == 0) {
                if (fatiguePoints != 0) {

                    temp1 = Math.floor(Math.random() * 20)+1;

                    for (let i = 0; i < rollVar; i++) {
                        temp2 += Math.floor(Math.random() * 8)+1;
                    }

                    for (let u = 0; u < fatiguePoints; u++) {
                        temp4 += Math.floor(Math.random() * 4)+1;
                    }

                    temp = temp1 + temp2 - temp4 - 18;

                    if (temp > 0) {
                        spellcardAttackRoll = temp + ` + 1`;
                    } else {
                        spellcardAttackRoll = `1`;
                    }
                } else {

                    temp1 = Math.floor(Math.random() * 20)+1;

                    for (let i = 0; i < rollVar; i++) {
                        temp2 += Math.floor(Math.random() * 8)+1;
                    }

                    temp = temp1 + temp2 - 18;

                    if (temp > 0) {
                        spellcardAttackRoll = temp + ` + 1`;
                    } else {
                        spellcardAttackRoll = `1`;
                    }
                }
            } else {
                if (fatiguePoints != 0) {

                    temp1 = Math.floor(Math.random() * 20)+1;

                    for (let i = 0; i < rollVar; i++) {
                        temp2 += Math.floor(Math.random() * 8)+1;
                    }

                    temp3 = Math.floor(Math.random() * 4)+1;

                    for (let u = 0; u < fatiguePoints; u++) {
                        temp4 += Math.floor(Math.random() * 4)+1;
                    }
                    
                    temp = temp1 + temp2 + temp3 - temp4 - 18;
                    
                    if (temp > 0) {
                        spellcardAttackRoll = temp + ` + 1`;
                    } else {
                        spellcardAttackRoll = `1`;
                    }
                } else {

                    temp1 = Math.floor(Math.random() * 20)+1;

                    for (let i = 0; i < rollVar; i++) {
                        temp2 += Math.floor(Math.random() * 8)+1;
                    }

                    temp3 = Math.floor(Math.random() * 4)+1;

                    temp = temp1 + temp2 + temp3 - 18;

                    if (temp > 0) {
                        spellcardAttackRoll = temp + ` + 1`;
                    } else {
                        spellcardAttackRoll = `1`;
                    }
                }
            }
        }
        if(chosenstat == "discipline") {
            let actionValue = actorDiscipline;

            let numDivision = Math.floor(actionValue / 5);
            let rollVar = Math.floor(numDivision / 2);
            
            if (numDivision % 2 == 0) {
                if (fatiguePoints != 0) {

                    temp1 = Math.floor(Math.random() * 20)+1;

                    for (let i = 0; i < rollVar; i++) {
                        temp2 += Math.floor(Math.random() * 8)+1;
                    }

                    for (let u = 0; u < fatiguePoints; u++) {
                        temp4 += Math.floor(Math.random() * 4)+1;
                    }

                    temp = temp1 + temp2 - temp4 - 18;

                    if (temp > 0) {
                        spellcardAttackRoll = temp + ` + 1`;
                    } else {
                        spellcardAttackRoll = `1`;
                    }
                } else {

                    temp1 = Math.floor(Math.random() * 20)+1;

                    for (let i = 0; i < rollVar; i++) {
                        temp2 += Math.floor(Math.random() * 8)+1;
                    }

                    temp = temp1 + temp2 - 18;

                    if (temp > 0) {
                        spellcardAttackRoll = temp + ` + 1`;
                    } else {
                        spellcardAttackRoll = `1`;
                    }
                }
            } else {
                if (fatiguePoints != 0) {

                    temp1 = Math.floor(Math.random() * 20)+1;

                    for (let i = 0; i < rollVar; i++) {
                        temp2 += Math.floor(Math.random() * 8)+1;
                    }

                    temp3 = Math.floor(Math.random() * 4)+1;

                    for (let u = 0; u < fatiguePoints; u++) {
                        temp4 += Math.floor(Math.random() * 4)+1;
                    }
                    
                    temp = temp1 + temp2 + temp3 - temp4 - 18;
                    
                    if (temp > 0) {
                        spellcardAttackRoll = temp + ` + 1`;
                    } else {
                        spellcardAttackRoll = `1`;
                    }
                } else {

                    temp1 = Math.floor(Math.random() * 20)+1;

                    for (let i = 0; i < rollVar; i++) {
                        temp2 += Math.floor(Math.random() * 8)+1;
                    }

                    temp3 = Math.floor(Math.random() * 4)+1;

                    temp = temp1 + temp2 + temp3 - 18;

                    if (temp > 0) {
                        spellcardAttackRoll = temp + ` + 1`;
                    } else {
                        spellcardAttackRoll = `1`;
                    }
                }
            }
        }
        if(chosenstat == "perception") {
            let actionValue = actorPerception;

            let numDivision = Math.floor(actionValue / 5);
            let rollVar = Math.floor(numDivision / 2);
            
            if (numDivision % 2 == 0) {
                if (fatiguePoints != 0) {

                    temp1 = Math.floor(Math.random() * 20)+1;

                    for (let i = 0; i < rollVar; i++) {
                        temp2 += Math.floor(Math.random() * 8)+1;
                    }

                    for (let u = 0; u < fatiguePoints; u++) {
                        temp4 += Math.floor(Math.random() * 4)+1;
                    }

                    temp = temp1 + temp2 - temp4 - 18;

                    if (temp > 0) {
                        spellcardAttackRoll = temp + ` + 1`;
                    } else {
                        spellcardAttackRoll = `1`;
                    }
                } else {

                    temp1 = Math.floor(Math.random() * 20)+1;

                    for (let i = 0; i < rollVar; i++) {
                        temp2 += Math.floor(Math.random() * 8)+1;
                    }

                    temp = temp1 + temp2 - 18;

                    if (temp > 0) {
                        spellcardAttackRoll = temp + ` + 1`;
                    } else {
                        spellcardAttackRoll = `1`;
                    }
                }
            } else {
                if (fatiguePoints != 0) {

                    temp1 = Math.floor(Math.random() * 20)+1;

                    for (let i = 0; i < rollVar; i++) {
                        temp2 += Math.floor(Math.random() * 8)+1;
                    }

                    temp3 = Math.floor(Math.random() * 4)+1;

                    for (let u = 0; u < fatiguePoints; u++) {
                        temp4 += Math.floor(Math.random() * 4)+1;
                    }
                    
                    temp = temp1 + temp2 + temp3 - temp4 - 18;
                    
                    if (temp > 0) {
                        spellcardAttackRoll = temp + ` + 1`;
                    } else {
                        spellcardAttackRoll = `1`;
                    }
                } else {

                    temp1 = Math.floor(Math.random() * 20)+1;

                    for (let i = 0; i < rollVar; i++) {
                        temp2 += Math.floor(Math.random() * 8)+1;
                    }

                    temp3 = Math.floor(Math.random() * 4)+1;

                    temp = temp1 + temp2 + temp3 - 18;

                    if (temp > 0) {
                        spellcardAttackRoll = temp + ` + 1`;
                    } else {
                        spellcardAttackRoll = `1`;
                    }
                }
            }
        }
        if(chosenstat == "magic") {
            let actionValue = actorMagic;

            let numDivision = Math.floor(actionValue / 5);
            let rollVar = Math.floor(numDivision / 2);
            
            if (numDivision % 2 == 0) {
                if (fatiguePoints != 0) {

                    temp1 = Math.floor(Math.random() * 20)+1;

                    for (let i = 0; i < rollVar; i++) {
                        temp2 += Math.floor(Math.random() * 8)+1;
                    }

                    for (let u = 0; u < fatiguePoints; u++) {
                        temp4 += Math.floor(Math.random() * 4)+1;
                    }

                    temp = temp1 + temp2 - temp4 - 18;

                    if (temp > 0) {
                        spellcardAttackRoll = temp + ` + 1`;
                    } else {
                        spellcardAttackRoll = `1`;
                    }
                } else {

                    temp1 = Math.floor(Math.random() * 20)+1;

                    for (let i = 0; i < rollVar; i++) {
                        temp2 += Math.floor(Math.random() * 8)+1;
                    }

                    temp = temp1 + temp2 - 18;

                    if (temp > 0) {
                        spellcardAttackRoll = temp + ` + 1`;
                    } else {
                        spellcardAttackRoll = `1`;
                    }
                }
            } else {
                if (fatiguePoints != 0) {

                    temp1 = Math.floor(Math.random() * 20)+1;

                    for (let i = 0; i < rollVar; i++) {
                        temp2 += Math.floor(Math.random() * 8)+1;
                    }

                    temp3 = Math.floor(Math.random() * 4)+1;

                    for (let u = 0; u < fatiguePoints; u++) {
                        temp4 += Math.floor(Math.random() * 4)+1;
                    }
                    
                    temp = temp1 + temp2 + temp3 - temp4 - 18;
                    
                    if (temp > 0) {
                        spellcardAttackRoll = temp + ` + 1`;
                    } else {
                        spellcardAttackRoll = `1`;
                    }
                } else {

                    temp1 = Math.floor(Math.random() * 20)+1;

                    for (let i = 0; i < rollVar; i++) {
                        temp2 += Math.floor(Math.random() * 8)+1;
                    }

                    temp3 = Math.floor(Math.random() * 4)+1;

                    temp = temp1 + temp2 + temp3 - 18;

                    if (temp > 0) {
                        spellcardAttackRoll = temp + ` + 1`;
                    } else {
                        spellcardAttackRoll = `1`;
                    }
                }
            }
        }
        if(chosenstat == "intelligence") {
            let actionValue = actorIntelligence;

            let numDivision = Math.floor(actionValue / 5);
            let rollVar = Math.floor(numDivision / 2);
            
            if (numDivision % 2 == 0) {
                if (fatiguePoints != 0) {

                    temp1 = Math.floor(Math.random() * 20)+1;

                    for (let i = 0; i < rollVar; i++) {
                        temp2 += Math.floor(Math.random() * 8)+1;
                    }

                    for (let u = 0; u < fatiguePoints; u++) {
                        temp4 += Math.floor(Math.random() * 4)+1;
                    }

                    temp = temp1 + temp2 - temp4 - 18;

                    if (temp > 0) {
                        spellcardAttackRoll = temp + ` + 1`;
                    } else {
                        spellcardAttackRoll = `1`;
                    }
                } else {

                    temp1 = Math.floor(Math.random() * 20)+1;

                    for (let i = 0; i < rollVar; i++) {
                        temp2 += Math.floor(Math.random() * 8)+1;
                    }

                    temp = temp1 + temp2 - 18;

                    if (temp > 0) {
                        spellcardAttackRoll = temp + ` + 1`;
                    } else {
                        spellcardAttackRoll = `1`;
                    }
                }
            } else {
                if (fatiguePoints != 0) {

                    temp1 = Math.floor(Math.random() * 20)+1;

                    for (let i = 0; i < rollVar; i++) {
                        temp2 += Math.floor(Math.random() * 8)+1;
                    }

                    temp3 = Math.floor(Math.random() * 4)+1;

                    for (let u = 0; u < fatiguePoints; u++) {
                        temp4 += Math.floor(Math.random() * 4)+1;
                    }
                    
                    temp = temp1 + temp2 + temp3 - temp4 - 18;
                    
                    if (temp > 0) {
                        spellcardAttackRoll = temp + ` + 1`;
                    } else {
                        spellcardAttackRoll = `1`;
                    }
                } else {

                    temp1 = Math.floor(Math.random() * 20)+1;

                    for (let i = 0; i < rollVar; i++) {
                        temp2 += Math.floor(Math.random() * 8)+1;
                    }

                    temp3 = Math.floor(Math.random() * 4)+1;

                    temp = temp1 + temp2 + temp3 - 18;

                    if (temp > 0) {
                        spellcardAttackRoll = temp + ` + 1`;
                    } else {
                        spellcardAttackRoll = `1`;
                    }
                }
            }
        }
    }
    if (type == "unleash") {
        if(chosenstat == "strength") {
            toRetrieve = Math.trunc(actorStrength/10);
            spellcardAttackRoll = "d10" + ` + ` + toRetrieve;
            CanItCrit = true;
        }
        if(chosenstat == "agility") {
            toRetrieve = Math.trunc(actorAgility/10);
            spellcardAttackRoll = "d10" + ` + ` + toRetrieve;
            CanItCrit = true;
        }
        if(chosenstat == "resilience") {
            toRetrieve = Math.trunc(actorResilience/10);
            spellcardAttackRoll = "d10" + ` + ` + toRetrieve;
            CanItCrit = true;
        }
        if(chosenstat == "discipline") {
            toRetrieve = Math.trunc(actorDiscipline/10);
            spellcardAttackRoll = "d10" + ` + ` + toRetrieve;
            CanItCrit = true;
        }
        if(chosenstat == "perception") {
            toRetrieve = Math.trunc(actorPerception/10);
            spellcardAttackRoll = "d10" + ` + ` + toRetrieve;
            CanItCrit = true;
        }
        if(chosenstat == "magic") {
            toRetrieve = Math.trunc(actorMagic/10);
            spellcardAttackRoll = "d10" + ` + ` + toRetrieve;
            CanItCrit = true;
        }
        if(chosenstat == "intelligence") {
            toRetrieve = Math.trunc(actorIntelligence/10);
            spellcardAttackRoll = "d10" + ` + ` + toRetrieve;
            CanItCrit = true;
        }
    }
    if (type == "soulrattle") {

        let numDivision = Math.floor(addiNum / 10);
    
        numDivision -= 1;
    
        if (fatiguePoints == 0) {

            temp1 = Math.floor(Math.random() * 20)+1;
            for (let z = 0; z < numDivision; z++) {
                temp2 += Math.floor(Math.random() * 4)+1;
            }

            temp = temp1 + temp2 - 18;

            if (temp > 0) {
                spellcardAttackRoll = "1" + ` + ` + temp*2;
            } else {
                spellcardAttackRoll = "1"  + ` + ` +  "0";
            }
 
        } else {

            temp1 = Math.floor(Math.random() * 20)+1;
            for (let z = 0; z < numDivision; z++) {
                temp2 += Math.floor(Math.random() * 4)+1;
            }

            for (let b = 0; b < fatiguePoints; b++) {
                temp3 += Math.floor(Math.random() * 4)+1;
            }

            temp = temp1 + temp2 - temp3 - 18;

            if (temp > 0) {
                spellcardAttackRoll = "1" + ` + ` + temp*2;
            } else {
                spellcardAttackRoll = "1"  + ` + ` +  "0";
            }

        }
    }
    if (type == "dreamsigh") {
        
        maths = Math.floor(Math.random() * 7)+1;

        if(maths === 1) {
            chosenstat = "strength";
        }
        if(maths === 2) {
            chosenstat = "agility";
        }
        if(maths === 3) {
            chosenstat = "resilience";
        }
        if(maths === 4) {
            chosenstat = "discipline";
        }
        if(maths === 5) {
            chosenstat = "perception";
        }
        if(maths === 6) {
            chosenstat = "magic";
        }
        if(maths === 7) {
            chosenstat = "intelligence";
        }

        let maths2 = 2;

        if(chosenstat == "strength") {
            let actionValue = actorStrength;

            let numDivision = Math.floor(actionValue / 5);
            let rollVar = Math.floor(numDivision / 2);
            
            if (numDivision % 2 == 0) {
                if (fatiguePoints != 0) {
                    temp1 = Math.floor(Math.random() * 20)+1;

                    for (let i = 0; i < rollVar; i++) {
                        temp2 += Math.floor(Math.random() * 8)+1;
                    }

                    for (let u = 0; u < fatiguePoints; u++) {
                        temp4 += Math.floor(Math.random() * 4)+1;
                    }

                    tempX += Math.floor(Math.random() * 4)+1;

                    temp = temp1 + temp2 - temp4 - 18;

                    if (temp > 0) {
                        spellcardAttackRoll = temp + ` + ` + tempX;
                    } else {
                        spellcardAttackRoll = `d4`;
                    }
                } else {
                    temp1 = Math.floor(Math.random() * 20)+1;

                    for (let i = 0; i < rollVar; i++) {
                        temp2 += Math.floor(Math.random() * 8)+1;
                    }

                    tempX += Math.floor(Math.random() * 4)+1;

                    temp = temp1 + temp2 - 18;

                    if (temp > 0) {
                        spellcardAttackRoll = temp + ` + ` + tempX;
                    } else {
                        spellcardAttackRoll = `d4`;
                    }
                }
            } else {
                if (fatiguePoints != 0) {

                    temp1 = Math.floor(Math.random() * 20)+1;

                    for (let i = 0; i < rollVar; i++) {
                        temp2 += Math.floor(Math.random() * 8)+1;
                    }

                    temp3 = Math.floor(Math.random() * 4)+1;

                    for (let u = 0; u < fatiguePoints; u++) {
                        temp4 += Math.floor(Math.random() * 4)+1;
                    }

                    tempX += Math.floor(Math.random() * 4)+1;
                    
                    temp = temp1 + temp2 + temp3 - temp4 - 18;
                    
                    if (temp > 0) {
                        spellcardAttackRoll = temp + ` + ` + tempX;
                    } else {
                        spellcardAttackRoll = `d4`;
                    }
                } else {

                    console.log(rollVar);

                    temp1 = Math.floor(Math.random() * 20)+1;
                    console.log(temp1);

                    for (let i = 0; i < rollVar; i++) {
                        temp2 += Math.floor(Math.random() * 8)+1;
                    }
                    console.log(temp2);

                    temp3 = Math.floor(Math.random() * 4)+1;

                    console.log(temp3);

                    tempX = Math.floor(Math.random() * 4)+1;

                    console.log(tempX);

                    temp = temp1 + temp2 + temp3 - 18;

                    console.log(temp);

                    if (temp > 0) {
                        spellcardAttackRoll = temp + ` + ` + tempX;
                    } else {
                        spellcardAttackRoll = `d4`;
                    }
                }
            }
        }
        if(chosenstat == "agility") {
            let actionValue = actorAgility;

            let numDivision = Math.floor(actionValue / 5);
            let rollVar = Math.floor(numDivision / 2);
            
            if (numDivision % 2 == 0) {
                if (fatiguePoints != 0) {
                    temp1 = Math.floor(Math.random() * 20)+1;

                    for (let i = 0; i < rollVar; i++) {
                        temp2 += Math.floor(Math.random() * 8)+1;
                    }

                    for (let u = 0; u < fatiguePoints; u++) {
                        temp4 += Math.floor(Math.random() * 4)+1;
                    }

                    tempX += Math.floor(Math.random() * 4)+1;

                    temp = temp1 + temp2 - temp4 - 18;

                    if (temp > 0) {
                        spellcardAttackRoll = temp + ` + ` + tempX;
                    } else {
                        spellcardAttackRoll = `d4`;
                    }
                } else {
                    temp1 = Math.floor(Math.random() * 20)+1;

                    for (let i = 0; i < rollVar; i++) {
                        temp2 += Math.floor(Math.random() * 8)+1;
                    }

                    tempX += Math.floor(Math.random() * 4)+1;

                    temp = temp1 + temp2 - 18;

                    if (temp > 0) {
                        spellcardAttackRoll = temp + ` + ` + tempX;
                    } else {
                        spellcardAttackRoll = `d4`;
                    }
                }
            } else {
                if (fatiguePoints != 0) {

                    temp1 = Math.floor(Math.random() * 20)+1;

                    for (let i = 0; i < rollVar; i++) {
                        temp2 += Math.floor(Math.random() * 8)+1;
                    }

                    temp3 = Math.floor(Math.random() * 4)+1;

                    for (let u = 0; u < fatiguePoints; u++) {
                        temp4 += Math.floor(Math.random() * 4)+1;
                    }

                    tempX += Math.floor(Math.random() * 4)+1;
                    
                    temp = temp1 + temp2 + temp3 - temp4 - 18;
                    
                    if (temp > 0) {
                        spellcardAttackRoll = temp + ` + ` + tempX;
                    } else {
                        spellcardAttackRoll = `d4`;
                    }
                } else {

                    console.log(rollVar);

                    temp1 = Math.floor(Math.random() * 20)+1;
                    console.log(temp1);

                    for (let i = 0; i < rollVar; i++) {
                        temp2 += Math.floor(Math.random() * 8)+1;
                    }
                    console.log(temp2);

                    temp3 = Math.floor(Math.random() * 4)+1;

                    console.log(temp3);

                    tempX = Math.floor(Math.random() * 4)+1;

                    console.log(tempX);

                    temp = temp1 + temp2 + temp3 - 18;

                    console.log(temp);

                    if (temp > 0) {
                        spellcardAttackRoll = temp + ` + ` + tempX;
                    } else {
                        spellcardAttackRoll = `d4`;
                    }
                }
            }
        }
        if(chosenstat == "resilience") {
            let actionValue = actorResilience;

            let numDivision = Math.floor(actionValue / 5);
            let rollVar = Math.floor(numDivision / 2);
            
            if (numDivision % 2 == 0) {
                if (fatiguePoints != 0) {
                    temp1 = Math.floor(Math.random() * 20)+1;

                    for (let i = 0; i < rollVar; i++) {
                        temp2 += Math.floor(Math.random() * 8)+1;
                    }

                    for (let u = 0; u < fatiguePoints; u++) {
                        temp4 += Math.floor(Math.random() * 4)+1;
                    }

                    tempX += Math.floor(Math.random() * 4)+1;

                    temp = temp1 + temp2 - temp4 - 18;

                    if (temp > 0) {
                        spellcardAttackRoll = temp + ` + ` + tempX;
                    } else {
                        spellcardAttackRoll = `d4`;
                    }
                } else {
                    temp1 = Math.floor(Math.random() * 20)+1;

                    for (let i = 0; i < rollVar; i++) {
                        temp2 += Math.floor(Math.random() * 8)+1;
                    }

                    tempX += Math.floor(Math.random() * 4)+1;

                    temp = temp1 + temp2 - 18;

                    if (temp > 0) {
                        spellcardAttackRoll = temp + ` + ` + tempX;
                    } else {
                        spellcardAttackRoll = `d4`;
                    }
                }
            } else {
                if (fatiguePoints != 0) {

                    temp1 = Math.floor(Math.random() * 20)+1;

                    for (let i = 0; i < rollVar; i++) {
                        temp2 += Math.floor(Math.random() * 8)+1;
                    }

                    temp3 = Math.floor(Math.random() * 4)+1;

                    for (let u = 0; u < fatiguePoints; u++) {
                        temp4 += Math.floor(Math.random() * 4)+1;
                    }

                    tempX += Math.floor(Math.random() * 4)+1;
                    
                    temp = temp1 + temp2 + temp3 - temp4 - 18;
                    
                    if (temp > 0) {
                        spellcardAttackRoll = temp + ` + ` + tempX;
                    } else {
                        spellcardAttackRoll = `d4`;
                    }
                } else {

                    console.log(rollVar);

                    temp1 = Math.floor(Math.random() * 20)+1;
                    console.log(temp1);

                    for (let i = 0; i < rollVar; i++) {
                        temp2 += Math.floor(Math.random() * 8)+1;
                    }
                    console.log(temp2);

                    temp3 = Math.floor(Math.random() * 4)+1;

                    console.log(temp3);

                    tempX = Math.floor(Math.random() * 4)+1;

                    console.log(tempX);

                    temp = temp1 + temp2 + temp3 - 18;

                    console.log(temp);

                    if (temp > 0) {
                        spellcardAttackRoll = temp + ` + ` + tempX;
                    } else {
                        spellcardAttackRoll = `d4`;
                    }
                }
            }
        }
        if(chosenstat == "discipline") {
            let actionValue = actorDiscipline;

            let numDivision = Math.floor(actionValue / 5);
            let rollVar = Math.floor(numDivision / 2);
            
            if (numDivision % 2 == 0) {
                if (fatiguePoints != 0) {
                    temp1 = Math.floor(Math.random() * 20)+1;

                    for (let i = 0; i < rollVar; i++) {
                        temp2 += Math.floor(Math.random() * 8)+1;
                    }

                    for (let u = 0; u < fatiguePoints; u++) {
                        temp4 += Math.floor(Math.random() * 4)+1;
                    }

                    tempX += Math.floor(Math.random() * 4)+1;

                    temp = temp1 + temp2 - temp4 - 18;

                    if (temp > 0) {
                        spellcardAttackRoll = temp + ` + ` + tempX;
                    } else {
                        spellcardAttackRoll = `d4`;
                    }
                } else {
                    temp1 = Math.floor(Math.random() * 20)+1;

                    for (let i = 0; i < rollVar; i++) {
                        temp2 += Math.floor(Math.random() * 8)+1;
                    }

                    tempX += Math.floor(Math.random() * 4)+1;

                    temp = temp1 + temp2 - 18;

                    if (temp > 0) {
                        spellcardAttackRoll = temp + ` + ` + tempX;
                    } else {
                        spellcardAttackRoll = `d4`;
                    }
                }
            } else {
                if (fatiguePoints != 0) {

                    temp1 = Math.floor(Math.random() * 20)+1;

                    for (let i = 0; i < rollVar; i++) {
                        temp2 += Math.floor(Math.random() * 8)+1;
                    }

                    temp3 = Math.floor(Math.random() * 4)+1;

                    for (let u = 0; u < fatiguePoints; u++) {
                        temp4 += Math.floor(Math.random() * 4)+1;
                    }

                    tempX += Math.floor(Math.random() * 4)+1;
                    
                    temp = temp1 + temp2 + temp3 - temp4 - 18;
                    
                    if (temp > 0) {
                        spellcardAttackRoll = temp + ` + ` + tempX;
                    } else {
                        spellcardAttackRoll = `d4`;
                    }
                } else {

                    console.log(rollVar);

                    temp1 = Math.floor(Math.random() * 20)+1;
                    console.log(temp1);

                    for (let i = 0; i < rollVar; i++) {
                        temp2 += Math.floor(Math.random() * 8)+1;
                    }
                    console.log(temp2);

                    temp3 = Math.floor(Math.random() * 4)+1;

                    console.log(temp3);

                    tempX = Math.floor(Math.random() * 4)+1;

                    console.log(tempX);

                    temp = temp1 + temp2 + temp3 - 18;

                    console.log(temp);

                    if (temp > 0) {
                        spellcardAttackRoll = temp + ` + ` + tempX;
                    } else {
                        spellcardAttackRoll = `d4`;
                    }
                }
            }
        }
        if(chosenstat == "perception") {
            let actionValue = actorPerception;

            let numDivision = Math.floor(actionValue / 5);
            let rollVar = Math.floor(numDivision / 2);
            
            if (numDivision % 2 == 0) {
                if (fatiguePoints != 0) {
                    temp1 = Math.floor(Math.random() * 20)+1;

                    for (let i = 0; i < rollVar; i++) {
                        temp2 += Math.floor(Math.random() * 8)+1;
                    }

                    for (let u = 0; u < fatiguePoints; u++) {
                        temp4 += Math.floor(Math.random() * 4)+1;
                    }

                    tempX += Math.floor(Math.random() * 4)+1;

                    temp = temp1 + temp2 - temp4 - 18;

                    if (temp > 0) {
                        spellcardAttackRoll = temp + ` + ` + tempX;
                    } else {
                        spellcardAttackRoll = `d4`;
                    }
                } else {
                    temp1 = Math.floor(Math.random() * 20)+1;

                    for (let i = 0; i < rollVar; i++) {
                        temp2 += Math.floor(Math.random() * 8)+1;
                    }

                    tempX += Math.floor(Math.random() * 4)+1;

                    temp = temp1 + temp2 - 18;

                    if (temp > 0) {
                        spellcardAttackRoll = temp + ` + ` + tempX;
                    } else {
                        spellcardAttackRoll = `d4`;
                    }
                }
            } else {
                if (fatiguePoints != 0) {

                    temp1 = Math.floor(Math.random() * 20)+1;

                    for (let i = 0; i < rollVar; i++) {
                        temp2 += Math.floor(Math.random() * 8)+1;
                    }

                    temp3 = Math.floor(Math.random() * 4)+1;

                    for (let u = 0; u < fatiguePoints; u++) {
                        temp4 += Math.floor(Math.random() * 4)+1;
                    }

                    tempX += Math.floor(Math.random() * 4)+1;
                    
                    temp = temp1 + temp2 + temp3 - temp4 - 18;
                    
                    if (temp > 0) {
                        spellcardAttackRoll = temp + ` + ` + tempX;
                    } else {
                        spellcardAttackRoll = `d4`;
                    }
                } else {

                    console.log(rollVar);

                    temp1 = Math.floor(Math.random() * 20)+1;
                    console.log(temp1);

                    for (let i = 0; i < rollVar; i++) {
                        temp2 += Math.floor(Math.random() * 8)+1;
                    }
                    console.log(temp2);

                    temp3 = Math.floor(Math.random() * 4)+1;

                    console.log(temp3);

                    tempX = Math.floor(Math.random() * 4)+1;

                    console.log(tempX);

                    temp = temp1 + temp2 + temp3 - 18;

                    console.log(temp);

                    if (temp > 0) {
                        spellcardAttackRoll = temp + ` + ` + tempX;
                    } else {
                        spellcardAttackRoll = `d4`;
                    }
                }
            }
        }
        if(chosenstat == "magic") {
            let actionValue = actorMagic;

            let numDivision = Math.floor(actionValue / 5);
            let rollVar = Math.floor(numDivision / 2);
            
            if (numDivision % 2 == 0) {
                if (fatiguePoints != 0) {
                    temp1 = Math.floor(Math.random() * 20)+1;

                    for (let i = 0; i < rollVar; i++) {
                        temp2 += Math.floor(Math.random() * 8)+1;
                    }

                    for (let u = 0; u < fatiguePoints; u++) {
                        temp4 += Math.floor(Math.random() * 4)+1;
                    }

                    tempX += Math.floor(Math.random() * 4)+1;

                    temp = temp1 + temp2 - temp4 - 18;

                    if (temp > 0) {
                        spellcardAttackRoll = temp + ` + ` + tempX;
                    } else {
                        spellcardAttackRoll = `d4`;
                    }
                } else {
                    temp1 = Math.floor(Math.random() * 20)+1;

                    for (let i = 0; i < rollVar; i++) {
                        temp2 += Math.floor(Math.random() * 8)+1;
                    }

                    tempX += Math.floor(Math.random() * 4)+1;

                    temp = temp1 + temp2 - 18;

                    if (temp > 0) {
                        spellcardAttackRoll = temp + ` + ` + tempX;
                    } else {
                        spellcardAttackRoll = `d4`;
                    }
                }
            } else {
                if (fatiguePoints != 0) {

                    temp1 = Math.floor(Math.random() * 20)+1;

                    for (let i = 0; i < rollVar; i++) {
                        temp2 += Math.floor(Math.random() * 8)+1;
                    }

                    temp3 = Math.floor(Math.random() * 4)+1;

                    for (let u = 0; u < fatiguePoints; u++) {
                        temp4 += Math.floor(Math.random() * 4)+1;
                    }

                    tempX += Math.floor(Math.random() * 4)+1;
                    
                    temp = temp1 + temp2 + temp3 - temp4 - 18;
                    
                    if (temp > 0) {
                        spellcardAttackRoll = temp + ` + ` + tempX;
                    } else {
                        spellcardAttackRoll = `d4`;
                    }
                } else {

                    console.log(rollVar);

                    temp1 = Math.floor(Math.random() * 20)+1;
                    console.log(temp1);

                    for (let i = 0; i < rollVar; i++) {
                        temp2 += Math.floor(Math.random() * 8)+1;
                    }
                    console.log(temp2);

                    temp3 = Math.floor(Math.random() * 4)+1;

                    console.log(temp3);

                    tempX = Math.floor(Math.random() * 4)+1;

                    console.log(tempX);

                    temp = temp1 + temp2 + temp3 - 18;

                    console.log(temp);

                    if (temp > 0) {
                        spellcardAttackRoll = temp + ` + ` + tempX;
                    } else {
                        spellcardAttackRoll = `d4`;
                    }
                }
            }
        }
        if(chosenstat == "intelligence") {
            let actionValue = actorIntelligence;

            let numDivision = Math.floor(actionValue / 5);
            let rollVar = Math.floor(numDivision / 2);
            
            if (numDivision % 2 == 0) {
                if (fatiguePoints != 0) {
                    temp1 = Math.floor(Math.random() * 20)+1;

                    for (let i = 0; i < rollVar; i++) {
                        temp2 += Math.floor(Math.random() * 8)+1;
                    }

                    for (let u = 0; u < fatiguePoints; u++) {
                        temp4 += Math.floor(Math.random() * 4)+1;
                    }

                    tempX += Math.floor(Math.random() * 4)+1;

                    temp = temp1 + temp2 - temp4 - 18;

                    if (temp > 0) {
                        spellcardAttackRoll = temp + ` + ` + tempX;
                    } else {
                        spellcardAttackRoll = `d4`;
                    }
                } else {
                    temp1 = Math.floor(Math.random() * 20)+1;

                    for (let i = 0; i < rollVar; i++) {
                        temp2 += Math.floor(Math.random() * 8)+1;
                    }

                    tempX += Math.floor(Math.random() * 4)+1;

                    temp = temp1 + temp2 - 18;

                    if (temp > 0) {
                        spellcardAttackRoll = temp + ` + ` + tempX;
                    } else {
                        spellcardAttackRoll = `d4`;
                    }
                }
            } else {
                if (fatiguePoints != 0) {

                    temp1 = Math.floor(Math.random() * 20)+1;

                    for (let i = 0; i < rollVar; i++) {
                        temp2 += Math.floor(Math.random() * 8)+1;
                    }

                    temp3 = Math.floor(Math.random() * 4)+1;

                    for (let u = 0; u < fatiguePoints; u++) {
                        temp4 += Math.floor(Math.random() * 4)+1;
                    }

                    tempX += Math.floor(Math.random() * 4)+1;
                    
                    temp = temp1 + temp2 + temp3 - temp4 - 18;
                    
                    if (temp > 0) {
                        spellcardAttackRoll = temp + ` + ` + tempX;
                    } else {
                        spellcardAttackRoll = `d4`;
                    }
                } else {

                    temp1 = Math.floor(Math.random() * 20)+1;

                    for (let i = 0; i < rollVar; i++) {
                        temp2 += Math.floor(Math.random() * 8)+1;
                    }

                    temp3 = Math.floor(Math.random() * 4)+1;


                    tempX = Math.floor(Math.random() * 4)+1;


                    temp = temp1 + temp2 + temp3 - 18;


                    if (temp > 0) {
                        spellcardAttackRoll = temp + ` + ` + tempX;
                    } else {
                        spellcardAttackRoll = `d4`;
                    }
                }
            }
        }
    }

    let rollResult = 0;

    rollResult = new Roll(spellcardAttackRoll, actorData).roll();

    let messageData = {
        speaker: ChatMessage.getSpeaker(),
        rollResult: rollResult,
        chosenstat: chosenstat,
        name: name,
        type: type,
        img: img,
        actorImg: actorImg,
        plusDanmaku: plusDanmaku,
        plusSoulrattle: plusSoulrattle,
        CanItCrit: CanItCrit,
        toRetrieve: toRetrieve,
        maths: maths
    }

    let htmlContent = await renderTemplate(messageTemplate, messageData);

    let messageData2 = {
        speaker: ChatMessage.getSpeaker(),
        content: htmlContent
    }

    rollResult.toMessage(messageData2);
}

export async function initiativeCheck({
    raceNum = null,
    agilityValue = null,
    perceptionValue = null,
    actorData = null } = {}) {

    let d10 = "d10";

    let agiNum = Math.floor(agilityValue / 10);
    let perNum = Math.floor(perceptionValue / 10)*2;

    const messageTemplate = "systems/touhouvq/templates/chat/initiative-check.html";

    let initCheck = agiNum +  ` + ` + perNum + ` + ` + d10;

    let rollResult = new Roll(initCheck, actorData).roll();

    let messageData = {
        speaker: ChatMessage.getSpeaker(),
        raceNum: raceNum,
        agilityValue: agilityValue,
        perceptionValue: perceptionValue,
        rollResult: rollResult
    }

    let htmlContent = await renderTemplate(messageTemplate, messageData);

    let messageData2 = {
        speaker: ChatMessage.getSpeaker(),
        content: htmlContent
    }

    rollResult.toMessage(messageData2);
}

export async function diceStolen({
    message = null,
    dataset = null,
    faces = 0,
    result = 0,
    actor = null } = {}) {

    let finalscore = dataset.score-result;

    const messageTemplate = "systems/touhouvq/templates/chat/stat-check-stolen.html";

    let data1 = {
        actor: actor,
        finalscore: finalscore,
        rolltype: dataset.type,
        dieFaces: faces,
        actualresult: result,
        bigresult: dataset.bigresult,
        compskillvalue: dataset.skill
    }

    let htmlContent = await renderTemplate(messageTemplate, data1);

    let messageData = {
        flavor: game.i18n.localize("touhouvq.flavorText.earthrabbitStolen3")+actor.data.name,
        speaker: message.data.speaker,
        content: htmlContent
    }

    const messageClass = getDocumentClass("ChatMessage");

    messageClass.create(messageData);
}