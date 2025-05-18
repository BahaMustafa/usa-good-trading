export interface Testimonial {
  id: string;
  name: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TestimonialFormData extends Omit<Testimonial, 'id' | 'createdAt' | 'updatedAt'> {
  id?: string;
}