const thought = require('../models/Thought')
const Thought = require('../models/Thought')
const user = require('../models/User')

const { Op } = require('sequelize')

module.exports = class ThoughtController{
    static async dashboard(req, res){
        const userId = req.session.userId

        const user = await User.findOne({
            where:{
                id:userId,
            },
            include : Thought,
            plain: true,
        })
        const thoughts = user.Thought.map((result) => result.dataValues)

        let emptyThoughts = true

        if(thoughts.leght > 0){
            emptyThoughts = false
        }
        console.log(thoughts)
        console.log(emptyThoughts)

        res.render('thoughts/dashboard',(thoughts, emptyThoughts))
    }
    static showThoughts(req, res){
        console.log(req.query)

        let search=''

        if(req.query.search){
            search = req.query,search
        }

        let order = 'DESC'

        if(req.query.order === 'old'){
            order = 'ASC'
        }
        console.log(order)
        thought.findAll({
            include: User,
            where:{
                title:{[Op.like]:`%${search}%`},
            },
            order:[['createAt', order]]
        })
    }
}