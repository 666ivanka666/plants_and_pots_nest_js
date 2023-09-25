import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { PlantInPot } from './plants-in-pots.module'; // Use PascalCase for the import

@Injectable()
export class PlantsInPotsService { // Use PascalCase for service name
  private plantsInPots: PlantInPot[] = [];

  insertPlantInPot(
    name: string,
  ): string {
    const plantInPotId = uuidv4();
    const newPlantInPot = new PlantInPot(
      plantInPotId,
      name,
    );
    this.plantsInPots.push(newPlantInPot);
    return plantInPotId;
  }

  getPlantsInPots(): PlantInPot[] {
    return this.plantsInPots;
  }

  getSinglePlantInPot(plantInPotId: string): PlantInPot {
    const [plantInPot] = this.findPlantInPot(plantInPotId);
    return plantInPot;
  }

  updatePlantInPot(
    plantInPotId: string,
    name: string,
  ): void {
    const [plantInPot] = this.findPlantInPot(plantInPotId);

    if (name) {
      plantInPot.name = name;
    }
  }

  deletePlantInPot(plantInPotId: string): void {
    const [, index] = this.findPlantInPot(plantInPotId);
    this.plantsInPots.splice(index, 1);
  }

  private findPlantInPot(id: string): [PlantInPot, number] {
    const plantInPotIndex = this.plantsInPots.findIndex(
      (plantInPot) => plantInPot.id === id,
    );
    if (plantInPotIndex === -1) {
      throw new NotFoundException(`Plant in pot with ID ${id} not found`);
    }
    return [this.plantsInPots[plantInPotIndex], plantInPotIndex];
  }
}
