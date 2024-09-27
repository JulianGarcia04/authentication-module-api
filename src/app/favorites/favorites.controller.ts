import { Controller, Delete, Param, Post } from "@nestjs/common";
import { CurrentUser } from "src/decorators/CurrentUser";
import { User } from "../users/users.schema";
import { FavoritesService } from "./favorites.service";
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("favorites movies")
@ApiBearerAuth()
@Controller("favorites")
export class FavoritesController {
  public constructor(private readonly favoritesService: FavoritesService) {}

  @Post("add/:movieID")
  @ApiCreatedResponse({
    type: String,
  })
  public async addToFavorites(
    @Param("movieID") movieID: string,
    @CurrentUser() currentUser: User,
  ): Promise<string> {
    await this.favoritesService.addToFavorites(currentUser, Number(movieID));

    return "favorite movie was added";
  }

  @Delete("delete/:movieID")
  @ApiCreatedResponse({
    type: String,
  })
  public async deleteFromFavorites(
    @Param("movieID") movieID: string,
    @CurrentUser() currentUser: User,
  ): Promise<string> {
    await this.favoritesService.removeFromFavorites(currentUser, Number(movieID));

    return "favorite movie was deleted";
  }
}
