import { PartialType } from '@nestjs/mapped-types';
import { CreateEquipajeDto } from './create-equipaje.dto';

export class UpdateEquipajeDto extends PartialType(CreateEquipajeDto) {}
