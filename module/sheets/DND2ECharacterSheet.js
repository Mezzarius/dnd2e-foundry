import { AttributeTables } from "../tables/attributeTables.js";
import { SavingThrowTables } from "../tables/savingThrowTables.js";
import { ClassHitDice } from "../tables/classHitDice.js";

export default class DND2ECharacterSheet extends ActorSheet {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["dnd2e", "sheet", "actor"],
            template: "systems/dnd2e/templates/sheets/character-sheet.hbs",
            width: 720,
            height: 680,
            tabs: [{
                navSelector: ".sheet-tabs",
                contentSelector: ".sheet-body",
                initial: "character"
            }, {
                navSelector: ".notes-tabs",
                contentSelector: ".notes-container",
                initial: "background"
            }],
            dragDrop: [{dragSelector: ".item", dropSelector: ".equipment-container"}]
        });
    }

    getData() {
        const context = super.getData();
        
        // Ensure we have the actor data properly structured
        context.actor = this.actor;
        context.system = this.actor.system;
        
        // Initialize attribute modifiers
        Object.entries(this.actor.system.attributes).forEach(([key, attr]) => {
            if (!attr.value) return;
            this._calculateAttributeModifiers(key, attr.value, attr.exceptional);
        });

        // Calculate AC values
        const dexDefense = this.actor.system.attributes.dex?.defense || 0;
        const equippedArmor = this.actor.items.find(i => 
            i.type === "armor" && 
            i.system.type === "armor" && 
            i.system.equipped
        );
        const equippedShield = this.actor.items.find(i => 
            i.type === "armor" && 
            i.system.type === "shield" && 
            i.system.equipped
        );

        // Calculate AC for equipped items
        const armorAC = equippedArmor ? 
            (equippedArmor.system.baseAc - (equippedArmor.system.magicBonus || 0)) : 10;
        const shieldAC = equippedShield ? 
            (equippedShield.system.baseAc + (equippedShield.system.magicBonus || 0)) : 0;

        // Set AC values in context
        context.system.ac = {
            armor: equippedArmor ? {
                value: armorAC,
                name: equippedArmor.name
            } : { value: 10, name: "No Armor" },
            shield: equippedShield ? {
                value: shieldAC,
                name: equippedShield.name
            } : { value: 0, name: "No Shield" },
            dexMod: dexDefense,
            value: armorAC - shieldAC + dexDefense
        };

        this._calculateSavingThrows(context);

        // Add proficiencies data
        context.proficiencies = this.actor.items
            .filter(item => item.type === "nonWeaponProf")
            .map(prof => {
                const attrMod = this.actor.system.attributes[prof.system.attribute]?.value || 0;
                prof.totalScore = prof.system.baseScore + attrMod + prof.system.modifier;
                return prof;
            });

        // Add configuration data
        context.config = CONFIG.DND2E;
        
        // Add rich text editor configuration for notes
        context.enrichedBackgroundStory = TextEditor.enrichHTML(this.actor.system.background?.story || "", {async: false});
        context.enrichedAdventureNotes = TextEditor.enrichHTML(this.actor.system.notes?.adventure || "", {async: false});
        
        // Organize items by category
        context.weapons = context.items.filter(i => i.type === "weapon");
        context.armor = context.items.filter(i => i.type === "armor");
        context.consumables = context.items.filter(i => i.type === "consumable");
        context.equipment = context.items.filter(i => i.type === "equipment");

        // Calculate total weight
        context.totalWeight = context.items.reduce((acc, item) => {
            const itemWeight = item.system.weight || 0;
            const itemQuantity = item.system.quantity || 1;
            return acc + (itemWeight * itemQuantity);
        }, 0);

        // Add hit die based on class
        const characterClass = this.actor.system.class.toLowerCase();
        context.system.hp.hitDie = ClassHitDice[characterClass] || "d6"; // d6 as fallback

        return context;
    }

    async _updateObject(event, formData) {
        try {
            // Convert the flat formData into nested structure
            const expandedData = foundry.utils.expandObject(formData);
            
            // Ensure we're updating the system data properly
            const updateData = {
                system: expandedData.system
            };
            
            const result = await this.actor.update(updateData);
            return result;
        } catch (err) {
            console.error("Update failed:", err);
            ui.notifications.error("Failed to update character sheet");
            throw err;
        }
    }

    activateListeners(html) {
        super.activateListeners(html);

        // Add this near the top of your existing activateListeners
        html.find('input[name="system.attributes.str.value"]').change(event => {
            console.log("Strength field changed:", event.target.value);
        });

        // saving throw listeners
        html.find('input[name^="system.saves"][name$=".mod"]').change(this._onSavingThrowModChange.bind(this));

        // Equipment Tab Listeners
            // Add these lines near the top of the existing method
        if (this.actor.isOwner) {
            html.find('.equipment-container').on('dragover', this._onDragOver.bind(this));
            html.find('.equipment-container').on('drop', this._onDrop.bind(this));
        }
        html.find('.item-create').click(this._onItemCreate.bind(this));
        html.find('.item-edit').click(ev => {
            const li = $(ev.currentTarget).parents(".item");
            const item = this.actor.items.get(li.data("itemId"));
            item.sheet.render(true);
        });
        html.find('.item-delete').click(ev => {
            const li = $(ev.currentTarget).parents(".item");
            const item = this.actor.items.get(li.data("itemId"));
            item.delete();
        });
        html.find('.item-quantity input').change(ev => {
            const li = $(ev.currentTarget).parents(".item");
            const item = this.actor.items.get(li.data("itemId"));
            item.update({"system.quantity": ev.target.value});
        });
        html.find('.item-equipped input').change(async ev => {
            const li = $(ev.currentTarget).parents(".item");
            const item = this.actor.items.get(li.data("itemId"));
            
            // Only proceed if trying to equip (not unequip)
            if (ev.target.checked) {
                const itemType = item.system.type; // "armor" or "shield"
                
                // Find other equipped items of same type
                const equippedItems = this.actor.items.filter(i => 
                    i.type === "armor" && 
                    i.system.type === itemType && 
                    i.system.equipped && 
                    i.id !== item.id
                );

                // Unequip other items of same type
                for (let equippedItem of equippedItems) {
                    await equippedItem.update({"system.equipped": false});
                }
            }

            // Update the clicked item
            await item.update({"system.equipped": ev.target.checked});
            
            // Re-render sheet to update AC
            this.render(false);
        });
        html.find('.add-proficiency').click(this._onAddProficiency.bind(this));

        // Non-Weapon Proficiency Tab Listeners
        html.find('.nwp-create').click(this._onCreateNWP.bind(this));
        html.find('.nwp-edit').click(ev => {
            const li = $(ev.currentTarget).parents(".nwp-item");
            const prof = this.actor.items.get(li.data("itemId"));
            prof.sheet.render(true);
        });
        html.find('.nwp-delete').click(ev => {
            const li = $(ev.currentTarget).parents(".nwp-item");
            this.actor.deleteEmbeddedDocuments("Item", [li.data("itemId")]);
        });
        html.find('.nwp-check').click(ev => {
            const li = $(ev.currentTarget).parents(".nwp-item");
            const prof = this.actor.items.get(li.data("itemId"));
            this._onProficiencyCheck(prof);
        });

        // Drag and drop handling
        html.find('.henchman-drop-zone').on('drop', this._onDropHenchman.bind(this));
        html.find('.follower-drop-zone').on('drop', this._onDropFollower.bind(this));
        html.find('.familiar-drop-zone').on('drop', this._onDropFamiliar.bind(this));

        // Remove buttons
        html.find('.remove-henchman').click(this._onRemoveHenchman.bind(this));
        html.find('.remove-follower').click(this._onRemoveFollower.bind(this));
        html.find('.remove-familiar').click(this._onRemoveFamiliar.bind(this));

        // View sheet buttons
        html.find('.view-sheet').click(this._onViewSheet.bind(this));

        // Listen for attribute changes
        html.find('input[name^="system.attributes"]').change(async (event) => {
            const input = event.currentTarget;
            const value = input.value;
            const attributePath = input.name;
            
            await this._onAttributeChange(attributePath, value);
        });

        // Add this listener for exceptional strength
        html.find('input[name="system.attributes.str.exceptional"]').change(async (event) => {
            const strValue = this.actor.system.attributes.str.value;
            if (strValue === 18) {
                const exceptionalValue = event.target.value;
                await this._onAttributeChange('system.attributes.str.value', strValue, exceptionalValue);
            }
        });

        // Add hit die roll listener
        html.find('.roll-hit-die').click(this._onRollHitDie.bind(this));
    }

    async _onItemCreate(event) {
        event.preventDefault();
        const header = event.currentTarget;
        const type = header.dataset.type;
        const itemData = {
            name: `New ${type.capitalize()}`,
            type: type,
            system: foundry.utils.deepClone(game.system.model.Item[type])
        };
        return await Item.create(itemData, {parent: this.actor});
    }

    async _onAddProficiency(event) {
        event.preventDefault();
        const weaponProfs = this.actor.system.weaponProfs || {};
        const id = Object.keys(weaponProfs).length + 1;
        
        await this.actor.update({
            [`system.weaponProfs.${id}`]: {
                weapon: "",
                proficiency: "none",
                specialization: "none",
                attackBonus: "",
                damageBonus: "",
                rateOfFire: ""
            }
        });
    }

    async _onCreateNWP() {
        const itemData = {
            name: "New Proficiency",
            type: "nonWeaponProf"
        };
        await this.actor.createEmbeddedDocuments("Item", [itemData]);
    }

    async _onProficiencyCheck(prof) {
        const attrMod = this.actor.system.attributes[prof.system.attribute]?.value || 0;
        const totalScore = prof.system.baseScore + attrMod + prof.system.modifier;
        
        const roll = await new Roll("1d20").roll({async: true});
        const success = roll.total <= totalScore;

        const messageContent = `
            <h2>${prof.name} Check</h2>
            <p>Target Score: ${totalScore}</p>
            <p>Roll: ${roll.total}</p>
            <p>Result: <strong>${success ? "Success!" : "Failure"}</strong></p>
        `;

        ChatMessage.create({
            user: game.user._id,
            speaker: ChatMessage.getSpeaker({ actor: this.actor }),
            content: messageContent,
            roll: roll
        });
    }

    async _onDropHenchman(event) {
        event.preventDefault();
        const data = JSON.parse(event.dataTransfer.getData('text/plain'));
        
        if (data.type !== 'Actor' || !data.id) return;
        const actor = game.actors.get(data.id);
        if (!actor || actor.type !== 'character') return;

        const henchmen = this.actor.system.followers.henchmen;
        if (henchmen.list.length >= henchmen.max) {
            ui.notifications.warn("Maximum number of henchmen reached!");
            return;
        }

        await this.actor.update({
            'system.followers.henchmen.list': [...henchmen.list, {
                _id: actor.id,
                name: actor.name,
                img: actor.img,
                system: {
                    level: actor.system.level,
                    class: actor.system.class
                }
            }]
        });
    }

    async _onDropFollower(event) {
        event.preventDefault();
        const data = JSON.parse(event.dataTransfer.getData('text/plain'));
        
        if (data.type !== 'Actor' || !data.id) return;
        const actor = game.actors.get(data.id);
        if (!actor || actor.type !== 'monster') return;

        const followers = this.actor.system.followers.followers;
        if (followers.groups.length >= followers.max) {
            ui.notifications.warn("Maximum number of follower groups reached!");
            return;
        }

        await this.actor.update({
            'system.followers.followers.groups': [...followers.groups, {
                _id: foundry.utils.randomID(),
                actorId: actor.id,
                name: actor.name,
                img: actor.img,
                quantity: 1
            }]
        });
    }

    async _onDropFamiliar(event) {
        event.preventDefault();
        const data = JSON.parse(event.dataTransfer.getData('text/plain'));
        
        if (data.type !== 'Actor' || !data.id) return;
        const actor = game.actors.get(data.id);
        if (!actor || actor.type !== 'monster') return;

        await this.actor.update({
            'system.followers.familiar.creature': {
                _id: actor.id,
                name: actor.name,
                img: actor.img
            }
        });
    }

    _onRemoveHenchman(event) {
        const li = $(event.currentTarget).parents("[data-henchman-id]");
        const henchmanId = li.data("henchman-id");
        const henchmen = this.actor.system.followers.henchmen.list.filter(h => h._id !== henchmanId);
        this.actor.update({'system.followers.henchmen.list': henchmen});
    }

    _onRemoveFollower(event) {
        const li = $(event.currentTarget).parents("[data-group-id]");
        const groupId = li.data("group-id");
        const groups = this.actor.system.followers.followers.groups.filter(g => g._id !== groupId);
        this.actor.update({'system.followers.followers.groups': groups});
    }

    _onRemoveFamiliar(event) {
        this.actor.update({
            'system.followers.familiar.creature': null,
            'system.followers.familiar.benefits': "",
            'system.followers.familiar.abilities': {
                ability1: "",
                ability2: "",
                ability3: ""
            }
        });
    }

    _onViewSheet(event) {
        const li = $(event.currentTarget).parents("[data-henchman-id], [data-group-id]");
        const actorId = li.data("henchman-id") || li.data("group-id");
        const actor = game.actors.get(actorId);
        if (actor) actor.sheet.render(true);
    }

    async _onAttributeChange(attributePath, value) {
        // Extract attribute key (str, dex, etc.) from the path
        const attrMatch = attributePath.match(/system\.attributes\.(\w+)\./);
        if (!attrMatch) return;

        const attrKey = attrMatch[1];
        const table = AttributeTables[attrKey];
        if (!table) return;

        // Get current attribute data
        const attribute = this.actor.system.attributes[attrKey];
        const numValue = parseInt(value);

        // Find matching row in table
        let modifiers = {};
        
        if (attrKey === 'str' && numValue === 18 && attribute.exceptional) {
            // Handle exceptional strength
            const baseRow = table.modifiers.find(r => r.min <= numValue && r.max >= numValue);
            const excepRow = table.exceptional.find(r => 
                r.min <= attribute.exceptional && r.max >= attribute.exceptional
            );
            
            if (baseRow && excepRow) {
                modifiers = { ...baseRow, ...excepRow };
            }
        } else {
            // Handle normal attributes
            const row = table.modifiers.find(r => r.min <= numValue && r.max >= numValue);
            if (row) {
                modifiers = row;
            }
        }

        // Remove min/max from modifiers
        delete modifiers.min;
        delete modifiers.max;

        // Map table properties to system properties
        const mappings = {
            // Strength
            hit: 'hitMod',
            dmg: 'dmgMod',
            weight: 'weight',
            press: 'press',
            doors: 'doors',
            bblg: 'bblg',
            
            // Dexterity
            reaction: 'reaction',
            missile: 'missile',
            defense: 'defense',
            
            // Constitution
            hp: 'hpAdj',
            shock: 'shock',
            resurrection: 'resurrect',
            poison: 'poison',
            regen: 'regen',
            
            // Intelligence
            languages: 'languages',
            maxSpellLevel: 'maxSpellLevel',
            learn: 'learnSpell',
            maxSpells: 'maxSpellsPerLevel',
            
            // Wisdom
            magical: 'magicDefense',
            bonus: 'bonusSpells',
            failure: 'spellFail',
            immunity: 'immunity',
            
            // Charisma
            hench: 'henchmen',
            loyalty: 'loyalty',
            react: 'reaction'
        };

        // Prepare update data with mapped properties
        const updateData = {};
        for (const [tableKey, value] of Object.entries(modifiers)) {
            const systemKey = mappings[tableKey] || tableKey;
            updateData[`system.attributes.${attrKey}.${systemKey}`] = value;
        }

        // Update the actor
        await this.actor.update(updateData);
    }

    async _calculateAttributeModifiers(attrKey, value, exceptional = null) {
        const table = AttributeTables[attrKey];
        if (!table) return;

        const numValue = parseInt(value);
        let modifiers = {};
        
        if (attrKey === 'str' && numValue === 18 && exceptional) {
            // Handle exceptional strength
            const baseRow = table.modifiers.find(r => r.min <= numValue && r.max >= numValue);
            const excepRow = table.exceptional.find(r => 
                r.min <= exceptional && r.max >= exceptional
            );
            
            if (baseRow && excepRow) {
                modifiers = { ...baseRow, ...excepRow };
            }
        } else {
            // Handle normal attributes
            const row = table.modifiers.find(r => r.min <= numValue && r.max >= numValue);
            if (row) {
                modifiers = row;
            }
        }

        // Remove min/max from modifiers
        delete modifiers.min;
        delete modifiers.max;

        // Map table properties to system properties
        const mappings = {
            hit: 'hitMod',
            dmg: 'dmgMod',
            weight: 'weight',
            press: 'press',
            doors: 'doors',
            bblg: 'bblg',
            reaction: 'reaction',
            missile: 'missile',
            defense: 'defense',
            hp: 'hpAdj',
            shock: 'shock',
            resurrection: 'resurrect',
            poison: 'poison',
            regen: 'regen',
            magical: 'magicDefense',
            bonus: 'bonus',
            failure: 'spellFail',
            hench: 'henchmen',
            loyalty: 'loyalty'
        };

        // Prepare update data with mapped properties
        const updateData = {};
        for (const [tableKey, value] of Object.entries(modifiers)) {
            const systemKey = mappings[tableKey] || tableKey;
            updateData[`system.attributes.${attrKey}.${systemKey}`] = value;
        }

        // Update the actor
        await this.actor.update(updateData);
    }

    _onDragOver(event) {
        event.preventDefault();
        return false;
    }

    _onDrop(event) {
        // ... keep any existing _onDrop code if it exists ...
        
        event.preventDefault();
        
        let data;
        try {
            data = JSON.parse(event.dataTransfer.getData('text/plain'));
        } catch (err) {
            return false;
        }

        if (data.type === "Item") {
            return this._onDropItem(event, data);
        }
    }

    async _onDropItem(event, data) {
        if (!this.actor.isOwner) return false;
        
        const item = await Item.fromDropData(data);
        // Check if item type is valid for equipment
        const validTypes = ["weapon", "armor", "consumable", "equipment"];
        if (!validTypes.includes(item.type)) {
            ui.notifications.warn(`Cannot add items of type ${item.type} to equipment.`);
            return false;
        }

        const itemData = item.toObject();

        // Set default quantity to 1 if not present
        if (!itemData.system.quantity) {
            itemData.system.quantity = 1;
        }

        return this.actor.createEmbeddedDocuments("Item", [itemData]);
    }

    async _onSavingThrowModChange(event) {
        const input = event.currentTarget;
        const value = Number(input.value);
        const savePath = input.name.replace('.mod', '');
        const baseValue = getProperty(this.actor, savePath + '.base') || 0;
        
        await this.actor.update({
            [`${savePath}.mod`]: value,
            [`${savePath}.final`]: baseValue + value
        });
    }

    _calculateSavingThrows(context) {
        const characterClass = context.system.class.toLowerCase();
        const level = context.system.level;

        // Get base saves for class and level
        const classTable = SavingThrowTables[characterClass];
        if (!classTable) return;

        const row = classTable.modifiers.find(r => r.min <= level && r.max >= level);
        if (!row) return;

        // Get existing attribute modifiers
        const poisonMod = context.system.attributes.con?.poison || 0;
        const magicDefMod = context.system.attributes.wis?.magicDefense || 0;

        // Ensure saves object exists
        if (!context.system.saves) {
            context.system.saves = {};
        }

        // Calculate each save
        const saves = ['paralyzation', 'rod', 'petrification', 'breath', 'spell'];
        saves.forEach(save => {
            // Get base value from class table
            const base = row[save];
            
            // Ensure save object exists
            if (!context.system.saves[save]) {
                context.system.saves[save] = {
                    base: base,
                    mod: 0,
                    attrMod: 0,
                    final: base
                };
            }

            // Get manual modifier
            const mod = context.system.saves[save]?.mod || 0;

            // Apply attribute modifiers based on save type
            let attrMod = 0;
            if (save === 'paralyzation') {  // Poison/Death save
                attrMod = -poisonMod;
            } else if (save === 'rod' || save === 'spell') {  // Magical saves
                attrMod = -magicDefMod;
            }
            
            // Update save values
            context.system.saves[save] = {
                base: base,
                mod: mod,
                attrMod: attrMod,
                final: base + mod + attrMod
            };
        });
    }

    async _onRollHitDie(event) {
        event.preventDefault();
        const hitDie = this.actor.system.hp.hitDie;
        // Fix the property name from hpMod to hpAdj
        const hpAdj = Number(this.actor.system.attributes.con.hpAdj) || 0;

        
        // Roll the die using async evaluate
        const roll = await (new Roll(`1${hitDie}`)).evaluate();

            // Show the 3D dice animation
        if (game.dice3d) {
            await game.dice3d.showForRoll(roll);
        }

        const baseRoll = roll.total;
        const withAdj = Math.max(1, baseRoll + hpAdj);
        
        console.log("Base Roll:", baseRoll);
        console.log("With Adjustment:", withAdj);
        
        // Create our custom message content
        let content = `<div class="dnd2e chat-card">`;
        content += `<h3>Hit Die Roll (${hitDie})</h3>`;
        content += `<div class="roll-details">`;
        content += `<div>Base Roll: ${baseRoll}</div>`;
        content += `<div>Constitution Adjustment: ${hpAdj >= 0 ? '+' : ''}${hpAdj}</div>`;
        content += `<hr>`;
        content += `<div class="roll-total">Final Result: ${withAdj}</div>`;
        content += `</div></div>`;
        
        // Create chat message
        await ChatMessage.create({
            user: game.user.id,
            speaker: ChatMessage.getSpeaker({ actor: this.actor }),
            content: content,
            type: CONST.CHAT_MESSAGE_TYPES.OTHER,
            roll: roll        });
    }
} 