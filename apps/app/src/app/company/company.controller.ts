import { Body, Controller, Param, Post } from '@nestjs/common';
import { CompanyService } from './company.service';
import {
  Company,
  CompanyCreateDto,
  CompanyEditDto,
} from './entities/company.entity';

@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  companiesCreate(@Body() company: CompanyCreateDto): Promise<Company> {
    return this.companyService.companiesCreate(company);
  }

  @Post(':companyId')
  companiesEdit(
    @Body() company: CompanyEditDto,
    @Param('companyId') companyId: string
  ): Promise<Company> {
    if (company.id !== companyId) {
      throw new Error('companyId does not match company.id');
    }
    return this.companyService.companiesCreate(company);
  }
}
