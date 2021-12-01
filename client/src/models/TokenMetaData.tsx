export default interface TokenMetaData {
  title: string;
  type: string;
  properties: {
    name: string;
    description?: string;
    image: string;
    value: string;
    parent1?: string;
    parent2?: string;
  };
}
