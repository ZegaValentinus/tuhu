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
    let bakedanukiValue = 0;
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
    if (bodyData.raceNum == "bakedanuki") {
        raceName = "Bake-danuki";
        bakedanukiValue = 1;
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
        bakedanukiValue: bakedanukiValue,
        yamabikoValue: yamabikoValue
    }

    const html = await renderTemplate(messageTemplate, data);

    const actorActual = bodyData.actorData;

    let actor = game.actors.get(actorActual.id);

    console.log(actor);

    const messageData = {
        speaker: ChatMessage.getSpeaker(),
        content: html,
        user: game.user.id,
        whisper: game.users.filter(user => actor.hasPerm(user, "OWNER"))
    }

    const messageClass = getDocumentClass("ChatMessage");

    messageClass.create(messageData);
}