import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pub } from '../schemas/pub.schema';
import { CreatePubDto } from './dto/create-pub.dto';

@Injectable()
export class PubsService {
  constructor(
    @InjectModel(Pub.name)
    private readonly pubModel: Model<Pub>,
  ) {}

  async create(createPubDto: CreatePubDto): Promise<Pub> {
    const createdPub = await this.pubModel.create(createPubDto);
    return createdPub;
  }

  async update(id: string, createPubDto: CreatePubDto) {
    const updatedPub = await this.pubModel
      .findByIdAndUpdate(id, createPubDto, { new: true })
      .exec();
    return updatedPub;
  }

  async findAll(): Promise<Pub[]> {
    return this.pubModel.find().select('name brand _id').exec();
  }

  async findByName(name: string): Promise<Pub[]> {
    return this.pubModel
      .find({ name: { $regex: new RegExp(name, 'i') } })
      .select('name brand _id')
      .exec();
  }

  async delete(id: string) {
    const deletedPub = await this.pubModel.findByIdAndDelete(id).exec();
    return deletedPub;
  }
}
