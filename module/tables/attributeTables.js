export const StrengthTable = {
    modifiers: [
        { min: 1, max: 1, hit: -5, dmg: -4, weight: 1, press: 3, doors: 1, bblg: 0 },
        { min: 2, max: 2, hit: -3, dmg: -2, weight: 1, press: 5, doors: 1, bblg: 0 },
        { min: 3, max: 3, hit: -3, dmg: -1, weight: 5, press: 10, doors: 2, bblg: 0 },
        { min: 4, max: 5, hit: -2, dmg: -1, weight: 10, press: 25, doors: 3, bblg: 0 },
        { min: 6, max: 7, hit: -1, dmg: 0, weight: 20, press: 55, doors: 4, bblg: 0 },
        { min: 8, max: 9, hit: 0, dmg: 0, weight: 35, press: 90, doors: 5, bblg: 1 },
        { min: 10, max: 11, hit: 0, dmg: 0, weight: 40, press: 115, doors: 6, bblg: 2 },
        { min: 12, max: 13, hit: 0, dmg: 0, weight: 45, press: 140, doors: 7, bblg: 4 },
        { min: 14, max: 15, hit: 0, dmg: 0, weight: 55, press: 170, doors: 8, bblg: 7 },
        { min: 16, max: 16, hit: 0, dmg: 1, weight: 70, press: 195, doors: 9, bblg: 10 },
        { min: 17, max: 17, hit: 1, dmg: 1, weight: 85, press: 220, doors: 10, bblg: 13 },
        { min: 18, max: 18, hit: 1, dmg: 2, weight: 110, press: 255, doors: 11, bblg: 16 },
        { min: 19, max: 19, hit: 3, dmg: 7, weight: 485, press: 640, doors: 16, bblg: 50 },
        { min: 20, max: 20, hit: 3, dmg: 8, weight: 535, press: 700, doors: 17, bblg: 60 },
        { min: 21, max: 21, hit: 4, dmg: 9, weight: 635, press: 810, doors: 17, bblg: 70 },
        { min: 22, max: 22, hit: 4, dmg: 10, weight: 785, press: 970, doors: 18, bblg: 80 },
        { min: 23, max: 23, hit: 5, dmg: 11, weight: 935, press: 1130, doors: 18, bblg: 90 },
        { min: 24, max: 24, hit: 6, dmg: 12, weight: 1235, press: 1440, doors: 19, bblg: 95 },
        { min: 25, max: 25, hit: 7, dmg: 14, weight: 1535, press: 1750, doors: 19, bblg: 99 }
    ],
    exceptional: [
        { min: 1, max: 50, hit: 1, dmg: 3, weight: 135, press: 280, doors: 12, bblg: 20 },
        { min: 51, max: 75, hit: 2, dmg: 3, weight: 160, press: 305, doors: 13, bblg: 25 },
        { min: 76, max: 90, hit: 2, dmg: 4, weight: 185, press: 330, doors: 14, bblg: 30 },
        { min: 91, max: 99, hit: 2, dmg: 5, weight: 235, press: 380, doors: 15, bblg: 35 },
        { min: 100, max: 100, hit: 3, dmg: 6, weight: 335, press: 480, doors: 16, bblg: 40 }
    ]
};

export const DexterityTable = {
    modifiers: [
        { min: 1, max: 1, reaction: -6, missile: -6, defense: 5 },
        { min: 2, max: 2, reaction: -4, missile: -4, defense: 5 },
        { min: 3, max: 3, reaction: -3, missile: -3, defense: 4 },
        { min: 4, max: 4, reaction: -2, missile: -2, defense: 3 },
        { min: 5, max: 5, reaction: -1, missile: -1, defense: 2 },
        { min: 6, max: 6, reaction: 0, missile: 0, defense: 1 },
        { min: 7, max: 14, reaction: 0, missile: 0, defense: 0 },
        { min: 15, max: 15, reaction: 0, missile: 0, defense: -1 },
        { min: 16, max: 16, reaction: 1, missile: 1, defense: -2 },
        { min: 17, max: 17, reaction: 2, missile: 2, defense: -3 },
        { min: 18, max: 18, reaction: 2, missile: 2, defense: -4 },
        { min: 19, max: 20, reaction: 3, missile: 3, defense: -4 },
        { min: 21, max: 23, reaction: 4, missile: 4, defense: -5 },
        { min: 24, max: 25, reaction: 5, missile: 5, defense: -6 }
    ]
};

