const { Ticket } = require('../db/sequelize')
const { ValidationError } = require('sequelize')
// const auth = require('../auth/auth')

module.exports = (app) => {
  app.post('/api/tickets', (req, res) => {
    Ticket.create(req.body)
      .then(ticket => {
        const message = `votre ticket a bien été enregistré`
        res.json(ticket)
      }).catch((error)=>{
        if(error instanceof ValidationError){
          return res.status(400).json(error)
        }
        if(error instanceof UniqueConstraintError){
          return res.status(400).json({message:error.message,data:error})
        }
        const message = 'la liste n exist pas'
        res.status(500).json(error)
      })
  })
}
