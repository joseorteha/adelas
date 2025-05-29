import mongoose, { Document, Schema } from 'mongoose';

// Interfaz para el documento de bus
export interface IBus extends Document {
  plate: string;          // Matrícula del autobús
  busModel: string;       // Modelo del autobús
  capacity: number;       // Capacidad total de pasajeros
  type: string;           // Tipo de bus (ejecutivo, ordinario, etc.)
  features: string[];     // Características (wifi, aire acondicionado, etc.)
  driverId: mongoose.Schema.Types.ObjectId; // Conductor asignado
  active: boolean;        // Si el bus está activo o no
  createdAt: Date;
  updatedAt: Date;
}

// Esquema de bus para MongoDB
const BusSchema = new Schema<IBus>({
  plate: {
    type: String,
    required: [true, 'La matrícula es obligatoria'],
    unique: true,
    trim: true
  },
  busModel: {
    type: String,
    required: [true, 'El modelo es obligatorio'],
    trim: true
  },
  capacity: {
    type: Number,
    required: [true, 'La capacidad es obligatoria'],
    min: [1, 'La capacidad debe ser mayor a 0']
  },
  type: {
    type: String,
    required: [true, 'El tipo de bus es obligatorio'],
    enum: ['Ejecutivo', 'Ordinario', 'Rápido', 'Directo'],
    default: 'Ordinario'
  },
  features: {
    type: [String],
    default: []
  },
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Crear y exportar el modelo
export default mongoose.model<IBus>('Bus', BusSchema);
