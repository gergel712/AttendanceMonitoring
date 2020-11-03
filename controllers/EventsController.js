const EventsModel = require('../models/EventsModel');
const AttendanceModel= require('../models/AttendanceModel');
const json2xls = require('json2xls');
const fs = require('fs');
const { json } = require('express');
//Get all events
exports.getEvents = async function (req, res) {
  const events = await EventsModel.find({})
  .populate({ 
    path: 'MemberAttendance',
    select: 'eventName, evenType,startDate,endDate'
    ,
    populate: {
      path: 'member',
      model: 'Members',
      select: 'Name'
    } 
 });
  res.send(events);
};

//Get Event by id
 //Get Member by ID
 exports.getEvent = async function (req, res, next) {
  try {
    const id = req.params.id;
    const event = await EventsModel.findById(id)
    .populate({ 
      path: 'MemberAttendance',
      populate: {
        path: 'member',
        model: 'Members',
        select: 'Name'
      } 
   });
    res.send(event);
  } catch (e) {
    res.status(500).send('No event found!');
    next(e);
  }
};

//Export Event
exports.exportEvent = async function (req, res, next) {
  try {
    let newEvent={};
    const query = req.query;// query = {sex:"female"}
    // query user with userLogs with 1 filtered property (activity)
    const event = await EventsModel.find({ _id: query.eventId })
    .populate({ 
      path: 'MemberAttendance',
      populate: {
        path: 'member',
        model: 'Members',
        select: 'Name'
      } 
   });
   newEvent=await normalizeData(event,true);
    res.send(newEvent);

    let xls= json2xls(newEvent);
    fs.writeFileSync(event[0].eventName+ '_EventStartDateTime' + '.xlsx', xls, 'binary');
  } catch (e) {
    next(e);
  }
};

//Search Event
exports.searchEvent = async function (req, res, next) {
  try {
    const query = req.query;
    const event = await EventsModel.find({ eventName:query.eventName, startDate:query.startDate, endDate:query.endDate })
    .populate({ 
      path: 'MemberAttendance',
      populate: {
        path: 'member',
        model: 'Members',
        select: 'Name'
      } 
   });
    
    res.send(event);
  } catch (e) {
    next(e);
  }
};

//Insert Event
exports.insertEvent = async function (req, res, next) {
  try {
    const event = new EventsModel(req.body);

    await event.save();

    res.sendStatus(201);
  } catch (e) {
    next(e);
  }
};

//Update Event
exports.updateEvent = async function (req, res, next) {
  try {
    const id = req.params.id;

    await EventsModel.findByIdAndUpdate(id, req.body);

    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
};


exports.deleteEvent = async function (req, res, next) {
  try {
    const id = req.params.id;
    const hasChild= await AttendanceModel.find({ event: id })

    if(hasChild.length>0){
      res.status(500).send('Event has attendance!')
    }
    else{
      await EventsModel.findByIdAndDelete(id);
      res.sendStatus(200);
    }

  } catch (e) {
    next(e);
  }
};

async function normalizeData(event, isExport) {  
let newObj={};
let memberAttendance=[];
  for (let i=0; i<event[0].MemberAttendance.length; i++) {
    if (isExport){
      newObj= {
        'MemberName': event[0].MemberAttendance[i].member.Name,
        'Time-in': event[0].MemberAttendance[i].timeIn,
        'Time-out': event[0].MemberAttendance[i].timeOut
     };
    }
    else{
      newObj= {
        'MemberId': event[0].MemberAttendance[i].member._id,
        'MemberName': event[0].MemberAttendance[i].member.Name,
        'Time-in': event[0].MemberAttendance[i].timeIn,
        'Time-out': event[0].MemberAttendance[i].timeOut
     };
    }
  
    memberAttendance.push(newObj);
}
 return memberAttendance;
}

