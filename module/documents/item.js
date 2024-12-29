export class DND2EItem extends Item {
    prepareData() {
        super.prepareData();

        // Initialize system data if it doesn't exist
        this.system = this.system || {};

        if (this.type === 'armor') {
            const magicBonus = this.system.magicBonus || 0;
            const baseAc = this.system.baseAc || 10;

            // Calculate total AC
            if (this.system.type === 'shield') {
                this.system.ac = baseAc + magicBonus;
            } else {
                this.system.ac = baseAc - magicBonus;
            }
        }
        else if (this.type === 'feature') {
            // Ensure effects array exists
            if (!Array.isArray(this.system.effects)) {
                this.system.effects = [];
            }

            // Ensure activation exists
            if (!this.system.activation) {
                this.system.activation = {
                    type: "passive",
                    cost: 0,
                    condition: ""
                };
            }

            // Ensure rollable exists
            if (!this.system.rollable) {
                this.system.rollable = {
                    enabled: false,
                    formula: "",
                    target: 0,
                    successCondition: "<="
                };
            }
        }
    }
}