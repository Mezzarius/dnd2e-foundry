# DND2E CSS Modularization Testing

## Testing Strategy

### Phase 1: Core Styles
1. Uncomment `core.css` in dnd2e.css
2. Test basic functionality:
   - [ ] Window styling (background, padding)
   - [ ] Grid layouts (2-col, 3-col, etc.)
   - [ ] Form elements (inputs, buttons)
   - [ ] Sheet navigation
   - [ ] Basic typography
3. Document any conflicts with _BACKUP.css

### Phase 2: Character & Combat
1. Test core.css + character-sheet.css:
   - [ ] Character header
   - [ ] Basic info section
   - [ ] Attributes section
   - [ ] Physical traits
   - [ ] Characteristics

2. Test core.css + combat.css:
   - [ ] Combat stats
   - [ ] THAC0 block
   - [ ] Initiative block
   - [ ] Weapon proficiencies
   - [ ] Saving throws

### Phase 3: Items & Inventory
1. Test core.css + inventory.css:
   - [ ] Inventory list
   - [ ] Equipment sections
   - [ ] Currency blocks
   - [ ] Item controls

2. Test core.css + items.css:
   - [ ] Item sheets
   - [ ] Weapon items
   - [ ] Armor items
   - [ ] Consumable items

### Phase 4: Skills, Magic & Features
1. Test core.css + skills.css:
   - [ ] Non-weapon proficiencies
   - [ ] Skills layout
   - [ ] Proficiency controls

2. Test core.css + magic.css:
   - [ ] Spell slots
   - [ ] Spell lists
   - [ ] Magic UI elements

3. Test core.css + features.css:
   - [ ] Feature sheets
   - [ ] Effects system
   - [ ] Feature rolls

## Testing Results

### Core Styles Testing (Date: Current)
- Status: 
- Issues Found:
  1. Die roll buttons had unwanted borders and alignment issues
  2. Die roll buttons were invisible on dark backgrounds
- Fixes Applied:
  1. Reset all button styles and applied specific styling for standard vs. roll buttons
  2. Added default color (--color-roll-button: #4b4a44) to ensure visibility

### Character Sheet Testing (Date: ___)
- Status: Not Started
- Issues Found:
- Fixes Applied:

(Continue for each module...)

## Integration Testing
Once individual modules are verified:
1. Test combinations of related modules
2. Document any conflicts
3. Verify full system with all modules enabled
4. Remove _BACKUP.css import
