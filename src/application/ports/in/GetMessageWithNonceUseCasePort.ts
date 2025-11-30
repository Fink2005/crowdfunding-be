import {
  GetMessageWithNonceReqDto,
  GetMessageWithNonceResDto,
} from "@/application/dto/GetMessageWithNonceDto";

export interface GetMessageWithNonceUseCasePort {
  execute(input: GetMessageWithNonceReqDto): Promise<GetMessageWithNonceResDto>;
}
