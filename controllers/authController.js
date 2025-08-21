const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const AppError = require("../util/AppError");

exports.signup = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    //! crypt password for safity
    const bcryptPassword = await bcrypt.hash(password, 12);

    const user = new User({
      email: email,
      password: bcryptPassword,
      admin: false,
    });
    await user.save();
    res.status(201).json({ msg: "User Created!" });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return next(new AppError("No account found with this email", 404));
    }

    //! compare inputed passsword to encypted password in db
    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return next(new AppError("Invalid password", 400));
    }

    // Creating JWT token
    const token = jwt.sign(
      {
        id: user._id,
        admin: user.admin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Creating JWT refresh token
    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.REFRESH_TOKEN_SECRET
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true, //! !!change in devolopment
      sameSite: "none", //! !!change in devolopment
      maxAge: 15 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};

exports.refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) return res.sendStatus(401);

    const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const user = await User.findById(payload.id);

    if (!user) return next(new AppError("User not found ", 404));

    const { id, admin } = user;

    const newAccess = jwt.sign(
      { id: id, admin: admin },
      process.env.JWT_SECRET,
      {
        expiresIn: "5m",
      }
    );
    res.status(200).json({ accessToken: newAccess });
  } catch (err) {
    return next(new AppError("Invalid or expired token", 401));
  }
};
