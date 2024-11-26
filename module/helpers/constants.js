export const WARRIOR_CLASSES = ['fighter', 'paladin', 'ranger', 'barbarian'];

export function validateExceptionalStrength(value) {
    if (!value) return null;
    const numValue = parseInt(value);
    if (isNaN(numValue) || numValue < 1 || numValue > 100) return null;
    return numValue;
} 