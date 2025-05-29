import mongoose, { Schema, Document } from 'mongoose';

export interface ILocation extends Document {
  name: string;
  state: string;
  type: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const LocationSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'El nombre de la ubicación es requerido'],
    trim: true,
    unique: true,
    // No definimos index aquí porque lo haremos con Schema.index()
  },
  state: {
    type: String,
    required: [true, 'El estado es requerido'],
    trim: true
  },
  type: {
    type: String,
    enum: ['ciudad', 'pueblo', 'comunidad'],
    default: 'ciudad'
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Índices para búsquedas frecuentes
LocationSchema.index({ active: 1 });
LocationSchema.index({ state: 1 });

export default mongoose.model<ILocation>('Location', LocationSchema);
