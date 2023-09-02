import { IsString, IsDefined, IsNotEmpty, MaxLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    @MaxLength(16)
    userName!: string

    @IsNotEmpty()
    @IsString()
    @IsDefined()
    @MaxLength(32)
    password!: string
}

export class UpdateUserDto {
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    @MaxLength(32)
    password!: string
}