import { number, object, string, TypeOf, z} from 'zod';

export const getSign = object({
  query: object({
    key: z.string({
      required_error: 'key is required',
    })
  })
});



