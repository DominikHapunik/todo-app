import { plainToInstance } from "class-transformer";
import { ValidationError, validate, validateOrReject } from "class-validator";
import { NextFunction, Request, Response } from "express"

/**
 * @name ValidationMiddleware
 * @description Allows use of decorator and non-decorator based validation
 * @param type dto
 * @param skipMissingProperties When skipping missing properties
 * @param whitelist Even if your object is an instance of a validation class it can contain additional properties that are not defined
 * @param forbidNonWhitelisted If you would rather to have an error thrown when any non-whitelisted properties are present
 */
export const ValidationMiddleware = (type: any, skipMissingProperties = false, whitelist = false, forbidNonWhitelisted = false) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const dto = plainToInstance(type, req.body);
        validateOrReject(dto, { skipMissingProperties, whitelist, forbidNonWhitelisted })
            .then(() => {
                req.body = dto;
                next();
            })
            .catch((errors: ValidationError[]) => {
                let errorTexts = Array();
                for (const errorItem of errors) {
                    errorTexts = errorTexts.concat(errorItem.constraints);
                }
                res.status(400).send(errorTexts)

            });
    };
};