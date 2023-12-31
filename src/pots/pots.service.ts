import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  // updatePots(potsId: string, name: string, plantID: string): Pots {
  //   const [pots] = this.findPots(potsId);

  //   if (name) {
  //     pots.name = name;
  //   }
  //   if (plantID) {
  //     // TODO: dodali logiku za provjeru je li planID postoji vec u nekom drugom potu
  //     // Napraviti novu metodu, koja ce provjervati je li postoji planID u nekom drugom potu
  //     // ako postoji treba javiti gresku korisniku da planId vec postoji u nekom potu
  //     pots.plantID = plantID;
  //   }

  //   return pots;
  // }

  isPlantInUse(plantID: string): boolean {
    return this.pots.some((pot) => pot.plantID === plantID);
  }

  updatePots(potsId: string, name: string, plantID: string): Pots {
    const [pots] = this.findPots(potsId);

    if (name) {
      pots.name = name;
    }

    if (plantID) {
      if (this.isPlantInUse(plantID)) {
        throw new BadRequestException(
          `Plant ID ${plantID} se koristi u drugoj posudi.`,
        );
      }
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
