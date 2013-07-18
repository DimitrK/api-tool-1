/* Kind view Presentor/Header */
enyo.kind({
    name: "kind.properties",
    kind: enyo.Control,
    published: {
        source: "",
        inherited: "",
        protected: ""
    },
    components: [
        { tag: "package", name: "packageLabel" },
        { tag: "kind", name: "kindName" },
        { tag: "div", style: "padding: 4px 0px;", name: "inheritancePath", components: []}
    ],
    create: function() {
        this.inherited(arguments);
        var initialSource = this.getSource();
        if (initialSource) {
            this.presentFromSource(initialSource);
        }
    },
    sourceChange: function(oldSource) {
        var newSource = this.getSource();
        if (oldSource != newSource) {
            this.presentFromSource(newSource);
        }
    },
    presentFromSource: function(inSource) {
        var superKindControls = [];

        if (inSource.module && inSource.module.label) {
            this.$.packageLabel.setContent(inSource.module.label);
        }
        
        this.$.kindName.setContent(inSource.name);
        
        enyo.forEach(inSource.superkinds, function(superkind){
            superKindControls.push({ tag: "a", content: superkind, attributes: {
                href: "#"+superkind
            } });
        });

        this.$.inheritancePath.createComponents([superKindControls], {owner: this});
    }


});