import { Injectable, NotFoundException } from '@nestjs/common';
import { Pots } from './pots.module'; 
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PotsService {
  private pots: Pots[] = [];

  insertPots(
    name: string,
    potID: string,
  ): string {
    const potsId = uuidv4();
    const newPots = new Pots( 
      potsId,
      name,
      potID,
    );
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

  updatePots(
    potsId: string,
    name: string,
    potID: string,
  ): void {
    const [pots] = this.findPots(potsId); 

    if (name) {
      pots.name = name; 
    }
    if (potID) {
      pots.potID = potID; 
    }
  }

  deletePots(potsId: string): void {
    const [, index] = this.findPots(potsId); 
    this.pots.splice(index, 1); 
  }

  private findPots(id: string): [Pots, number] { 
    const potsIndex = this.pots.findIndex(
      (pots) => pots.id === id,
    );
    if (potsIndex === -1) {
      throw new NotFoundException(`Pots with ID ${id} not found`); 
    }
    return [this.pots[potsIndex], potsIndex]; 
  }
}
