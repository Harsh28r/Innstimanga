const userSchema = new mongoose.Schema({
    // ...
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: String,
    emailVerificationExpires: Date,
    // ...
  });