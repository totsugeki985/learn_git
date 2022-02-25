const express = require("express")
const noteController = require( "../controllers/noteController" )

const base_path = "/api/notes/"

let router = express.Router()

router.route( "/test" )
.get( noteController.test )

router.route( "/register" )
.post( noteController.register )

router.route( "/login" )
.post( noteController.login )

router.route( base_path )
.post( noteController.addNote )
.get( noteController.getNotes )


router.route( base_path + "note/:id")
.get( noteController.getNote )
.patch( noteController.updateNote )
.delete( noteController.deleteNote )

router.route( base_path + "recent" )
.get( noteController.getRecent )

router.route( base_path + "important" )
.get( noteController.getImportant )

router.route( base_path + "date" )
.post( noteController.getByDate )

module.exports = router
