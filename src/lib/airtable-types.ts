import z from 'zod';
export const Location = z.object({
  id: z.string(),
  name: z.string(),
  street: z.string(),
  postcode: z.string()
});
export type Location = z.infer<typeof Location>;

export const Speaker = z.object({
  id: z.string(),
  name: z.string().optional(),
  gender: z.enum(['male', 'female', 'non-binary']).optional(),
  presentations: z.string().array(),
  links: z.string().array().optional()
});
export type Speaker = z.infer<typeof Speaker>;

export const Presentation = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  event: z.string().array(),
  speakers: z.string().array().optional(),
  speakersObj: z.array(Speaker).optional()
});
export type Presentation = z.infer<typeof Presentation>;

export const Event = z.object({
  id: z.string(),
  date: z.string(),
  title: z.string().optional(),
  description: z.string().optional(),
  meetup_url: z.string(),
  presentations: z.array(z.string()).optional(),
  presentationsObj: z.array(Presentation).optional(),
  video: z.string().optional(),
  location: z.string().array().optional(),
  locationObj: Location.optional(),
  hero_image: z
    .object({
      id: z.string(),
      width: z.number(),
      height: z.number(),
      url: z.string(),
      filename: z.string(),
      size: z.number(),
      type: z.string(),
      thumbnails: z.record(
        z.enum(['small', 'large', 'full']),
        z.object({
          url: z.string(),
          width: z.number(),
          height: z.number()
        })
      )
    })
    .array()
    .optional()
});
export type Event = z.infer<typeof Event>;
