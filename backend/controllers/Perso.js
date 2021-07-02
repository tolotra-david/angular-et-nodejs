const User = require('../models/Perso')

exports.getUsers = (req, res, next) => {
    const id = req.params.id
    User.find({_id: {$ne: id}})
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            const error = {
                message: 'Can not get Users',
                statusCode: 404
            }
            next(error)
        })
}

exports.getCount = (req, res, next) => {
    User.count((err, count) => {
        res.status(200)
            .json({
                total: count
            })
    })
}

exports.createUsers = (req, res, next) => {
    const {username, password} = req.body;
    User.exists({username: username})
        .then(userExist => {
            if (userExist) {
                return res.status(200)
                    .json({ exist: true })
            }
            const user = new User({username, password})

            user.save()
                .then(result => {
                    res.status(200).json(
                        {
                            id: result._id
                        })
                })
                .catch(err => {
                    const error = {
                        message: 'Could not create user',
                        statusCode: 500
                    }
                    next(error)
                })

        })
}

exports.getUser = (req, res, next) => {
    const {username, password} = req.body;
    User.findOne({username: username, password: password})
        .then(user => {
            res.status(200)
                .json({
                    id: user._id
                })
        })
        .catch(err => {
            res.status(200).json({isNotFound: true})
        })
}

exports.getUserById = (req, res, next) => {
    const id = req.params.id;
    User.findById(id)
        .then(user => {
            res.status(200)
                .json(user)
        })
        .catch(err => {
            const error = {
                message: 'Could not find user : ',
                statusCode: 404
            }
            next(error)
        })
}

exports.updateUser = (req, res, next) => {
    const id = req.params.id
    const { username, password } = req.body
    User.findById(id)
        .then(user => {
            if(user.username === username && user.password !== password){
                user.password = password
                user.save()
                    .then(result => {
                        res.status(200).json({isUpdated: true})
                    })
                    .catch(err => {
                        const error = {
                            notFind: username,
                            statusCode: 404
                        }
                        next(error)
                    })
            }else if(user.username === username && user.password !== password){
                return res.status(200).json({isChange: false})
            }else{
                User.exists({username: username})
                    .then(exist => {
                        if(exist){
                            return res.status(200).json({exist: exist})
                        }
                        user.username = username
                        user.password = password

                        user.save()
                            .then(result => {
                                res.status(200).json({isUpdated: true})
                            })
                            .catch(err => {
                                const error = {
                                    notFind: username,
                                    statusCode: 404
                                }
                                next(error)
                            })
                    })
            }
        })

}

exports.deleteUser = (req, res, next) => {
    const id = req.params.id
    User.findById(id)
        .then(user => {
            return User.findByIdAndDelete(id)
        })
        .then(result => {
            res.status(200).json(true)
        })
        .catch(err => {
            const error = {
                message: 'Could not find user',
                statusCode: 404
            }
            next(error)
        })
}
