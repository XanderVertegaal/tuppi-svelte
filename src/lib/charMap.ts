import { type FullCharacter, type Cuneiform, SignVariantCategory, FontSet, type CharProps, type Determiner, type Logogram } from "./types";

export const CHARMAP = {
  a: '𒀀',
  e: '𒂊',
  i: '𒄿',
  u: '𒌋',
  ú: '𒌑',

  ba: '𒁀',
  be: '𒁉',
  bi: '𒁉',
  bu: '𒁍',

  pa: '𒉺',
  pá: '𒁀',
  pé: '𒁉',
  pí: '𒁉',
  pu: '𒁍',

  da: '𒁕',
  dá: '𒋫',
  de: '𒁲',
  de4: '𒋼',
  di: '𒁲',
  dì: '𒋾',
  du: '𒁺',
  dú: '𒌅',

  ta: '𒋫',
  tá: '𒁕',
  te: '𒋼',
  ti: '𒋾',
  ti4: '𒁲',
  ti7: '𒋼',
  tu: '𒌅',
  tù: '𒁺',
  tu4: '𒌈',

  ga: '𒂵',
  ga5: '𒋡',
  ge: '𒄀',
  ge5: '𒆠',
  gi: '𒄀',
  gi5: '𒆠',
  gu: '𒄖',
  gu5: '𒆪',

  ka: '𒅗',
  ka4: '𒋡',
  ke: '𒆠',
  ki: '𒆠',
  ku: '𒆪',

  qa: '𒋡',

  ḫa: '𒄩',
  ḫe: '𒄭',
  ḫé: '𒃶',
  ḫi: '𒄭',
  ḫí: '𒃶',
  ḫu: '𒄷',

  ra: '𒊏',
  re: '𒊑',
  ri: '𒊑',
  ru: '𒊒',

  la: '𒆷',
  le: '𒇷',
  li: '𒇷',
  lì: '𒅆',
  li12: '𒇺',
  lu: '𒁳',

  ma: '𒈠',
  me: '𒈨',
  mé: '𒈪',
  mi: '𒈪',
  mu: '𒈬',

  na: '𒈾',
  ne: '𒉈',
  né: '𒉌',
  ni: '𒉌',
  ni5: '𒉈',
  nu: '𒉡',

  i̯a: '𒅀',

  u̯a: '𒉿',
  u̯i5: '𒃾',

  ša: '𒊭',
  šá: '𒃻',
  še: '𒊺',
  šé: '𒋛',
  še20: '𒅆',
  ši: '𒅆',
  ší: '𒋛',
  šu: '𒋗',
  šú: '𒋙',

  za: '𒍝',
  ze: '𒍣',
  zé: '𒍢',
  zi: '𒍣',
  zí: '𒍢',
  zu: '𒍪',

  ab: '𒀊',
  eb: '𒅁',
  ib: '𒅁',
  ub: '𒌒',

  ap: '𒀊',
  ep: '𒅁',
  ip: '𒅁',
  up: '𒌒',

  ad: '𒀜',
  ed: '𒀉',
  id: '𒀉',
  ud: '𒌓',

  at: '𒀜',
  et: '𒀉',
  it: '𒀉',
  ut: '𒌓',

  ag: '𒀝',
  eg: '𒅅',
  ig: '𒅅',
  ug: '𒊌',

  ak: '𒀝',
  ek: '𒅅',
  ik: '𒅅',
  uk: '𒊌',

  aq: '𒀝',
  eq: '𒅅',
  iq: '𒅅',
  uq: '𒊌',

  aḫ: '𒄴',
  eḫ: '𒄴',
  iḫ: '𒄴',
  uḫ: '𒄴',

  ar: '𒅈',
  er: '𒅕',
  ir: '𒅕',
  ur: '𒌨',
  úr: '𒌫',

  al: '𒀠',
  el: '𒂖',
  él: '𒅋',
  il: '𒅋',
  il5: '𒂖',
  ul: '𒌌',

  am: '𒄠',
  em: '𒅎',
  im: '𒅎',
  um: '𒌝',

  an: '𒀭',
  en: '𒂗',
  en6: '𒅔',
  in: '𒅔',
  un: '𒌦',

  aš: '𒀸',
  eš: '𒌍',
  iš: '𒅖',
  ìš: '𒌍',
  uš: '𒍑',

  az: '𒊍',
  ez: '𒄑',
  iz: '𒄑',
  uz: '𒊻',
} as const;

