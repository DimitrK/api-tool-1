/* Kind properties view :: presentors/kind/properties.js */
enyo.kind({
    name: "api.Properties",
    kind: enyo.Control,
    published: {
        source: "",
        ownerkind: ""
    },
    components: [
        
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
        var filteredProps = api.helper.groupFilter(this.getSource());
        var ownerkind = this.getOwnerkind();
        for (var i = 0, prop; (prop = filteredProps[i]); i++) {
            this.createComponent({kind: api.Property, source: prop, ownerkind: ownerkind});
        }

    }
});