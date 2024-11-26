export default class DND2ERaceSheet extends DND2EItemSheet {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["dnd2e", "sheet", "item", "race"],
            template: "systems/dnd2e/templates/sheets/items/race-sheet.hbs",
            width: 520,
            height: 480,
            tabs: [{
                navSelector: ".sheet-tabs",
                contentSelector: ".sheet-body",
                initial: "description"
            }],
            dragDrop: [{
                dragSelector: ".item",
                dropSelector: ".inventory-list"
            }]
        });
    }

    getData() {
        const data = super.getData();
        data.system = data.item.system;
        data.features = this.item.items?.filter(i => i.type === "feature") || [];
        return data;
    }

    activateListeners(html) {
        super.activateListeners(html);

        if (!this.isEditable) return;

        // Item management
        html.find('.item-edit').click(ev => {
            const li = $(ev.currentTarget).parents(".item");
            const feature = this.item.items.get(li.data("itemId"));
            feature.sheet.render(true);
        });

        html.find('.item-delete').click(ev => {
            const li = $(ev.currentTarget).parents(".item");
            const feature = this.item.items.get(li.data("itemId"));
            feature.delete();
        });

        // Set up drag/drop listeners
        const dropZone = html.find('.inventory-list')[0];
        if (dropZone) {
            dropZone.addEventListener('dragenter', this._onDragEnter.bind(this));
            dropZone.addEventListener('dragleave', this._onDragLeave.bind(this));
            dropZone.addEventListener('dragover', this._onDragOver.bind(this));
            dropZone.addEventListener('drop', this._onDrop.bind(this));
        }
    }

    _onDragEnter(event) {
        event.preventDefault();
        event.currentTarget.classList.add('drag-hover');
    }

    _onDragLeave(event) {
        event.preventDefault();
        if (event.currentTarget.contains(event.relatedTarget)) return;
        event.currentTarget.classList.remove('drag-hover');
    }

    _onDragOver(event) {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';
    }

    async _onDrop(event) {
        event.preventDefault();
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

        const itemData = item.toObject();
        return this.item.createEmbeddedDocuments("Item", [itemData]);
    }
} 