export class Character implements FullCharacter {
  id: number;
  cuneiform: Cuneiform;
  syllabograph: string[];
  logograph: Logogram[];
  determiner: Determiner[];
  
  constructor(props: CharProps) {
    this.id = props.id;
    this.syllabograph = props.syllabograph || [];
    this.logograph = props.logograph || [];
    this.determiner = props.determiner || [];
    this.cuneiform = {
      unicode: props.cuneiform.unicode,
      variants: []
    };

    props.cuneiform.variants.forEach((variant) => {
      this.cuneiform.variants.push({
        category: variant.category ?? SignVariantCategory.DEFAULT,
        fontset: variant.fontset ?? FontSet.ULLIKUMMI_A,
        components: {
          vertical: variant.components?.vertical ?? 0,
          horizontal: variant.components?.horizontal ?? 0,
          glossenkeil: variant.components?.glossenkeil ?? 0,
          diagonalAsc: variant.components?.diagonalAsc ?? 0,
          diagonalDesc: variant.components?.diagonalDesc ?? 0,
        }
      });
    }) 
  }
}

export const complexCharacters: Character[] = [
  new Character({
    id: 1,
    syllabograph: ['aš'],
    logograph: [
      {
        logTransliteration: 'AŠ',
        logTranslation: '???'
      }
    ],
    cuneiform: {
      unicode: '12038',
      variants: [
        {
          components: {
            horizontal: 1
          }
        }
      ]
    }
  }),

  new Character({
    id: 2,
    syllabograph: ['ḫal'],
    logograph: [{
      logTranslation: '???',
      logTransliteration: 'ḪAL'
    }],
    cuneiform: {
      unicode: '1212C',
      variants: [{
        components: {
          horizontal: 2,
        }
      }]
    }
  }),

  new Character({
    id: 3,
    logograph: [{
      logTranslation: '???',
      logTransliteration: 'PÉŠ'
    }],
    cuneiform: {
      unicode: '1227E',
      variants: [{
        components: {
          horizontal: 5,
          vertical: 5,
          glossenkeil: 2,
          diagonalAsc: 1,
          diagonalDesc: 1
        }
      }]
    }
  }),

  new Character({
    id: 4,
    syllabograph: ['bal', 'pal'],
    logograph: [{
      logTranslation: 'sacrifice',
      logTransliteration: 'BAL'
    }],
    cuneiform: {
      unicode: '12044',
      variants: [{
        components: {
          horizontal: 3,
          vertical: 1,
          glossenkeil: 3
        }
      }]
    }
  }),

  new Character({
    id: 5,
    syllabograph: ['šir'],
    logograph: [{
      logTranslation: '???',
      logTransliteration: 'NU11'
    }, {
      logTranslation: '???',
      logTransliteration: 'SIR12'
    }, {
      logTranslation: 'testicle',
      logTransliteration: 'ŠIR'
    }],
    cuneiform: {
      unicode: '122D3',
      variants: [{
        components: {
          horizontal: 7,
          diagonalAsc: 1,
          diagonalDesc: 1
        }
      }]
    }
  }),

  new Character({
    id: 6,
    logograph: [{
      logTranslation: '???',
      logTransliteration: 'GÍR'
    }, {
      logTranslation: '???',
      logTransliteration: 'UL4'
    }],
    cuneiform: {
      unicode: '12108',
      variants: [{
        category: SignVariantCategory.DEFAULT,
        fontset: FontSet.ULLIKUMMI_A,
        components: {
          horizontal: 2,
          vertical: 3,
          diagonalAsc: 1,
          diagonalDesc: 1
        }
      }, {
        category: SignVariantCategory.LATE,
        fontset: FontSet.ULLIKUMMI_B,
        components: {
          horizontal: 2,
          vertical: 3,
          diagonalDesc: 2
        }
      }]
    }
  }),

  new Character({
    id: 7,
    syllabograph: ['tar', 'ḫaš'],
    logograph: [{
      logTranslation: '???',
      logTransliteration: 'KU5'
    }, {
      logTranslation: '???',
      logTransliteration: 'KUD'
    }, {
      logTranslation: '???',
      logTransliteration: 'TAR'
    }],
    cuneiform: {
      unicode: '122FB',
      variants: [{
        category: SignVariantCategory.DEFAULT,
        fontset: FontSet.ULLIKUMMI_A,
        components: {
          horizontal: 2,
          vertical: 1
        }
      }, {
        category: SignVariantCategory.LATE,
        fontset: FontSet.ULLIKUMMI_B,
        components: {
          vertical: 1,
          diagonalDesc: 2
        }
      }, {
        category: SignVariantCategory.LATE,
        fontset: FontSet.ULLIKUMMI_C,
        components: {
          horizontal: 2,
          diagonalDesc: 1
        }
      }]
    }
  }),


  new Character({
    id: 8,
    syllabograph: ['an'],
    logograph: [
      {
        logTransliteration: 'AN',
        logTranslation: 'heaven'
      },
      {
        logTransliteration: 'DINGIR',
        logTranslation: 'god'
      }
    ],
    determiner: [{
      detTranslation: 'god',
      detTransliteration: 'd'
    }],
    cuneiform: {
      unicode: '1202D',
      variants: [
        {
          components: {
            horizontal: 2,
            vertical: 1
          }
        }
      ]
    }
  }),

  new Character({
    id: 9,
    logograph: [{
      logTranslation: '???',
      logTransliteration: 'APIN'
    }, {
      logTranslation: '???',
      logTransliteration: 'ENGAR'
    }],
    cuneiform: {
      unicode: '12033',
      variants: [{
        category: SignVariantCategory.DEFAULT,
        fontset: FontSet.ULLIKUMMI_A,
        components: {
          horizontal: 4,
          vertical: 1
        }
      }, {
        category: SignVariantCategory.LATE,
        fontset: FontSet.ULLIKUMMI_B,
        components: {
          horizontal: 4,
          vertical: 1
        }
      }]
    }
  }),

  new Character({
    id: 10,
    syllabograph: ['maḫ'],
    logograph: [{
      logTranslation: '???',
      logTransliteration: 'MAḪ'
    }],
    cuneiform: {
      unicode: '12224',
      variants: [{
        category: SignVariantCategory.DEFAULT,
        fontset: FontSet.ULLIKUMMI_A,
        components: {
          horizontal: 4,
          vertical: 2,
          glossenkeil: 2
        }
      }, {
        category: SignVariantCategory.LATE,
        fontset: FontSet.ULLIKUMMI_B,
        components: {
          horizontal: 2,
          vertical: 3,
          glossenkeil: 4
        }
      }, {
        category: SignVariantCategory.LATE,
        fontset: FontSet.ULLIKUMMI_C,
        components: {
          horizontal: 5,
          vertical: 2,
          glossenkeil: 2
        }
      }]
    }
  }),

  new Character({
    id: 11,
    syllabograph: ['nu'],
    logograph: [
      {
        logTransliteration: 'NU',
        logTranslation: '???'
      }
    ],
    cuneiform: {
      unicode: '12261',
      variants: [
        {
          components: {
            horizontal: 1,
            glossenkeil: 1
          }
        }
      ]
    }
  }),

  new Character({
    id: 12,
    syllabograph: ['kul'],
    logograph: [{
      logTranslation: '???',
      logTransliteration: 'KUL'
    }, {
      logTranslation: 'seed',
      logTransliteration: 'NUMUN'
    }],
    cuneiform: {
      unicode: '121B0',
      variants: [{
        category: SignVariantCategory.DEFAULT,
        fontset: FontSet.ULLIKUMMI_A,
        components: {
          horizontal: 1,
          glossenkeil: 3
        }
      }, {
        category: SignVariantCategory.LATE,
        fontset: FontSet.ULLIKUMMI_B,
        components: {
          horizontal: 1,
          glossenkeil: 3
        }
      }]
    }
  }),

  new Character({
    id: 13,
    syllabograph: ['pát/d', 'píd/t', 'pè', 'pì'],
    logograph: [{
      logTranslation: '???',
      logTransliteration: 'BAD'
    }, {
      logTranslation: '???',
      logTransliteration: 'BAD'
      }, {
      logTranslation: '???',
      logTransliteration: 'SUMUN'
      }, {
      logTranslation: '???',
      logTransliteration: 'SUN'
      }, {
      logTranslation: '???',
      logTransliteration: 'TIL'
      }, {
      logTranslation: '???',
      logTransliteration: 'ÚŠ'
    }],
    cuneiform: {
      unicode: '12041',
      variants: [{
        components: {
          horizontal: 1,
          glossenkeil: 1
        }
      }],
    }
  }),

  new Character({
    id: 14,
    syllabograph: ['dim', 'tim'],
    cuneiform: {
      unicode: '12074',
      variants: [{
        category: SignVariantCategory.DEFAULT,
        fontset: FontSet.ULLIKUMMI_A,
        components: {
          horizontal: 1,
          vertical: 1,
          diagonalAsc: 2,
          diagonalDesc: 2
        }
      }, {
        category: SignVariantCategory.LATE,
        fontset: FontSet.ULLIKUMMI_B,
        components: {
          horizontal: 2,
          vertical: 1,
          glossenkeil: 2,
          diagonalAsc: 1,
          diagonalDesc: 1
        }
      }]
    }
  }),

  new Character({
    id: 15,
    syllabograph: ['na'],
    logograph: [
      {
        logTransliteration: 'NA',
        logTranslation: '???'
      }
    ],
    cuneiform: {
      unicode: '1223E',
      variants: [
        {
          components: {
            horizontal: 1,
            glossenkeil: 2,
            vertical: 1
          }
        }
      ]
    }
  }),

  new Character({
    id: 16,
    logograph: [{
      logTranslation: '???',
      logTransliteration: 'ÀR'
    }, {
      logTranslation: '???',
      logTransliteration: 'ARAD'
      }, {
      logTranslation: '???',
      logTransliteration: 'NÍTA'
    }],
    cuneiform: {
      unicode: '12034',
      variants: [{
        components: {
          horizontal: 1,
          vertical: 1,
          glossenkeil: 3
        }
      }]
    }
  }),

  new Character({
    id: 17,
    syllabograph: ['mu'],
    logograph: [
      {
        logTransliteration: 'MU',
        logTranslation: '???'
      },
      {
        logTransliteration: 'MUḪALDIM',
        logTranslation: 'cook'
      }
    ],
    cuneiform: {
      unicode: '1222C',
      variants: [{
        components: {
          glossenkeil: 4,
          horizontal: 1
        }
      }]
    }
  }),

  new Character({
    id: 20,
    syllabograph: ['pár', 'bar', 'maš'],
    logograph: [{
        logTranslation: '???',
        logTransliteration: 'BÁN'
      },
      {
        logTranslation: '???',
        logTransliteration: 'BAR'
      },
      {
        logTranslation: '???',
        logTransliteration: 'MAŠ'
      },
      {
        logTranslation: '???',
        logTransliteration: 'MÁŠDA'
    }],
    cuneiform: {
      unicode: '12047',
      variants: [{
        components: {
          horizontal: 1,
          vertical: 1
        }
      }]
    }
  }),

  new Character({
    id: 24,
    syllabograph: ['ḫu'],
    logograph: [{
      logTranslation: 'bird',
      logTransliteration: 'MUŠEN'
    }],
    cuneiform: {
      unicode: '12137',
      variants: [{
        components: {
          horizontal: 1,
          vertical: 2,
          glossenkeil: 1
        }
      }]
    }
  }),

  new Character({
    id: 29,
    syllabograph: ['rad/t'],
    cuneiform: {
      unicode: '122E5',
      variants: [{
        components: {
          horizontal: 2,
          vertical: 2
        }
      }]
    }
  }),

  new Character({
    id: 30,
    syllabograph: ['gi', 'ge'],
    logograph: [{
        logTranslation: 'reed',
        logTransliteration: 'GI'
      },
      {
        logTranslation: '???',
        logTransliteration: 'SI22',
      },
      {
        logTranslation: '???',
        logTransliteration: 'SIG17'
    }],
    cuneiform: {
      unicode: '12100',
      variants: [{
        fontset: FontSet.ULLIKUMMI_A,
        category: SignVariantCategory.DEFAULT,
        components: {
          horizontal: 1,
          vertical: 2,
          diagonalAsc: 1,
          glossenkeil: 3
        }
      }, {
        fontset: FontSet.ULLIKUMMI_B,
        category: SignVariantCategory.LATE,
        components: {
          horizontal: 1,
          vertical: 2,
          glossenkeil: 4
        }
      }]
    }
  }),

  new Character({
    id: 329,
    syllabograph: ['kur'],
    logograph: [{
        logTranslation: 'land',
        logTransliteration: 'KUR'
      },
      {
        logTranslation: '???',
        logTransliteration: 'GÀN'
      }],
    determiner: [{
      detTranslation: 'land',
      detTransliteration: 'KUR'
    }],
    cuneiform: {
      unicode: '121B3',
      variants: [{
        components: {
          glossenkeil: 3
        }
      }]
    }
  })
];