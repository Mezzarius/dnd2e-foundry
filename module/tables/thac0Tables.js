// THAC0 progression tables for different class types
export const WarriorTHAC0 = {
    modifiers: [
        { min: 1, max: 1, value: 20 },
        { min: 2, max: 2, value: 19 },
        { min: 3, max: 3, value: 18 },
        { min: 4, max: 4, value: 17 },
        { min: 5, max: 5, value: 16 },
        { min: 6, max: 6, value: 15 },
        { min: 7, max: 7, value: 14 },
        { min: 8, max: 8, value: 13 },
        { min: 9, max: 9, value: 12 },
        { min: 10, max: 10, value: 11 },
        { min: 11, max: 11, value: 10 },
        { min: 12, max: 12, value: 9 },
        { min: 13, max: 13, value: 8 },
        { min: 14, max: 14, value: 7 },
        { min: 15, max: 15, value: 6 },
        { min: 16, max: 16, value: 5 },
        { min: 17, max: 17, value: 4 },
        { min: 18, max: 18, value: 3 },
        { min: 19, max: 19, value: 2 },
        { min: 20, max: 99, value: 1 }
    ]
};

export const PriestTHAC0 = {
    modifiers: [
        { min: 1, max: 3, value: 20 },
        { min: 4, max: 6, value: 18 },
        { min: 7, max: 9, value: 16 },
        { min: 10, max: 12, value: 14 },
        { min: 13, max: 15, value: 12 },
        { min: 16, max: 18, value: 10 },
        { min: 19, max: 99, value: 8 }
    ]
};

export const RogueTHAC0 = {
    modifiers: [
        { min: 1, max: 2, value: 20 },
        { min: 3, max: 4, value: 19 },
        { min: 5, max: 6, value: 18 },
        { min: 7, max: 8, value: 17 },
        { min: 9, max: 10, value: 16 },
        { min: 11, max: 12, value: 15 },
        { min: 13, max: 14, value: 14 },
        { min: 15, max: 16, value: 13 },
        { min: 17, max: 18, value: 12 },
        { min: 19, max: 99, value: 11 }
    ]
};

export const WizardTHAC0 = {
    modifiers: [
        { min: 1, max: 3, value: 20 },
        { min: 4, max: 6, value: 19 },
        { min: 7, max: 9, value: 18 },
        { min: 10, max: 12, value: 17 },
        { min: 13, max: 15, value: 16 },
        { min: 16, max: 18, value: 15 },
        { min: 19, max: 99, value: 14 }
    ]
};

export class THAC0Tables {
    /**
     * Get base THAC0 for a character based on their class and level
     * @param {string} className - The character's class
     * @param {number} level - The character's level
     * @returns {number} The base THAC0 value
     */
    static getBaseTHAC0(className, level) {
        // Determine which table to use based on class
        let table;
        className = className.toLowerCase();
        
        if (['fighter', 'paladin', 'ranger'].includes(className)) {
            table = WarriorTHAC0;
        } else if (['cleric', 'druid', 'priest'].includes(className)) {
            table = PriestTHAC0;
        } else if (['mage', 'wizard', 'illusionist'].includes(className)) {
            table = WizardTHAC0;
        } else if (['thief', 'bard'].includes(className)) {
            table = RogueTHAC0;
        } else {
            // Default to warrior if class not found
            table = WarriorTHAC0;
        }

        // Find the appropriate modifier based on level
        const mod = table.modifiers.find(m => level >= m.min && level <= m.max);
        return mod ? mod.value : 20; // Default to 20 if no match found
    }

    /**
     * Calculate final THAC0 with modifiers
     * @param {number} baseTHAC0 - Base THAC0 from class/level
     * @param {number} meleeModifier - Strength-based melee modifier
     * @param {number} rangedModifier - Dexterity-based ranged modifier
     * @param {boolean} isRanged - Whether this is for ranged combat
     * @returns {number} The final adjusted THAC0
     */
    static calculateFinalTHAC0(baseTHAC0, meleeModifier, rangedModifier, isRanged = false) {
        return baseTHAC0 - (isRanged ? rangedModifier : meleeModifier);
    }
}
