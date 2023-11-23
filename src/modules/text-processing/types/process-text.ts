import { IsString, MaxLength, MinLength } from "class-validator";

export class ProcessTextRequestDto {
    @IsString()
    @MinLength(3)
    @MaxLength(500)
    text: string;
}

export class ProcessTextResponseDto {

}