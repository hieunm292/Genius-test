const { PrismaClient } = require('@prisma/client');
var bcrypt = require("bcryptjs");
const prisma = new PrismaClient();
const fetchP = import('node-fetch').then(mod => mod.default)

module.exports.show = async (req, res) =>{
    try {
        const task = await prisma.task.findMany()
            res.json({
                status: 'success',
                result: task.length,
                task: task
            })
    } 
    catch (error) {
        return res.status(500).json({message: error.message})
    }
    finally {
        async () =>
            await prisma.$disconnect()
    }
}

module.exports.findById = async (req, res) =>{
    try {
        const taskId = await prisma.task.findUnique({
            where : {
                id: Number(req.params.id)
            }
        })
        if(taskId){
            res.json(taskId)
        }
        else{
            return res.status(400).json({ ok: false, message: "Wrong task !" });
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
    finally {
        async () =>
            await prisma.$disconnect()
    }
}

module.exports.create = async( req, res) =>{
    try {
        var error = [];

        if (!req.body.description) {
        error.push("description");
        };
        if (!req.body.score) {
        error.push("score");
        };
        if (!req.body.accountId) {
        error.push("accountId");
        };
        if (!(error.length === 0)) {
            return res.status(400).json({
              ok: false,
              error: "Please input: " + error
            });
        };
        const accountId = await prisma.account.findUnique({
            where: {
                id: req.body.accountId
            }
        });
        if(!accountId){
            return res.status(400).json({ ok: false, message: "Wrong account!" });
        }
        else{
            const task = await prisma.task.create({
                data: {
                    description: req.body.description,
                    score: Number(req.body.score),
                    accountId: req.body.accountId
                },
            })
            return res.json({ ok: true, message: "Create Task successfully!" });
        }
    } 
    catch (error) {
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

        if (!req.body.description) {
            error.push("description");
        };
        if (!req.body.score) {
            error.push("score");
        };
        if (!req.body.accountId) {
            error.push("accountId");
        };
        if (!(error.length === 0)) {
            return res.status(400).json({
                ok: false,
                error: "Please input: " + error
            });
        };
        const taskId = await prisma.task.findUnique({
            where: {
                id: Number(req.params.id)
            }
        })
        if(!taskId){
            return res.status(400).json({ ok: false, message: "Wrong task!" });
        }
        else{
            const accountId = await prisma.account.findUnique({
                where: {
                    id: Number(req.body.accountId)
                }
            });
            
            if(!accountId){
                return res.status(400).json({ ok: false, message: "Wrong account!" });
            }
            else{
                var descUpdate = req.body.description;
                var scoreUpdate = req.body.score;
                var accountIdUpdate = req.body.accountId;
    
                const taskUpdate = await prisma.task.update({
                    where: {
                        id: Number(req.params.id),
                    },
                    data: {
                        description: descUpdate,
                        score: scoreUpdate,
                        accountId: accountIdUpdate
                    },
                })
                return res.json({ ok: true, message: "Update Task successfully!" });
            }
        }
    }
    catch (error) {
        return res.status(500).json({message: error.message})
    }
    finally {
        async () =>
            await prisma.$disconnect()
    }
}

module.exports.deleteTask = async( req, res) =>{
    try {
        const taskId = await prisma.task.findUnique({
            where: {
                id: Number(req.params.id)
            }
        })
        if(!taskId){
            return res.status(400).json({ ok: false, message: "Wrong task !" });
        }
        else{
            const deleteTask = await prisma.task.delete({
                where:{
                    id: Number(req.params.id)
                }
            })
            return res.json({ ok: true, message: "Delete task successfully!" });
        }
    } 
    catch (error) {
        return res.status(500).json({message: error.message})
    }
    finally {
        async () =>
            await prisma.$disconnect()
    }
}
