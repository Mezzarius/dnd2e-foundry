[![built with Codeium](https://codeium.com/badges/main)](https://codeium.com) ![Foundry VTT](https://img.shields.io/endpoint?url=https%3A%2F%2Ffoundryshields.com%2Fversion%3Fstyle%3Dflat%26url%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2Fthelensrpg%2Fdnd2e-foundry%2Frefs%2Fheads%2Fmain%2Fsystem.json) 

# AD&D 2nd Edition System for Foundry VTT

A comprehensive system implementation of the Advanced Second Era of the Original Fantasy RPG for Foundry Virtual Tabletop.

## Description

This system provides a complete implementation of A2E rules for Foundry VTT, including:

- Full character sheet implementation with all A2E attributes and mechanics
- Combat system with THAC0 calculations
- Weapon and non-weapon proficiencies
- Spell management for both Wizard and Priest spells
- Equipment and inventory management
- Follower and henchmen tracking
- Comprehensive saving throws system

## Installation

1. In Foundry VTT's Configuration and Setup screen, go to "Game Systems"
2. Click "Install System"
3. In the Manifest URL field enter: [Your manifest URL]
4. Click "Install"

## Features

### Character Management
- Complete attribute system including Strength exceptional percentage
- Automatic calculation of all attribute modifiers
- Race and class implementation with appropriate restrictions
- Experience point tracking and level management

### Combat
- THAC0 and Armor Class calculations
- Initiative tracking
- Weapon proficiency system
- Saving throws

### Magic System
- Spell slot management for both Wizard and Priest spells
- Spell memorization system
- Comprehensive spell database (in development)

### Equipment
- Inventory management with weight calculation
- Equipment status tracking
- Currency management

### Additional Features
- Follower and henchmen management
- Familiar system for spellcasters
- Non-weapon proficiency system
- Detailed character background and notes section

## Development

The system is structured following Foundry VTT's recommended practices. Key files and directories:

- `system.json`: System manifest
- `template.json`: Data template for Actors and Items
- `module/`: Core JavaScript modules
- `templates/`: Handlebars templates
- `styles/`: CSS stylesheets
- `lang/`: Localization files

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting pull requests.

## License

[Your chosen license]

## Acknowledgments

- The Foundry VTT development team
- Cursor, Codium, and Claude, without whom this would have gone a LOT slower.

## Support

For bugs, feature requests, or support, please [file an issue](https://github.com/thelensrpg/dnd2e-foundry/issues/new/choose).

## Project Status

This system is currently in active development. See our [development plan](docs/devplan.md) for upcoming features and current progress.