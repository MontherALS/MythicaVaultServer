const Creatures = require("../models/Creatures");
const AppError = require("../util/AppError");
exports.getCreatures = async (req, res, next) => {
  try {
    // Pagination and filtering parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const skip = (page - 1) * limit;
    const race = req.query.race || null;
    const region = req.query.region || null;

    // Constructing filter object based on query parameters
    const regionFilter = region ? { region } : {};
    const raceFilter = race && race !== "All" ? { race } : {};
    const filter = { ...regionFilter, ...raceFilter };

    // Count total creatures for pagination
    const allCreaturesCount = await Creatures.countDocuments(filter);
    // Fetching creatures with pagination and filtering
    const creatures =
      (await Creatures.find(filter).skip(skip).limit(limit)) || [];

    // const shuffledCreatures = creatures.sort(() => Math.random() - 0.5);

    // console.log(shuffledCreatures[0]);

    res.status(200).json({
      page: page,
      creatures: creatures,
      total: Math.ceil(allCreaturesCount / limit),
    });
  } catch (err) {
    next(err);
  }
};

exports.getCreatureId = async (req, res, next) => {
  try {
    const creature = await Creatures.findById(req.params.id);

    if (!creature) {
      return next(new AppError("Creature not found", 404));
    }
    res.status(200).json(creature); // Return the creature directly
  } catch (err) {
    next(err);
  }
};

//Admin Actions
exports.addCreatures = async (req, res, next) => {
  try {
    const {
      region,
      name,
      race,
      description,
      img,
      story,
      symbolism,
      tale,
      abilities,
      weaknesses,
    } = req.body;

    const creature = new Creatures({
      region: region,
      name: name,
      race: race,
      description: description,
      img: img,
      story: story,
      symbolism: symbolism,
      tale: tale,
      abilities: abilities,
      weaknesses: weaknesses,
    });

    await creature.save();
    res.status(201).json({ message: "Creature added successfully!" });
  } catch (err) {
    next(err);
  }
};
exports.deleteCreature = async (req, res, next) => {
  const id = req.params.id;

  try {
    const deletedCreature = await Creatures.findByIdAndDelete(id);

    if (!deletedCreature) return next(new AppError("Creature not found", 404));

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
exports.updateCreature = async (req, res, next) => {
  const id = req.params.id;
  if (!id) return next(new AppError("Creature ID is required", 400));
  const {
    region,
    name,
    description,
    img,
    story,
    race,
    abilities,
    weaknesses,
    // tale,
    symbolism,
  } = req.body;

  // checking to not update and send empty strings
  const updateFields = {};

  if (region.trim() !== "") updateFields.region = region;
  if (name.trim() !== "") updateFields.name = name;
  if (description.trim() !== "") updateFields.description = description;
  if (img.trim() !== "") updateFields.img = img;
  if (story.trim() !== "") updateFields.story = story;
  if (race.trim() !== "") updateFields.race = race;
  if (abilities.trim() !== "") updateFields.abilities = abilities;
  if (weaknesses.trim() !== "") updateFields.weaknesses = weaknesses;
  // if (tale.trim() !== "") updateFields.tale = tale;
  if (symbolism.trim() !== "") updateFields.symbolism = symbolism;

  try {
    const updatedCreature = await Creatures.findByIdAndUpdate(
      id,
      updateFields,
      { new: true }
    );
    if (!updatedCreature) {
      return res.status(404).json({ message: "Creature not found" });
    }
    res.status(200).json({ message: "Done", creature: updatedCreature });
  } catch (err) {
    next(err);
  }
};
