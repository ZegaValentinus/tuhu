export const touhouvq = {};

touhouvq.raceListing = {
  human: "touhouvq.race.human",
  youkai:"touhouvq.race.youkai",
  ghost:"touhouvq.race.ghost",
  vampire:"touhouvq.race.vampire",
  fairy:"touhouvq.race.fairy",
  crowtengu:"touhouvq.race.crowtengu",
  whitewolftengu:"touhouvq.race.whitewolftengu",
  greattengu:"touhouvq.race.greattengu",
  lunarrabbit:"touhouvq.race.lunarrabbit",
  oni:"touhouvq.race.oni",
  amanojaku:"touhouvq.race.amanojaku",
  inchling:"touhouvq.race.inchling",
  kappa:"touhouvq.race.kappa",
  halfyoukai:"touhouvq.race.halfyoukai",
  celestial:"touhouvq.race.celestial",
  hermit:"touhouvq.race.hermit",
  shinigami:"touhouvq.race.shinigami",
  arahitogami:"touhouvq.race.arahitogami",
  tsukumogami:"touhouvq.race.tsukumogami",
  earthrabbit:"touhouvq.race.earthrabbit",
  yamabiko:"touhouvq.race.yamabiko"
}


touhouvq.defaultLocaList = [
  {id: 'head', crit: true, range: [10]},
  {id: 'heart', crit: true, range: [9]},
  {id: 'torso', range: [6, 7, 8]},
  {id: 'object', range: [5]},
  {id: 'rArm', range: [4]},
  {id: 'lArm', range: [3]},
  {id: 'rLeg', range: [2]},
  {id: 'lLeg', range: [1]}
]

touhouvq.races = {
  human: { 
    locaList: 'useDefault'
  },
  youkai:{
    locaList: [
      {id: 'head', crit: true, range: [10]},
      {id: 'heart', crit: true, range: [9]},
      {id: 'wingsTorso', range: [8]}, 
      {id: 'torso', range: [6, 7]},
      {id: 'object', range: [5]},
      {id: 'rArm', range: [4]},
      {id: 'lArm', range: [3]},
      {id: 'rLeg', range: [2]},
      {id: 'lLeg', range: [1]}
    ]
  },
  ghost: {
    locaList:  [
      {id: 'head', range: [10]},
      {id: 'heart', range: [9]},
      {id: 'torso', range: [6, 7, 8]},
      {id: 'object', range: [5]},
      {id: 'rArm', range: [4]},
      {id: 'lArm', range: [3]},
      {id: 'rLeg', range: [2]},
      {id: 'lLeg', range: [1]}
    ]
  },
  vampire: {
    locaList: [
      {id: 'head', range: [10]},
      {id: 'heart', crit: true, range: [9]},
      {id: 'wings', range: [8]},
      {id: 'torso', range: [6, 7]},
      {id: 'object', range: [5]},
      {id: 'rArm', range: [4]},
      {id: 'lArm', range: [3]},
      {id: 'rLeg', range: [2]},
      {id: 'lLeg', range: [1]}      
    ] 
  },
  fairy: {
    locaList: [
      {id: 'head', crit: true, range: [10]},
      {id: 'heart', range: [9]},
      {id: 'wings', range: [8]},
      {id: 'torso', range: [6, 7]},
      {id: 'object', range: [5]},
      {id: 'rArm', range: [4]},
      {id: 'lArm', range: [3]},
      {id: 'rLeg', range: [2]},
      {id: 'lLeg', range: [1]}
    ]
  },
  crowtengu: {
    locaList: [
      {id: 'head', crit: true, range: [10]},
      {id: 'heart', crit: true, range: [9]},
      {id: 'wings', crit: true, range: [8]},
      {id: 'torso', range: [6, 7]},
      {id: 'object', range: [5]},
      {id: 'rArm', range: [4]},
      {id: 'lArm', range: [3]},
      {id: 'rLeg', range: [2]},
      {id: 'lLeg', range: [1]}
    ]
  },
  whitewolftengu: {
    locaList: 'useDefault'
  },
  greattengu: {
    locaList: [
      {id: 'head', crit: true, range: [10]},
      {id: 'heart', crit: true, range: [9]},
      {id: 'wingsTorso', range: [8]}, 
      {id: 'torso', range: [6, 7]},
      {id: 'object', range: [5]},
      {id: 'rArm', range: [4]},
      {id: 'lArm', range: [3]},
      {id: 'rLeg', range: [2]},
      {id: 'lLeg', range: [1]}
    ]
  },
  lunarrabbit: {
    locaList: 'useDefault'
  },
  oni: {
    locaList: [
      {id: 'head', crit: true, range: [10]},
      {id: 'heart', crit: true, range: [9]},
      {id: 'horns', armor: true, range: [8]},
      {id: 'torso', range: [6, 7]},
      {id: 'object', range: [5]},
      {id: 'rArm', range: [4]},
      {id: 'lArm', range: [3]},
      {id: 'rLeg', range: [2]},
      {id: 'lLeg', range: [1]}
    ]
  },
  amanojaku: {
    locaList: 'useDefault'
  },
  inchling: {
    locaList: 'useDefault'
  },
  kappa: {
    locaList: 'useDefault'
  },
  halfyoukai: {
    locaList: 'useDefault'
  },
  celestial: {
    locaList: [
      {id: 'head', crit: true, range: [10]},
      {id: 'heart', crit: true, range: [9]},
      {id: 'wingsTorso', range: [8]},
      {id: 'torso', range: [6, 7]},
      {id: 'object', range: [5]},
      {id: 'rArm', range: [4]},
      {id: 'lArm', range: [3]},
      {id: 'rLeg', range: [2]},
      {id: 'lLeg', range: [1]}
    ]
  },
  hermit: {
    locaList: 'useDefault'
  },
  shinigami: {
    locaList: 'useDefault'
  },
  arahitogami: {
    locaList: 'useDefault'
  },
  tsukumogami: {
    locaList: [
      {id: 'head', armor: true, range: [10]},
      {id: 'heart', armor: true, range: [9]},
      {id: 'torso', armor: true, range: [6, 7, 8]},
      {id: 'object', crit: true, range: [5]},
      {id: 'rArm', armor: true, range: [4]},
      {id: 'lArm', armor: true, range: [3]},
      {id: 'rLeg', armor: true, range: [2]},
      {id: 'lLeg', armor: true, range: [1]}
    ]
  },
  earthrabbit: {
    locaList: 'useDefault'
  },
  yamabiko: {
    locaList: 'useDefault'
  }
}

