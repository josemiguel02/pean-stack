import { Router } from 'express'
import {
  addDepartment,
  deleteDepartment,
  editDepartment,
  listDepartments
} from '../controllers/departments.controller.js'

const router = Router()

router.get('/', listDepartments)
router.post('/', addDepartment)
router.put('/:id', editDepartment)
router.delete('/:id', deleteDepartment)

export default router
