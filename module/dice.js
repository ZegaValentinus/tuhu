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
    let bakedanukiValue = 0;
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
    if (locData.raceNum == "bakedanuki") {
        locData.raceName = "Bake-danuki";
        bakedanukiValue = 1;
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
        bakedanukiValue: bakedanukiValue,
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