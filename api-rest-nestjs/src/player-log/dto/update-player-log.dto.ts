import { PartialType } from '@nestjs/mapped-types';
import { CreatePlayerLogDto } from './create-player-log.dto';

export class UpdatePlayerLogDto extends PartialType(CreatePlayerLogDto) {}
