export class DND2EFeatureSheet extends ItemSheet {

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["dnd2e", "sheet", "item"],
            template: "systems/dnd2e/templates/sheets/items/feature-sheet.hbs",
            width: 520,
            height: 480,
            tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "main"}]
        });
    }

    activateListeners(html) {
        super.activateListeners(html);

        console.log("activateListeners called"); // Debugging log

        // Only if editable
        if (!this.isEditable) return;

        // Add effect button
        html.find('.add-effect').click(this._onAddEffect.bind(this));

        // Delete effect button
        html.find('.delete-effect').click(this._onDeleteEffect.bind(this));

        // Handle weapon condition changes
        html.find('.effect-weapons').change(async (ev) => {
            const effectIndex = $(ev.currentTarget).closest('.effect-entry').data('index');
            const effects = duplicate(this.item.system.effects || []);
            effects[effectIndex].conditions.weapons = ev.target.value.split(',').map(w => w.trim());
            await this.item.update({"system.effects": effects});
        });

        // Handle rollable checkbox
        html.find('input[name="system.rollable.enabled"]').change(async (ev) => {
            await this.item.update({
                "system.rollable.enabled": ev.target.checked
            });
        });
    }

    async _onAddEffect(event) {
        try {
            const effects = duplicate(this.item.system.effects || []);
            effects.push({
                type: "bonus",
                target: "attack",
                value: 0,
                conditions: {
                    weapons: [],
                    situations: []
                }
            });
            await this.item.update({"system.effects": effects});
            console.log("Effect added successfully:", effects);
        } catch (error) {
            console.error("Error adding effect:", error);
            ui.notifications.error("Failed to add effect");
        }
    }

    async _onDeleteEffect(event) {
        try {
            const index = $(event.currentTarget).closest('.effect-entry').data('index');
            const effects = duplicate(this.item.system.effects || []);
            effects.splice(index, 1);
            await this.item.update({"system.effects": effects});
            console.log("Effect deleted successfully");
        } catch (error) {
            console.error("Error deleting effect:", error);
            ui.notifications.error("Failed to delete effect");
        }
    }

    getData() {
        const context = super.getData();

        // Ensure we have the item data in the right structure
        context.item = context.item || {};
        context.item.system = context.item.system || {};
        
        // Initialize effects array if it doesn't exist
        if (!context.item.system.effects) {
            context.item.system.effects = [];
        }

        // Initialize rollable settings if they don't exist
        if (!context.item.system.rollable) {
            context.item.system.rollable = {
                enabled: false,
                formula: "",
                target: 0,
                successCondition: "lte"
            };
        }

        // Initialize activation if it doesn't exist
        if (!context.item.system.activation) {
            context.item.system.activation = {
                type: "passive",
                condition: ""
            };
        }

        // Add dropdown options for effect types and targets
        context.effectTypes = {
            bonus: "Bonus",
            advantage: "Advantage",
            special: "Special Ability"
        };

        context.effectTargets = {
            attack: "Attack Roll",
            damage: "Damage",
            ac: "Armor Class",
            save: "Saving Throw",
            ability: "Ability Check"
        };

        console.log("Sheet getData:", context); // Debugging log

        return context;
    }
}