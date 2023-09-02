import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { Response } from "express";
import { ApiResponse } from "../types/apiresponse.type";

class ValidationResult {
    data: any;
    error: any;
}


export const checkForTypesError = async (dto: any, body: string, res: Response): Promise<boolean> => {
    const result = new ValidationResult();
    result.data = plainToClass(dto, body);
    await validate(result.data, { skipMissingProperties: true }).then(errors => {
        if (errors.length > 0) {
            let errorTexts = Array();
            for (const errorItem of errors) {
                errorTexts = errorTexts.concat(errorItem.constraints);
            }
            result.error = errorTexts;
        }
    });
    
    if (result.error) {
        const jsonResponse: ApiResponse<null> = { data: null, message: result.error, error: true }
        res.status(400).json(jsonResponse)
        return true;
    }

    return false;
}

