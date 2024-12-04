# CSS Redesign Plan

## Overview
The goal is to modularize the DND2E system's CSS to improve maintainability and organization. This document outlines the planned structure and implementation strategy.

## File Structure

### 1. core.css
- CSS Variables (colors, spacing, etc.)
- Base window styles
- Grid system
- Common form elements
- Basic typography
- Sheet layout (header, tabs, body)
- Common utility classes

### 2. character-sheet.css
- Character header styles
- Basic info section
- Attributes section
- Physical traits
- Characteristics
- Sheet-specific layouts

### 3. combat.css
```css
/* Combat Stats */
.combat-stats
.combat-basic
.combat-sheet

/* THAC0 Block */
.thac0-block
.thac0-block h2
.thac0-block .form-group
.thac0-block input

/* Initiative Block */
.initiative-block
.total-init
.init-mod

/* Weapon Proficiencies */
.weapon-proficiencies
.prof-headers
.prof-entry
.prof-controls
.add-proficiency

/* Saving Throws */
.saving-throws
.saves-grid
.save-headers
.save-row
.roll-save
```

### 4. inventory.css
```css
/* Inventory List */
.inventory-list
.inventory-header
.inventory-controls
.inventory-filter

/* Item Display */
.item
.item-name
.item-type
.item-damage
.item-speed
.item-quality
.item-value
.item-ac
.item-equipped
.item-quantity

/* Controls */
.item-controls
.item-control
.item-create
.inventory-footer

/* Currency */
.currency-block
.currency-item
```

### 5. skills.css
```css
/* Non-Weapon Proficiencies */
.nwp-header
.nwp-slots
.nwp-list
.nwp-header-row
.nwp-item
.nwp-controls

/* Skills Layout */
.skills-container
.skill-row
.skill-name
.skill-rating
.skill-controls
```

### 6. magic.css
```css
/* Spell Management */
.magic-container
.spell-slots-container
.spell-type
.spell-slots-grid
.spell-level
.slot-values

/* Spell List */
.memorized-spells
.spells-header
.spell-controls
.spell-list
.spell-item
.spell-name
.spell-info
```

### 7. items.css
```css
/* Item Sheet Base */
.item-properties
.item-header
.item-details

/* Specific Item Types */
.weapon-stats
.armor-properties
.consumable-properties
.equipment-slot

/* Common Item Elements */
.item-description
.item-effects
.item-uses
.item-quantity
```

### 8. features.css
```css
/* Feature Management */
.features-section
.feature-header
.feature-details
.feature-controls

/* Effects System */
.effects-list
.effect-entry
.effect-row
.effect-conditions
.effect-weapons

/* Feature Rolls */
.roll-feature
.feature-roll-card
.roll-results
```

## Implementation Strategy

1. **Phase 1: Core Foundation**
   - Implement core.css first
   - Test basic layout and common elements
   - Ensure all global styles are working

2. **Phase 2: Character Essentials**
   - Implement character-sheet.css and combat.css
   - Test character sheet functionality
   - Verify combat mechanics display

3. **Phase 3: Items and Inventory**
   - Implement inventory.css and items.css
   - Test item management
   - Verify equipment functionality

4. **Phase 4: Advanced Features**
   - Implement skills.css, magic.css, and features.css
   - Test all specialized functionality
   - Verify effects and rolls

## Testing Strategy

For each module:
1. Extract relevant CSS from _BACKUP.css
2. Create new module file
3. Test in isolation
4. Test integration with existing modules
5. Document any dependencies or conflicts

## Maintenance Guidelines

1. Keep selectors specific but not overly nested
2. Use CSS variables for common values
3. Document any complex selectors or calculations
4. Maintain consistent naming conventions
5. Keep files focused on their specific domain

## CSS Rule Mapping

