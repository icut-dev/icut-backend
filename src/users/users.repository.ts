import { Injectable } from '@nestjs/common';
import { Establishments, Prisma, Telephones, Users } from '@prisma/client';
import { PrismaService } from '~/common/prisma';

@Injectable()
export class UsersRepository {
  constructor(private prismaService: PrismaService) {}

  async create(data: Prisma.UsersUncheckedCreateInput): Promise<Users> {
    return await this.prismaService.users.create({
      data
    });
  }

  async createAdm(
    data: Prisma.UsersUncheckedCreateInput
  ): Promise<Users & { establishment: Establishments[] }> {
    return await this.prismaService.users.create({
      data,
      include: {
        establishment: true // Carrega as informações do estabelecimento associado
      }
    });
  }

  async findAll(params: {
    where?: Prisma.UsersWhereInput;
    include?: Prisma.UsersInclude;
  }): Promise<Users[] | []> {
    const { where, include } = params;
    return await this.prismaService.users.findMany({
      where,
      include
    });
  }

  async findOne(
    surveyWhereUniqueInput: Prisma.UsersWhereUniqueInput
  ): Promise<Users & { telephone: Telephones[] }> {
    return await this.prismaService.users.findUnique({
      where: surveyWhereUniqueInput,
      include: {
        telephone: true
      }
    });
  }

  async getByEmail(email: string) {
    return await this.prismaService.users.findFirst({
      where: {
        ds_email: email
      },
      include: { establishment: true }
    });
  }

  async update(data: Prisma.UsersUpdateArgs) {
    return await this.prismaService.users.update(data);
  }

  async deleteByID(surveyWhereUniqueInput: Prisma.UsersWhereUniqueInput) {
    return await this.prismaService.users.delete({
      where: surveyWhereUniqueInput
    });
  }
}
