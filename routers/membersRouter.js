const express = require('express');
const membersController = require('../controllers/MembersController');
const {validateMember} = require('../validator/membersValidator');

const router = express.Router();
router.post('/', validateMember,membersController.insertMember);
router.get('/', membersController.getMembers);
router.get('/search', membersController.searchMember);
router.get('/:id', membersController.getMember);
router.put('/:id', validateMember,membersController.updateMember);
router.delete('/:id', membersController.deleteMember);
module.exports = router;
