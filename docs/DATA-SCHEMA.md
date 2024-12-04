# AD&D 2E System Data Schema

This document provides detailed information about the data structures used in the AD&D 2E system for Foundry VTT.

## Actor Data

### Base Template
Common properties shared across all actor types (characters, NPCs, monsters).

#### HP (Hit Points)
- `hp.value`: Current hit points
- `hp.min`: Minimum possible HP (typically 0)
- `hp.max`: Maximum hit points
- `hp.hitDie`: Type of hit die used (e.g., "d4", "d6", "d8")

#### AC (Armor Class)
- `ac.value`: Current total armor class
- `ac.base`: Base armor class (typically 10)
- `ac.armor`: Equipped armor's contribution
- `ac.shield`: Equipped shield's contribution
- `ac.dexMod`: Dexterity modifier to AC

#### THAC0
- `thac0.value`: Current total THAC0
- `thac0.base`: Base THAC0 (typically 20)
- `thac0.strMod`: Strength modifier to THAC0

#### Initiative
- `initiative.value`: Current total initiative modifier
- `initiative.base`: Base initiative value
- `initiative.dexMod`: Dexterity modifier to initiative

### Character-Specific Data

#### Attributes
Each attribute (str, dex, con, int, wis, cha) has:
- `value`: Base attribute score
- Additional specific modifiers:
  - Strength: `exceptional` (percentage for 18/xx), `hitMod`, `dmgMod`
  - Dexterity: Affects initiative and AC
  - Constitution: Affects HP
  - Intelligence: Affects languages and spells
  - Wisdom: Affects magical defense
  - Charisma: Affects NPC reactions

## Item Data

### Base Template
Common properties for all item types:
- `description`: Item description text
- `quantity`: Number of items (default: 1)
- `weight`: Item weight in coins/pounds
- `value`: Cost in gold pieces
- `quality`: Item quality rating (e.g., "Common", "Fine", "Poor")

### Weapon-Specific Data
- `type`: Weapon type (e.g., "melee", "ranged")
- `sdamage`: Damage vs Small/Medium creatures
- `ldamage`: Damage vs Large creatures
- `speed`: Weapon speed factor
- `totalInit`: Total initiative modifier (can be negative)
  - Used in combat to determine attack order
- `quality`: Weapon quality affecting performance

### Armor-Specific Data
- `ac`: Armor class bonus
- `type`: Armor type (e.g., "light", "medium", "heavy", "shield")
- `equipped`: Whether the armor is currently worn
- `baseAc`: Base armor class value before modifications
- `magicBonus`: Magical bonus to armor class (positive for armor, negative for shields)

### Consumable-Specific Data
- `quantity`: Number of uses/charges
- `maxQuantity`: Maximum number of uses/charges
- `type`: Type of consumable (e.g., "potion", "scroll")
- `isConsumable`: Flag indicating consumable nature

### Race-Specific Data
- `attributeModifiers`: Racial modifiers to attributes
  - `str`, `dex`, `con`, `int`, `wis`, `cha`: Numerical modifiers
- `features`: Collection of racial features
  - `contents`: Array of feature objects
- `languages`: Known languages
  - `bonus`: Additional languages that can be learned
  - `automatic`: Languages known automatically
- `characteristics`: Physical characteristics
  - `heightRange`: Height ranges by gender
    - `male`, `female`: Each with `base` and `modifier` (dice)
  - `weightRange`: Weight ranges by gender
    - `male`, `female`: Each with `base` and `modifier` (dice)
  - `ageRange`: Age characteristics
    - `base`: Base starting age
    - `modifier`: Additional age roll (dice)
- `classRestrictions`: Class-specific limitations
  - `allowed`: Array of allowed classes
  - `maxLevel`: Maximum achievable level per class

### Feature-Specific Data
- `type`: Feature type (e.g., "racial", "class")
- `activation`: Activation requirements
  - `type`: How feature activates (e.g., "passive", "action")
  - `cost`: Resource cost if any
  - `condition`: Specific conditions for activation
- `effects`: Array of effect objects
  - `type`: Effect type (e.g., "bonus")
  - `target`: What the effect modifies
  - `value`: Numerical value of the effect
  - `conditions`: Conditional requirements
    - `weapons`: Array of weapon types affected
    - `situations`: Array of situational requirements
- `rollable`: Rolling configuration
  - `enabled`: Whether feature can be rolled
  - `formula`: Dice formula if rollable

## Computed Values
Values that are calculated rather than stored directly:
1. Armor Class (AC)
   - For armor: `baseAc - magicBonus`
   - For shields: `baseAc + magicBonus`
2. Attribute Modifiers
   - Calculated based on attribute scores and tables
   - Special handling for exceptional strength (18/xx)
3. Experience Points
   - Tracked per class for multi-classed characters
   - Determines level advancement

## Notes
1. All numerical modifiers can be negative, zero, or positive
2. Empty or undefined values should be displayed as "--" in the UI
3. Computed values are derived from base values plus modifiers
4. Dice notation (e.g., "2d10") is used for random generation of characteristics
5. Class-specific features may override or modify base calculations