touhouvq.stats = {
  strength: "touhouvq.stats.strength",
  agility: "touhouvq.stats.agility",
  resilience: "touhouvq.stats.resilience",
  discipline: "touhouvq.stats.discipline",
  perception: "touhouvq.stats.perception",
  magic: "touhouvq.stats.magic",
  intelligence: "touhouvq.stats.intelligence"
}

touhouvq.sheet = {
  rollStrength: "touhouvq.sheet.rollStrength",
  rollAgility: "touhouvq.sheet.rollAgility",
  rollResilience: "touhouvq.sheet.rollResilience",
  rollDiscipline: "touhouvq.sheet.rollDiscipline",
  rollPerception: "touhouvq.sheet.rollPerception",
  rollMagic: "touhouvq.sheet.rollMagic",
  rollIntelligence: "touhouvq.sheet.rollIntelligence"
}

touhouvq.weaponTypes = {
  melee: "touhouvq.type.melee",
  ranged: "touhouvq.type.ranged"
}

touhouvq.spellcardTypes = {
  sign: "touhouvq.spellcardtype.sign",
  unsealing: "touhouvq.spellcardtype.unsealing",
  thought: "touhouvq.spellcardtype.thought",
  unleash: "touhouvq.spellcardtype.unleash",
  soulrattle: "touhouvq.spellcardtype.soulrattle",
  dreamsigh: "touhouvq.spellcardtype.dreamsigh"
}

touhouvq.rarityTypes = {
  common: "touhouvq.generalRarity.common",
  uncommon: "touhouvq.generalRarity.uncommon",
  rare: "touhouvq.generalRarity.rare",
  singular: "touhouvq.generalRarity.singular",
  unique: "touhouvq.generalRarity.unique",
  youkai: "touhouvq.generalRarity.youkai"
}

touhouvq.textData = {
  weaponTypeText: "touhouvq.itemText.weaponTypeText",
  weaponRarityText: "touhouvq.itemText.rarityText",
  damageText: "touhouvq.itemText.damageText",
  rangedText: "touhouvq.itemText.rangedText",
  rangeThrowingText: "touhouvq.itemText.rangeThrowingText",
  descText: "touhouvq.itemText.descText",
  perkText: "touhouvq.itemText.perkText",
  chosenStat: "touhouvq.itemText.chosenStat",
  spellcardTypeText: "touhouvq.itemText.spellcardTypeText",
  effect: "touhouvq.itemText.effect",
  attack: "touhouvq.sheet.attack",
  XPCostText: "touhouvq.sheet.XPCostText",
  LVRequiredText: "touhouvq.sheet.LVRequiredText",
  armorText: "touhouvq.sheet.armor"
}

touhouvq.spellcardDamageSign = {
  strength: "touhouvq.spellcardDamageSign.strength",
  agility: "touhouvq.spellcardDamageSign.agility",
  resilience: "touhouvq.spellcardDamageSign.resilience",
  discipline: "touhouvq.spellcardDamageSign.discipline",
  perception: "touhouvq.spellcardDamageSign.perception",
  magic: "touhouvq.spellcardDamageSign.magic",
  intelligence: "touhouvq.spellcardDamageSign.intelligence"
}

touhouvq.spellcardDamageUnleash = {
  strength: "touhouvq.spellcardDamageUnleash.strength",
  agility: "touhouvq.spellcardDamageUnleash.agility",
  resilience: "touhouvq.spellcardDamageUnleash.resilience",
  discipline: "touhouvq.spellcardDamageUnleash.discipline",
  perception: "touhouvq.spellcardDamageUnleash.perception",
  magic: "touhouvq.spellcardDamageUnleash.magic",
  intelligence: "touhouvq.spellcardDamageUnleash.intelligence"
}

