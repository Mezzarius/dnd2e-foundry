import DND2EItemSheet from "./DND2EItemSheet.js";

export default class DND2ERaceSheet extends DND2EItemSheet {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["dnd2e", "sheet", "item", "race"],
            template: "systems/dnd2e/templates/sheets/items/race-sheet.hbs",
            width: 520,
            height: 580,
            tabs: [{
                navSelector: ".sheet-tabs",
                contentSelector: ".sheet-body",
                initial: "attributes"
            }],
            dragDrop: [{
                dragSelector: ".item",
                dropSelector: ".inventory-list"
            }]
        });
    }

    getData() {
        const data = super.getData();
        
        // Ensure features array exists
        data.system.features = data.system.features || {};
        data.system.features.contents = data.system.features.contents || [];
        
        return data;
    }

    activateListeners(html) {
        super.activateListeners(html);

        console.log("DND2ERaceSheet | Activating listeners");

        if (!this.isEditable) return;

        // Edit feature
        html.find('.item-edit').click(async ev => {
            const li = $(ev.currentTarget).closest(".item");
            const featureId = li.data("itemId");
            const feature = this.item.system.features.contents.find(f => f._id === featureId);
            
            if (!feature) return;

            // Create a temporary Feature item
            const tempFeature = await Item.create(
                {
                    ...feature,
                    type: "feature"
                }, 
                { temporary: true }
            );
            
            // Render the sheet
            tempFeature.sheet.render(true);

            // Listen for the sheet closing to capture any changes
            tempFeature.sheet.options.closeCallback = async () => {
                const updatedData = tempFeature.toObject();
                const features = this.item.system.features.contents.map(f => 
                    f._id === featureId ? updatedData : f
                );
                
                await this.item.update({
                    'system.features.contents': features
                });
            };
        });

        html.find('.item-delete').click(ev => this._onFeatureDelete(ev));

        // Roll buttons
        html.find('.roll-height').click(ev => {
            console.log("DND2ERaceSheet | Height roll clicked");
            this._onRollHeight(ev);
        });
        html.find('.roll-age').click(ev => {
            console.log("DND2ERaceSheet | Age roll clicked");
            this._onRollAge(ev);
        });
        html.find('.roll-weight').click(ev => {
            console.log("DND2ERaceSheet | Weight roll clicked");
            this._onRollWeight(ev);
        });

        // Feature roll
        html.find('.feature-roll').click(this._onFeatureRoll.bind(this));
    }

    async _onDrop(event) {
        // Stop event propagation to prevent multiple triggers
        event.preventDefault();
        event.stopPropagation();
        
        event.currentTarget.classList.remove('drag-hover');

        let data;
        try {
            data = JSON.parse(event.dataTransfer.getData('text/plain'));
        } catch (err) {
            return false;
        }

        if (data.type !== "Item") return false;
        
        const item = await Item.fromDropData(data);
        
        if (item.type !== "feature") {
            ui.notifications.warn("Only features can be added to races!");
            return false;
        }

        // Get current features
        const features = this.item.system.features.contents || [];
        
        // Add new feature with a unique ID
        const newFeature = {
            ...item.toObject(),
            _id: foundry.utils.randomID()  // Add a unique ID
        };
        
        features.push(newFeature);

        // Update the race item with the new features array
        await this.item.update({
            'system.features.contents': features
        });

        return true;
    }

    async _onRollHeight(event) {
        const gender = event.currentTarget.dataset.gender;
        const base = parseInt(this.item.system.characteristics.heightRange[gender].base) || 0;
        const formula = this.item.system.characteristics.heightRange[gender].modifier;
        
        if (!formula) return;

        const roll = await new Roll(formula).evaluate({async: true});
        const total = base + roll.total;

        // Show the 3D dice if enabled
        if (game.dice3d) {
            await game.dice3d.showForRoll(roll);
        }

        let content = `<div class="dnd2e chat-card">`;
        content += `<h3>${this.item.name} Height Roll (${gender})</h3>`;
        content += `<div class="roll-details">`;
        content += `<div>Base Height: ${base}"</div>`;
        content += `<div>Roll (${formula}): ${roll.total}"</div>`;
        content += `<hr>`;
        content += `<div class="roll-total">Final Height: ${total}"</div>`;
        content += `</div></div>`;

        await ChatMessage.create({
            user: game.user.id,
            speaker: ChatMessage.getSpeaker({ actor: this.actor }),
            content: content,
            type: CONST.CHAT_MESSAGE_TYPES.OTHER,
            roll: roll
        });
    }

    async _onRollAge(event) {
        const base = parseInt(this.item.system.characteristics.ageRange.base) || 0;
        const formula = this.item.system.characteristics.ageRange.modifier;
        
        if (!formula) return;

        const roll = await new Roll(formula).evaluate({async: true});
        const total = base + roll.total;

        // Show the 3D dice if enabled
        if (game.dice3d) {
            await game.dice3d.showForRoll(roll);
        }

        let content = `<div class="dnd2e chat-card">`;
        content += `<h3>${this.item.name} Starting Age Roll</h3>`;
        content += `<div class="roll-details">`;
        content += `<div>Base Age: ${base} years</div>`;
        content += `<div>Roll (${formula}): ${roll.total} years</div>`;
        content += `<hr>`;
        content += `<div class="roll-total">Final Age: ${total} years</div>`;
        content += `</div></div>`;

        await ChatMessage.create({
            user: game.user.id,
            speaker: ChatMessage.getSpeaker({ actor: this.actor }),
            content: content,
            type: CONST.CHAT_MESSAGE_TYPES.OTHER,
            roll: roll
        });
    }

    async _onRollWeight(event) {
        const gender = event.currentTarget.dataset.gender;
        const base = parseInt(this.item.system.characteristics.weightRange[gender].base) || 0;
        const formula = this.item.system.characteristics.weightRange[gender].modifier;
        
        if (!formula) return;

        const roll = await new Roll(formula).evaluate({async: true});
        const total = base + roll.total;

        // Show the 3D dice if enabled
        if (game.dice3d) {
            await game.dice3d.showForRoll(roll);
        }

        let content = `<div class="dnd2e chat-card">`;
        content += `<h3>${this.item.name} Weight Roll (${gender})</h3>`;
        content += `<div class="roll-details">`;
        content += `<div>Base Weight: ${base} lbs</div>`;
        content += `<div>Roll (${formula}): ${roll.total} lbs</div>`;
        content += `<hr>`;
        content += `<div class="roll-total">Final Weight: ${total} lbs</div>`;
        content += `</div></div>`;

        await ChatMessage.create({
            user: game.user.id,
            speaker: ChatMessage.getSpeaker({ actor: this.actor }),
            content: content,
            type: CONST.CHAT_MESSAGE_TYPES.OTHER,
            roll: roll
        });
    }

    /**
     * Handle deleting a feature
     * @param {Event} event   The originating click event
     * @private
     */
    async _onFeatureDelete(event) {
        event.preventDefault();
        
        // Get the feature ID from the list item
        const li = event.currentTarget.closest('.item');
        const featureId = li.dataset.itemId;
        
        // Get current features and remove only the one with matching ID
        const features = this.item.system.features.contents.filter(f => f._id !== featureId);
        
        // Update the race item
        await this.item.update({
            'system.features.contents': features
        });
    }

    async _onFeatureRoll(event) {
        event.preventDefault();
        
        const featureId = event.currentTarget.dataset.featureId;
        const feature = this.item.system.features.contents.find(f => f._id === featureId);
        
        if (!feature || !feature.system.rollable.enabled || !feature.system.rollable.formula) return;

        try {
            // Create the roll and evaluate it
            const roll = await new Roll(feature.system.rollable.formula).evaluate({async: true});

            // Determine success/failure
            const total = roll.total;
            const target = feature.system.rollable.target;
            const isSuccess = feature.system.rollable.successCondition === "lte" ? 
                total <= target : 
                total >= target;

            // Create chat message content
            const messageContent = await renderTemplate("systems/dnd2e/templates/chat/feature-roll.hbs", {
                item: feature,
                roll: roll,
                total: total,
                target: target,
                isSuccess: isSuccess,
                successCondition: feature.system.rollable.successCondition === "lte" ? "<=" : ">="
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
}