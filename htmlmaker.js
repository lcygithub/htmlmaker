var Tag = function(name, attr) {
    var that = {};
    var _tag = name;
    var _class = [];
    var _subs = [];
    if (attr != undefined) {
        var _attrs = attr;
    } else {
        var _attrs = {};
    }

    that.is_Tag = function() {
        return true;
    };

    that.class = function() {
        if (arguments.length) {
            for (var arg in arguments) {
                _class.push(arguments[arg]);
            }
        }
        console.log(_class);
        return this;
    };

    that.attr = function(key, value) {
        if (value === undefined) {
            return _attrs[key];
        } else {
            _attrs[key] = value;
        }
        return this;
    };

    that.toString = function() {
        var res = '<';
        res += _tag;
        for (var k in _attrs) {
            res += ' ' + k + '="' + _attrs[k] + '"';
        }
        if(_class.length) {
            res += ' class="'
            _class.map(function(cls) {
                res += cls + ' ';
            })
            res += res.substring(0, res.length - 1) + '"';
        }
        res += '>';
        _subs.map(function(child) {
            if (child != undefined) {
                res += child.toString();
            }
        }); 
        res += '<\/' + _tag + '>';
        return res;
    };

    that.push = function(tag) {
         _subs.push(tag);
         return this;
    };

    that.html = function() {
        var res = '';
        _subs.map(function(child) {
            res += child.toString();
        });
        return res;
    };

    that.show_subs = function() {
        return _subs;
    };

    return that;
}

function tag(name) {
    var attrs = {};
    var i = 1;
    if(typeof arguments[1] === "Object") {
        try {
            if (arguments[1].is_Tag()) {
                attrs = arguments[1];
            }
        } catch (e) {}
    }
    var t = Tag(name, attrs);
    for(; i<arguments.length; i++) {
        t.push(arguments[i]);
    }
    return t;
}