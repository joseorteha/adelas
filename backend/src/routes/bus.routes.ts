import { Router } from 'express';

const router = Router();

// Rutas para autobuses (implementación básica)
router.get('/', (req, res) => {
  res.status(200).json([
    { 
      id: '1', 
      plate: 'ABC-123', 
      model: 'Mercedes Benz 2023',
      capacity: 40,
      active: true
    },
    { 
      id: '2', 
      plate: 'XYZ-789', 
      model: 'Volvo 2022',
      capacity: 45,
      active: true
    }
  ]);
});

router.get('/:id', (req, res) => {
  res.status(200).json({ 
    id: req.params.id, 
    plate: 'ABC-123', 
    model: 'Mercedes Benz 2023',
    capacity: 40,
    active: true
  });
});

export default router;
