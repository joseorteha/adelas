import { Router } from 'express';
import { 
  getAllLocations, 
  getLocationById, 
  createLocation, 
  updateLocation, 
  deleteLocation 
} from '../controllers/location.controller';

const router = Router();

// Rutas para ubicaciones
router.get('/', getAllLocations);
router.get('/:id', getLocationById);
router.post('/', createLocation);
router.put('/:id', updateLocation);
router.delete('/:id', deleteLocation);

export default router;
