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

    /** @override */
    async _updateObject(event, formData) {
        // Handle effects separately to ensure proper array handling
        const updateData = {};
        const effects = [];
        
        // Extract and process effects data from the form
        for (let [key, value] of Object.entries(formData)) {
            if (key.startsWith('system.effects.')) {
                const match = key.match(/system\.effects\.(\d+)\.(.+)/);
                if (match) {
                    const [_, index, field] = match;
                    if (!effects[index]) effects[index] = {};
                    
                    if (field.includes('conditions.')) {
                        const condField = field.split('.')[1];
                        effects[index].conditions = effects[index].conditions || {};
                        if (condField === 'weapons') {
                            effects[index].conditions[condField] = value.split(',').map(w => w.trim()).filter(w => w);
                        } else {
                            effects[index].conditions[condField] = value;
                        }
                    } else {
                        setProperty(effects[index], field, field === 'value' ? Number(value) : value);
                    }
                }
            } else {
                updateData[key] = value;
            }
        }
        
        // Filter out any empty slots and ensure proper structure
        const cleanEffects = effects.filter(e => e).map(effect => ({
            type: effect.type || "bonus",
            target: effect.target || "attack",
            value: effect.value || 0,
            conditions: {
                weapons: effect.conditions?.weapons || [],
                situations: effect.conditions?.situations || []
            }
        }));
        
        // Update the item with both regular data and effects
        updateData["system.effects"] = cleanEffects;
        return this.object.update(updateData);
    }

    activateListeners(html) {
        super.activateListeners(html);

        console.log("activateListeners called"); // Debugging log

        if (!this.isEditable) return;

        html.find('.add-effect').click(this._onAddEffect.bind(this));
        html.find('.delete-effect').click(this._onDeleteEffect.bind(this));
        html.find('.roll-feature').click(this._onFeatureRoll.bind(this));

        // Handle form changes
        html.find('select[name^="system.effects"]').change(event => this._onSubmit(event));
        html.find('input[name^="system.effects"]').change(event => this._onSubmit(event));
        html.find('input[name="system.rollable.enabled"]').change(event => this._onSubmit(event));
    }

    async _onAddEffect(event) {
        event.preventDefault();
        
        const effects = foundry.utils.deepClone(this.item.system.effects || []);
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
    }

    async _onDeleteEffect(event) {
        event.preventDefault();
        
        const effectIndex = $(event.currentTarget).closest('.effect-entry').data('index');
        const effects = foundry.utils.deepClone(this.item.system.effects || []);
        effects.splice(effectIndex, 1);
        
        await this.item.update({"system.effects": effects});
    }

    async _onFeatureRoll(event) {
        event.preventDefault();

        const rollData = this.item.system.rollable;
        if (!rollData.enabled || !rollData.formula) return;

        try {
            // Create the roll and evaluate it
            const roll = await new Roll(rollData.formula).evaluate({async: true});

            // Determine success/failure
            const total = roll.total;
            const target = rollData.target;
            const isSuccess = rollData.successCondition === "lte" ? 
                total <= target : 
                total >= target;

            // Create chat message content
            const messageContent = await renderTemplate("systems/dnd2e/templates/chat/feature-roll.hbs", {
                item: this.item,
                roll: roll,
                total: total,
                target: target,
                isSuccess: isSuccess,
                successCondition: rollData.successCondition === "lte" ? "<=" : ">="
            });

            // Create chat data
            const chatData = {
                user: game.user.id,
                speaker: ChatMessage.getSpeaker({ actor: this.item.parent }),
                content: messageContent,
                sound: CONFIG.sounds.dice,
                type: CONST.CHAT_MESSAGE_TYPES.ROLL
            };

            // Show the roll in chat (this will trigger 3D dice)
            await roll.toMessage(chatData, {rollMode: game.settings.get("core", "rollMode")});

        } catch (error) {
            console.error("Error rolling feature:", error);
            ui.notifications.error(`Error rolling feature: ${error.message}`);
        }
    }

    getData() {
        const context = super.getData();
        
        // Ensure we have the item data in the right structure
        context.item = context.item || {};
        context.item.system = context.item.system || {};
        
        // Initialize effects array with proper structure if it doesn't exist
        if (!Array.isArray(context.item.system.effects)) {
            context.item.system.effects = [];
            // Update the item to ensure the effects array is saved
            this.item.update({"system.effects": []});
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

        return context;
    }
}