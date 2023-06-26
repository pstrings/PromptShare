import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists"],
    required: [true, "Email is required"],
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
    ],
  },
  image: {
    type: String,
  },
});

// models contains list of all the models previously created so it'll only create model when it doesn't already exists. This is because, in Next the server is not always running so to not waste spinning it up if it already exists.
const User = models.User || model("User", UserSchema);

export default User;
