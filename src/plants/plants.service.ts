import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Plants } from './type';

@Injectable()
export class PlantsService {
  private plants: Plants[] = [];

  insertPlants(name: string): string {
    const plantsId = uuidv4();
    const newPlants = new Plants(plantsId, name);
    this.plants.push(newPlants);
    return plantsId;
  }

  getPlants(): Plants[] {
    return this.plants;
  }

  getSinglePlants(plantsId: string): Plants {
    const [plants] = this.findPlants(plantsId);
    return plants;
  }

  updatePlants(plantsId: string, name: string): Plants {
    const [plant] = this.findPlants(plantsId);

    if (name) {
      plant.name = name;
    }

    return plant;
  }

  deletePlants(plantsId: string): void {
    const [, index] = this.findPlants(plantsId);
    this.plants.splice(index, 1);
  }

  private findPlants(id: string): [Plants, number] {
    const plantsIndex = this.plants.findIndex((plants) => plants.id === id);
    if (plantsIndex === -1) {
      throw new NotFoundException(`Plants with ID ${id} not found`);
    }
    return [this.plants[plantsIndex], plantsIndex];
  }
}
