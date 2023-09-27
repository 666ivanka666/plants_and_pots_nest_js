import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Pots } from './type';

@Injectable()
export class PotsService {
  private pots: Pots[] = [];

  insertPots(name: string): string {
    const potsId = uuidv4();
    const newPots = new Pots(potsId, name);
    this.pots.push(newPots);
    return potsId;
  }

  getPots(): Pots[] {
    return this.pots;
  }

  getSinglePots(potsId: string): Pots {
    const [pots] = this.findPots(potsId);
    return pots;
  }

  updatePots(potsId: string, name: string, plantID: string): Pots {
    const [pots] = this.findPots(potsId);

    if (name) {
      pots.name = name;
    }
    if (plantID) {
      pots.plantID = plantID;
    }

    return pots;
  }

  deletePots(potsId: string): { message: string } {
    const [, index] = this.findPots(potsId);
    this.pots.splice(index, 1);

    return { message: 'Obrisana vaza' };
  }

  private findPots(id: string): [Pots, number] {
    const potsIndex = this.pots.findIndex((pots) => pots.id === id);
    if (potsIndex === -1) {
      throw new NotFoundException(`Pots with ID ${id} not found`);
    }
    return [this.pots[potsIndex], potsIndex];
  }
}
