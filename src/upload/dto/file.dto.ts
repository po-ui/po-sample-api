import { ApiProperty } from "@nestjs/swagger";

export class FileDto {

  @ApiProperty()
  readonly originalname: any;

}
