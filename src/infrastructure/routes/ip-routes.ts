import { Router } from 'express';
import { IPController } from '../controllers/ip-controller';
import { IPRepository } from '../database/ip-repository';
import { IPLookupService } from '../../application/services/ip-lookup-service';
import { validateIP } from '../middlewares/validate-ip';

const router = Router();

const repository = new IPRepository();
const service = new IPLookupService(repository);
const controller = new IPController(service);

router.get('/:ipAddress', validateIP, (req, res, next) => controller.getIP(req, res, next));
router.delete('/:ipAddress', validateIP, (req, res, next) => controller.deleteIP(req, res, next));

export default router;