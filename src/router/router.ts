import express from 'express';
import controller from '../controller/controller';

const router = express.Router();

router.post('/', controller.addPayable);
router.get('/', controller.getAllPayable);
router.get('/:id', controller.getPayableById);
router.patch('/:id', controller.updatePayable); // ajustar
router.delete('/:id', controller.deletePayable);

export default router
