// Import character sheet
import DND2ECharacterSheet from "./sheets/DND2ECharacterSheet.js";
import DND2EItemSheet from "./sheets/DND2EItemSheet.js";
import DND2ERaceSheet from "./sheets/DND2ERaceSheet.js";
import { DND2EFeatureSheet } from "./sheets/DND2EFeatureSheet.js";

import { DND2EItem } from "./documents/item.js";

Hooks.once('init', async function() {
  console.log('DND2E | Initializing Advanced Dungeons & Dragons 2E System');

  CONFIG.DND2E = {
      // Add item types configuration
      itemTypes: {
        weapon: "Weapon",
        armor: "Armor",
        consumable: "Consumable",
        equipment: "Equipment",
        spell: "Spell",
        nonWeaponProf: "Non-Weapon Proficiency",
        race: "Race",
        feature: "Feature"
      }
  };

  // Register custom Handlebars helpers
  Handlebars.registerHelper('selected', function(value1, value2) {
    return value1 === value2 ? 'selected' : '';
  });

  Handlebars.registerHelper('eq', function(v1, v2) {
    return v1 === v2;
  });

  Handlebars.registerHelper('checked', function(value) {
    return value ? 'checked' : '';
  });

  // Register the item-row partial explicitly
  Handlebars.registerPartial('item-row', await fetch('systems/dnd2e/templates/partials/item-row.hbs').then(r => r.text()));


  // Preload templates
  await loadTemplates([
    "systems/dnd2e/templates/partials/character-tab.hbs",
    "systems/dnd2e/templates/partials/equipment-tab.hbs",
    "systems/dnd2e/templates/partials/combat-tab.hbs",
    "systems/dnd2e/templates/partials/skills-tab.hbs",
    "systems/dnd2e/templates/partials/magic-tab.hbs",
    "systems/dnd2e/templates/partials/followers-tab.hbs",
    "systems/dnd2e/templates/partials/notes-tab.hbs",
    "systems/dnd2e/templates/partials/item-row.hbs"
  ]);

  // Register sheet application classes
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("dnd2e", DND2ECharacterSheet, { makeDefault: true });
  
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("dnd2e", DND2EItemSheet, { makeDefault: true });

  Items.registerSheet("dnd2e", DND2ERaceSheet, {
    types: ["race"],
    makeDefault: true
  });

  Items.registerSheet("dnd2e", DND2EFeatureSheet, {
    types: ["feature"],
    makeDefault: true
  });

  CONFIG.Item.documentClass = DND2EItem;
}); 