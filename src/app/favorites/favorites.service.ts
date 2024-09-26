import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import type { User } from "../users/users.schema";

@Injectable()
export class FavoritesService {
  public constructor(private readonly usersService: UsersService) {}

  public async addToFavorites(currentUser: User, movieID: number): Promise<void> {
    const currentFavoriteMovies: number[] = [...(currentUser.favorite_movies ?? [])];

    const currMovieID = currentFavoriteMovies.find((favoriteID) => {
      return favoriteID === movieID;
    });

    if (currMovieID) {
      throw new Error("The movieID is in favorite movies list rigth now");
    }

    const payload = [...currentFavoriteMovies, movieID];

    await this.usersService.update(currentUser.id, { favorite_movies: payload });
  }

  public async removeFromFavorites(currentUser: User, movieID: number): Promise<void> {
    const currentFavoriteMovies: number[] = [...(currentUser.favorite_movies ?? [])];

    const idx = currentFavoriteMovies.findIndex((favoriteID) => {
      return favoriteID === movieID;
    });

    if (idx === -1) {
      throw new Error("MovieID not found");
    }

    currentFavoriteMovies.splice(idx, 1);

    await this.usersService.update(currentUser.id, { favorite_movies: currentFavoriteMovies });
  }
}
