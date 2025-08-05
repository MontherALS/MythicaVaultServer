const User = require("../models/User");
const AppError = require("../util/AppError");

exports.getProfileData = async (req, res, next) => {
  const { id } = req.user;
  try {
    if (!id) return next(new AppError("Unauthorized", 401));

    const user = await User.findById(id).populate("favoriteCreatures");

    if (!user) {
      return next(new AppError("User not found", 404));
    }
    const data = {
      profile: user.profile,
      favoriteCreatures: user.favoriteCreatures,
    };

    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { id } = req.user;

    const { username } = req.body;
    const updateObj = {};

    if (username !== undefined) updateObj["profile.username"] = username;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updateObj },
      { new: true }
    ).populate("favoriteCreatures"); // check if this is needed

    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

exports.getFavCreature = async (req, res, next) => {
  try {
    const userId = req.user.id;
    if (!userId) return next(new AppError("No id (token) provided", 401));

    const user = await User.findById(userId)
      .select("favoriteCreatures")
      .populate("favoriteCreatures");

    if (!user) return next(new AppError("User not found", 404));

    return res.status(200).json({ favoriteCreatures: user.favoriteCreatures });
  } catch (err) {
    next(err);
  }
};

exports.addFavCreature = async (req, res, next) => {
  const userId = req.user.id;
  const favCreatureId = req.params.id;

  try {
    if (!userId) return next(new AppError("No id (token) provided", 401));

    const user = await User.findById(userId);

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    if (user.favoriteCreatures.includes(favCreatureId)) {
      return next(new AppError("Creature is already in favorites", 400));
    }

    user.favoriteCreatures.push(favCreatureId);
    await user.save();

    return res.status(200).json({ message: "Creature added to favorites" });
  } catch (err) {
    next(err);
  }
};

exports.deleteFavCreature = async (req, res, next) => {
  const userId = req.user.id;
  const favCreatureId = req.params.id;
  try {
    if (!userId) return next(new AppError("No id (token) provided", 401));

    const user = await User.findById(userId);

    if (!user) return next(new AppError("User not found", 404));

    if (user.favoriteCreatures.includes(favCreatureId)) {
      user.favoriteCreatures = user.favoriteCreatures.filter(
        (favs) => favs.toString() !== favCreatureId
      );

      await user.save();
      return res.status(200).json({ message: "Favorite removed successfully" });
    } else {
      return next(new AppError("Creature not in favorites", 404));
    }
  } catch (err) {
    next(err);
  }
};
