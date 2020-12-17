import { ApiProperty } from "@nestjs/swagger";


export class CreateHotelDto {
  
  @ApiProperty()
  readonly value: number;
  @ApiProperty()
  readonly id: number;
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  readonly cnpj: string;
  @ApiProperty()
  readonly email: string;
  @ApiProperty()
  readonly floors: string;
  @ApiProperty()
  readonly category: string;
  @ApiProperty()
  readonly phone: string;
  @ApiProperty()
  readonly note: string;
  @ApiProperty()
  readonly address_zip: string;
  @ApiProperty()
  readonly address_street: string;
  @ApiProperty()
  readonly address_number: string;
  @ApiProperty()
  readonly address_district: string;
  @ApiProperty()
  readonly address_city: string;

}