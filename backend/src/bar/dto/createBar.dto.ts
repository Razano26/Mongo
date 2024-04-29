export class CreateBarDto {
  readonly name: string;
  readonly brand?: string;
  // l'ID du bar est généré automatiquement par MongoDB
}