export const ConstitutionTable = {
    modifiers: [
        { min: 1, max: 1, hp: -3, shock: 25, resurrection: 30, poison: -2, regen: 0 },
        { min: 2, max: 2, hp: -2, shock: 30, resurrection: 35, poison: -1, regen: 0 },
        { min: 3, max: 3, hp: -2, shock: 35, resurrection: 40, poison: 0, regen: 0 },
        { min: 4, max: 4, hp: -1, shock: 40, resurrection: 45, poison: 0, regen: 0 },
        { min: 5, max: 5, hp: -1, shock: 45, resurrection: 50, poison: 0, regen: 0 },
        { min: 6, max: 6, hp: -1, shock: 50, resurrection: 55, poison: 0, regen: 0 },
        { min: 7, max: 7, hp: 0, shock: 55, resurrection: 60, poison: 0, regen: 0 },
        { min: 8, max: 8, hp: 0, shock: 60, resurrection: 65, poison: 0, regen: 0 },
        { min: 9, max: 9, hp: 0, shock: 65, resurrection: 70, poison: 0, regen: 0 },
        { min: 10, max: 10, hp: 0, shock: 70, resurrection: 75, poison: 0, regen: 0 },
        { min: 11, max: 11, hp: 0, shock: 75, resurrection: 80, poison: 0, regen: 0 },
        { min: 12, max: 12, hp: 0, shock: 80, resurrection: 85, poison: 0, regen: 0 },
        { min: 13, max: 13, hp: 0, shock: 85, resurrection: 90, poison: 0, regen: 0 },
        { min: 14, max: 14, hp: 0, shock: 88, resurrection: 92, poison: 0, regen: 0 },
        { min: 15, max: 15, hp: 1, shock: 90, resurrection: 94, poison: 0, regen: 0 },
        { min: 16, max: 16, hp: 2, shock: 95, resurrection: 96, poison: 0, regen: 0 },
        { min: 17, max: 17, hp: 3, shock: 91, resurrection: 98, poison: 0, regen: 0 },
        { min: 18, max: 18, hp: 4, shock: 99, resurrection: 100, poison: 0, regen: 0 },
        { min: 19, max: 19, hp: 5, shock: 99, resurrection: 100, poison: 1, regen: 0 },
        { min: 20, max: 20, hp: 5, shock: 99, resurrection: 100, poison: 1, regen: 6 },
        { min: 21, max: 21, hp: 6, shock: 99, resurrection: 100, poison: 2, regen: 5 },
        { min: 22, max: 22, hp: 6, shock: 99, resurrection: 100, poison: 2, regen: 4 },
        { min: 23, max: 23, hp: 6, shock: 99, resurrection: 100, poison: 3, regen: 3 },
        { min: 24, max: 24, hp: 7, shock: 99, resurrection: 100, poison: 3, regen: 2 },
        { min: 24, max: 25, hp: 7, shock: 99, resurrection: 100, poison: 4, regen: 1 }
    ]
};

