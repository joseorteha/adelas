import { Router } from 'express';

const router = Router();

// Rutas de usuarios (implementación básica)
router.get('/', (req, res) => {
  res.status(200).json([
    { id: '1', name: 'Usuario Demo', email: 'demo@adelas.com', role: 'user' }
  ]);
});

router.get('/:id', (req, res) => {
  res.status(200).json({ id: req.params.id, name: 'Usuario Demo', email: 'demo@adelas.com', role: 'user' });
});

router.put('/:id', (req, res) => {
  res.status(200).json({ 
    id: req.params.id, 
    ...req.body,
    message: 'Usuario actualizado correctamente' 
  });
});

export default router;
