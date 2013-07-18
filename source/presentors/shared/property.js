/* Kind-view Presentor/Property */
enyo.kind({
    name: "kind.property",
    kind: enyo.Control,
    published: {
        property: "",
        kind: ""
    },
    components: [
        { tag: "a", name: "propertyName" },
        { tag: "div", name: "groupConditional", components: []},
        { tag: "label", name: "labelContainer", components: [
            { tag: "prototype", name: "protoName"}
        ] },
        { tag: "span", name: "functionSignature", allowHtml: true,}
    ],
    create: function() {
        this.inherited(arguments);
        if (this.getProperty()) {
            this.present();
        }
    },
    sourceChange: function(oldProperty) {
        var newProperty = this.getProperty();
        if (oldProperty != newProperty && !!newProperty) {
            this.present();
        }
    },
    present: function() {
        var property = this.getProperty();
        var kind = this.getKind();
        

        this.$.propertyName.attributeToNode("name", property.name);

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
            var fnSigText = "function(<arguments>" + property.value[0]['arguments'].join(", ") + ")<br/>";
            this.$.functionSignature.setContent(fnSigText);
        } else {
            this.presentValue(property, this.$.functionSignature);
        }
        this.presentComment(property.comment, this.$.functionSignature);
        this.createComponent({tag: "hr"}, {owner: this});
    },

    presentValue: function(inValue, inElement) {
        //console.log("value: ", inValue);
        var o = inValue.value;
        if (!o || !o[0]) {
            inElement.setContent(inValue.token);
        } else {
            this.presentExpression(o[0], inElement);
        }
        inElement.createComponents([{tag: "br"}], {owner: this});
    },

    presentExpression: function(inObject, inElement) {
        //console.log("expr: ", inObject);
        inElement.setAllowHtml(true, this);
        var o = inObject;
        if (o.comment) {
            return this.presentComment(o.comment);
        }
        if (o.type == "block") {
            inElement.setContent("{<blockquote><br/>" + this.presentBlock(o) + "</blockquote>}", this);
        }
        if (o.type == "array") {
            inElement.setContent("[<blockquote>" + this.presentArray(o) + "</blockquote>]", this);
        }
        inElement.setContent(o.token, this);// + "<br/>";
    },
    presentComment: function(inComment, inElement) {
        if (inComment) { 
            inElement.createComponents({ tag: "comment", allowHtml: true, content: this.markupToHtml(inComment)}, {owner: this});
        }
    },
    markupToHtml: function(inMarkup) {
        var html = Presentor.showdown.makeHtml(inMarkup || "");
        html = html.replace(/<pre><code>([\s\S]*?)<\/code><\/pre>/gm, function(m, c) {
            return "<pre>" + syntaxHighlight(c) + "</pre>";
        });
        return html;
    },


});