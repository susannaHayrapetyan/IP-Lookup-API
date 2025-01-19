import Joi from 'joi';

export const ipValidationSchema = Joi.object({
  ipAddress: Joi.string()
    .ip({ version: ['ipv4', 'ipv6'] })
    .required()
    .label('IP Address')
    .messages({
      'string.base': 'IP Address must be a string.',
      'string.ip': 'IP Address must be a valid IPv4 or IPv6 address.',
      'any.required': 'IP Address is required.',
    }),
});
