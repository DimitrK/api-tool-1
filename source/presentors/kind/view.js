/* Kind layout main view */
enyo.kind({
    name: "presentor.kind.View",
    fit: true,
    kind: enyo.Control,
    published: {
        source: ""
    },
    components: [
    ],
    create: function() {
        this.inherited(arguments);
        if (this.getSource()) {
            this.present();
        }
    },
    sourceChanged: function(oldSource) {
        var newSource = this.getSource();
        if (oldSource != newSource) {
            this.present();
        }
    },
    present: function() {
        var sourceKind = this.getSource();
        var components = [{ kind: presentor.kind.Header, source: sourceKind }];
        if (sourceKind.comment) {
            components.push({ kind: presentor.kind.Summary, source: sourceKind.comment });
        }
        components.push({ kind: api.Properties, source: sourceKind.properties });

        this.createComponents(components, {owner: this});
        this.render();
    }
});