const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Chưa đăng nhập" });
  }

  const parts = authHeader.split(" ");

  if (parts.length !== 2) {
    return res.status(401).json({ message: "Header không hợp lệ" });
  }

  const scheme = parts[0];
  const token = parts[1];

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ message: "Sai định dạng token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Token không hợp lệ",
    });
  }
};
