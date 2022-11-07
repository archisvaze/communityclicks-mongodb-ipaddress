const mongoose = require("mongoose");

const communityLinksSchema = new mongoose.Schema({
    name: {
        type: String
    },

    ip: {
        type: String,
        required: true
    },
    id: {
        type: Number, required: true
    },
}, {
    timestamps: true
}
)

module.exports = mongoose.model("communityLink", communityLinksSchema);