touhouvq.spellcardDamageUnsealing = {
  unsealing: "touhouvq.spellcardDamageUnsealing.unsealing"
}

touhouvq.spellcardDamageSoulrattle = {
  soulrattle: "touhouvq.spellcardDamageSoulrattle.soulrattle"
}

touhouvq.spellcardDamageThought = {
  alea: "touhouvq.spellcardDamageThought.alea"
}

touhouvq.spellcardDamageDreamsigh = {
  alea: "touhouvq.spellcardDamageDreamsigh.alea"
}

touhouvq.spellcardTextUnsealing = {
  unsealing1: "touhouvq.spellcardTextUnsealing.unsealing1"
}

touhouvq.spellcardTextSoulrattle = {
  soulrattle1: "touhouvq.spellcardTextSoulrattle.soulrattle1"
}

touhouvq.spellcardTextData = {
  sign1: "touhouvq.spellcardTextData.sign1",
  sign2: "touhouvq.spellcardTextData.sign2",
  sign3: "touhouvq.spellcardTextData.sign3",
  sign4: "touhouvq.spellcardTextData.sign4",
  sign5: "touhouvq.spellcardTextData.sign5",
  effectSign1: "touhouvq.spellcardTextData.effectSign1",
  effectSign2: "touhouvq.spellcardTextData.effectSign2",
  effectSign3: "touhouvq.spellcardTextData.effectSign3",
  effectSign4: "touhouvq.spellcardTextData.effectSign4",
  effectSign5: "touhouvq.spellcardTextData.effectSign5",
  thought1: "touhouvq.spellcardTextData.thought1",
  thought2: "touhouvq.spellcardTextData.thought2",
  thought3: "touhouvq.spellcardTextData.thought3",
  thought4: "touhouvq.spellcardTextData.thought4",
  effectThought1: "touhouvq.spellcardTextData.effectThought1",
  effectThought2: "touhouvq.spellcardTextData.effectThought2",
  effectThought3: "touhouvq.spellcardTextData.effectThought3",
  effectThought4: "touhouvq.spellcardTextData.effectThought4",
  unleash1: "touhouvq.spellcardTextData.unleash1",
  unleash2: "touhouvq.spellcardTextData.unleash2",
  unleash3: "touhouvq.spellcardTextData.unleash3",
  unleash4: "touhouvq.spellcardTextData.unleash4",
  effectUnleash1: "touhouvq.spellcardTextData.effectUnleash1",
  effectUnleash2: "touhouvq.spellcardTextData.effectUnleash2",
  effectUnleash3: "touhouvq.spellcardTextData.effectUnleash3",
  effectUnleash4: "touhouvq.spellcardTextData.effectUnleash4",
  effectUnleash5: "touhouvq.spellcardTextData.effectUnleash5",
  dreamsigh1: "touhouvq.spellcardTextData.dreamsigh1",
  dreamsigh2: "touhouvq.spellcardTextData.dreamsigh2",
  dreamsigh3: "touhouvq.spellcardTextData.dreamsigh3",
  dreamsigh4: "touhouvq.spellcardTextData.dreamsigh4",
  effectDreamsigh1: "touhouvq.spellcardTextData.effectDreamsigh1",
  effectDreamsigh2: "touhouvq.spellcardTextData.effectDreamsigh2",
  effectDreamsigh3: "touhouvq.spellcardTextData.effectDreamsigh3",
  effectDreamsigh4: "touhouvq.spellcardTextData.effectDreamsigh4"
}

touhouvq.traitRolls = {
  rollResistance: {stats: ['strength', 'resilience'], traitType: 1},
  rollMelee: {stats: ['strength', 'discipline'], traitType: 2},
  rollIntimidation: {stats: ['strength', 'perception'], traitType: 3},
  rollThrow: {stats: ['agility', 'strength'], traitType: 4},
  rollStealth: {stats: ['agility', 'discipline'], traitType: 5, firingLine: true},
  rollPrecision: {stats: ['agility', 'perception'], traitType: 6},
  rollSleightHand: {stats: ['agility', 'intelligence'], traitType: 7},
  rollMental: {stats: ['resilience', 'perception'], traitType: 8},
  rollMastery: {stats: ['resilience', 'magic'], traitType: 9},
  rollInvestigation: {stats: ['discipline', 'perception'], traitType: 10, firingLine: true},
  rollFaith: {stats: ['discipline', 'magic'], traitType: 11},
  rollTechnology: {stats: ['discipline', 'intelligence'], traitType: 12},
  rollCharisma: {stats: ['perception', 'intelligence'], traitType: 13},
  rollDanmaku: {stats: ['magic', 'intelligence'], traitType: 14}
}

touhouvq.selfhelp = [
  "strength",
  "agility",
  "resilience",
  "discipline",
  "perception",
  "intelligence"
]