// To use these functions in another file, make sure to add:
// const Tools = require('relative/path/to/tools/tools.js')
//
// Usage would then be Tools.functionName();

module.exports = {
    // Format character name (or any string) to replace spaces with '-' and make all letters lowercase
    formatSlug: function(input) {
        return input.replace(/\s+/g, '-').toLowerCase();
    },
}