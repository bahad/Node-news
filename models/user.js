const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: { type: String, required: true, minLength: 4, maxLength: 12, unique: true },
    password: { type: String, required: true, minLength: 4 },
    isApproved: { type: Boolean, default: false },
    isBanned: { type: Boolean, default: false },
    badges: {
        yorumcu: { type: Boolean, default: false }, // 100 den fazla yorum
        yazar: { type: Boolean, default: false }, // En az 5 haber yükleme
        populer: { type: Boolean, default: false }, // En az 30 takipçisi olan
        onecikan: { type: Boolean, default: false }, // Haberi beğenilen
        sevilen: { type: Boolean, default: false }, // Yorumları en az 50 like almış
        sporsever: { type: Boolean, default: false }, // Spor haberlerine yorum yapan
        ekonomist: { type: Boolean, default: false } // Ekonomi haberlerine yorum yapan
    },
    level: { type: Number, default: 1, min: 1, max: 5 }, // 1 .. 5
    createdAt: { type: Number },
    comments: [{ haberBaslik: String, haberUrl: String, body: String }],
    followers: [{ userId: String, username: String }],
    geometry: {
        lat: { type: String },
        long: { type: String }
    }
});

module.exports = mongoose.model('User', userSchema);