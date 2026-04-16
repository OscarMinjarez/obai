import { IsString, IsNotEmpty } from 'class-validator';

export class AnalyzeContextRequest {

  @IsString()
  @IsNotEmpty()
  context: string;

}
