import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class SaveFavoriteDto {

  @ApiProperty()
  readonly isFavorite: boolean;

  @ApiProperty()
  readonly url: string;

  @ApiPropertyOptional()
  readonly params?: string;

}
