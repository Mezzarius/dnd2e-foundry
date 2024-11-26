export default class DND2EItemSheet extends ItemSheet {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["dnd2e", "sheet", "item"],
            width: 520,
            height: 580,
            tabs: [{
                navSelector: ".sheet-tabs",
                contentSelector: ".sheet-body",
                initial: "description"
            }]
        });
    }

    get template() {
        return `systems/dnd2e/templates/sheets/items/${this.item.type}-sheet.hbs`;
    }

    getData() {
        const data = super.getData();
        data.system = data.item.system;
        
        // Add specific data for consumables
        if (this.item.type === 'consumable') {
            data.isConsumable = true;
        }

        // Calculate total AC for armor items
        if (this.item.type === 'armor') {

            
            // Calculate total AC
            const magicBonus = data.system.magicBonus || 0;
            if (data.system.type === 'shield') {
                data.system.ac = data.system.baseAc + magicBonus;
            } else {
                data.system.ac = data.system.baseAc - magicBonus;
            }
        }
        
        return data;
    }

    activateListeners(html) {
        super.activateListeners(html);

        // Add specific listeners for consumable items if needed
        if (this.item.type === 'consumable') {
            html.find('.use-charge').click(this._onUseCharge.bind(this));
        }

        // Add property input handler for features
        if (this.item.type === 'feature') {
            html.find('.property-input').on('keydown', async (event) => {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    const input = event.currentTarget;
                    const newProperty = input.value.trim();
                    
                    if (newProperty) {
                        const properties = this.item.system.properties || [];
                        if (!properties.includes(newProperty)) {
                            await this.item.update({
                                'system.properties': [...properties, newProperty]
                            });
                            input.value = '';
                        }
                    }
                }
            });

            // Optional: Add click handler to remove properties
            html.find('.tag').click(async (event) => {
                const property = event.currentTarget.textContent;
                const properties = this.item.system.properties.filter(p => p !== property);
                await this.item.update({
                    'system.properties': properties
                });
            });
        }
    }

    async _onUseCharge(event) {
        event.preventDefault();
        const used = this.item.system.used || 0;
        const charges = this.item.system.charges || 0;
        
        if (used < charges) {
            await this.item.update({
                'system.used': used + 1
            });
        } else {
            ui.notifications.warn("No charges remaining!");
        }
    }
} 