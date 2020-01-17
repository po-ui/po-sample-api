import { ApiProperty } from "@nestjs/swagger";

export class CreateHeroDto {

  @ApiProperty()
  readonly value: number;

  @ApiProperty()
  readonly label: string;

  @ApiProperty()
  readonly nickname: string;

  @ApiProperty()
  readonly email: string;

}
