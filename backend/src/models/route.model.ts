import mongoose, { Schema, Document } from 'mongoose';

export interface IRoute extends Document {
  origin: string;
  destination: string;
  distance: number;
  duration: number;
  price: number;
  schedule: {
    departure: string;
    arrival: string;
  };
  stops: string[];
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const RouteSchema: Schema = new Schema({
  origin: {
    type: String,
    required: [true, 'El origen es requerido'],
    trim: true
  },
  destination: {
    type: String,
    required: [true, 'El destino es requerido'],
    trim: true
  },
  distance: {
    type: Number,
    required: [true, 'La distancia es requerida']
  },
  duration: {
    type: Number,
    required: [true, 'La duración es requerida']
  },
  price: {
    type: Number,
    required: [true, 'El precio es requerido']
  },
  schedule: {
    departure: {
      type: String,
      required: [true, 'La hora de salida es requerida']
    },
    arrival: {
      type: String,
      required: [true, 'La hora de llegada es requerida']
    }
  },
  stops: [{
    type: String,
    trim: true
  }],
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Índices para búsquedas frecuentes
RouteSchema.index({ origin: 1, destination: 1 });
RouteSchema.index({ active: 1 });

export default mongoose.model<IRoute>('Route', RouteSchema); 