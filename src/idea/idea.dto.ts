import { UserRO } from './../user/user.dto';
import { IsString } from 'class-validator';

export class IdeaDTO {
  @IsString()
  idea: string;

  @IsString()
  description: string;
}

export class IdeaRO {
  id: string;
  idea: string;
  description: string;
  created: Date;
  updated: Date;
  author?: UserRO;
}
