import { Router } from 'express'
const router = Router();

import { 
    getEmployees, 
    createEmployee,
    getEmployee,
    editEmployee,
    deleteEmployee,
} from '../controllers/employee.controller'

router.get("/", getEmployees);

router.post("/", createEmployee);

router.get("/:id", getEmployee);

router.put("/:id", editEmployee);

router.delete("/:id", deleteEmployee);

export default router;
