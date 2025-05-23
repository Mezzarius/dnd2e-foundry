export const FighterSaves = {
    modifiers: [
        { min: 0, max: 0, poison: 16, rod: 18, petrification: 17, breath: 20, spell: 19 },
        { min: 1, max: 2, poison: 14, rod: 16, petrification: 15, breath: 17, spell: 17 },
        { min: 3, max: 4, poison: 13, rod: 15, petrification: 14, breath: 16, spell: 16 },
        { min: 5, max: 6, poison: 11, rod: 13, petrification: 12, breath: 13, spell: 14 },
        { min: 7, max: 8, poison: 10, rod: 12, petrification: 11, breath: 12, spell: 13 },
        { min: 9, max: 10, poison: 8, rod: 10, petrification: 9, breath: 9, spell: 11 },
        { min: 11, max: 12, poison: 7, rod: 9, petrification: 8, breath: 8, spell: 10 },
        { min: 13, max: 14, poison: 5, rod: 7, petrification: 6, breath: 5, spell: 8 },
        { min: 15, max: 16, poison: 4, rod: 6, petrification: 5, breath: 4, spell: 7 },
        { min: 17, max: 99, poison: 3, rod: 5, petrification: 4, breath: 4, spell: 6 }
    ]
};

export const ClericSaves = {
    modifiers: [
        { min: 1, max: 3, poison: 10, rod: 14, petrification: 13, breath: 16, spell: 15 },
        { min: 4, max: 6, poison: 9, rod: 13, petrification: 12, breath: 15, spell: 14 },
        { min: 7, max: 9, poison: 7, rod: 11, petrification: 10, breath: 13, spell: 12 },
        { min: 10, max: 12, poison: 6, rod: 10, petrification: 9, breath: 12, spell: 11 },
        { min: 13, max: 15, poison: 5, rod: 9, petrification: 8, breath: 11, spell: 10 },
        { min: 16, max: 18, poison: 4, rod: 8, petrification: 7, breath: 10, spell: 9 },
        { min: 19, max: 99, poison: 2, rod: 6, petrification: 5, breath: 8, spell: 7 }
    ]
};

export const RogueSaves = {
    modifiers: [
        { min: 1, max: 4, poison: 13, rod: 14, petrification: 12, breath: 16, spell: 15 },
        { min: 5, max: 8, poison: 12, rod: 12, petrification: 11, breath: 15, spell: 13 },
        { min: 9, max: 12, poison: 11, rod: 10, petrification: 10, breath: 14, spell: 11 },
        { min: 13, max: 16, poison: 10, rod: 8, petrification: 9, breath: 13, spell: 9 },
        { min: 17, max: 20, poison: 9, rod: 6, petrification: 8, breath: 12, spell: 7 },
        { min: 21, max: 99, poison: 8, rod: 4, petrification: 7, breath: 11, spell: 5 }
    ]
};

export const WizardSaves = {
    modifiers: [
        { min: 1, max: 5, poison: 14, rod: 11, petrification: 13, breath: 15, spell: 12 },
        { min: 6, max: 10, poison: 13, rod: 9, petrification: 11, breath: 13, spell: 10 },
        { min: 11, max: 15, poison: 11, rod: 7, petrification: 9, breath: 11, spell: 8 },
        { min: 16, max: 20, poison: 10, rod: 5, petrification: 7, breath: 9, spell: 6 },
        { min: 21, max: 99, poison: 8, rod: 3, petrification: 5, breath: 7, spell: 4 }
    ]
};

// Add other class saving throw tables here (Wizard, Rogue, etc.)

export const SavingThrowTables = {
    fighter: FighterSaves,
    cleric: ClericSaves,
    wizard: WizardSaves,
    rogue: RogueSaves
};

export const DwarvenSaves = {
    modifiers: [
        { min: 1, max: 3, modifier: 0 },
        { min: 4, max: 6, modifier: 1 },
        { min: 7, max: 10, modifier: 2 },
        { min: 11, max: 13, modifier: 3 },
        { min: 14, max: 17, modifier: 4 },
        { min: 18, max: 99, modifier: 5 }
    ]   
}

export function retrieveSavingThrows(className, level) {
    const table = SavingThrowTables[className.toLowerCase()];
    if (!table) throw new Error(`Invalid class name: ${className}`);

    const row = table.modifiers.find(row => level >= row.min && level <= row.max);
    if (!row) throw new Error(`Invalid level: ${level}`);

    const { min, max, ...metadata } = row;
    return metadata;
}