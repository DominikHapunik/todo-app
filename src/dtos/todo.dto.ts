import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class CreateToDoDto {
    @IsString()
    @IsNotEmpty()
    public todoDescription!: string;
}

export class UpdateToDoDto {
    @IsString()
    @IsNotEmpty()
    public todoDescription!: string;
}