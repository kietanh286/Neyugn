const db = require('../../../../../models');
const { validationResult } = require('express-validator');

exports.index = async (req, resp, next) => {
    
    await db.Invoice.findAll( {
        include: [
            {
                model: db.User,
                as: 'createdby'
            },
            {
                model: db.TechpackStock,
                as: 'supplier'
            }]
    })
    .then((result) => {
        console.log('Invoice Controller',result);
        resp.render('dashboard/admin/invoice/index',{
            invoiceList: result,
            pageTitle: 'Invoice'
        });        
    })
    .catch(error => {
        throw new Error(error);
    });
} 

exports.create =async (req, resp, next) =>{
    let suppliers = await db.TechpackStock.findAll()
    .then( (suppliers) =>{
        return suppliers;
    });
    resp.render('dashboard/admin/invoice/create',{
        
        supplierList: suppliers,
        pageTitle: 'Invoice'
        
    });
}

exports.edit = async (req, resp, next) =>{
    let supplierList = await db.TechpackStock.findAll()
                .then( (supplierList) =>{
                    return supplierList;
                });
    await db.Invoice.findByPk(req.params.id,{
        include: [
            {
                model: db.User,
                as: 'createdby'
            },
            {
                model: db.Techpack,
                as: 'techpacks'
            },
            {
                model: db.TechpackStock,
                as: 'supplier'
            }]
        
    })
    .then((result) => {
        console.log('>>===========result.techpacks---------\n',result.techpacks);
        result.techpacks.forEach(element => {
            console.log('>>===========result.techpacks.array.forEach.InvoiceDeltail---------\n',element.InvoiceDeltail);
        });
        resp.render('dashboard/admin/invoice/edit',{
            invoice: result,
            supplierList,
            pageTitle: 'Invoice'
        });  
    })
    .catch((error) => {
        throw new Error(error);
    });
}

exports.store = async (req, resp, next) =>{
    let techpack = await db.Techpack.findAll({
        where: {
            status: {
                [db.Sequelize.Op.and]: [
                    { [db.Sequelize.Op.gt]: 0 }, // status > 0
                    { [db.Sequelize.Op.lt]: 4 } // status < 4
                ]
            }
        }
    }) ;
    req.body.createdById = req.session.user_id;
    db.Invoice.create(req.body)
    .then((result) => {
        
        resp.render('dashboard/admin/invoice/item',{
            invoiceId: result.id,
            techpackList: techpack,
            pageTitle: 'Invoice item'
        });  
    })
    .catch((error) => {
        throw new Error(error);
    });
}

exports.update = (req, resp, next) =>{
    db.Invoice.update(req.body,{
        where: {
            id: req.params.id
        }
    })
    .then( result => {        
        req.flash('success', `Invoice updated ${ req.body.name } successfully!`)
        resp.status(200).redirect('/invoice');
    })
    .catch(error => {
        throw new Error(error);
    })
}
exports.additem = async(req, resp, next) =>{
    let techpack = await db.Techpack.findAll({
        where: {
            status: {
                [db.Sequelize.Op.and]: [
                    { [db.Sequelize.Op.gt]: 0 }, // status > 0
                    { [db.Sequelize.Op.lt]: 4 } // status < 4
                ]
            }
        }
    }) ;
     await db.Techpack.update(req.body,{
        where: {
            id: req.body.techpackId
        }
    });
    db.InvoiceDeltail.create(req.body)
    .then( result => {  
              
        resp.render('dashboard/admin/invoice/item' ,{
            invoiceId: req.body.techpackId,
            techpackList: techpack,
            pageTitle: 'Invoice item'
        });  
    })
    .catch(error => {
        throw new Error(error);
    })
}

exports.delete = async (req, resp, next) =>{
    await db.Invoice.destroy({
        where: {
            id: req.params.id
        }
    })
    .then( () => {      
        req.flash('warning', `Invoice deleted successfully!`);        
        resp.status(200).redirect('/invoice');
    })
    .catch(error => {
        throw new Error(error);
    })
}