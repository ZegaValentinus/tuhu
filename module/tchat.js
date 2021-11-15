export async function BodyLoc(bodyData) {
    const lotgEffect = bodyData.actorData.effects.filter( effect => effect.data.label === game.i18n.localize("touhouvq.namesRaceSkill.lawofthegods"))[0];
    const race = lotgEffect ? lotgEffect.data.flags.touhouvq : CONFIG.touhouvq.races[bodyData.raceNum];

    const template = "systems/touhouvq/templates/partials/tchat-card.html";
  
    //todo : use function getLocaClasses(loca, hit = false)
      const templateData = {
        raceNum: bodyData.raceNum,
        raceName: game.i18n.localize(`touhouvq.race.${bodyData.raceNum}`),
        localist: race.locaList.map( loca => {
          let classes = loca.crit === true ? 'crit-no-bold' : ''; 
          classes = `${classes} ${loca.armor === true ? 'armor' : ''}`; 
          return {
            cssClasses: classes,
            name: game.i18n.localize(`touhouvq.loca.${loca.id}`)
          }
        })
      }
  
      const html = await renderTemplate(template, templateData);
  
      const messageData = {
          speaker: ChatMessage.getSpeaker({
            alias:game.user.name
        }),
          content: html,
          user: game.user.id,
          whisper: [game.user.id]
      };
  
      ChatMessage.create(messageData);
  }

export async function itemShow({
    itemData = null } = {}) {

    const messageTemplate = "systems/touhouvq/templates/partials/object-card.html";
    const html = await renderTemplate(messageTemplate, itemData);

    let messageData = {
        speaker: ChatMessage.getSpeaker({
            alias:game.user.name
        }),
        content: html,
        rarity: itemData.rarity
    }

    const messageClass = getDocumentClass("ChatMessage");

    messageClass.create(messageData);
}

export async function itemShowMore({
    itemData = null } = {}) {

    let messageTemplate = null;

    if(itemData.data.type === "armor") {
        messageTemplate = "systems/touhouvq/templates/partials/object-card-more.html";
    } else {
        messageTemplate = "systems/touhouvq/templates/partials/weapon-card-more.html";
    }
    
    const html = await renderTemplate(messageTemplate, itemData);

    let messageData = {
        speaker: ChatMessage.getSpeaker({
            alias:game.user.name
        }),
        content: html,
        rarity: itemData.rarity
    }

    const messageClass = getDocumentClass("ChatMessage");

    messageClass.create(messageData);
}

