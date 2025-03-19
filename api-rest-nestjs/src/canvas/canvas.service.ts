import { Injectable } from '@nestjs/common';
import { CreateCanvaDto } from './dto/create-canva.dto';
import { UpdateCanvaDto } from './dto/update-canva.dto';
import { CanvasLogService } from 'src/canvas-log/canvas-log.service';
import { PlayerLogService } from 'src/player-log/player-log.service';
import { Canvas } from './entities/canvas.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CanvasService {
  constructor(@InjectRepository(Canvas)
    private readonly data: Repository<Canvas>,
    private readonly canvasLogService: CanvasLogService,
    private readonly playerLogService: PlayerLogService,
  ){}
    
  //Méthode pour créer un canva
  async create(createCanvaDto: CreateCanvaDto) {
    return await this.data.save(createCanvaDto);
  }

  //Méthode pour trouver tous les canvas
  async findAll() {
    return await this.data.find();
  }

  //Méthode pour trouver un canva par son id
  async findOne(id: number) {
    return await this.data.findOneBy({id});
  }

  //Méthode pour mettre à jour un canva, notifier le front et ajouter une entrée dans les logs
  async update(id: number, updateCanvaDto: UpdateCanvaDto) {
    const canvaId = await this.data.findOneBy({id});
    if (!canvaId) {
      throw new Error("Le canva avec l'ID ${id} n'existe pas.");
    }
  
    const pixels = canvaId.pixels;
    if (!Array.isArray(pixels) || !pixels[0]) {
      throw new Error("Les données des pixels sont invalides.");
    }
  
    //Extrait les données du pixel à modifier
    const { x, y, color } = updateCanvaDto.pixel;

    if (x < 0 || y < 0 || x >= pixels.length || y >= pixels[x].length) {
      throw new Error("Les coordonnées du pixel sont invalides.");
    }
  
    //Modifie le pixel aux coordonnées spécifiées
    pixels[x][y] = { color };
  
    //Met à jour le canva dans la base de données avec le JSON modifié
    await this.data.update(id, {
      pixels: pixels, 
      updatedAt: new Date()
    });
  
    const updatedCanva = await this.data.findOneBy({ id });
  
    //Ajout d'une entrée dans CanvasLog pour chaque modification
    await this.canvasLogService.create({
      canvaId: id,
      userId: updateCanvaDto.userId,
      pixels: { x, y, color }, 
      timestamp: new Date(),
    });
  
    //Ajout d'une entrée dans PlayerLog pour chaque modification
    await this.playerLogService.create({
      userId: updateCanvaDto.userId,
      pixels: { x, y, color },
      timestamp: new Date(),
    });
  
    return updatedCanva;
  }

  //Méthode pour supprimer un canva
  async remove(id: number) {
    return await this.data.delete(id);
  }
}
