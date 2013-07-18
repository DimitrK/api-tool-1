/* api comment :: presentors/shared/comment.js */
enyo.kind({
    name: "api.Comment",
    kind: enyo.Control,
    published: {
        source: ""
    },
    components: [
        {tag: "comment", allowHtml: true, name: "comment"}
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
        this.$.comment.setContent(this.markupToHtml(this.getSource()));
    },
    markupToHtml: function(inMarkup) {
        /* global syntaxHighlight, Showdown */
        var html = api.Comment.showdown.makeHtml(inMarkup || "");
        html = html.replace(/<pre><code>([\s\S]*?)<\/code><\/pre>/gm, function(m, c) {
            return "<pre>" + syntaxHighlight(c) + "</pre>";
        });
        return html;
    },
    statics: {
        showdown: new Showdown.converter()
    }
});