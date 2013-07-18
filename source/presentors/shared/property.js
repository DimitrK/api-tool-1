/* Kind-view Presentor/Property */
enyo.kind({
    name: "api.Property",
    kind: enyo.Control,
    published: {
        source: "",
        ownerkind: ""
    },
    components: [
        { tag: "a", name: "propertyName" },
        { tag: "div", name: "groupConditional", components: []},
        { tag: "label", name: "labelContainer", components: [
            { tag: "prototype", name: "protoName"}
        ] },
        { tag: "div", name: "functionSignature", components: [
            { tag: "span", content: "function(<arguments>"},
            { tag: "span", name: "functionArguments",content: ""},
            { tag: "span", content: "</arguments>)<br/>"}
        ]}
    ],
    create: function() {
        this.inherited(arguments);
        if (this.getSource()) {
            this.present();
        }
    },
    sourceChange: function(oldProperty) {
        var newProperty = this.getSource();
        if (oldProperty != newProperty && !!newProperty) {
            this.present();
        }
    },
    present: function() {
        var property = this.getSource();
        var kind = this.getOwnerkind();
        

        this.$.propertyName.setAttribute("name", property.name);

        if (property.group) {
            this.$.groupConditional.setTag(property.group, this);
            this.$.groupConditional.setContent(property.group, this);
        } else {
            this.$.groupConditional.destroy();
        }

        if (property.object && kind && kind != property.object) {
            this.$.protoName.setContent(property.object.name, this);
        } else {
            this.$.protoName.destroy();
            var propertyProto = property.name.replace(".prototype", "");
            this.$.labelContainer.setContent(propertyProto);
        }

        if (property.value && property.value[0] && property.value[0].token == "function") {
            this.$.functionArguments.setContent(property.value[0]['arguments'].join(", "));
        } else {
            this.$.functionSignature.destroyComponents();
            this.presentValue(property, this.$.functionSignature);
        }
        this.$.functionSignature.createComponent({ kind: api.Comment, source: property.comment});
        this.createComponent({tag: "hr"}, {owner: this});
    },

    presentValue: function(inValue, inElement) {
        //console.log("value: ", inValue);
        if (!inValue.value || !inValue.value[0]) {
            inElement.createComponent({tag: "span", content: inValue.token});
        } else {
            inElement.createComponent({kind: api.Expression, source: inValue.value[0]}, { owner: this });
        }
        inElement.createComponent({tag: "br"}, {owner: this});
    }
});