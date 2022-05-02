import Employee from "../models/employee";
import {MongoClient} from 'mongodb'
const url = 'mongodb://localhost/angular-auth'


export async function getEmployees(req, res) {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ok: false, error});
  }
    
}

export async function createEmployee(req, res) {
  try {
    const employee = new Employee({
      name: req.body.name,
      otherNames: req.body.otherNames,
      firtsLastName: req.body.firtsLastName,
      secondLastName: req.body.secondLastName,
      country: req.body.country,
      documentType: req.body.documentType,
      document: req.body.document,
      admissionDate: req.body.admissionDate,
      email: req.body.email,
      area: req.body.area,
      status: 'activo',
    });

    const docuemteReapeted = await Employee.find({document: employee.document}).exec();
    if(docuemteReapeted.length > 0) { 
      return res.json({ ok: false , message: "Employee already exist" });
    }

   const emailsRepeated = await Employee.find({name: employee.name, firtsLastName :employee.firtsLastName}).exec();

   let email;
    if(emailsRepeated.length > 0){
        if(employee.country == 'CO'){
          email = `${employee.name.replace(/\s/g, "").trim()}.${employee.firtsLastName.replace(/\s/g, "").trim()}.${emailsRepeated.length + 1}@cidenet.com.co`
        }else{
          email = `${employee.name.replace(/\s/g, "").trim()}.${employee.firtsLastName.replace(/\s/g, "").trim()}.${emailsRepeated.length + 1}@cidenet.com.us`
        }
    }else{
      if(employee.country == 'CO'){
        email = `${employee.name.replace(/\s/g, "").trim()}.${employee.firtsLastName.replace(/\s/g, "").trim()}@cidenet.com.co`
      }else{
          email = `${employee.name.replace(/\s/g, "").trim()}.${employee.firtsLastName.replace(/\s/g, "").trim()}@cidenet.com.us`
      }
    }


    employee.email = email;

    await employee.save();
    res.json({ ok: true, message: "Employee created" });
  } catch (error) {
    res.status(500).json({ok: false, error});
  }
    
}


export async function getEmployee(req, res) {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);
    res.json(employee);
  } catch (error) {
    res.status(500).json({ok: false, error});
  }
    
}

export async function editEmployee(req, res) {
  try {
    const { id } = req.params;
    await Employee.findByIdAndUpdate(id, {$set: req.body}, {new: true});
    res.json({ ok: true, message: "Employee Updated" });
  } catch (error) {
    res.status(500).json({ok: false, error});
  }
    
}

export async function deleteEmployee(req, res) {
  try {
    await Employee.findByIdAndRemove(req.params.id);
    res.json({ ok: true, message:"Employee Deleted" });
  } catch (error) {
    res.status(500).json({ok: false, error});
  }
    
}


