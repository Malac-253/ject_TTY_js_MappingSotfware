let helper = {
    // Makes/Works with HTML tags
    html: {
        img: function(src) {
            const temp = new Image() //create
            temp.src = src //set source
            return temp //give img tag to caller
        },
        anotherUtil: function() {}
    },
    animation: {
        // A function that animates something?
        animate: function(element) {}
    }
};