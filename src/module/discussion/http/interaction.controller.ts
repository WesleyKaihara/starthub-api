import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import InteractionService from '../shared/service/interaction.service';
import { CreateInteractionBody } from '../core/useCase/Interaction/CreateInteraction/CreateInteraction.dto';
import { UpdateInteractionBody } from '../core/useCase/Interaction/UpdateInteraction/UpdateInteraction.dto';

@Controller('/interaction')
@ApiTags('Interaction')
export class InteractionController {
  constructor(private readonly interactionService: InteractionService) {}

  @Get()
  async listInteractions(@Res() response: Response) {
    try {
      const interactions = await this.interactionService.getInteractions();
      return response.json(interactions);
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }

  @Post()
  async createInteraction(
    @Body() input: CreateInteractionBody,
    @Res() response: Response,
  ) {
    try {
      const interaction =
        await this.interactionService.createInteraction(input);
      return response.json(interaction);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  @Put('/:interactionId')
  async updateInteractionById(
    @Param('interactionId', new ParseIntPipe()) interactionId: number,
    @Body() input: UpdateInteractionBody,
    @Res() response: Response,
  ) {
    try {
      const interaction = await this.interactionService.updateInteraction(
        interactionId,
        input,
      );
      return response.json(interaction);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }
}
