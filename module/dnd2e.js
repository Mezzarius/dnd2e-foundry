// Import character sheet
import DND2ECharacterSheet from "./sheets/DND2ECharacterSheet.js";
import DND2EItemSheet from "./sheets/DND2EItemSheet.js";

Hooks.once('init', async function() {
  console.log('DND2E | Initializing Advanced Dungeons & Dragons 2E System');

  CONFIG.DND2E = {
    // System-specific configurations will go here
  };

  // Preload templates
  await loadTemplates([
    "systems/dnd2e/templates/partials/character-tab.hbs",
    "systems/dnd2e/templates/partials/equipment-tab.hbs",
    "systems/dnd2e/templates/partials/combat-tab.hbs",
    "systems/dnd2e/templates/partials/skills-tab.hbs",
    "systems/dnd2e/templates/partials/magic-tab.hbs",
    "systems/dnd2e/templates/partials/followers-tab.hbs",
    "systems/dnd2e/templates/partials/notes-tab.hbs"
  ]);

  // Register sheet application classes
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("dnd2e", DND2ECharacterSheet, { makeDefault: true });
  
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("dnd2e", DND2EItemSheet, { makeDefault: true });
}); 