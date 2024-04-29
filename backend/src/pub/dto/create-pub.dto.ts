export class CreatePubDto {
  readonly name: string;
  readonly brand?: string;
  // l'ID du pub est généré automatiquement par MongoDB
}
