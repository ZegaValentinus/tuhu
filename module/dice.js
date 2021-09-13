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
    actorData = null } = {}) {
    
    let d8 = "d8";
    let d6 = "d6";
    let d4 = "d4";
    let d20 = "d20";
    
    let numDivision = Math.floor(actionValue / 5);
    
    let rollVar = Math.floor(numDivision / 2);

    let rollResult;

    //Check if character have the frolic skill
    let frolicValue = 0;
    if(actorData.data.data.race === "earthrabbit") {
        console.log("Tu es un lapin de la Terre !");
        if(actorData.isOwner) {
            console.log("Tu es l'owner de la fiche !");
            frolicValue = 1;
        }
    }

    const messageTemplate = "systems/touhouvq/templates/chat/stat-check-" + statType + ".html";

    if (numDivision % 2 == 0) {
        rollResult = d20 + ` + ` + rollVar + d8;
    } else {
        rollResult = d20 + ` + ` + rollVar + d8 + ` + ` + d4;
    }

    if (numDivision % 2 == 0) {
        if (fatiguePoints != 0) {

            const rollResult1 = d20 + ` + ` + rollVar + d8 + ` - ` + fatiguePoints + d4;
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
                actorID: actorData.data._id,
                race: actorData.data.data.race,
                frolicValue: frolicValue
            }
        
            let htmlContent = await renderTemplate(messageTemplate, messageData);
        
            let messageData2 = {
                speaker: ChatMessage.getSpeaker(),
                content: htmlContent
            }
        
            rollResult.toMessage(messageData2);

        } else {

            const rollResult1 = d20 + ` + ` + rollVar + d8;
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
                actorID: actorData.data._id,
                race: actorData.data.data.race,
                frolicValue: frolicValue
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

            const rollResult1 = d20 + ` + ` + rollVar + d8 + ` + ` + d4 + ` - ` + fatiguePoints + d4;
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
                actorID: actorData.data._id,
                race: actorData.data.data.race,
                frolicValue: frolicValue
            }
        
            let htmlContent = await renderTemplate(messageTemplate, messageData);
        
            let messageData2 = {
                speaker: ChatMessage.getSpeaker(),
                content: htmlContent
            }
        
            rollResult.toMessage(messageData2);

        } else {

            const rollResult1 = d20 + ` + ` + rollVar + d8 + ` + ` + d4;
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
                actorID: actorData.data._id,
                race: actorData.data.data.race,
                frolicValue: frolicValue
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

export async function LocCheck(locData) {
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
    
    if (locData.raceNum == "human") {
        locData.raceName = "Humain";
        humanValue = 1;
    }
    if (locData.raceNum == "youkai") {
        locData.raceName = "Youkai";
        youkaiValue = 1;
    }
    if (locData.raceNum == "ghost") {
        locData.raceName = "Fantôme";
        ghostValue = 1;
    }
    if (locData.raceNum == "vampire") {
        locData.raceName = "Vampire";
        vampireValue = 1;
    }
    if (locData.raceNum == "fairy") {
        locData.raceName = "Fée";
        fairyValue = 1;
    }
    if (locData.raceNum == "crowtengu") {
        locData.raceName = "Tengu Corbeau";
        crowtenguValue = 1;
    }
    if (locData.raceNum == "whitewolftengu") {
        locData.raceName = "Tengu Loup Blanc";
        whitewolftenguValue = 1;
    }
    if (locData.raceNum == "greattengu") {
        locData.raceName = "Grand Tengu";
        greattenguValue = 1;
    }
    if (locData.raceNum == "lunarrabbit") {
        locData.raceName = "Lapin Lunaire";
        lunarrabbitValue = 1;
    }
    if (locData.raceNum == "oni") {
        locData.raceName = "Oni";
        oniValue = 1;
    }
    if (locData.raceNum == "amanojaku") {
        locData.raceName = "Amanojaku";
        amanojakuValue = 1;
    }
    if (locData.raceNum == "inchling") {
        locData.raceName = "Kobito";
        inchlingValue = 1;
    }
    if (locData.raceNum == "kappa") {
        locData.raceName = "Kappa";
        kappaValue = 1;
    }
    if (locData.raceNum == "halfyoukai") {
        locData.raceName = "Demi-Youkai";
        halfyoukaiValue = 1;
    }
    if (locData.raceNum == "celestial") {
        locData.raceName = "Céleste";
        celestialValue = 1;
    }
    if (locData.raceNum == "hermit") {
        locData.raceName = "Ermite";
        hermitValue = 1;
    }
    if (locData.raceNum == "shinigami") {
        locData.raceName = "Shinigami";
        shinigamiValue = 1;
    }
    if (locData.raceNum == "arahitogami") {
        locData.raceName = "Arahitogami";
        arahitogamiValue = 1;
    }
    if (locData.raceNum == "tsukumogami") {
        locData.raceName = "Tsukumogami";
        tsukumogamiValue = 1;
    }
    if (locData.raceNum == "earthrabbit") {
        locData.raceName = "Lapin de la Terre";
        earthrabbitValue = 1;
    }
    if (locData.raceNum == "yamabiko") {
        locData.raceName = "Yamabiko";
        yamabikoValue = 1;
    }

    let rollResult = Math.floor(Math.random() * 10)+1;
    let theActor = locData.actorData;
    let theNum = locData.raceNum;

    let one = 0;
    let two = 0;
    let three = 0;
    let four = 0;
    let five = 0;
    let six = 0;
    let seven = 0;
    let eight = 0;
    let nine = 0;
    let ten = 0;

    if (rollResult == 1) {
        one = 1;
    }
    if (rollResult == 2) {
        two = 1;
    }
    if (rollResult == 3) {
        three = 1;
    }
    if (rollResult == 4) {
        four = 1;
    }
    if (rollResult == 5) {
        five = 1;
    }
    if (rollResult == 6) {
        six = 1;
    }
    if (rollResult == 7) {
        seven = 1;
    }
    if (rollResult == 8) {
        eight = 1;
    }
    if (rollResult == 9) {
        nine = 1;
    }
    if (rollResult == 10) {
        ten = 1;
    }

    let data = {
        raceName: raceName,
        raceNum: theNum,
        rollResult: rollResult,
        theActor: theActor,
        one: one,
        two: two,
        three: three,
        four: four,
        five: five,
        six: six,
        seven: seven,
        eight: eight,
        nine: nine,
        ten: ten,
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
    };

    const html = await renderTemplate(messageTemplate, data);

    const messageData = {
        speaker: ChatMessage.getSpeaker(),
        content: html
    }

    const messageClass = getDocumentClass("ChatMessage");

    messageClass.create(messageData);
}

export async function TraitCheck({
    StrengthStats = null,
    AgilityStats = null,
    ResilienceStats = null,
    DisciplineStats = null,
    PerceptionStats = null,
    MagicStats = null,
    IntelligenceStats = null,
    traitType = null,
    fatiguePoints = null,
    actorData = null } = {}) {
    
    let d4 = "d4";
    let d6 = "d6";
    let d20 = "d20";
    
    let stat1;
    let stat2;

    /* active effects vars */

    //Lunar Rabbit's "firingline"
    let activeFiringline = 0;
    let firinglinebuff = 0;

    if (traitType == 1) {
        stat1 = StrengthStats;
        stat2 = ResilienceStats;
    }
    if (traitType == 2) {
        stat1 = StrengthStats;
        stat2 = DisciplineStats;
    }
    if (traitType == 3) {
        stat1 = StrengthStats;
        stat2 = PerceptionStats;
    }
    if (traitType == 4) {
        stat1 = AgilityStats;
        stat2 = StrengthStats;
    }
    if (traitType == 5) {
        //Check if lunar rabbit using firingline : here, we are just putting a mark for later : for buffed check
        activeFiringline = 1;

        stat1 = AgilityStats;
        stat2 = DisciplineStats;
    }
    if (traitType == 6) {
        stat1 = AgilityStats;
        stat2 = PerceptionStats;
    }
    if (traitType == 7) {
        stat1 = AgilityStats;
        stat2 = IntelligenceStats;
    }
    if (traitType == 8) {
        stat1 = ResilienceStats;
        stat2 = PerceptionStats;
    }
    if (traitType == 9) {
        stat1 = ResilienceStats;
        stat2 = MagicStats;
    }
    if (traitType == 10) {
        //Check if lunar rabbit using firingline : here, we are just putting a mark for later : for buffed check
        activeFiringline = 1;

        stat1 = DisciplineStats;
        stat2 = PerceptionStats;
    }
    if (traitType == 11) {
        stat1 = DisciplineStats;
        stat2 = MagicStats;
    }
    if (traitType == 12) {
        stat1 = DisciplineStats;
        stat2 = IntelligenceStats;
    }
    if (traitType == 13) {
        stat1 = PerceptionStats;
        stat2 = IntelligenceStats;
    }
    if (traitType == 14) {
        stat1 = MagicStats;
        stat2 = IntelligenceStats;
    }
    
    let addiNum = stat1 + stat2;

    let numDivision = Math.floor(addiNum / 10);

    //Check if lunar rabbit under firing line active effect
    let actualStatLunarRabbit = Math.floor(DisciplineStats / 10);

    if(actorData.isOwner) {
        let firingline = actorData.effects.filter(effect => effect.data.label === game.i18n.localize("touhouvq.namesRaceSkill.firingline"))[0];
        if(firingline) {
            if(activeFiringline === 1) {
                //Now, our character is a lunar rabbit, under the firing line active effect, and using a buffed check
                console.log("Using firing line !");
                activeFiringline = 2;
            }
        }
    }

    const messageTemplate = "systems/touhouvq/templates/chat/task-check-" + traitType + ".html";

    if (fatiguePoints == null || fatiguePoints == 0) {

        let rollResult1 = 0;

        if(activeFiringline === 2) {
            //Check is Lunar rabbit is under firing line buff and using buffed stats
            firinglinebuff = actualStatLunarRabbit + d4;
            rollResult1 = d20 + ` + ` + numDivision + d4 + ` + ` + firinglinebuff;
        } else {
            //Normal trait check
            rollResult1 = d20 + ` + ` + numDivision + d4;
        }

        let rollResult = new Roll(rollResult1, actorData).roll();

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
            firinglinebuff: firinglinebuff
        }

        let htmlContent = await renderTemplate(messageTemplate, messageData);

        let messageData2 = {
            speaker: ChatMessage.getSpeaker(),
            content: htmlContent
        }

        rollResult.toMessage(messageData2);
    } else {

        let rollResult1 = 0;

        if(activeFiringline === 2) {
            //Check is Lunar rabbit is under firing line buff and using buffed stats
            firinglinebuff = actualStatLunarRabbit + d4;
            rollResult1 = d20 + ` + ` + numDivision + d4 + ` + ` + firinglinebuff + d4 + ` - ` + fatiguePoints + d6;
        } else {
            //Normal trait check
            rollResult1 = d20 + ` + ` + numDivision + d4 + ` - ` + fatiguePoints + d6;
        }

        let rollResult = new Roll(rollResult1, actorData).roll();

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
            firinglinebuff: firinglinebuff
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

    /*
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
    */
}