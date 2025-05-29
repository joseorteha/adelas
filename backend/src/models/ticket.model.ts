import mongoose, { Document, Schema } from 'mongoose';

// Interfaz para el documento de ticket
export interface ITicket extends Document {
  userId: mongoose.Schema.Types.ObjectId;  // Usuario que compró el boleto
  routeId: mongoose.Schema.Types.ObjectId; // Ruta seleccionada
  busId: mongoose.Schema.Types.ObjectId;   // Bus asignado
  seatNumber: number;                      // Número de asiento
  departureDate: Date;                     // Fecha y hora de salida
  arrivalDate: Date;                       // Fecha y hora estimada de llegada
  status: string;                          // Estado del boleto (reservado, pagado, cancelado, completado)
  paymentMethod: string;                   // Método de pago
  price: number;                           // Precio del boleto
  discount: number;                        // Descuento aplicado
  finalPrice: number;                      // Precio final después de descuento
  createdAt: Date;
  updatedAt: Date;
}

// Esquema de ticket para MongoDB
const TicketSchema = new Schema<ITicket>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'El usuario es obligatorio']
  },
  routeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Route',
    required: [true, 'La ruta es obligatoria']
  },
  busId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bus',
    required: [true, 'El bus es obligatorio']
  },
  seatNumber: {
    type: Number,
    required: [true, 'El número de asiento es obligatorio']
  },
  departureDate: {
    type: Date,
    required: [true, 'La fecha de salida es obligatoria']
  },
  arrivalDate: {
    type: Date,
    required: [true, 'La fecha de llegada estimada es obligatoria']
  },
  status: {
    type: String,
    enum: ['reservado', 'pagado', 'cancelado', 'completado'],
    default: 'reservado'
  },
  paymentMethod: {
    type: String,
    enum: ['efectivo', 'tarjeta', 'transferencia', 'pendiente'],
    default: 'pendiente'
  },
  price: {
    type: Number,
    required: [true, 'El precio es obligatorio'],
    min: [0, 'El precio no puede ser negativo']
  },
  discount: {
    type: Number,
    default: 0
  },
  finalPrice: {
    type: Number,
    required: [true, 'El precio final es obligatorio'],
    min: [0, 'El precio final no puede ser negativo']
  }
}, {
  timestamps: true
});

// Crear y exportar el modelo
export default mongoose.model<ITicket>('Ticket', TicketSchema);
