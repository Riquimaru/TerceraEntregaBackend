import mongoose from "mongoose";
import config from "../config/config.js";
import config from "../config/config.js";

export let Per;

switch (config.persistence) {
    case "MONGO":
        const connection = mongoose.connect(mongUrl)
        break;
    case "MEMORY":
        break;
}