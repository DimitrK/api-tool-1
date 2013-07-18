/* Kind summary view :: presentors/kind/summary.js */
enyo.kind({
    name: "presentor.kind.Summary",
    kind: enyo.Control,
    published: {
        source: ""
    },
    components: [
        {tag: "h3", content: "Summary"},
        {kind: api.Comment, name: "comment"}
    ],
    create: function() {
        this.inherited(arguments);
        if (this.getSource()) {
            this.present();
        }
    },
    sourceChange: function(oldSource) {
        if (oldSource != this.getSource()) {
            this.present();
        }
    },
    present: function() {
        var source = this.getSource();
        this.$.comment.setSource(this.getSource);
    }
});