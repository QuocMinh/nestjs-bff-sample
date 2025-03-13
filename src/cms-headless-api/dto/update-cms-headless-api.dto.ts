import { PartialType } from '@nestjs/mapped-types';
import { CreateCmsHeadlessApiDto } from './create-cms-headless-api.dto';

export class UpdateCmsHeadlessApiDto extends PartialType(CreateCmsHeadlessApiDto) {}
