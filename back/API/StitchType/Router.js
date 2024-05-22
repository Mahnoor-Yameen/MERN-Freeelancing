const express=require('express')
const router=express.Router()


const {CreateStitchType,AllStitchTypes, StitchTypeByName, StitchTypeByID, UpdateStitchType, DeleteStitchType} =require('./Controller')

router.post('/create-StitchType',CreateStitchType)
router.get('/get-StitchType-by-name',StitchTypeByName)
router.get('/get-all-StitchTypes',AllStitchTypes)
router.get('/get-StitchType-by-id',StitchTypeByID)
router.put('/update-StitchType',UpdateStitchType)
router.delete('/delete-StitchType',DeleteStitchType)

module.exports=router