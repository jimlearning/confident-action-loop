import { z } from 'zod';

export const BookContentSchema = z.object({
  misconception: z.object({
    title: z.string(),
    content: z.string(),
    detail: z.string().optional()
  }),
  reality: z.object({
    title: z.string(),
    content: z.string(),
    steps: z.array(z.string()).optional()
  }),
  sections: z.array(
    z.object({
      title: z.string(),
      titleColor: z.string(),
      className: z.string(),
      icon: z.string(),
      chip: z.string().optional(),
      content: z.array(
        z.object({
          title: z.string(),
          description: z.string().optional(),
          type: z.string().optional(),
          values: z.array(
            z.object({
              name: z.string(),
              description: z.string()
            })
          ).optional(),
          strategies: z.array(z.string()).optional(),
          examples: z.array(
            z.object({
              title: z.string(),
              steps: z.array(z.string())
            })
          ).optional(),
          steps: z.array(
            z.object({
              number: z.number(),
              title: z.string(),
              description: z.string()
            })
          ).optional()
        })
      )
    })
  ),
  keyPoints: z.union([
    z.array(z.string()),
    z.array(
      z.object({
        title: z.string(),
        points: z.array(z.string())
      })
    )
  ])
});
