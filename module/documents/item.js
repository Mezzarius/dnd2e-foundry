export class DND2EItem extends Item {
    prepareData() {
        super.prepareData();

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
    }
}