export const IntelligenceTable = {
    modifiers: [
        { min: 1, max: 1, languages: 0, maxSpellLevel: 0, learn: 0, maxSpells: 0, slots: [] },
        { min: 2, max: 8, languages: 1, maxSpellLevel: 0, learn: 0, maxSpells: 0, slots: [] },
        { min: 9, max: 9, languages: 2, maxSpellLevel: 4, learn: 35, maxSpells: 6, slots: [] },
        { min: 10, max: 10, languages: 2, maxSpellLevel: 5, learn: 40, maxSpells: 7, slots: [] },
        { min: 11, max: 11, languages: 2, maxSpellLevel: 5, learn: 45, maxSpells: 7, slots: [] },
        { min: 12, max: 12, languages: 3, maxSpellLevel: 6, learn: 50, maxSpells: 7, slots: [] },
        { min: 13, max: 13, languages: 3, maxSpellLevel: 6, learn: 55, maxSpells: 9, slots: [1] },
        { min: 14, max: 14, languages: 4, maxSpellLevel: 7, learn: 60, maxSpells: 9, slots: [1,1] },
        { min: 15, max: 15, languages: 4, maxSpellLevel: 7, learn: 65, maxSpells: 11, slots: [2,1,1] },
        { min: 16, max: 16, languages: 5, maxSpellLevel: 8, learn: 70, maxSpells: 11, slots: [2,2,1,1] },
        { min: 17, max: 17, languages: 6, maxSpellLevel: 9, learn: 75, maxSpells: 14, slots: [3,2,2,1,1] },
        { min: 18, max: 18, languages: 7, maxSpellLevel: 9, learn: 85, maxSpells: 18, slots: [4,3,2,2,1,1] },
        { min: 19, max: 19, languages: 8, maxSpellLevel: 9, learn: 95, maxSpells: 99, slots: [4,4,3,3,2,2,1,1,1] },
        { min: 20, max: 20, languages: 9, maxSpellLevel: 9, learn: 96, maxSpells: 99, slots: [4,4,4,3,3,2,2,2,1,1,1] },
        { min: 21, max: 21, languages: 10, maxSpellLevel: 9, learn: 97, maxSpells: 99, slots: [5,4,4,4,3,3,3,2,2,2,1,1,1] },
        { min: 22, max: 22, languages: 11, maxSpellLevel: 9, learn: 98, maxSpells: 99, slots: [5,5,4,4,4,4,3,3,3,2,2,2,1,1,1] },
        { min: 23, max: 23, languages: 12, maxSpellLevel: 9, learn: 99, maxSpells: 99, slots: [5,5,5,5,4,4,4,4,3,3,3,2,2,2,1,1,1] },
        { min: 24, max: 24, languages: 15, maxSpellLevel: 9, learn: 100, maxSpells: 99, slots: [6,6,5,5,5,5,4,4,4,4,3,3,3,2,2,2,1,1,1] },
        { min: 25, max: 25, languages: 10, maxSpellLevel: 9, learn: 100, maxSpells: 99, slots: [7,6,6,6,5,5,5,5,4,4,4,4,3,3,3,2,2,2,1,1,1]  }
    ]
};

export const WisdomTable = {
    modifiers: [
        { min: 1, max: 1, magical: -6, bonus: 0, failure: 80, spells: [] },
        { min: 2, max: 2, magical: -4, bonus: 0, failure: 60, spells: [] },
        { min: 3, max: 3, magical: -3, bonus: 0, failure: 50, spells: [] },
        { min: 4, max: 4, magical: -2, bonus: 0, failure: 45, spells: [] },
        { min: 5, max: 5, magical: -1, bonus: 0, failure: 40, spells: [] },
        { min: 6, max: 6, magical: -1, bonus: 0, failure: 35, spells: [] },
        { min: 7, max: 7, magical: -1, bonus: 0, failure: 30, spells: [] },
        { min: 8, max: 8, magical: 0, bonus: 0, failure: 25, spells: [] },
        { min: 9, max: 9, magical: 0, bonus: 0, failure: 20, spells: [] },
        { min: 10, max: 10, magical: 0, bonus: 0, failure: 15, spells: [] },
        { min: 11, max: 11, magical: 0, bonus: 0, failure: 10, spells: [] },
        { min: 12, max: 12, magical: 0, bonus: 0, failure: 5, spells: [] },
        { min: 13, max: 13, magical: 0, bonus: 0, failure: 0, spells: [1] },
        { min: 14, max: 14, magical: 0, bonus: 0, failure: 0, spells: [1,1] },
        { min: 15, max: 15, magical: 1, bonus: 0, failure: 0, spells: [2,1,1] },
        { min: 16, max: 16, magical: 2, bonus: 0, failure: 0, spells: [2,2,1,1] },
        { min: 17, max: 17, magical: 3, bonus: 0, failure: 0, spells: [3,2,2,1,1] },
        { min: 18, max: 18, magical: 4, bonus: 0, failure: 0, spells: [4,3,2,2,1,1] },
        { min: 19, max: 19, magical: 4, bonus: 0, failure: 0, spells: [4,4,3,3,2,2,1,1,1] },
        { min: 20, max: 20, magical: 4, bonus: 0, failure: 0, spells: [4,4,4,3,3,2,2,2,1,1,1] },
        { min: 21, max: 21, magical: 4, bonus: 0, failure: 0, spells: [5,4,4,4,3,3,3,2,2,2,1,1,1] },
        { min: 22, max: 22, magical: 4, bonus: 0, failure: 0, spells: [5,5,4,4,4,4,3,3,3,2,2,2,1,1,1] },
        { min: 23, max: 23, magical: 4, bonus: 0, failure: 0, spells: [5,5,5,5,4,4,4,4,3,3,3,2,2,2,1,1,1] },
        { min: 24, max: 24, magical: 4, bonus: 0, failure: 0, spells: [6,6,5,5,5,5,4,4,4,4,3,3,3,2,2,2,1,1,1] },
        { min: 24, max: 24, magical: 4, bonus: 0, failure: 0, spells: [7,6,6,6,5,5,5,5,4,4,4,4,3,3,3,2,2,2,1,1,1] }
    ]
};

