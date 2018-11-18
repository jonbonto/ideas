import { UserEntity } from './../user/user.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { IdeaEntity } from './idea.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IdeaDTO, IdeaRO } from './idea.dto';

@Injectable()
export class IdeaService {

  constructor(
    @InjectRepository(IdeaEntity)
    private ideaRepository: Repository<IdeaEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {}

  private toResponseObject(idea: IdeaEntity): IdeaRO {
    return {...idea, author: idea.author.toResponseObject(false)};
  }

  private ensureOwnership(idea, userId) {
    if(idea.author.id !== userId) {
      throw new HttpException('Incorrect user', HttpStatus.UNAUTHORIZED);
    }
  }
  async showAll(): Promise<IdeaRO[]> {
    const ideas = await this.ideaRepository.find({relations: ['author']});
    return ideas.map(idea => this.toResponseObject(idea));
  }

  async create(userId: string, data: IdeaDTO): Promise<IdeaRO> {
    const author = await this.userRepository.findOne({id: userId});
    const idea = await this.ideaRepository.create({...data, author});
    await this.ideaRepository.save(idea);
    return this.toResponseObject(idea);
  }

  async show(id: string): Promise<IdeaRO> {
    const idea = await this.ideaRepository.findOne({ where: {id}, relations: ['author'] }); 
    if (!idea) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return this.toResponseObject(idea);
  }

  async update(id: string, userId: string,data: Partial<IdeaDTO>): Promise<IdeaRO> {
    const idea = await this.ideaRepository.findOne({ where: {id}, relations: ['author'] }); 
    if (!idea) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    this.ensureOwnership(idea, userId);
    await this.ideaRepository.update({ id }, data);
    return this.toResponseObject({...idea, ...data});
  }

  async delete(id: string, userId: string): Promise<IdeaRO> {
    const idea = await this.ideaRepository.findOne({ where:{id}, relations: ['author'] }); 
    if (!idea) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    this.ensureOwnership(idea, userId);
    await this.ideaRepository.delete({ id });
    return this.toResponseObject(idea);
  }
}
