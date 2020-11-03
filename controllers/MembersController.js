const MembersModel = require('../models/MembersModel');

//Get all members
exports.getMembers = async function (req, res) {
    const members = await MembersModel.find({});
    res.send(members);
  };

  //Get Member by ID
  exports.getMember = async function (req, res, next) {
    try {
      const id = req.params.id;
      const member = await MembersModel.findById(id);
  
      res.send(member);
    } catch (e) {
      next(e);
    }
  };
  
  //Search Member
exports.searchMember = async function (req, res, next) {
  try {
    const query = req.query;// 
    // query user with userLogs with 1 filtered property (activity)
    const member = await MembersModel.find({ Name: query.name, Status: query.status});
    
    res.send(member);
  } catch (e) {
    next(e);
  }
};


//Insert Member
exports.insertMember = async function (req, res, next) {
  try {
    const event = new MembersModel(req.body);

    await event.save();

    res.sendStatus(201);
  } catch (e) {
    next(e);
  }
};

//Update Member
exports.updateMember = async function (req, res, next) {
  try {
    const id = req.params.id;

    await MembersModel.findByIdAndUpdate(id, req.body);

    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
};

//Delete Member
exports.deleteMember = async function (req, res, next) {
  try {
    const id = req.params.id;

    await MembersModel.findByIdAndDelete(id);

    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
};
