enyo.kind({
    name: 'api.extra.Disqus',
    kind: enyo.Control,
    published: {
        shortname: "pjetrsite",
        disqus_identifier: "",
        disqus_category_id: "",
        disqus_title: "",
        disqus_url: ""
    },
    components: [{
        name: "disqus_thread",
        classes: "disqus_thread",
        id: "disqus_thread",
        components: [{
            tag: 'noscript',
            components: [{
                tag: 'a',
                content: 'Please enable JavaScript to view the comments powered by Disqus.',
                attributes: {
                    href: "http://disqus.com/?ref_noscript"
                }
            }]
        }]
    }],

    create: function() {
        this.inherited(arguments);
        var that = this;
        var checkIfLoaded = function () {
            window.setTimeout(function() {
                if (document.getElementById("disqus_thread")){
                    that.start();
                } else {
                    checkIfLoaded();
                }
            }, 1000);      
        };
        checkIfLoaded();

    },

    start: function () {
        var disqus_identifier = this.getDisqus_identifier();
        var disqus_category_id = this.getDisqus_category_id();
        var disqus_title = this.getDisqus_title();
        var disqus_url = this.getDisqus_url();


        var dsq = document.createElement('script');
        dsq.type = 'text/javascript';
        dsq.async = true;
        dsq.src = '//' + this.getShortname() + '.disqus.com/embed.js';
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);

    },

    reset: function(pageid, url) {
        var disqus_identifier = this.getDisqus_identifier();
        var disqus_category_id = this.getDisqus_category_id();
        var disqus_title = this.getDisqus_title();
        var disqus_url = this.getDisqus_url();
        DISQUS.reset({
            reload: true,
            config: function () {  
                this.page.identifier = pageid || disqus_identifier;  
                this.page.url = url || disqus_url || document.URL;
            }
        });
    }
});