/* kind Presentor */
enyo.kind({
    name: "kind.View",
    fit: true,
    kind: enyo.Control,
    published: {
        source: ""
    },
    components: [
        {name: "container"}
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
        this.$.container.createComponent({ kind: kind.header, source: this.getSource() }, {owner: this});
        this.render();
    }
});