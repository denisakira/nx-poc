import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Company, CompanyCreateDto } from './entities/company.entity';

@Injectable()
export class CompanyService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>
  ) {}

  async companiesCreate(companyCreateDto: CompanyCreateDto): Promise<Company> {
    const newCompany = this.companyRepository.create(companyCreateDto);
    return this.companyRepository.save(newCompany);
  }

  async companiesGet(): Promise<Company[]> {
    const companies = await this.companyRepository.find();
    return companies;
  }

  async companyGet(id: string): Promise<Company> {
    const company = await this.companyRepository.findOne({
      where: { id },
    });
    return company;
  }
}
