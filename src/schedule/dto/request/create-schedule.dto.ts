import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateScheduleRequestDTO {
  @ApiProperty({
    name: 'service_id',
    description: 'id do serviço escolhido para o agendamento',
    example: 1,
    required: true,
    type: Number
  })
  @Expose({ name: 'service_id' })
  @Type(() => Number)
  @IsNotEmpty({
    message: 'SERVICE_IS_REQUIRED'
  })
  serviceId: number;

  @ApiProperty({
    name: 'date_start',
    description: 'Data e horário inicial do agendamento',
    example: '2022-08-20T10:00:00',
    required: true,
    type: Date
  })
  @Expose({ name: 'date_start' })
  @Type(() => Date)
  @IsNotEmpty({
    message: 'START_DATE_IS_REQUIRED'
  })
  dateStart: Date;

  @ApiProperty({
    name: 'payment_method',
    description: 'Meio de pagamento selecionado parao agendamento',
    example: 1,
    required: true,
    type: Number
  })
  @Expose({ name: 'payment_method' })
  @IsNotEmpty({
    message: 'PAYMENT_METHOD_IS_REQUIRED'
  })
  @Type(() => Number)
  paymentMethod: number;

  @ApiProperty({
    name: 'establishment',
    description: 'Estabelecimento que realizará o serviço',
    example: 1,
    required: true,
    type: Number
  })
  @Expose({ name: 'establishment' })
  @Type(() => Number)
  @IsNotEmpty({
    message: 'ESTABLISHMENT_IS_REQUIRED'
  })
  establishment: number;

  @ApiProperty({
    name: 'employee',
    description: 'Funcionário que realizará o serviço',
    example: 1,
    required: true,
    type: Number
  })
  @Expose({ name: 'employee' })
  @Type(() => Number)
  @IsNotEmpty({
    message: 'EMPLOYEE_IS_REQUIRED'
  })
  employee: number;
}
