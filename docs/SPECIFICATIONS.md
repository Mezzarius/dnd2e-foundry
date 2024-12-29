# AD&D 2nd Edition System for Foundry VTT - Functional Specifications

## System Overview
This System for Foundry VTT v12 is a comprehensive implementation of the AD&D 2nd Edition rules.

## Technical Requirements

### Foundry VTT Compatibility
- Foundry VTT Version: v12.x
- Minimum Core Version: 12.0
- Compatible Core Version: ^12.0.0

### Style Guidelines
- Primary Font: Default Foundry font for main text
- Title Font: Baskerville Old Face (Small Caps)
- Primary Accent Color: #3c5c86 (Blue)
- UI Components should maintain consistent styling across all forms and sheets

## Core Features

### Character System
- Character creation and management
- Support for all AD&D 2E races and classes
- Implementation of THAC0 combat system
- Support for dual-classing and multi-classing
- Non-weapon proficiencies system
- Weapon proficiencies and specialization

### Combat System
- Initiative handling
- THAC0-based attack resolution
- Weapon vs. Armor Type adjustments
- Support for different combat styles
- Critical hits and fumbles
- Combat modifiers

### Magic System
- Spell memorization system
- Vancian magic implementation
- Priest and Wizard spell spheres/schools
- Spell components tracking
- Magical item creation and usage

### Equipment & Economy
- Currency management (CP, SP, EP, GP, PP)
- Encumbrance rules
- Equipment wear and maintenance
- Magical item charges and usage

### Game Master Tools
- NPC generation and management
- Encounter building
- Experience point calculation
- Treasure generation
- Random encounter tables

## Rule Variants and Optional Rules

### Supported Variant Rules
- Individual Initiative system
- Kit system (normalized implementation)
- Alternative Magic System:
  - Spell Slots as an alternative to Vancian memorization
  - Configurable per campaign

### Combat and Proficiency Variants
- Extended Weapon Proficiency System:
  - Weapon Expertise for non-fighter classes
  - Fighter-specific progression: Specialization, Mastery, High Mastery, and Grand Mastery
  - Weapon Group Proficiency system
- Armor and Shield Systems:
  - Shield Proficiency (enhanced AC benefits)
  - Armor Proficiency (reduced encumbrance effects)
- Fighting Style Specialization

### Data Model Impact
- Character data structure must accommodate both standard and variant rules
- Flexible proficiency system to handle multiple progression tracks
- Configurable magic system to support both Vancian and Spell Slot approaches
- Kit system integration with core character attributes

## Compatibility Requirements

### Module Integration
- Primary Focus: Standalone functionality
- Optional Integration:
  - Dice So Nice! module support
  - No other module dependencies required

### Data Management
- Self-contained data structure
- No external system dependencies
- Future-proofing for potential module integrations

## Localization Support

### Initial Release
- English language support only
- UTF-8 encoding for all text content
- Preparation for future localization

### Future Language Support
- Structured translation file format
- Separation of UI text from game content
- Documentation for translation contributors

## Data Structure

### Actor Types
- Player Characters
- Non-Player Characters
- Monsters/Creatures

### Item Types
- Weapons
- Armor
- Equipment
- Spells
- Features
- Proficiencies

## Implementation Phases

### Phase 1: Core Character Framework
- Primary data structures must support:
  - Base attributes with exceptional strength handling
  - Flexible saving throw system adaptable to different class progressions
  - Foundational character metadata (race, class, level, alignment)
  - Basic derived statistics (THAC0, AC, HP, Initiative)

### Phase 2: Class & Race Systems
- Data model requirements:
  - Extensible class system supporting future kit integration
  - Race-class relationship handling for restrictions and bonuses
  - Multi-class and dual-class capability in base character schema
  - Experience point tracking with different progression tables

### Phase 3: Combat & Equipment
- System architecture needs:
  - Combat action workflow framework
  - Equipment management system supporting variant encumbrance rules
  - Weapon proficiency and specialization tracking
  - Integration points for optional combat rules

## Data Model Requirements

### Schema Structure
- Available in ./template.json 

### Flexible Systems Support
- Configuration flags for variant rules
- Abstract magic system supporting both Vancian and Spell Slot approaches

### Data Relationships
- Character-to-Item relationships
- Class-to-Feature mappings
- Race-to-Feature mappings
- Kit-to-Class associations
- Class-to-Feature associations

### Migration Considerations
- Upgrade paths for schema changes
- Backwards compatibility requirements

## Technical Implementation Details

### File Structure
- Document the purpose of each major directory in docs/FILE-STRUCTURE.md
- Document the purpose of all variables in docs/DATA-SCHEMA.md

## Development Guidelines

### Code Style
- JavaScript coding standards
- Handlebars templates
- CSS styling

### Documentation Guidelines
- Documentation requirements
- Testing requirements
- Version control practices

### Contribution Guidelines
- Pull request process
- Code review requirements
- Testing requirements
- Documentation updates

## Version Control
- Git branch strategy
- Version numbering scheme
- Release process

## Testing Requirements
- Unit testing requirements
- Integration testing requirements
- User acceptance testing criteria

## Documentation Requirements
- Code documentation standards
- User documentation requirements
- API documentation standards

## Future Considerations
- Planned feature additions
- Compatibility roadmap
- Performance optimization goals

---

This document should be updated as new requirements are identified or existing requirements change. All major changes should be documented with dates and rationales.