### core.css
```css
/* Variables */
.dnd2e {
    --color-border: #999;
    --color-bg-sheet: #f0f0f0;
    --color-tab-active: #fff;
    --color-tab-inactive: #ddd;
}

/* Base Window Styles */
.dnd2e .window-content {
    background: var(--color-bg-sheet);
    padding: 5px;
    font-size: 14px;
}

/* Sheet Layout */
.dnd2e .sheet-header
.dnd2e .profile-img
.dnd2e .header-fields
.dnd2e .sheet-tabs
.dnd2e .sheet-body
.dnd2e .sheet-body .tab

/* Grid System */
.grid
.grid-2col
.grid-3col
.grid-4col
.grid-5col
.grid-6col
.grid-8col
.span-2
.span-4
.span-1-5
.span-2-5
.span-1-25
.span-2-75

/* Common Form Elements */
.form-group
input[type="text"]
input[type="number"]
select
textarea

/* Common Typography */
h1, h2, h3, h4, h5, h6
```

### character-sheet.css
```css
/* Character Header */
.dnd2e .charname
.header-fields

/* Basic Info Section */
.basic-info
.basic-info .form-group
.basic-info input

/* Attributes Section */
.attributes
.attribute-values
.attribute-block
.attribute-main
.attribute-exceptional
.attribute-modifiers

/* Physical Traits */
.physical-traits
.traits-grid
.traits-column
```

### combat.css
```css
/* Combat Stats */
.combat-stats
.combat-stats .form-group
.combat-stats input

/* THAC0 Block */
.thac0-block
.thac0-block .form-group
.thac0-block input

/* Initiative Block */
.initiative-block
.initiative-block .form-group
.initiative-block input

/* Weapon Proficiencies */
.weapon-proficiencies
.weapon-proficiencies .form-group
.weapon-proficiencies input

/* Saving Throws */
.saving-throws
.saving-throws .form-group
.saving-throws input

/* Combat-related UI Elements */
.combat-ui
.combat-ui .form-group
.combat-ui input
```

### inventory.css
```css
/* Inventory List Styles */
.inventory-list
.inventory-list .form-group
.inventory-list input

/* Equipment Sections */
.equipment-sections
.equipment-sections .form-group
.equipment-sections input

/* Currency Blocks */
.currency-blocks
.currency-blocks .form-group
.currency-blocks input

/* Item Controls */
.item-controls
.item-controls .form-group
.item-controls input

/* Inventory Management UI */
.inventory-management
.inventory-management .form-group
.inventory-management input
```

### skills.css
```css
/* Non-Weapon Proficiencies */
.nwp-header
.nwp-slots
.nwp-list
.nwp-header-row
.nwp-item
.nwp-controls

/* Skills Layout */
.skills-container
.skill-row
.skill-name
.skill-rating
.skill-controls
```

### magic.css
```css
/* Spell Management */
.magic-container
.spell-slots-container
.spell-type
.spell-slots-grid
.spell-level
.slot-values

/* Spell List */
.memorized-spells
.spells-header
.spell-controls
.spell-list
.spell-item
.spell-name
.spell-info
```

### items.css
```css
/* Item Sheet Styles */
.item-sheet
.item-sheet .form-group
.item-sheet input

/* Consumable Items */
.consumable-items
.consumable-items .form-group
.consumable-items input

/* Weapon Items */
.weapon-items
.weapon-items .form-group
.weapon-items input

/* Armor Items */
.armor-items
.armor-items .form-group
.armor-items input

/* Generic Item UI */
.generic-item-ui
.generic-item-ui .form-group
.generic-item-ui input
```

### features.css
```css
/* Feature Sheet Styles */
.feature-sheet
.feature-sheet .form-group
.feature-sheet input

/* Effects System */
.effects-system
.effects-system .form-group
.effects-system input

/* Feature Rolls */
.feature-rolls
.feature-rolls .form-group
.feature-rolls input

/* Feature Management UI */
.feature-management
.feature-management .form-group
.feature-management input
```

## Dependencies and Shared Styles

Some styles may be referenced across multiple modules. Here are the key dependencies:

1. All modules depend on core.css for:
   - CSS Variables
   - Grid system
   - Common form elements
   - Basic typography

2. Cross-module dependencies:
   - items.css shares some styles with inventory.css
   - features.css uses some combat.css roll styling
   - magic.css uses some inventory.css list styling

## Implementation Notes

1. Start with core.css and ensure all shared components work
2. When implementing each module:
   - Check for dependencies on core.css
   - Verify any cross-module style requirements
   - Test with existing modules
   - Document any shared styles

3. Consider creating shared mixins or utility classes for common patterns like:
   - List styles
   - Control buttons
   - Form layouts
   - Roll cards