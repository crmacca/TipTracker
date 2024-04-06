const { PrismaClient } = require('@prisma/client');
const express = require('express');
const passport = require('passport');
const router = express.Router();
const prisma = new PrismaClient();

router.get('/', checkAuthenticated, async (req, res) => {
    
        try {
    
            const groups = await prisma.group.findMany({ //Find all groups
                where: {
                    members: {
                        some: {
                            userId: req.user.id
                        }
                    }
                }
            });
    
            return res.status(200).json({ success: true, groups: groups });
    
        } catch(err) { // Incase of database issue
            console.error(err);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
})

router.post('/new', checkAuthenticated, async (req, res) => {

    const { name } = req.body;

    if (!name) { //Gathers all body paramaters into variables
        return res.status(400).json({ success: false, message: 'Name, description and members are required' });
    }

    try {

        const newGroup = await prisma.group.create({ //Create group
            data: {
                name: name,
                members: {
                    connect: {
                        userId: req.user.id
                    }
                }
            }
        });

        return res.status(200).json({ success: true, message: 'Group created', group: newGroup });

    } catch(err) { // Incase of database issue
        console.error(err);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }

});

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else return res.status(403).json({ success: false, message: 'Unauthorised' });
  }

module.exports = router;
