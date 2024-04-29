export class CreateRestaurantDto {
  readonly name: string;
  readonly brand?: string;
  // l'ID du restaurant est généré automatiquement par MongoDB
}