export const CharismaTable = {
    modifiers: [
        { min: 1, max: 1, hench: 0, loyalty: -8, react: -7 },
        { min: 2, max: 2, hench: 1, loyalty: -7, react: -6 },
        { min: 3, max: 3, hench: 1, loyalty: -6, react: -5 },
        { min: 4, max: 4, hench: 1, loyalty: -5, react: -4 },
        { min: 5, max: 5, hench: 2, loyalty: -4, react: -3 },
        { min: 6, max: 6, hench: 2, loyalty: -3, react: -2 },
        { min: 7, max: 7, hench: 3, loyalty: -2, react: -1 },
        { min: 8, max: 8, hench: 3, loyalty: -1, react: 0 },
        { min: 9, max: 11, hench: 4, loyalty: 0, react: 0 },
        { min: 12, max: 12, hench: 5, loyalty: 0, react: 0 },
        { min: 13, max: 13, hench: 5, loyalty: 0, react: 1 },
        { min: 14, max: 14, hench: 6, loyalty: 1, react: 2 },
        { min: 15, max: 15, hench: 7, loyalty: 3, react: 3 },
        { min: 16, max: 16, hench: 8, loyalty: 4, react: 5 },
        { min: 17, max: 17, hench: 10, loyalty: 6, react: 6 },
        { min: 18, max: 18, hench: 15, loyalty: 8, react: 7 },
        { min: 19, max: 19, hench: 20, loyalty: 10, react: 8 },
        { min: 20, max: 20, hench: 25, loyalty: 12, react: 9 },
        { min: 21, max: 21, hench: 30, loyalty: 14, react: 10 },
        { min: 22, max: 22, hench: 35, loyalty: 16, react: 11 },
        { min: 23, max: 23, hench: 40, loyalty: 18, react: 12 },
        { min: 24, max: 24, hench: 45, loyalty: 20, react: 13 },
        { min: 25, max: 25, hench: 50, loyalty: 22, react: 14 }
    ]
};

// Main export for all tables
export const AttributeTables = {
    str: StrengthTable,
    dex: DexterityTable,
    con: ConstitutionTable,
    int: IntelligenceTable,
    wis: WisdomTable,
    cha: CharismaTable
};

export function retrieveAttributeModifiers(attributeName, value) {
    // Handle exceptional strength notation (e.g., "18/76")
    if (attributeName.toLowerCase() === 'str' && String(value).includes('/')) {
        const [baseStr, exceptionalStr] = String(value).split('/');
        if (parseInt(baseStr) !== 18) {
            throw new Error('Exceptional strength is only valid for strength 18');
        }
        const row = StrengthTable.exceptional.find(row => 
            parseInt(exceptionalStr) >= row.min && 
            parseInt(exceptionalStr) <= row.max
        );
        if (!row) throw new Error(`Invalid exceptional strength value: ${exceptionalStr}`);
        const { min, max, ...metadata } = row;
        return metadata;
    }

    // Handle explicit exceptional strength request
    if (attributeName.toLowerCase() === 'exceptional') {
        const row = StrengthTable.exceptional.find(row => value >= row.min && value <= row.max);
        if (!row) throw new Error(`Invalid exceptional strength value: ${value}`);
        const { min, max, ...metadata } = row;
        return metadata;
    }

    // Handle normal attributes
    const table = AttributeTables[attributeName.toLowerCase()];
    if (!table) throw new Error(`Invalid attribute name: ${attributeName}`);

    const row = table.modifiers.find(row => value >= row.min && value <= row.max);
    if (!row) throw new Error(`Invalid ${attributeName} value: ${value}`);

    const { min, max, ...metadata } = row;
    return metadata;
} 