import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pub } from '../schemas/Pub.schema';
import { CreatePubDto } from './dto/createPub.dto';
import { PatchPubDto } from './dto/patchPub.dto';

import { v4 as uuid } from 'uuid';

@Injectable()
export class PubsService {
  constructor(
    @InjectModel(Pub.name)
    private readonly pubModel: Model<Pub>,
  ) {}

  async create(createPubDto: CreatePubDto): Promise<Pub> {
    const newBar = new this.pubModel({
      ...createPubDto,
      id: uuid(),
    });
    return newBar.save();
  }

  async update(id: string, patchPubDto: PatchPubDto) {
    const updatedPub = await this.pubModel
      .findByIdAndUpdate(id, patchPubDto, { new: true })
      .exec();
    return updatedPub;
  }

  async findAll(): Promise<Pub[]> {
    return this.pubModel.find().select('name brand _id').exec();
  }

  async findAllWithBrand(): Promise<Pub[]> {
    return this.pubModel
      .aggregate([
        {
          $lookup: {
            from: 'tags',
            localField: 'id',
            foreignField: '_id',
            as: 'tags',
          },
        },
        {
          $match: {
            'tags.brand': { $ne: '' }, // Vérification que 'brand' n'est pas une chaîne vide
          },
        },
      ])
      .exec();
  }

  async findAllWithSport(): Promise<Pub[]> {
    return this.pubModel
      .aggregate([
        {
          $lookup: {
            from: 'tags',
            localField: 'id',
            foreignField: '_id',
            as: 'tags',
          },
        },
        {
          $match: {
            'tags.sport': { $ne: null }, // Vérification que 'brand' n'est pas une chaîne vide
          },
        },
      ])
      .exec();
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