export async function armorBreakCheck({
    itemData = null,
    actorData = null } = {}) {

    let messageTemplate = "systems/touhouvq/templates/partials/destruction-card.html";
    const rollFormula = "d20";
    let rollResult = new Roll(rollFormula, actorData).roll();
    let renderedRoll = await rollResult.render({ template: messageTemplate });

    let messageData = {
        speaker: ChatMessage.getSpeaker({
            alias:game.user.name
        }),
        content: renderedRoll,
        rarity: itemData.rarity
    }

    const messageClass = getDocumentClass("ChatMessage");

    rollResult.toMessage(messageData);
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
        speaker: ChatMessage.getSpeaker({
            alias:game.user.name
        }),
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
        speaker: ChatMessage.getSpeaker({
            alias:game.user.name
        }),
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
        speaker: ChatMessage.getSpeaker({
            alias:game.user.name
        }),
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
            speaker: ChatMessage.getSpeaker({
            alias:game.user.name
        }),
            rollResult: rollResult,
            data: data,
            actor: actor,
            d4result: d4result
        }
    
        let htmlContent = await renderTemplate(messageTemplate, messageData);

        let messageData2 = {
            speaker: ChatMessage.getSpeaker({
            alias:game.user.name
        }),
            content: htmlContent
        }
    
        rollResult.toMessage(messageData2);
    }
    if (data.race == "youkai") {

        const messageTemplate = "systems/touhouvq/templates/partials/tchat-skillcard.html";

        const messageData = {
            data: data,
            race: data.race,
            actor: actor,
            user: game.user.id,
            whisper: [game.user.id]
        }

        const html = await renderTemplate(messageTemplate, messageData);

        const messageData2 = {
            speaker: ChatMessage.getSpeaker({
            alias:game.user.name
        }),
            content: html,
            user: game.user.id,
            whisper: [game.user.id]
        }

        const messageClass = getDocumentClass("ChatMessage");
    
        messageClass.create(messageData2);
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
                speaker: ChatMessage.getSpeaker({
            alias:game.user.name
        }),
                rollResult: rollResult,
                data: data
            }
            
            let htmlContent = await renderTemplate(messageTemplate, messageData);
            
            let messageData2 = {
                speaker: ChatMessage.getSpeaker({
            alias:game.user.name
        }),
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
                        speaker: ChatMessage.getSpeaker({
            alias:game.user.name
        }),
                        rollResult: rollResult,
                        actionValue: actionValue,
                        fatiguePoints: fatiguePoints,
                        race: data.race,
                        rolls: rolls
                    }
                
                    const messageTemplate = "systems/touhouvq/templates/partials/tchat-skillcard.html";
                
                    let htmlContent = await renderTemplate(messageTemplate, messageData);
                
                    let messageData2 = {
                        speaker: ChatMessage.getSpeaker({
            alias:game.user.name
        }),
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
                        speaker: ChatMessage.getSpeaker({
            alias:game.user.name
        }),
                        rollResult: rollResult,
                        actionValue: actionValue,
                        fatiguePoints: fatiguePoints,
                        race: data.race,
                        rolls: rolls
                    }
                
                    const messageTemplate = "systems/touhouvq/templates/partials/tchat-skillcard.html";
                
                    let htmlContent = await renderTemplate(messageTemplate, messageData);
                
                    let messageData2 = {
                        speaker: ChatMessage.getSpeaker({
            alias:game.user.name
        }),
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
                        speaker: ChatMessage.getSpeaker({
            alias:game.user.name
        }),
                        rollResult: rollResult,
                        actionValue: actionValue,
                        fatiguePoints: fatiguePoints,
                        race: data.race,
                        rolls: rolls
                    }
                
                    const messageTemplate = "systems/touhouvq/templates/partials/tchat-skillcard.html";
                
                    let htmlContent = await renderTemplate(messageTemplate, messageData);
                
                    let messageData2 = {
                        speaker: ChatMessage.getSpeaker({
            alias:game.user.name
        }),
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
                        speaker: ChatMessage.getSpeaker({
            alias:game.user.name
        }),
                        rollResult: rollResult,
                        actionValue: actionValue,
                        fatiguePoints: fatiguePoints,
                        race: data.race,
                        rolls: rolls
                    }
    
                    const messageTemplate = "systems/touhouvq/templates/partials/tchat-skillcard.html";
                
                    let htmlContent = await renderTemplate(messageTemplate, messageData);
                
                    let messageData2 = {
                        speaker: ChatMessage.getSpeaker({
            alias:game.user.name
        }),
                        content: htmlContent
                    }
                
                    rollResult.toMessage(messageData2);
                }
            }
        }

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
                icon: "systems/touhouvq/assets/img/talentsandskills/"+actor.data.data.race+"/firingline.webp"
              };
              firingline = await ActiveEffect.create(effectData, {parent: actor});
            }
        }

        const messageDataLR = {
            speaker: ChatMessage.getSpeaker({
            alias:game.user.name
        }),
            content: html,
            user: game.user.id
        }

        const messageClassLR = getDocumentClass("ChatMessage");
    
        messageClassLR.create(messageDataLR);
    }
    if (data.race == "tsukumogami") {
        if (data.choice === "1") {
            let rollResult = new Roll(d4, actor).roll();
        
            let messageData = {
                speaker: ChatMessage.getSpeaker({
            alias:game.user.name
        }),
                rollResult: rollResult,
                data: data,
                choice: data.choice
            }
        
            let htmlContent = await renderTemplate(messageTemplate, messageData);
    
            let messageData2 = {
                speaker: ChatMessage.getSpeaker({
            alias:game.user.name
        }),
                content: htmlContent
            }
        
            rollResult.toMessage(messageData2);
        } else {
            if (data.choice === "2") {
                let toRoll = d4 + ` + 1`;
                
                let rollResult = new Roll(toRoll, actor).roll();
        
                let messageData = {
                    speaker: ChatMessage.getSpeaker({
            alias:game.user.name
        }),
                    rollResult: rollResult,
                    data: data,
                    choice: data.choice
                }
            
                let htmlContent = await renderTemplate(messageTemplate, messageData);
        
                let messageData2 = {
                    speaker: ChatMessage.getSpeaker({
            alias:game.user.name
        }),
                    content: htmlContent
                }
            
                rollResult.toMessage(messageData2);
            } else {
                const messageTemplate = "systems/touhouvq/templates/partials/tchat-skillcard.html";
                const html = await renderTemplate(messageTemplate, data);
        
                const messageData = {
                    speaker: ChatMessage.getSpeaker({
            alias:game.user.name
        }),
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
}

export async function displayBuff(buff) {
    
    const messageTemplate = "systems/touhouvq/templates/partials/effectbuff-card.html";
    const html = await renderTemplate(messageTemplate, buff);

    let messageData = {
        speaker: ChatMessage.getSpeaker({
            alias:game.user.name
        }),
        content: html
    }

    const messageClass = getDocumentClass("ChatMessage");

    messageClass.create(messageData);
}

export async function displayDebuff(debuff) {

    const messageTemplate = "systems/touhouvq/templates/partials/effectdebuff-card.html";
    const html = await renderTemplate(messageTemplate, debuff);

    let messageData = {
        speaker: ChatMessage.getSpeaker({
            alias:game.user.name
        }),
        content: html
    }

    const messageClass = getDocumentClass("ChatMessage");

    messageClass.create(messageData);
}

export async function applyBuff(buff, actor) {

    let applyTheBuff = actor.effects.filter(effect => effect.data.label === game.i18n.localize("touhouvq.statusEffectsBuffs."+buff))[0];

    if(applyTheBuff){return;}

    let theBuff = {
        label:game.i18n.localize("touhouvq.statusEffectsBuffs."+buff),
        icon: "systems/touhouvq/assets/img/effects/"+buff+".svg",
        changes:[]
    };

    switch (buff) {
        case 'hardskin':
            theBuff.changes.push({
                key: `data.defense.value`,
                mode: CONST.ACTIVE_EFFECT_MODES.ADD,
                value: 1
            });
            break;
        case 'magebarrier':
            theBuff.changes.push({
                key: `data.defense.value`,
                mode: CONST.ACTIVE_EFFECT_MODES.ADD,
                value: 2
            });
            break;
        case 'onibreastplate':
            theBuff.changes.push({
                key: `data.defense.value`,
                mode: CONST.ACTIVE_EFFECT_MODES.ADD,
                value: 3
            });
            break;
        default:
    }

    applyTheBuff = ActiveEffect.create(theBuff, {parent: actor});
}

export async function applyDebuff(debuff, actor) {

    let applyTheDebuff = actor.effects.filter(effect => effect.data.label === game.i18n.localize("touhouvq.statusEffectsDebuffs."+debuff))[0];

    if(applyTheDebuff){return;}

    let effectData = {
        label:game.i18n.localize("touhouvq.statusEffectsDebuffs."+debuff),
        icon: "systems/touhouvq/assets/img/effects/"+debuff+".svg",
        changes:[]
    };

    switch (debuff) {
        case 'overwhelmed':
            effectData.changes.push({
                key: `data.defense.value`,
                mode: CONST.ACTIVE_EFFECT_MODES.DOWNGRADE,
                value: "1"
            });
            break;
        case 'blind':
            
            break;
        case 'silenced':
        
            break;
        case 'drunk':
    
            break;
        case 'deaddrunk':

            break;
        default:
    }

    applyTheDebuff = ActiveEffect.create(effectData, {parent: actor});
}

export async function applyAlcohol(alcoholEffect, actor) {

    let applyTheEffect = actor.effects.filter(effect => effect.data.label === game.i18n.localize("touhouvq.alcoholEffects."+alcoholEffect))[0];

    if(applyTheEffect){return;}

    let effectData = {
        label:game.i18n.localize("touhouvq.alcoholEffects."+alcoholEffect),
        icon: "systems/touhouvq/assets/img/effects/drunk.svg",
        changes:[]
    };

    switch (alcoholEffect) {
        case 'perched':
            const downgrade = Math.floor(Math.random() * 7)+1;
            const stat = CONFIG.touhouvq.simpleStats[downgrade-1];

            effectData.changes.push({
                key: `data.stats.${stat}`,
                mode: CONST.ACTIVE_EFFECT_MODES.DOWNGRADE,
                value: "0"
            });
            break;
        case 'forgedinfire':
            
            break;
        default:
    }

    applyTheEffect = ActiveEffect.create(effectData, {parent: actor});
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
                speaker: ChatMessage.getSpeaker({
            alias:game.user.name
        }),
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
                speaker: ChatMessage.getSpeaker({
            alias:game.user.name
        }),
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
                speaker: ChatMessage.getSpeaker({
            alias:game.user.name
        }),
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
                speaker: ChatMessage.getSpeaker({
            alias:game.user.name
        }),
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
                speaker: ChatMessage.getSpeaker({
            alias:game.user.name
        }),
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
                speaker: ChatMessage.getSpeaker({
            alias:game.user.name
        }),
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
                speaker: ChatMessage.getSpeaker({
            alias:game.user.name
        }),
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
                speaker: ChatMessage.getSpeaker({
            alias:game.user.name
        }),
                content: htmlContent
            }
        
            rollResult.toMessage(messageData2);

        }
    }
}

export function onSocketReceived(data) {
    if(!game.user.isGM) {
        return;
    }

    if(data.action === "manifestationofnature") {
        const effectData = {
            label:game.i18n.localize("touhouvq.namesRaceSkill.manifestationofnature"),
            icon: "systems/touhouvq/assets/img/talentsandskills/fairy/manifestationofnature.webp"
        };
        let targetedActor = game.actors.get(data.actorId);
        ActiveEffect.create(effectData, {parent: targetedActor});
    }

    if(data.action === "diceStolen") {
        const message = game.messages.get(data.messageID);
        message.setFlag("touhouvq","diceStolen",true);
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