const mongoose = require('mongoose');
const uri = "mongodb://localhost:27017/globetrotter";

async function run() {
  try {
    console.log("Connecting to local MongoDB...");
    await mongoose.connect(uri);
    console.log("Connected successfully to local DB!");
    process.exit(0);
  } catch (err) {
    console.error("Connection failed:", err);
    process.exit(1);
  }
}
run();
