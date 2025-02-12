import { ApiProperty } from "@nestjs/swagger";

export class CreateHeroDto {

  @ApiProperty()
  readonly value: number;

  @ApiProperty()
  readonly label: string;

  // @ApiProperty()
  // readonly id: number;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly nickname: string;

  @ApiProperty()
  readonly email: string;
  @ApiProperty()
  readonly UF: string;

}
