import mongoose, { Schema } from "mongoose";
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    image: {
        type: String,
        required: false,
        default: "https://thf.bing.com/th/id/OIP.OcQwsWoGzsWeTRcMnP7E2QHaHa?w=199&h=199&c=7&r=0&o=7&cb=thfc1falcon2&dpr=1.3&pid=1.7&rm=3"
    },
    role: {
        type: String,
        enum: ["user", "admin", "restaurant", "rider", null],
        default: null,
    },
    password: {
        type: String,
        select: false,
    },
    provider: {
        type: String,
        enum: ["local", "google"],
        default: "local",
        required: true,
    },
    refreshToken: {
        type: String
    },
}, { timestamps: true });
export const User = mongoose.model("User", userSchema);
