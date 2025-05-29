import { Router } from 'express';

const router = Router();

// Rutas para boletos (implementación básica)
router.get('/', (req, res) => {
  res.status(200).json([
    { 
      id: '1', 
      routeId: '1',
      userId: '1',
      seatNumber: 'A1',
      price: 55,
      purchaseDate: new Date(),
      departureDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      status: 'confirmed'
    }
  ]);
});

router.get('/:id', (req, res) => {
  res.status(200).json({ 
    id: req.params.id, 
    routeId: '1',
    userId: '1',
    seatNumber: 'A1',
    price: 55,
    purchaseDate: new Date(),
    departureDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    status: 'confirmed'
  });
});

router.post('/', (req, res) => {
  res.status(201).json({
    id: Math.floor(Math.random() * 1000).toString(),
    ...req.body,
    purchaseDate: new Date(),
    status: 'confirmed',
    message: 'Boleto creado correctamente'
  });
});

export default router;
