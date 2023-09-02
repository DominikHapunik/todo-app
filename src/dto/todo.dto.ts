import { IsDefined, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class TodoDto {
    @IsNumber()
    id!: number

    @IsNumber()
    @IsNotEmpty()
    @IsDefined()
    userId!: Number

    @IsNotEmpty()
    @IsString()
    @IsDefined()
    todoDescription!: String
}