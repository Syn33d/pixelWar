import { PartialType } from '@nestjs/mapped-types';
import { CreateLogWarDto } from './create-log-war.dto';

export class UpdateLogWarDto extends PartialType(CreateLogWarDto) {}
