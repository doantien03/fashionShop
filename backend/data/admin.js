const bcrypt = require("bcryptjs");
const User = require("../models/user");

async function createAdmin(){

  const admin = await User.findOne({
    email:"admin@gmail.com"
  });

  if(admin){
    console.log("Admin already exists");
    return;
  }

  const hashedPassword =
    await bcrypt.hash(
      "Admin123",
      10
    );

  await User.create({
    name:"Admin",
    email:"admin@gmail.com",
    password:hashedPassword,
    role:"admin"
  });

  console.log(
    "Admin created"
  );
}

module.exports = createAdmin;