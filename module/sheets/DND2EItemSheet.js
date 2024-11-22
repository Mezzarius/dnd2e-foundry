export default class DND2EItemSheet extends ItemSheet {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["dnd2e", "sheet", "item"],
            width: 520,
            height: 480,
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
        
        return data;
    }

    activateListeners(html) {
        super.activateListeners(html);

        // Add specific listeners for consumable items if needed
        if (this.item.type === 'consumable') {
            html.find('.use-charge').click(this._onUseCharge.bind(this));
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