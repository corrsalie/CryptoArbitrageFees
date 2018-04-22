function define(name, value) {
    Object.defineProperty(exports, name, {
        value:      value,
        enumerable: true
    });
}

define("TIKER", "TICKER");
define("MAKER", "MAKER");
