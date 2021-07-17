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
        /*item.data.data.damage*/
    };

    let messageData = {
      speaker: ChatMessage.getSpeaker()
    }
    new Roll(rollFormula, rollData).roll().toMessage(messageData);
}

export function StatCheck({
    actionValue = null,
    fatiguePoints = null } = {}) {
    
    let d8 = "d8";
    let d4 = "d4";
    let d20 = "d20";
    
    let numDivision = Math.floor(actionValue / 5);
    
    let rollVar = Math.floor(numDivision / 2);

    let rollResult;

    if (numDivision % 2 == 0) {
        rollResult = d20 + ` + ` + rollVar + d8;
    } else {
        rollResult = d20 + ` + ` + rollVar + d8 + ` + ` + d4;
    }

    if (numDivision % 2 == 0) {
        if (fatiguePoints != 0) {
            rollResult = d20 + ` + ` + rollVar + d8 + ` - ` + fatiguePoints + d8;
        } else {
            rollResult = d20 + ` + ` + rollVar + d8;
        }
    } else {
        if (fatiguePoints != 0) {
            rollResult = d20 + ` + ` + rollVar + d8 + ` + ` + d4 + ` - ` + fatiguePoints + d8;
        } else {
            rollResult = d20 + ` + ` + rollVar + d8 + ` + ` + d4;
        }
    }

    let rollData = {
        actionValue: actionValue
    };

    let messageData = {
      speaker: ChatMessage.getSpeaker()
    }
    new Roll(rollResult, rollData).roll().toMessage(messageData);
}

export function LocCheck({
    raceNum = null,
    actorData = null } = {}) {
    
    let d8 = "d8";
    let d4 = "d4";
    let d20 = "d20";
    
    let numDivision = Math.floor(actionValue / 5);
    
    let rollVar = Math.floor(numDivision / 2);

    let rollResult;

    if (numDivision % 2 == 0) {
        rollResult = d20 + ` + ` + rollVar + d8;
    } else {
        rollResult = d20 + ` + ` + rollVar + d8 + ` + ` + d4;
    }

    if (numDivision % 2 == 0) {
        if (fatiguePoints != 0) {
            rollResult = d20 + ` + ` + rollVar + d8 + ` - ` + fatiguePoints + d8;
        } else {
            rollResult = d20 + ` + ` + rollVar + d8;
        }
    } else {
        if (fatiguePoints != 0) {
            rollResult = d20 + ` + ` + rollVar + d8 + ` + ` + d4 + ` - ` + fatiguePoints + d8;
        } else {
            rollResult = d20 + ` + ` + rollVar + d8 + ` + ` + d4;
        }
    }

    let rollData = {
        actionValue: actionValue
    };

    let messageData = {
      speaker: ChatMessage.getSpeaker()
    }
    new Roll(rollResult, rollData).roll().toMessage(messageData);
}

export function TraitCheck({
    StrengthStats = null,
    AgilityStats = null,
    ResilienceStats = null,
    DisciplineStats = null,
    PerceptionStats = null,
    MagicStats = null,
    IntelligenceStats = null,
    traitType = null,
    fatiguePoints = null } = {}) {
    
    let d4 = "d4";
    let d20 = "d20";

    let rollResult;

    let stat1;
    let stat2;

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

    numDivision -= 1;

    rollResult = d20 + ` + ` + numDivision + d4;

    let rollData = {
        stat1: stat1,
        stat2: stat2,
        traitType: traitType
    };

    let messageData = {
        speaker: ChatMessage.getSpeaker()
    }
    new Roll(rollResult, rollData).roll().toMessage(messageData);
}

export function DeathCheck(actorData) {
    /*
    const messageTemplate = "systems/touhouvq/templates/chat/death-check.html";
    const rollFormula = "1d20";
    let rollResult = new Roll(rollFormula, actorData).roll();
    let renderedRoll = await rollResult.render({ template: messageTemplate });
    
    let messageData = {
        speaker: ChatMessage.getSpeaker(),
        content: renderedRoll
    }

    rollResult.toMessage(messageData);
    */
}