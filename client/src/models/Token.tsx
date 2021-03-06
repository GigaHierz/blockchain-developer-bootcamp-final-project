export default interface Token {
  name: string;
  value: string;
  imageUrl: string;
  description?: string;
  parent1?: string | null;
  parent2?: string;
}
