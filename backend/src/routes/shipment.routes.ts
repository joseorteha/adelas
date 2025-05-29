import { Router } from 'express';

const router = Router();

// Rutas para envíos (implementación básica)
router.get('/', (req, res) => {
  res.status(200).json([
    { 
      id: '1', 
      origin: 'Orizaba',
      destination: 'Zongolica',
      description: 'Paquete pequeño',
      weight: 2.5,
      price: 35,
      senderName: 'Juan Pérez',
      senderPhone: '2721234567',
      receiverName: 'María García',
      receiverPhone: '2729876543',
      status: 'in_transit',
      trackingNumber: 'AD12345678MX',
      shipDate: new Date(),
      estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
    }
  ]);
});

router.get('/:id', (req, res) => {
  res.status(200).json({ 
    id: req.params.id, 
    origin: 'Orizaba',
    destination: 'Zongolica',
    description: 'Paquete pequeño',
    weight: 2.5,
    price: 35,
    senderName: 'Juan Pérez',
    senderPhone: '2721234567',
    receiverName: 'María García',
    receiverPhone: '2729876543',
    status: 'in_transit',
    trackingNumber: 'AD12345678MX',
    shipDate: new Date(),
    estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
  });
});

router.post('/', (req, res) => {
  const trackingNumber = 'AD' + Math.floor(Math.random() * 10000000).toString().padStart(8, '0') + 'MX';
  
  res.status(201).json({
    id: Math.floor(Math.random() * 1000).toString(),
    ...req.body,
    status: 'received',
    trackingNumber,
    shipDate: new Date(),
    estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    message: 'Envío creado correctamente'
  });
});

router.get('/tracking/:number', (req, res) => {
  res.status(200).json({
    trackingNumber: req.params.number,
    status: 'in_transit',
    history: [
      { date: new Date(Date.now() - 24 * 60 * 60 * 1000), status: 'received', location: 'Orizaba' },
      { date: new Date(), status: 'in_transit', location: 'En camino a Zongolica' }
    ]
  });
});

export default router;
