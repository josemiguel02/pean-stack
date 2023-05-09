import { Router } from 'express'
import {
  addCLient,
  deleteCLient,
  editCLient,
  listClient
} from '../controllers/client.controller.js'

const router = Router()

router.get('/', listClient)
router.post('/', addCLient)
router.put('/:id', editCLient)
router.delete('/:id', deleteCLient)

export default router
