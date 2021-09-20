const { PrismaClient } = require('@prisma/client');
var bcrypt = require("bcryptjs");
const prisma = new PrismaClient();
const fetchP = import('node-fetch').then(mod => mod.default)

module.exports.show = async( req, res) =>{
  try {
    const account = await prisma.account.findMany()
      res.json({
        status: 'success',
        result: account.length,
        account: account
      })
  } 
  catch (error) {
    return res.status(500).json({message: error.message})
  }
}

module.exports.findById = async( req, res) =>{
  try {
    const id = req.params.id
    const account = await prisma.account.findUnique({
      where : {
        id : Number(id)
      }
    })
    if(account){
      res.json(account)
    }
    else{
      return res.status(400).json({ ok: false, message: "Wrong account!" });
    }
  } 
  catch (error) {
    return res.status(500).json({message: error.message})
  }
}

module.exports.create = async( req, res) =>{
  try {
    var error = [];

    if (!req.body.name) {
      error.push("name");
    };
    if (!req.body.email) {
      error.push("email");
    };
    if (!req.body.password) {
      error.push("password");
    };
    if (!req.body.birthday) {
      error.push("birthday");
    };
    if (!req.body.age) {
      error.push("age");
    };
    if (!req.body.gender) {
      error.push("gender");
    };
    if (!req.body.totalScore) {
      error.push("Total Score");
    };
    if (!(error.length === 0)) {
      return res.status(400).json({
        ok: false,
        error: "Please input: " + error
      });
    };
    const email = await prisma.account.findUnique({
      where: { email: req.body.email }
    });
    if (email) {
      res.status(400).json({
        ok: false,
        error: "Email exist!"
      });
    } 
    else {
      var salt = bcrypt.genSaltSync(10);
      var hashPass = bcrypt.hashSync(req.body.password, salt);
      
      const account = await prisma.account.create({
        data: {
          name: req.body.name,
          email: req.body.email,
          password: hashPass,
          gender: req.body.gender,
          age: Number(req.body.age),
          birthday: req.body.birthday,
          totalScore: Number(req.body.totalScore)
        },
      });
      return res.json({ ok: true, message: "Create Account successfully!" });
    }

  } catch (error) {
    return res.status(500).json({message: error.message})
  }
  finally {
    async () =>
      await prisma.$disconnect()
  }
}

module.exports.update = async( req, res) =>{
  try {
    var error = [];

    if (!req.body.name) {
      error.push("name");
    };
    if (!req.body.email) {
      error.push("email");
    };
    if (!req.body.password) {
      error.push("password");
    };
    if (!req.body.birthday) {
      error.push("birthday");
    };
    if (!req.body.age) {
      error.push("age");
    };
    if (!req.body.gender) {
      error.push("gender");
    };
    if (!req.body.totalScore) {
      error.push("Total Score");
    };
    if (!(error.length === 0)) {
      return res.status(400).json({
        ok: false,
        error: "Please input: " + error
      });
    };

    const accountId = await prisma.account.findUnique({
      where: {
        id: Number(req.params.id)
      }
    });
    if (accountId) {
      var salt = bcrypt.genSaltSync(10);
      var hashPass = bcrypt.hashSync(req.body.password, salt);
      var emailUpdate = req.body.email;
      var nameUpdate = req.body.name;
      var birthdayUpdate = req.body.birthday;
      var genderUpdate = req.body.gender;
      var ageUpdate = req.body.age;
      var totalScoreUpdate = req.body.totalScore;

      const updateAccount = await prisma.account.update({
        where: {
          id: Number(req.params.id),
        },
        data: {
          name : nameUpdate,
          email :emailUpdate,
          password: hashPass,
          birthday : birthdayUpdate,
          gender : genderUpdate,
          age : ageUpdate,
          totalScore : totalScoreUpdate
        }
      });
      return res.json({ ok: true, message: "Update Account successfully!" });
    }
    else{
      return res.status(400).json({ ok: false, message: "Wrong account!" });
    }
  }
  catch (error) {
    return res.status(500).json({message: error.message})
  }
}

module.exports.deleteUser = async( req, res) =>{
  try {
    const accountId = await prisma.account.findUnique({
      where: {
        id: Number(req.params.id)
      }
    });
    if(accountId){
      const deleteAccount = await prisma.account.delete({
        where : {
          id: Number(req.params.id)
        }
      }) 
      return res.json({ ok: true, message: "Delete account successfully!" });
    }
    else{
      return res.status(400).json({ ok: false, message: "Wrong user!" });
    }
  } 
  catch (error) {
    return res.status(500).json({message: error.message})
  }
}