# Features and Effects System

## Overview
Features represent special abilities, traits, or qualities that characters possess through their race, class, or magical items. Each Feature can have multiple Effects, which are the mechanical implementations of these abilities.

## Features
A Feature represents a distinct capability or trait, such as "Elvish Expertise" or "Detect Secret Doors". Features have:

- **Name**: Descriptive title of the feature
- **Type**: 
  - Racial (inherited from character race)
  - Class (gained from character class)
  - Magical (granted by items or spells)
- **Activation**:
  - Passive (always active)
  - Action (requires an action to use)
  - Reaction (triggered in response to events)
  - Special (unique activation requirements)
- **Description**: Narrative description of the feature

## Effects
Effects are the mechanical components of Features that modify character capabilities. Each Feature can have multiple Effects.

### Effect Types
- **Bonus**: Numerical modifier to rolls or stats
- **Advantage**: Grants advantage on specific checks
- **New Ability**: Grants a new capability
- **Roll Modifier**: Changes how certain rolls work
- **Stat Adjustment**: Permanent changes to character statistics

### Effect Targets
Effects can target:
- Attack rolls
- Damage rolls
- Armor Class
- Saving Throws
- Ability Checks
- Skills

### Conditions
Effects can be conditional based on:
- Weapon types (e.g., "bows, short swords")
- Situations (e.g., "in darkness", "vs. giants")

## Roll Integration
Features can include specific roll formulas:
- Custom die rolls (e.g., "1d6" for Detect Secret Doors)
- Success conditions (e.g., "2 or less" on the die)
- Auto-roll capabilities

## Examples

### Elvish Expertise 
```json
{
    "name": "Elvish Expertise",
    "type": "racial",
    "activation": {
        "type": "passive"
    },
    "effects": [{
        "type": "bonus",
        "target": "attack",
        "value": 1,
        "conditions": {
            "weapons": ["bow", "shortsword", "longsword"]
        }
    }]
}
```

### Elvish Expertise 
```json
{
    "name": "Detect Secret Doors",
    "type": "racial",
    "activation": {
        "type": "action"
    },
    "rollable": {
        "enabled": true,
        "formula": "1d6",
        "target": 2,
        "successCondition": "lte"
    }
}
```

## Implementation Notes
1. Features are implemented as Items in the Foundry VTT system
2. Effects are stored as part of the Feature's data structure
3. The system automatically applies passive effects when calculating relevant rolls or statistics
4. Active features require user interaction through the character sheet