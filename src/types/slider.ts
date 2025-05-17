export interface SliderImage {
  id: string;
  imageUrl: string;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface SliderImageFormData extends Omit<SliderImage, 'id' | 'createdAt' | 'updatedAt'> {
  id?: string;
}